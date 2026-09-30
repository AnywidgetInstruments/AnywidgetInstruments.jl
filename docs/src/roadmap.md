# Roadmap

Development phases are milestones, numbered `0.0.x` (phase 0 is `0.0.1`);
they are not releases.

## Phase 0 — `0.0.1`: foundations (done)

- Vendored front end and trait contract of anywidget-instruments-industrial, with their
  origin and checksum.
- A constructor per widget class; traits checked against the contract.
- JSON encoding (non-finite numbers, bytes), binary buffers.
- Messages: heartbeat, `TrendChart`, `Sparkline` and `KPITile` data, a
  replaceable transport.
- Shared rules: alarm levels, value coercion, scales, value labels, with the
  parity cases.
- Standalone HTML display and pages.
- Kaimon Slate extension through SlateAFM, with a headless-validated example.

## Phase 1 — `0.0.2`: hosting by Anywidget.jl (done)

- Widgets are `Anywidget.AbstractAnywidget`s: the HTML display, pages,
  messages and the Kaimon Slate integration come from Anywidget.jl.
- More hosts (Bonito.jl, Pluto.jl, IJulia) arrive through Anywidget.jl.
- Heartbeat helper (a task sending `hb` every `_heartbeat` seconds).

## Phase 2 — `0.0.3`: more shared rules

- Julia ports of the other parity files: annunciator sequences, state machine
  transitions, PID faceplate, alarm list and banner, bar graphs, peak hold
  (done, JL-LOG-005 .. JL-LOG-010).
- Message builders for `WaveformChart`, `IntensityChart`, `XYGraph` and the
  digital graphs.

## Phase 3 — `0.0.4`: tooling

- Registration in the General registry.
- Automated refresh of the vendored front end when anywidget-instruments-industrial is
  released (a workflow opening a pull request).
