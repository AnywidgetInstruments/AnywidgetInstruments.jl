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
