# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/s-celles/AnywidgetInstruments.jl/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/s-celles/AnywidgetInstruments.jl/releases/tag/v0.0.1
