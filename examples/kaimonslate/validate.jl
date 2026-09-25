#!/usr/bin/env julia
#
# Headless evaluation of the example notebooks: parse each notebook, build
# its dependency graph and evaluate every cell. `@bind` controls resolve to
# their default value, so the whole notebook runs without a browser.
#
#     julia --project=examples/kaimonslate examples/kaimonslate/validate.jl
#
# The exit code is the number of failed cells.

using KaimonSlate
const KS = KaimonSlate

function check(path::AbstractString)
    println("── ", relpath(path, @__DIR__))
    report = KS.parse_report(read(path, String))
    KS.build_dependencies!(report)
    # an in-process kernel whose enclosing project is this environment
    KS.eval_stale!(report, KS.InProcessKernel(@__DIR__))
    failed = filter(c -> c.state == KS.ERRORED, report.cells)
    for c in failed
        println("  ERROR in cell `", c.id, "`")
        println("    ", first(string(c.output), 800))
    end
    println("  ", length(report.cells), " cells, ", length(failed), " failed")
    # a notebook may define `validate()`: exercise what the buttons would run
    m = KS.report_module(report)
    if isempty(failed) && Base.invokelatest(isdefined, m, :validate)
        try
            Base.invokelatest(() -> getglobal(m, :validate)())
            println("  validate() passed")
        catch e
            println("  validate() failed: ", sprint(showerror, e))
            return 1
        end
    end
    return length(failed)
end

notebooks = sort([
    joinpath(root, f) for (root, _, files) in walkdir(@__DIR__) for
    f in files if endswith(f, ".jl") && f != "validate.jl"
])
isempty(notebooks) && error("no notebook found")
total = sum(check, notebooks)
println(total == 0 ? "\nall notebooks evaluate cleanly" : "\n$total cell(s) failed")
exit(total)
