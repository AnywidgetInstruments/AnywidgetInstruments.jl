# Getting started

## Installation

```julia
using Pkg
Pkg.add(url = "https://github.com/s-celles/Anywidget.jl")   # until both are registered
Pkg.add(url = "https://github.com/s-celles/AnywidgetInstruments.jl")
```

The package runs on Julia 1.10 (LTS) and later. It needs neither Python nor
Node.js: the front end of anywidget-instruments is shipped with it
(`AnywidgetInstruments.assets_dir()`), and `assets/SOURCE.toml` records the
version and the checksum of the wheel it comes from.

```@example start
using AnywidgetInstruments
frontend_version()
```

## Building widgets

Each widget class of anywidget-instruments has a constructor of the same name.
Traits are keyword arguments; a widget with a writable `value` also takes it as
the first argument:

```@example start
level = Tank(3.2; max = 4, unit = "m", hi = 3, show_limits = true, label = "T-101")
```

`instrument` builds a widget from its class name, for example when the class
comes from data:

```@example start
instrument(:Knob, 2.5; max = 10, label = "Gain")
```

A widget reads and writes like a dictionary. Unset traits read as their
default:

```@example start
level[:value] = 2.0
level[:value], level[:max], level[:mode]
```

## Checked traits

Every trait is checked against the trait contract:

- an unknown trait, or a value of the wrong type, throws an `ArgumentError`;
- a number outside the inclusive bounds of its spec is clamped, as the front
  end does;
- symbols become strings, tuples become arrays, a heading wraps into
  `[0, 360)`.

```@example start
try
    Tank(; colour = "red")
catch err
    sprint(showerror, err)
end
```

```@example start
Compass(370)[:value]
```

The trait specs themselves are available:

```@example start
trait_specs("Tank")["mode"]
```

## Trait dictionaries

A host binds the front end to a plain dictionary of traits. `traits(w)` gives
the traits that were set (and `_kind`), `traits(w; defaults = true)` every trait
of the class, and `to_json(w)` the JSON text. NaN and infinities travel as the
strings `"nan"`, `"inf"` and `"-inf"`:

```@example start
traits(Tank(NaN; unit = "m"))
```

A notebook usually holds the bound dictionary rather than the widget:
`merge_traits` updates it with the same checks, finding the class from `_kind`:

```@example start
merge_traits(Dict("_kind" => "tank", "value" => 1.0); value = 2.5, label = "T-101")
```

## Displaying widgets

Widgets are hosted by [Anywidget.jl](https://github.com/s-celles/Anywidget.jl):
an [`Instrument`](@ref) is an `Anywidget.AbstractAnywidget`. Its `text/html`
representation runs the front-end module in the page with a model holding its
traits. It displays wherever HTML is shown:
Documenter (as on these pages), VS Code, Jupyter with IJulia, Pluto. The
operator can use the widget in the page, but there is no kernel: its actions
do not come back to Julia (use [Kaimon Slate](kaimonslate.md) for that).

```@example start
Knob(2.5; min = 0, max = 10, unit = "dB", label = "Gain")
```

By default each output is self-contained: the module and the styles are
inlined (about 1 MB). Point the display at a copy of the assets to avoid it:

```julia
set_asset_base!(frontend_module(), "https://example.org/awi/")   # serves index.js and index.css
```

`html_page` writes several widgets into one standalone page, the module
included once:

```julia
html_page("station.html", Tank(3.2; max = 4), Knob(2.5), LED(true); title = "Station")
```
