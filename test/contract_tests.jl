@testitem "vendored front end (JL-GEN-003, JL-GEN-004, JL-GEN-006)" begin
    dir = AnywidgetInstruments.assets_dir()
    for f in (
        "index.js",
        "index.css",
        "contract.json",
        "SOURCE.toml",
        "LICENSE-anywidget-instruments",
        "LICENSE-anywidget-instruments-industrial",
    )
        @test isfile(joinpath(dir, f))
    end
    @test isfile(joinpath(dir, "schema", "tank.schema.json"))
    js = read(joinpath(dir, "index.js"), String)
    @test occursin("export {", js)
    @test !occursin("sourceMappingURL", js)
    src = AnywidgetInstruments.asset_source()
    @test src["package"] == "anywidget-instruments-industrial"
    @test length(src["sha256"]) == 64
    @test src["version"] == frontend_version()
end

@testitem "contract (JL-CON-001..005)" begin
    @test frontend_version() isa String
    @test !isempty(frontend_version())
    classes = widget_classes()
    @test "Tank" in classes
    @test "TrendChart" in classes
    @test !("InstrumentWidget" in classes)   # abstract base
    @test !("NumericWidget" in classes)
    @test issorted(classes)

    specs = trait_specs("Tank")
    @test specs["value"]["type"] == "number"
    @test specs["value"]["writer"] == "both"
    @test trait_specs(:Tank) === specs
    @test any(m -> m["type"] == "append", message_specs("TrendChart"))

    err = try
        trait_specs("NoSuchWidget")
        nothing
    catch e
        e
    end
    @test err isa ArgumentError
    @test occursin("NoSuchWidget", sprint(showerror, err))

    d = default_traits("Tank")
    @test d["_kind"] == "tank"
    @test d["max"] == 100
    @test d["hi"] === nothing
    @test isnan(default_traits("KPITile")["value"])   # "nan" decoded
end
