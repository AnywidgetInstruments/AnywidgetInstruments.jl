# Widgets

These widgets run live on this page: drag the knob, press the buttons. The
behaviour of each widget is specified by
[anywidget-instruments](https://s-celles.github.io/anywidget-instruments/widgets/);
the traits of each class are listed in the [API reference](api.md#Widget-constructors).

```@setup gallery
using AnywidgetInstruments
```

## Numeric controls and indicators

```@example gallery
Knob(2.5; min = 0, max = 10, step = 0.1, unit = "dB", label = "Gain")
```

```@example gallery
Gauge(72.0; hi = 80, hihi = 90, show_limits = true, unit = "bar", label = "Pressure")
```

```@example gallery
Thermometer(64.0; min = 0, max = 100, unit = "°C", hi = 85, show_limits = true, label = "TT-101")
```

```@example gallery
SevenSegment(1234.5; digits = 6, max = 10_000, label = "Counter")
```

## Boolean controls and indicators

```@example gallery
LED(true; label = "Run")
```

```@example gallery
PushButton(; text = "START", color = "green", label = "Start")
```

```@example gallery
StackLight(; tiers = ["red", "amber", "green"], value = ["off", "blink", "on"], label = "Stack light")
```

## Process objects

```@example gallery
Valve(; mode = "control", tag = "XV-101", label = "Feed valve")
```

```@example gallery
PIDFaceplate(; tag = "TIC-101", unit = "°C", pv = 68.0, pv_max = 100, sp = 70.0, op = 42.0, hi = 85,
             label = "Jacket temperature")
```

## Every class

```@example gallery
using Markdown
rows = ["| Class | Kind | Messages from the host |", "|---|---|---|"]
for class in widget_classes()
    msgs = [m["type"] for m in message_specs(class) if m["direction"] == "host-to-front" && m["type"] != "hb"]
    push!(rows, "| `$class` | `$(traits(instrument(class))["_kind"])` | $(join(msgs, ", ")) |")
end
Markdown.parse(join(rows, "\n"))
```
