@testitem "heartbeat (JL-MSG-001, JL-MSG-002)" begin
    m = heartbeat_message("s1", 2.0)
    @test m isa Message
    @test m.content == Dict{String,Any}("type" => "hb", "session" => "s1", "interval" => 2.0)
    @test isempty(m.buffers)
end

@testitem "trend chart append and snapshot (JL-MSG-003)" begin
    tr = TrendChart(; pens=[Dict("name" => "Level"), Dict("name" => "Temp")])
    m = append_message(tr, [[1.0e9, 1.0e9 + 1], [1.0e9]], [[0.5, 0.75], [20.0]]; totals=[10, 3])
    @test m.content["type"] == "append"
    @test m.content["pens"] == [[0, 2, 10], [1, 1, 3]]
    @test length(m.buffers) == 4
    @test reinterpret(Float64, m.buffers[1]) == [1.0e9, 1.0e9 + 1]
    @test reinterpret(Float32, m.buffers[2]) == Float32[0.5, 0.75]
    @test reinterpret(Float32, m.buffers[4]) == Float32[20.0]
    # pens without samples are skipped, total defaults to n
    m2 = append_message(tr, [Float64[], [2.0]], [Float64[], [1.0]])
    @test m2.content["pens"] == [[1, 1, 1]]
    @test length(m2.buffers) == 2
    s = snapshot_message(tr, [[1.0]], [[2.0]])
    @test s.content["type"] == "snapshot"
    @test_throws ArgumentError append_message(tr, [[1.0, 2.0]], [[1.0]])   # lengths differ
    @test_throws ArgumentError append_message(tr, [[1.0], [1.0], [1.0]], [[1.0], [1.0], [1.0]])  # 3 pens > 2
end

@testitem "sparkline and KPI tile append (JL-MSG-004)" begin
    for w in (Sparkline(), KPITile())
        m = append_message(w, [1.0, 2.0, 3.0])
        @test m.content == Dict{String,Any}("type" => "append", "n" => 3)
        @test reinterpret(Float32, only(m.buffers)) == Float32[1, 2, 3]
    end
    @test append_message(KPITile(), 4.0).content["n"] == 1
end

@testitem "message types checked against the contract (JL-MSG-005)" begin
    @test_throws ArgumentError append_message(Tank(), [1.0])
    @test_throws ArgumentError message(Tank(), "append")
    @test_throws ArgumentError message(Sparkline(), "sync_request")   # front-to-host
    m = message(Sparkline(), "clear_nope"; strict=false)
    @test m.content["type"] == "clear_nope"
    @test message(LED(), "latch_expired").content == Dict{String,Any}("type" => "latch_expired")
end

@testitem "transport (JL-MSG-006)" begin
    w = Tank(; id="lvl")
    AnywidgetInstruments.set_transport!(nothing)
    e = try
        send_message(w, heartbeat_message("s", 1))
        nothing
    catch err
        err
    end
    @test e isa ErrorException
    @test occursin("transport", sprint(showerror, e))
    sent = []
    AnywidgetInstruments.set_transport!((id, msg) -> push!(sent, (id, msg)))
    send_message(w, heartbeat_message("s", 1))
    @test sent[1][1] == "lvl"
    @test sent[1][2].content["type"] == "hb"
    AnywidgetInstruments.set_transport!(nothing)
end
