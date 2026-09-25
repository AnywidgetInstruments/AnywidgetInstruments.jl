using Test
using AnywidgetInstruments
using SlateExtensionsBase
using SlateAFM

const Ext = Base.get_extension(AnywidgetInstruments, :AnywidgetInstrumentsSlateExt)

@testset "KaimonSlate.jl extension" begin
    @test Ext !== nothing

    @testset "to_widget (JL-SLATE-001)" begin
        t = Tank(3.2; max=4, unit="m", id="level")
        w = to_widget(t)
        @test w isa Widget
        @test w.kind == "SlateAFM.AFM"
        @test w.default["_kind"] == "tank"
        @test w.default["value"] == 3.2
        @test w.default["max"] == 4
        @test haskey(w.default, "ticks")                     # defaults filled in
        @test w.params["src"] == "/ext-assets/AnywidgetInstrumentsSlateExt/index.js"
        @test w.params["css"] == ["/ext-assets/AnywidgetInstrumentsSlateExt/index.css"]
        @test w.params["id"] == "level"
    end

    @testset "served assets (JL-SLATE-002)" begin
        handlers = Dict{String,Any}()
        Ext.__slate_frontend((ch, f) -> (handlers[ch] = f))
        @test SlateExtensionsBase._ASSETS["AnywidgetInstrumentsSlateExt"] == abspath(AnywidgetInstruments.assets_dir())
        @test isempty(handlers)   # incoming messages stay with SlateAFM
    end

    @testset "transport through SlateAFM (JL-SLATE-003)" begin
        @test AnywidgetInstruments.TRANSPORT[] === Ext.slate_transport
        sent = []
        emit = (channel, value) -> push!(sent, (channel, value))
        task_local_storage(:slate_ctx, (; emit=emit)) do
            send_message(KPITile(; id="batches"), append_message(KPITile(), [3.0]))
        end
        @test length(sent) == 2                               # content frame + one buffer frame
        @test sent[1][1] == "SlateAFM.msg:batches"
        @test sent[1][2].content["type"] == "append"
        @test sent[1][2].nbuf == 1
        @test sent[2][2] isa SlateBinary
        @test reinterpret(Float32, sent[2][2].data) == Float32[3.0]
    end
end
