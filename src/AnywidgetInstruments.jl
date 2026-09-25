"""
    AnywidgetInstruments

Instrumentation widgets (knobs, gauges, tanks, LEDs, strip charts, alarms,
supervisory objects) for Julia, from the front end of the Python package
[anywidget-instruments](https://github.com/s-celles/anywidget-instruments).

The package ships the front-end module and its trait contract: a widget is a
class name and a dictionary of traits checked against that contract. Hosts
render it:

- any environment showing HTML, through the standalone `text/html` display;
- KaimonSlate.jl, through the SlateAFM extension (package extension on
  SlateExtensionsBase).

```julia
using AnywidgetInstruments
level = Tank(1.2; max = 5, unit = "m", hi = 4.5, show_limits = true, label = "Level")
level[:value] = 2.0
```
"""
module AnywidgetInstruments

using Base64: base64encode
using JSON: JSON
using TOML: TOML
using UUIDs: uuid4

export frontend_version, widget_classes, trait_specs, message_specs, default_traits
export Instrument, instrument, widget_class, traits, update, merge_traits, class_of_kind, to_json
export encode_buffer, Message, message, heartbeat_message, append_message, snapshot_message
export send_message
export alarm_level, coerce_value, valid_scale, normalize_value_labels, value_label_of, value_of_label
export html_page

include("assets.jl")
include("encoding.jl")
include("logic.jl")
include("instrument.jl")
include("widgets.jl")
include("messages.jl")
include("html.jl")

end # module
