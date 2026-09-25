# Messages

Besides traits, some widgets exchange custom messages with the host: a
heartbeat, samples of a chart, a `sync_request` from a new view. Each widget
class lists its messages in the contract:

```@example msg
using AnywidgetInstruments
[(m["type"], m["direction"]) for m in message_specs("TrendChart")]
```

## Building messages

A `Message` (from Anywidget.jl) is a JSON `content` and a list of binary buffers.
Builders check the message type against the contract:

```@example msg
trend = TrendChart(; pens = [Dict("name" => "Level"), Dict("name" => "Temperature")])
m = append_message(trend, [[1.7e9, 1.7e9 + 1], [1.7e9]], [[0.5, 0.6], [20.0]])
m.content
```

```@example msg
length.(m.buffers)   # float64 times and float32 values for each pen
```

| Builder | Widgets |
|---|---|
| [`heartbeat_message`](@ref) | every widget (HOST-003) |
| [`append_message`](@ref)`(w, values)` | `Sparkline`, `KPITile` |
| [`append_message`](@ref)`(w, times, values)`, [`snapshot_message`](@ref) | `TrendChart` |
| [`message`](@ref)`(w, type; fields...)` | any message without buffers (`clear`, `latch_expired`, …) |

`encode_buffer` (from Anywidget.jl) writes the buffers of other messages: numpy-style
`dtype`, little-endian whatever the host.

## Sending messages

`send_message` (from Anywidget.jl) hands a message to the transport of the host, with the
widget's message id (`w.id`). The Kaimon Slate extension installs one when
SlateAFM is loaded; another host installs its own:

```julia
set_transport!((id, msg) -> my_send(id, msg.content, msg.buffers))
```

## Heartbeats

A host announcing heartbeats sets `_session` and `_heartbeat` on the widgets,
then sends [`heartbeat_message`](@ref) every `_heartbeat` seconds to at least
one widget of the session. Without heartbeats, the widgets never show
**⚠ NO KERNEL** or **⚠ STALE**.
