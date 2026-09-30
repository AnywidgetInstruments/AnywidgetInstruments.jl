# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Julia ports of more rules shared with the front end, checked against the
  parity cases of anywidget-instruments-industrial: peak hold (`next_peak`),
  bar graphs (`normalize_bars`, `bar_levels`), state machines
  (`normalize_machine`, `next_state`, `available_commands`), PID faceplate
  operator rules (`operator_set`, `loop_mode_change`), annunciator sequences
  (`AnnunciatorPanel`, `annunciator_set`, `annunciator_action`, `horn_on`) and
  the alarm banner and list (`acknowledge_rows`, `shelve_row`, `unshelve_row`,
  `expire_shelving`) — JL-LOG-005 .. JL-LOG-010, specification 0.5.

### Changed

- The repositories moved to the AnywidgetInstruments organization: links,
  `Project.toml` (`Anywidget` source), workflows and documentation follow.
- **Breaking:** the front end comes from anywidget-instruments-industrial
  (the former anywidget-instruments, renamed), built on the anywidget-instruments
  core. It is served under `/ext-assets/Anywidget.anywidget-instruments-industrial/`
  and named `anywidget-instruments-industrial` by `frontend_module()`.
- Front end refreshed from anywidget-instruments-industrial at `bb2484d`, with the
  base schema of the core (`assets/schema/instrument.schema.json`) and both license
  notices; `scripts/sync-assets.sh` takes the core wheel as a second argument.

### Added

- Weekly workflow refreshing the vendored front end and the parity cases of
  anywidget-instruments, as a pull request (`SyncFrontend.yml`).

### Changed

- Front end refreshed from anywidget-instruments at `293aeea` (SHA-256
  `240f52fc…` in `assets/SOURCE.toml`).
- Documentation: supported Julia versions stated as "1.10 and later, tested on
  1.13"; the Kaimon Slate integration needs 1.12 or later.

### Fixed

- `docs/Project.toml`: compat bound of Markdown (`"1"`).

## [0.0.2] - 2026-09-25

Phase 1 of the roadmap: hosting moved to Anywidget.jl.

### Changed

- **Breaking:** widgets are hosted by [Anywidget.jl](https://github.com/AnywidgetInstruments/Anywidget.jl).
  `Instrument` is an `Anywidget.AbstractAnywidget`; the HTML display, `html_page`,
  `Message`, `encode_buffer`, `send_message` and `set_transport!` come from
  Anywidget.jl and are re-exported.
- **Breaking:** `AnywidgetInstruments.set_asset_base!(url)` is replaced by
  `set_asset_base!(frontend_module(), url)`.
- **Breaking:** the Kaimon Slate extension moved to Anywidget.jl; the front end
  is served under `/ext-assets/Anywidget.anywidget-instruments/`.
- Dependencies: Anywidget.jl replaces UUIDs and the SlateExtensionsBase weak
  dependency.

### Added

- `frontend_module()`: the vendored front end as an `Anywidget.FrontendModule`.

## [0.0.1] - 2026-09-25

Phase 0 of the roadmap: foundations.

### Added

- Vendored front end of anywidget-instruments 0.1.0.dev0 (`index.js`,
  `index.css`, `contract.json`, JSON Schemas, SVG templates) with its origin and
  SHA-256 checksum in `assets/SOURCE.toml`, and `scripts/sync-assets.sh` to
  refresh it from a wheel.
- Contract queries: `frontend_version`, `widget_classes`, `trait_specs`,
  `message_specs`, `default_traits`.
- `Instrument` and one constructor per concrete widget class (52), generated
  from the contract and documented with their traits; `instrument`,
  `widget_class`, `traits`, `update`, `merge_traits`, `class_of_kind`.
- Trait checks: unknown traits and invalid values throw an `ArgumentError`,
  numbers are clamped to their inclusive bounds, headings wrap.
- Encoding: non-finite numbers as `"nan"`, `"inf"`, `"-inf"`, bytes as base64,
  `to_json`, `encode_buffer` (little-endian, numpy-style dtypes).
- Messages: `Message`, `message`, `heartbeat_message`, `append_message` and
  `snapshot_message` (`TrendChart`, `Sparkline`, `KPITile`), `send_message` with
  a replaceable transport.
- Shared rules with the parity cases of anywidget-instruments: `alarm_level`,
  `coerce_value`, `valid_scale`, `normalize_value_labels`, `value_label_of`,
  `value_of_label`; derived `alarm_level` when the host owns the state.
- Standalone HTML display (`text/html`), `html_page` and `set_asset_base!`.
- Kaimon Slate package extension (on SlateExtensionsBase): `to_widget` for the
  SlateAFM host shim, served front end, transport through `SlateAFM.afm_emit`.
- Example notebook `examples/kaimonslate/tank_station.jl` with a headless
  validator.
- Documentation (Documenter.jl, DocumenterLandingPage.jl) with live widgets,
  `llms.txt` and `llms-full.txt`; EARS specification with MoSCoW priorities.

[Unreleased]: https://github.com/AnywidgetInstruments/AnywidgetInstruments.jl/compare/v0.0.2...HEAD
[0.0.2]: https://github.com/AnywidgetInstruments/AnywidgetInstruments.jl/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/AnywidgetInstruments/AnywidgetInstruments.jl/releases/tag/v0.0.1
