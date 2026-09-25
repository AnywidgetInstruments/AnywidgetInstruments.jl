# Specification

Requirements of AnywidgetInstruments.jl, written with the
[Easy Approach to Requirements Syntax](https://alistairmavin.com/ears/) (EARS)
and prioritized with MoSCoW: **M**ust, **S**hould, **C**ould, **W**on't (this
time).

The widgets themselves (their traits, messages and behaviour) are specified by
the [anywidget-instruments specification](https://s-celles.github.io/anywidget-instruments/specification/);
this package is a Julia host of their front end, following its
[trait contract for host authors](https://s-celles.github.io/anywidget-instruments/trait-contract/)
(HOST-001 to HOST-012). Requirement IDs of that specification are quoted in
parentheses where they apply.

| Version | Date | Change |
|---|---|---|
| 0.1 | 2026-09-25 | First version (phase 0, package 0.0.1) |

## 1. General

| ID | P | Requirement |
|---|---|---|
| JL-GEN-001 | M | The package shall run on the current Julia release (1.13) and on the LTS release (1.10). |
| JL-GEN-002 | M | The package shall not require Python, pip, Node.js or network access at run time. |
| JL-GEN-003 | M | The package shall ship the front-end module (`index.js`), its styles (`index.css`), the flattened trait contract (`contract.json`) and the JSON Schemas of anywidget-instruments, unmodified except for the removed source map comment. |
| JL-GEN-004 | M | The package shall record the version and the SHA-256 checksum of the wheel its front end was taken from (`assets/SOURCE.toml`). |
| JL-GEN-005 | M | The core package shall depend only on JSON.jl and on standard libraries; integrations with notebook hosts shall be package extensions. |
| JL-GEN-006 | S | The package shall keep the license notice of anywidget-instruments next to the vendored files. |

## 2. Contract

| ID | P | Requirement |
|---|---|---|
| JL-CON-001 | M | The package shall expose the version of the vendored front end (`frontend_version()`). |
| JL-CON-002 | M | The package shall list the concrete widget classes of the contract (`widget_classes()`), without the abstract bases. |
| JL-CON-003 | M | The package shall give the trait specs of a widget class (`trait_specs(class)`) and its message specs (`message_specs(class)`). |
| JL-CON-004 | M | When a class that is not in the contract is requested, the package shall throw an `ArgumentError` naming the class. |
| JL-CON-005 | S | The package shall give the default traits of a class (`default_traits(class)`), non-finite defaults decoded. |

## 3. Widgets

| ID | P | Requirement |
|---|---|---|
| JL-API-001 | M | The package shall provide a constructor for each concrete widget class of the contract, with the class name (`Tank`, `Knob`, …), taking traits as keyword arguments. |
| JL-API-002 | M | Where a widget class has a `value` trait that is not read-only, its constructor shall accept the value as an optional first positional argument. |
| JL-API-003 | M | The package shall provide `instrument(class; traits...)` building a widget from its class name given as a `String` or a `Symbol`. |
| JL-API-004 | M | When a trait that the class does not declare is given, the package shall throw an `ArgumentError` naming the trait and the class. |
| JL-API-005 | M | When a value that does not conform to the trait spec is given (type, enum values, exclusive bounds, tuple length, array length), the package shall throw an `ArgumentError` naming the trait. |
| JL-API-006 | M | When a number outside the inclusive bounds of its spec is given, the package shall clamp it, as the front end does (HOST-002). |
| JL-API-007 | M | The package shall convert conforming values to their JSON form: symbols to strings, tuples to arrays, integers of an `integer` trait to `Int`, numbers wrapped into `[0, modulo)`. |
| JL-API-008 | M | The package shall not store the `_kind` trait given by the user: it shall always be the kind of the class. |
| JL-API-009 | M | The package shall let a widget be read and updated like a dictionary of traits (`w[:value]`, `w[:value] = x`), with the same validation as the constructor. |
| JL-API-010 | M | The package shall give the traits of a widget as a `Dict{String,Any}` of the traits set by the user and the kind (`traits(w)`), and all traits with defaults filled in (`traits(w; defaults = true)`). |
| JL-API-011 | S | The package shall give each widget a message id (`id` keyword, default: a unique id), used by hosts to route custom messages. |
| JL-API-012 | S | The package shall not export a constructor whose name is already exported by `Base` (for example `Pipe`); it shall stay reachable qualified. |
| JL-API-013 | C | The package should provide `update(w; traits...)` returning a copy of `w` with some traits changed. |
| JL-API-014 | S | The package shall update a plain trait dictionary (the bound value of a widget in a notebook host) with checked traits (`merge_traits(d; traits...)`), the class being found from its `_kind`. |

## 4. Encoding

| ID | P | Requirement |
|---|---|---|
| JL-ENC-001 | M | The package shall encode NaN and infinities of traits whose spec is `nonfinite` as the strings `"nan"`, `"inf"` and `"-inf"`, and decode those strings back to `Float64`. |
| JL-ENC-002 | M | When a non-finite number is given to a trait whose spec is not `nonfinite`, the package shall throw an `ArgumentError`. |
| JL-ENC-003 | M | The package shall serialize a widget to the JSON text of its traits (`to_json(w)`). |
| JL-ENC-004 | M | The package shall encode a numeric array as the bytes of a buffer of a contract `dtype` (`<f4`, `<f8`, `u1`/`uint8`, …), little-endian whatever the host byte order (`encode_buffer`). |
| JL-ENC-005 | S | The package shall accept a `bytes` trait given as a byte vector and store it as base64 text (HOST-010). |

## 5. Messages

| ID | P | Requirement |
|---|---|---|
| JL-MSG-001 | M | The package shall represent a custom message as its JSON content and its list of binary buffers (`Message`). |
| JL-MSG-002 | M | The package shall build a heartbeat message `{"type": "hb", "session", "interval"}` (HOST-003). |
| JL-MSG-003 | M | The package shall build `append` and `snapshot` messages of a `TrendChart` from the times and values of its pens, with one float64 time buffer and one float32 value buffer per pen entry. |
| JL-MSG-004 | S | The package shall build the `append` message of a `Sparkline` and of a `KPITile` from their new values. |
| JL-MSG-005 | M | When a message type is not declared `host-to-front` for the class of the widget, the package shall throw an `ArgumentError`. |
| JL-MSG-006 | M | The package shall send messages through a replaceable transport (`send_message(w, msg)`); when no transport is installed, it shall throw an error telling how to install one. |

## 6. Rules shared with the front end

| ID | P | Requirement |
|---|---|---|
| JL-LOG-001 | M | The package shall compute alarm levels with hysteresis like the front end (`alarm_level`, ALARM-002, ALARM-003), and pass the shared cases of `tests/parity/alarm_level.json`. |
| JL-LOG-002 | M | The package shall coerce values and check scales like the front end (`coerce_value`, `valid_scale`, NUM-006, NUM-010), and pass the shared cases of `tests/parity/numeric.json`. |
| JL-LOG-003 | S | The package shall normalize value labels and look them up like the front end (`normalize_value_labels`, `value_label_of`, `value_of_label`, IND-118), and pass the shared cases of `tests/parity/value_labels.json`. |
| JL-LOG-004 | S | When the host owns the state (non-empty `_session`), the package shall update `alarm_level` whenever the value or the limits of a widget with an `alarm_level` trait change (HOST-004). |

## 7. Standalone HTML

| ID | P | Requirement |
|---|---|---|
| JL-HTML-001 | M | The package shall render a widget as HTML (`MIME"text/html"`) that loads the front-end module and runs it with a model held in the page, so that it displays in any environment showing HTML (Documenter, VS Code, Jupyter with IJulia, Pluto). |
| JL-HTML-002 | M | The HTML shall embed the traits as JSON inside a `<script type="application/json">` element, escaped so that no trait value can close the element (SEC-002). |
| JL-HTML-003 | M | By default the HTML shall be self-contained: the module and the styles are inlined once per page load. |
| JL-HTML-004 | S | Where an asset base URL is set (`set_asset_base!`), the HTML shall load `index.js` and `index.css` from it instead of inlining them. |
| JL-HTML-005 | S | The package shall render several widgets in one standalone HTML page (`html_page(widgets...)`), the module included once. |
| JL-HTML-006 | W | The standalone HTML won't send operator actions back to Julia: it has no kernel. |

## 8. KaimonSlate.jl

| ID | P | Requirement |
|---|---|---|
| JL-SLATE-001 | M | When SlateExtensionsBase is loaded, the package shall convert a widget to a `Widget` of the `SlateAFM.AFM` kind whose bound value is the trait dictionary and whose parameters are the module URL, the stylesheet URL and the message id. |
| JL-SLATE-002 | M | When SlateExtensionsBase is loaded, the package shall serve its vendored front end from its `__slate_frontend` hook. |
| JL-SLATE-003 | S | When SlateAFM is loaded, the package shall install a transport sending messages with `SlateAFM.afm_emit`. |
| JL-SLATE-004 | W | The package won't register its own widget kind: rendering relies on the host shim of SlateAFM. |

## 9. Quality

| ID | P | Requirement |
|---|---|---|
| JL-QA-001 | M | Every requirement marked M shall be covered by a test item (TestItemRunner.jl). |
| JL-QA-002 | M | The package shall pass Aqua.jl checks. |
| JL-QA-003 | M | The documentation shall build without warnings and publish `llms.txt` and `llms-full.txt`. |
| JL-QA-004 | S | The package shall be formatted with JuliaFormatter (`.JuliaFormatter.toml`). |

## Out of scope for now

- Bonito.jl / Pluto.jl bidirectional hosts (JL-HTML-006): a later phase.
- Julia ports of the other shared rules (annunciator sequences, state machine
  transitions, PID faceplate, …): later phases, one parity file at a time.
