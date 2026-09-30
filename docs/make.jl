using Documenter
using DocumenterLandingPage
using AnywidgetInstruments

# Live widgets in the pages load the front end from the site (copied below)
# instead of inlining 1 MB per output. Pages are one level deep (prettyurls).
set_asset_base!(frontend_module(), "../assets/awi/")

const PAGES = [
    "Home" => "index.md",
    "Getting started" => "getting-started.md",
    "Widgets" => "widgets.md",
    "Kaimon Slate" => "kaimonslate.md",
    "Messages" => "messages.md",
    "Shared rules" => "rules.md",
    "API reference" => "api.md",
    "Specification" => "specification.md",
    "Roadmap" => "roadmap.md",
]

# Source links need a commit; a fresh clone without one builds without them.
has_commit = success(pipeline(`git -C $(dirname(@__DIR__)) rev-parse --verify -q HEAD`; stdout=devnull))
remotes = has_commit ? (;) : (; remotes=nothing)

makedocs(;
    remotes...,
    repo=Remotes.GitHub("AnywidgetInstruments", "AnywidgetInstruments.jl"),
    sitename="AnywidgetInstruments.jl",
    authors="Sébastien Celles",
    modules=[AnywidgetInstruments],
    format=Documenter.HTML(;
        prettyurls=true,
        canonical="https://anywidgetinstruments.github.io/AnywidgetInstruments.jl",
        edit_link="main",
        size_threshold_ignore=["api.md", "widgets.md"],
    ),
    plugins=[LandingPage()],
    pages=PAGES,
    checkdocs=:exports,
    warnonly=false,
)

const BUILD = joinpath(@__DIR__, "build")

# The front end served to the live widgets of the pages
awi = mkpath(joinpath(BUILD, "assets", "awi"))
for f in
    ("index.js", "index.css", "LICENSE-anywidget-instruments-industrial", "LICENSE-anywidget-instruments-industrial")
    cp(joinpath(AnywidgetInstruments.assets_dir(), f), joinpath(awi, f); force=true)
end

# llms.txt and llms-full.txt
const SRC = joinpath(@__DIR__, "src")
summary = """
# AnywidgetInstruments.jl

> Instrumentation widgets (knobs, gauges, tanks, LEDs, strip charts, alarms, supervisory objects)
> for Julia: the front end of anywidget-instruments-industrial with its trait contract, displayed as standalone
> HTML or in Kaimon Slate notebooks. No Python, no Node.js.

$(join(("- [$(title)](./$(page == "index.md" ? "" : first(splitext(page)) * "/"))" for (title, page) in PAGES), "\n"))
- [Full documentation as one text file](./llms-full.txt)
"""
full = join(("<!-- Source: $(page) -->\n\n" * read(joinpath(SRC, page), String) for (_, page) in PAGES), "\n\n")
write(joinpath(BUILD, "llms.txt"), summary)
write(joinpath(BUILD, "llms-full.txt"), full)

if get(ENV, "GITHUB_ACTIONS", "false") == "true"
    deploydocs(;
        repo="github.com/AnywidgetInstruments/AnywidgetInstruments.jl.git", devbranch="main", push_preview=true
    )
end
