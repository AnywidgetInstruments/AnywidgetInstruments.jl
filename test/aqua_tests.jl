@testitem "Aqua (JL-QA-002)" begin
    using Aqua
    Aqua.test_all(AnywidgetInstruments)
end

@testitem "core dependencies (JL-GEN-005)" begin
    using TOML
    project = TOML.parsefile(joinpath(pkgdir(AnywidgetInstruments), "Project.toml"))
    @test Set(keys(project["deps"])) ⊆ Set(["JSON", "Base64", "UUIDs", "TOML"])
    @test haskey(project["weakdeps"], "SlateExtensionsBase")
end
