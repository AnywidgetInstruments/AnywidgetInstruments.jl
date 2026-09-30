# Shared rules

Some rules are implemented by the Python kernel, the TypeScript front end and
this package. The three are checked against the same parity cases
(`tests/parity/*.json` of anywidget-instruments-industrial, copied into `test/parity/`).

## Alarm levels

[`alarm_level`](@ref) computes the level of a value from the `lolo`, `lo`, `hi`
and `hihi` limits (ALARM-002). Limits are inclusive; entering a more severe
level is immediate, and leaving a level requires the value to move back beyond
that level's limit by at least `deadband` (ALARM-003).

```@example rules
using AnywidgetInstruments
levels = String[]
previous = "normal"
for v in (81, 79, 78.5, 78, 80)
    global previous = alarm_level(v; hi = 80, deadband = 2, previous = previous)
    push!(levels, previous)
end
levels
```

When the host owns the state (non-empty `_session`), widgets with an
`alarm_level` trait update it themselves:

```@example rules
t = Tank(50.0; hi = 80, deadband = 2, _session = "s1")
t[:value] = 81
t[:alarm_level]
```

## Values

- [`coerce_value`](@ref): a value clamped to `[min, max]` when `coerce` is set
  (NUM-006, NUM-010).
- [`valid_scale`](@ref): finite bounds, `max > min`, and `min > 0` on a
  logarithmic scale.
- [`normalize_value_labels`](@ref), [`value_label_of`](@ref),
  [`value_of_label`](@ref): named values of a scale (IND-118).

```@example rules
labels = normalize_value_labels([Dict("value" => 2, "label" => "HIGH"), Dict("value" => 0, "label" => "OFF")])
value_label_of(labels, 2, 0, 2), value_of_label(labels, " off ")
```

## Peaks and bar graphs

- [`next_peak`](@ref): the peak a gauge holds (NUM-110), taken at once when
  higher, released after `decay` seconds.
- [`normalize_bars`](@ref), [`bar_levels`](@ref): the bars of a `BarGraph` as
  the kernel stores them and their alarm levels (IND-102).

## Supervisory objects

A host that owns the state of these widgets applies the operator actions the
front end sends as messages with the same rules as the Python kernel:

- [`normalize_machine`](@ref), [`next_state`](@ref),
  [`available_commands`](@ref): state machine models and commands (IND-060 ..
  IND-065), presets included.
- [`operator_set`](@ref), [`loop_mode_change`](@ref), [`sp_limits`](@ref):
  the operator rules of a `PIDFaceplate` (IND-030 .. IND-034).
- [`AnnunciatorPanel`](@ref), [`annunciator_transition`](@ref),
  [`annunciator_set`](@ref), [`annunciator_action`](@ref), [`horn_on`](@ref):
  ISA-18.1 sequences A, M and R, first out and horn (IND-040 .. IND-043).
- [`acknowledge_rows`](@ref), [`shelve_row`](@ref), [`unshelve_row`](@ref),
  [`expire_shelving`](@ref), [`keep_row`](@ref): the alarm banner and the alarm
  list (SCADA-006, SCADA-007, IND-050 .. IND-053).

```@example rules
m = normalize_machine(Dict("states" => [Dict("name" => "Off"), Dict("name" => "On")],
                           "transitions" => [["Off", "Start", "On"], ["On", "Stop", "Off"]]))
next_state(m, "Off", "Start"), available_commands(m, "On")
```
