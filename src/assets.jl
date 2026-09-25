# Vendored front end and trait contract (JL-GEN-003, JL-CON-*).

const ASSETS_DIR = joinpath(dirname(@__DIR__), "assets")
const CONTRACT_FILE = joinpath(ASSETS_DIR, "contract.json")
const SOURCE_FILE = joinpath(ASSETS_DIR, "SOURCE.toml")

# The contract is read when the package is precompiled: the widget
# constructors are generated from it (widgets.jl).
include_dependency(CONTRACT_FILE)
include_dependency(SOURCE_FILE)

const CONTRACT = JSON.parse(read(CONTRACT_FILE, String); dicttype=Dict{String,Any})

"""
    assets_dir() -> String

Directory of the vendored front end: `index.js`, `index.css`, `contract.json`,
`schema/*.schema.json`, `templates/*.svg`, the license of anywidget-instruments
and `SOURCE.toml`.
"""
assets_dir() = ASSETS_DIR

"""
    asset_source() -> Dict{String,Any}

Origin of the vendored front end (`assets/SOURCE.toml`): package, version,
wheel file name and its SHA-256 checksum (JL-GEN-004).
"""
asset_source() = TOML.parsefile(SOURCE_FILE)

"""
    frontend_version() -> String

Version of anywidget-instruments whose front end is vendored (JL-CON-001).
"""
frontend_version() = String(CONTRACT["version"])

const CLASSES = sort!([String(k) for (k, w) in CONTRACT["widgets"] if !w["abstract"]])

"""
    widget_classes() -> Vector{String}

Names of the concrete widget classes of the contract, sorted (JL-CON-002).
"""
widget_classes() = copy(CLASSES)

function _widget(class)
    c = String(class)
    w = get(CONTRACT["widgets"], c, nothing)
    (w === nothing || w["abstract"]) &&
        throw(ArgumentError("unknown widget class \"$c\"; see widget_classes() for the available classes"))
    return w
end

"""
    trait_specs(class) -> Dict{String,Any}

Trait specs of a widget class, keyed by trait name, as in `contract.json`
(`type`, `default`, `writer`, bounds, …). The returned dictionary is shared:
do not mutate it (JL-CON-003).
"""
trait_specs(class::Union{AbstractString,Symbol}) = _widget(class)["traits"]::Dict{String,Any}

"""
    message_specs(class) -> Vector{Any}

Custom messages of a widget class: `type`, `direction`, `fields`, `buffers`
(JL-CON-003).
"""
message_specs(class::Union{AbstractString,Symbol}) = _widget(class)["messages"]::Vector{Any}

"""
    widget_kind(class) -> String

Value of the `_kind` trait of a class: it selects the view of the front end.
"""
widget_kind(class::Union{AbstractString,Symbol}) = String(_widget(class)["kind"])

"""
    default_traits(class) -> Dict{String,Any}

Every trait of a class with its default value; non-finite defaults are
decoded to `Float64` (JL-CON-005).
"""
function default_traits(class::Union{AbstractString,Symbol})
    return Dict{String,Any}(name => _decode_default(spec) for (name, spec) in trait_specs(class))
end

_decode_default(spec) = get(spec, "nonfinite", false) ? decode_nonfinite(spec["default"]) : deepcopy(spec["default"])
