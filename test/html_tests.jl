@testitem "Anywidget.jl interface (JL-HOST-001)" begin
    using Anywidget
    t = Tank(3.2; max=4, id="lvl")
    @test t isa AbstractAnywidget
    @test afm_module(t) === frontend_module()
    @test frontend_module().name == "anywidget-instruments-industrial"
    @test widget_traits(t) == traits(t; defaults=true)
    @test message_id(t) == "lvl"
end

@testitem "standalone HTML (JL-HTML-001, JL-HTML-002)" begin
    set_asset_base!(frontend_module(), nothing)
    t = Tank(3.2; max=4, label="</script><b>x</b>")
    h = sprint(show, MIME"text/html"(), t)
    @test occursin("data-afm-esm=\"anywidget-instruments-industrial\"", h)     # inlined by Anywidget.jl
    json_part = match(r"<script type=\"application/json\"[^>]*>(.*?)</script>"s, h).captures[1]
    @test !occursin("</", json_part)
    @test occursin("\"_kind\":\"tank\"", json_part)
    @test occursin("\"ticks\":5", json_part)                            # defaults filled in
end

@testitem "asset base URL and pages (JL-HTML-003)" begin
    set_asset_base!(frontend_module(), "https://example.org/awi/")
    try
        h = sprint(show, MIME"text/html"(), Knob(1.0))
        @test occursin("https://example.org/awi/index.js", h)
        @test occursin("https://example.org/awi/index.css", h)
        @test length(h) < 20_000
    finally
        set_asset_base!(frontend_module(), nothing)
    end
    p = html_page(Tank(1.0), Knob(2.0); title="Station")
    @test count("data-afm-esm=\"anywidget-instruments-industrial\"", p) == 1
    @test count("application/json", p) == 2
end
