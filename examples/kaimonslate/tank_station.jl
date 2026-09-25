try; import KaimonSlate; catch; error("This is a Kaimon Slate notebook — running it as plain Julia needs the KaimonSlate runtime in this environment. Add it with `import Pkg; Pkg.add(\"KaimonSlate\")`, or open it in Kaimon Slate."); end; KaimonSlate.standalone!(@__MODULE__; dir=@__DIR__)

#%% md id=intro
@md"""
# Tank station — AnywidgetInstruments.jl in Kaimon Slate

A tank filled by a pump and drained through a valve, simulated in **Julia**. The widgets are the
front end of anywidget-instruments, shipped with AnywidgetInstruments.jl and hosted by the
**SlateAFM** extension: no Python, no Node.js.

1. Turn the **Inflow** knob.
2. Press **Run simulation**: the level, the trend and the alarm follow the model.
"""

#%% code id=setup
using SlateAFM
using AnywidgetInstruments

#%% md id=widgets_doc
@md"""
## Widgets

Each widget is built by its constructor, checked against the trait contract of
anywidget-instruments, and bound with `@bind`: the bound value is its trait dictionary.
"""

#%% code id=inflow
@bind inflow Knob(0.05; min=0, max=0.2, step=0.01, format="%.2f", unit="m³/s", label="Inflow")

#%% code id=level
@bind level Tank(
    0.0;
    max=4,
    unit="m",
    format="%.2f",
    hi=3.5,
    hihi=3.8,
    show_limits=true,
    label="LT-101 level",
    _session="tank-station",
)

#%% code id=pump
@bind pump Pump(; mode="indicator", tag="P-101", label="Feed pump")

#%% code id=trend_widget
const TREND = TrendChart(;
    id="trend",
    span=120,
    label="Level trend",
    size=[520, 200],
    pens=[Dict("name" => "Level", "unit" => "m", "min" => 0, "max" => 4, "hi" => 3.5)],
)

#%% code id=trend
@bind trend TREND

#%% md id=model_doc
@md"""
## Model

Torricelli outflow through the drain valve; one tick is one simulated second. The tank owns
its alarm level (`_session` is set), so `merge_traits` computes it with the deadband of the
contract, the same rule as the front end.
"""

#%% code id=model
const DT = 1.0
const OUTFLOW = 0.04        # m^2.5/s
mutable struct Plant
    level::Float64
    samples::Int
end
PLANT = Plant(0.0, 0)

"Write some traits of the bound widget `name`, checked against the contract."
setw!(name::Symbol; kw...) = set_bind(name, merge_traits(getfield(@__MODULE__, name); kw...))

function tick!()
    q = Float64(inflow["value"])
    PLANT.level = clamp(PLANT.level + DT * (q - OUTFLOW * sqrt(PLANT.level)), 0.0, 4.0)
    PLANT.samples += 1
    setw!(:level; value=PLANT.level)
    setw!(:pump; value=q > 0 ? "running" : "stopped")
    send_message(TREND, append_message(TREND, [[time()]], [[PLANT.level]]; totals=[PLANT.samples]))
    return PLANT.level
end

#%% code id=validate
"Headless check (examples/kaimonslate/validate.jl): run some ticks without the browser."
function validate()
    for _ in 1:5
        tick!()
    end
    PLANT.level > 0 || error("the tank did not fill")
    return true
end

#%% code id=alarm
level["alarm_level"]

#%% md id=run_doc
@md"""
## Run

The simulation runs while the button's handler runs; press it again to restart it.
"""

#%% code id=run
@bind run Button("Run simulation")

#%% code id=loop
@onclick run for _ in 1:600
    tick!()
    pause(0.5)
end
