```@raw html
---
layout: home

hero:
  name: AnywidgetInstruments.jl
  text: Instrumentation widgets for Julia
  tagline: Knobs, gauges, tanks, LEDs, strip charts, alarms and supervisory objects, from the front end of anywidget-instruments. No Python, no Node.js.
  actions:
    - theme: brand
      text: Getting started
      link: /getting-started/
    - theme: alt
      text: Widgets
      link: /widgets/
    - theme: alt
      text: View on GitHub
      link: https://github.com/s-celles/AnywidgetInstruments.jl

features:
  - icon: 🎛️
    title: 52 widgets
    details: Every concrete widget of anywidget-instruments has a constructor, Tank(3.2; max = 4), documented from the trait contract.
    link: /widgets/
  - icon: ✅
    title: Checked traits
    details: Unknown traits and invalid values fail early with an ArgumentError; numbers are clamped like the front end does.
    link: /getting-started/
  - icon: 🌐
    title: Standalone HTML
    details: Widgets display in Documenter, VS Code, Jupyter or any HTML page, self-contained.
    link: /getting-started/#Displaying-widgets
  - icon: 📓
    title: Kaimon Slate
    details: Bind widgets with @bind through SlateAFM; drive them from Julia with messages and binary buffers.
    link: /kaimonslate/
  - icon: 🚨
    title: Shared rules
    details: Alarm levels with deadband, value coercion and value labels, checked against the parity cases of the Python and TypeScript sides.
    link: /rules/
  - icon: 📐
    title: Specified
    details: EARS requirements with MoSCoW priorities, each covered by a test item.
    link: /specification/
---
```

![Some widgets of AnywidgetInstruments.jl](assets/widgets.png)

AnywidgetInstruments.jl is the Julia host of
[anywidget-instruments](https://github.com/s-celles/anywidget-instruments),
instrumentation widgets for computational notebooks built on
[anywidget](https://anywidget.dev). The package ships the widgets' front-end
module and their [trait contract](https://s-celles.github.io/anywidget-instruments/trait-contract/):
a widget is a class and a dictionary of traits checked against that contract.

```julia
using AnywidgetInstruments

gain = Knob(2.5; min = 0, max = 10, step = 0.1, unit = "dB", label = "Gain")
level = Tank(1.2; max = 5, unit = "m", lo = 0.5, hi = 4.5, show_limits = true, label = "Level")
html_page("station.html", gain, level, LED(true; label = "Run"))
```

!!! warning "Visualization only"
    These widgets are for monitoring, teaching and prototyping. They are not a
    protection layer and never replace the safety functions of a process. See
    the [safety notice](https://s-celles.github.io/anywidget-instruments/safety/)
    of anywidget-instruments.
