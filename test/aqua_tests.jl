@testitem "Aqua (JL-QA-002)" begin
    using Aqua
    Aqua.test_all(AnywidgetInstruments)
end

@testitem "core dependencies (JL-GEN-005, JL-HOST-002)" begin
    using TOML
    project = TOML.parsefile(joinpath(pkgdir(AnywidgetInstruments), "Project.toml"))
    @test Set(keys(project["deps"])) ⊆ Set(["Anywidget", "JSON", "Base64", "TOML"])
    @test !haskey(project, "weakdeps")          # hosts come from Anywidget.jl
end
