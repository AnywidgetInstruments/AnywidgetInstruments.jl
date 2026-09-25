@testitem "constructors for every class (JL-API-001, JL-API-012)" begin
    for class in widget_classes()
        f = getfield(AnywidgetInstruments, Symbol(class))
        w = f()
        @test w isa Instrument
        @test widget_class(w) == class
    end
    @test Tank isa Function
    # names exported by Base are not exported again
    @test !Base.isexported(AnywidgetInstruments, :Pipe)
    @test Base.isexported(AnywidgetInstruments, :Tank)
    @test AnywidgetInstruments.Pipe() isa Instrument
end

@testitem "keyword traits and positional value (JL-API-001..003)" begin
    t = Tank(3.2; max=4, unit="m", hi=3, label="T-101")
    @test t[:value] == 3.2
    @test t["max"] == 4.0
    @test t[:unit] == "m"
    @test t[:label] == "T-101"
    @test t[:mode] == "indicator"        # default
    k = Knob(; value=2.5)
    @test k[:value] == 2.5
    @test instrument("Knob"; value=1)[:value] == 1
    @test instrument(:LED, true)[:value] === true
    @test widget_class(instrument(:LED)) == "LED"
    # Sparkline.value is read-only: no positional form
    @test_throws MethodError Sparkline(1.0)
end

@testitem "unknown traits and invalid values (JL-API-004, JL-API-005)" begin
    err(f) =
        try
            f()
            nothing
        catch e
            e
        end
    e = err(() -> Tank(; colour="red"))
    @test e isa ArgumentError
    @test occursin("colour", sprint(showerror, e)) && occursin("Tank", sprint(showerror, e))
    @test err(() -> Tank(; mode="banana")) isa ArgumentError      # enum
    @test err(() -> Tank(; label=3)) isa ArgumentError            # string
    @test err(() -> Tank(; show_limits=1)) isa ArgumentError      # boolean
    @test err(() -> Tank(; size=[100])) isa ArgumentError         # tuple length
    @test err(() -> Tank(; size=[0, 100])) isa ArgumentError      # exclusiveMinimum
    @test err(() -> Tank(; value="3")) isa ArgumentError
    @test err(() -> Tank(; max=nothing)) isa ArgumentError        # not nullable
    @test Tank(; hi=nothing)[:hi] === nothing                     # nullable
end

@testitem "normalization (JL-API-006, JL-API-007, JL-API-008)" begin
    @test Tank(; animation_ms=1000)[:animation_ms] == 300     # clamped to maximum
    @test Tank(; ticks=0)[:ticks] == 1                        # clamped to minimum
    @test Tank(; ticks=4.0)[:ticks] === 4                     # integer trait
    @test Tank(; mode=:control)[:mode] == "control"           # Symbol -> String
    @test Tank(; size=(200, 300))[:size] == [200, 300]        # tuple -> array
    @test Compass(370)[:value] == 10                            # modulo
    @test Compass(-90)[:value] == 270
    @test Tank(; _kind="knob")[:_kind] == "tank"              # kind is the class's
    @test Tank(; markers=[1, 2.5])[:markers] == [1, 2.5]
end

@testitem "dictionary access and traits (JL-API-009, JL-API-010, JL-API-013)" begin
    t = Tank(1.0; unit="m")
    t[:value] = 2.0
    @test t[:value] == 2.0
    @test_throws ArgumentError t[:value] = "x"
    @test_throws ArgumentError t[:nope] = 1
    @test haskey(t, :unit)
    @test !haskey(t, :nope)
    @test get(t, :unit, "") == "m"
    tr = traits(t)
    @test tr isa Dict{String,Any}
    @test tr == Dict("_kind" => "tank", "value" => 2.0, "unit" => "m")
    full = traits(t; defaults=true)
    @test full["max"] == 100
    @test full["unit"] == "m"
    u = update(t; value=3.0, label="L")
    @test u[:value] == 3.0 && u[:label] == "L"
    @test t[:value] == 2.0                                 # original untouched
    @test u.id == t.id
end

@testitem "message ids (JL-API-011)" begin
    a = Tank()
    b = Tank()
    @test !isempty(a.id)
    @test a.id != b.id
    @test Tank(; id="level").id == "level"
end

@testitem "derived alarm level when the host owns the state (JL-LOG-004)" begin
    t = Tank(50.0; hi=80, deadband=2, _session="s1")
    @test t[:alarm_level] == "normal"
    t[:value] = 81
    @test t[:alarm_level] == "hi"
    t[:value] = 79            # inside the deadband
    @test t[:alarm_level] == "hi"
    t[:value] = 77
    @test t[:alarm_level] == "normal"
    t[:hi] = 70               # a limit change also recomputes
    @test t[:alarm_level] == "hi"
    # PID faceplate: the level follows pv
    p = PIDFaceplate(; pv=90.0, hi=85, _session="s1")
    @test p[:alarm_level] == "hi"
    # without a session the front end owns derived traits
    n = Tank(90.0; hi=80)
    @test !haskey(traits(n), "alarm_level")
end

@testitem "show" begin
    t = Tank(1.0; id="lvl")
    s = sprint(show, t)
    @test occursin("Tank", s)
    s2 = sprint(show, MIME"text/plain"(), t)
    @test occursin("value", s2) && occursin("lvl", s2)
end

@testitem "plain trait dictionaries (JL-API-014)" begin
    bound = Dict{String,Any}("_kind" => "tank", "value" => 1.0, "unit" => "m", "max" => 4)
    d = merge_traits(bound; value=2.5, label="T-101")
    @test d isa Dict{String,Any}
    @test d["value"] == 2.5 && d["label"] == "T-101" && d["unit"] == "m"
    @test bound["value"] == 1.0                                   # input untouched
    @test merge_traits(bound; value=NaN)["value"] == "nan"
    @test_throws ArgumentError merge_traits(bound; nope=1)
    @test_throws ArgumentError merge_traits(Dict("value" => 1))  # no _kind
    @test_throws ArgumentError merge_traits(Dict("_kind" => "nope"))
    # symbol keys and derived traits
    h = merge_traits(Dict(:_kind => "tank", :_session => "s", :hi => 80); value=90)
    @test h["alarm_level"] == "hi"
    @test class_of_kind("tank") == "Tank"
end
