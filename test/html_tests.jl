@testitem "standalone HTML (JL-HTML-001..003)" begin
    AnywidgetInstruments.set_asset_base!(nothing)
    t = Tank(3.2; max=4, label="</script><b>x</b>")
    @test showable(MIME"text/html"(), t)
    h = sprint(show, MIME"text/html"(), t)
    @test occursin("<script type=\"module\">", h)
    @test occursin("application/json", h)
    # the traits cannot close their script element
    json_part = match(r"<script type=\"application/json\"[^>]*>(.*?)</script>"s, h).captures[1]
    @test !occursin("</", json_part)
    @test occursin("\\u003c/script", json_part)
    # self-contained: the module and the styles travel inline (base64)
    @test occursin("data-awi-esm", h)
    @test occursin(".awi-root", String(read(joinpath(AnywidgetInstruments.assets_dir(), "index.css"))))
    @test length(h) > 500_000
end

@testitem "asset base URL (JL-HTML-004)" begin
    AnywidgetInstruments.set_asset_base!("https://example.org/awi/")
    try
        h = sprint(show, MIME"text/html"(), Knob(1.0))
        @test occursin("https://example.org/awi/index.js", h)
        @test occursin("https://example.org/awi/index.css", h)
        @test length(h) < 20_000
    finally
        AnywidgetInstruments.set_asset_base!(nothing)
    end
end

@testitem "html page (JL-HTML-005)" begin
    AnywidgetInstruments.set_asset_base!(nothing)
    p = html_page(Tank(1.0), Knob(2.0); title="Station")
    @test startswith(p, "<!doctype html>")
    @test occursin("<title>Station</title>", p)
    @test count("data-awi-esm=\"", p) == 1    # the module once
    @test count("application/json", p) == 2   # one trait block per widget
    path = tempname() * ".html"
    html_page(path, Tank(1.0))
    @test isfile(path)
end
