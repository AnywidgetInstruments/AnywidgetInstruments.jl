# Kaimon Slate

[Kaimon Slate](https://github.com/kahliburke/KaimonSlate.jl) is a reactive
Julia notebook. Its SlateAFM extension hosts anywidget front-end modules; with
SlateExtensionsBase loaded, [Anywidget.jl](https://github.com/s-celles/Anywidget.jl)
plugs into it through a package extension, and every widget of
AnywidgetInstruments.jl with it:

- `@bind name Tank(...)` binds `name` to the widget's trait dictionary,
  rendered by SlateAFM's host shim (kind `SlateAFM.AFM`);
- the front end is served from the package, under
  `/ext-assets/Anywidget.anywidget-instruments/`;
- `send_message` goes through `SlateAFM.afm_emit`.

The integration needs Julia 1.12 or later, a requirement of SlateExtensionsBase (tested on 1.13).

## Setup

SlateAFM lives in the KaimonSlate.jl repository. Add it to the notebook
environment with AnywidgetInstruments.jl:

```julia
using Pkg
Pkg.add(url = "https://github.com/kahliburke/KaimonSlate.jl", subdir = "examples/extensions/SlateAFM")
Pkg.add(url = "https://github.com/s-celles/Anywidget.jl")
Pkg.add(url = "https://github.com/s-celles/AnywidgetInstruments.jl")
```

Then, in the notebook:

```julia
using SlateAFM
using AnywidgetInstruments
```

## Binding widgets

```julia
@bind inflow Knob(0.05; min = 0, max = 0.2, step = 0.01, unit = "m³/s", label = "Inflow")
@bind level Tank(0.0; max = 4, unit = "m", hi = 3.5, show_limits = true, label = "LT-101")
```

`inflow` is the trait dictionary of the knob, reactive: a cell reading
`inflow["value"]` reruns when the operator turns the knob.

To change a widget from Julia, write its dictionary back with Slate's
`set_bind`; [`merge_traits`](@ref) checks the new traits against the contract:

```julia
set_bind(:level, merge_traits(level; value = 2.4))
```

## Messages

Data that travel as messages (trend samples, sparkline values, KPI history)
need a message id: give the widget an `id` and keep the widget object to build
its messages.

```julia
const TREND = TrendChart(; id = "trend", span = 120, pens = [Dict("name" => "Level", "unit" => "m")])
@bind trend TREND

send_message(TREND, append_message(TREND, [[time()]], [[level["value"]]]))
```

Messages sent by the widgets (operator actions, `sync_request`) arrive through
SlateAFM: `SlateAFM.afm_on_msg("trend") do content, buffers … end`.

## Authority over the state

When `_session` is empty (the default), the front end computes the derived
traits (`alarm_level`, …) itself. With a non-empty `_session`, the host owns the
state: AnywidgetInstruments.jl then updates `alarm_level` whenever the value or
the limits change, with the rule of the front end (see [Shared rules](rules.md)).

## Example

`examples/kaimonslate/tank_station.jl` in the repository is a complete
notebook: a tank filled by a pump, simulated in Julia, with a knob, a tank, a
pump and a trend chart. `examples/kaimonslate/validate.jl` runs it headless:

```bash
julia --project=examples/kaimonslate examples/kaimonslate/validate.jl
```
