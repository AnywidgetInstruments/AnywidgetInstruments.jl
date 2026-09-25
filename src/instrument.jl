# A widget: a class of the contract and a dictionary of traits (JL-API-*).

"""
    Instrument

A widget of anywidget-instruments: its class (`"Tank"`, `"Knob"`, …), a
message id and the traits set by the user, stored in their JSON form and
checked against the trait contract.

Build one with the class constructors (`Tank(3.2; max = 4)`) or
[`instrument`](@ref). Read and update traits like a dictionary: `w[:value]`,
`w[:value] = 2.0`. [`traits`](@ref) gives the dictionary a host binds the
front end to.
"""
struct Instrument
    class::String
    id::String
    traits::Dict{String,Any}
end

"""
    instrument(class; id = <unique>, traits...) -> Instrument
    instrument(class, value; id = <unique>, traits...) -> Instrument

A widget of class `class` (a `String` or a `Symbol`) with the given traits.
Every trait is checked against the contract: an unknown trait or a value that
does not conform throws an `ArgumentError`; a number outside the inclusive
bounds of its spec is clamped. `id` names the widget's message channel for
hosts routing custom messages.
"""
function instrument(class::Union{AbstractString,Symbol}; id::AbstractString=_new_id(), kw...)
    c = String(class)
    w = Instrument(c, String(id), Dict{String,Any}("_kind" => widget_kind(c)))
    for (k, v) in kw
        _settrait!(w, String(k), v)
    end
    _derive!(w)
    return w
end

function instrument(class::Union{AbstractString,Symbol}, value; kw...)
    spec = get(trait_specs(class), "value", nothing)
    (spec === nothing || get(spec, "readOnly", false)) &&
        throw(ArgumentError("$class has no writable value: give its traits as keywords"))
    return instrument(class; value=value, kw...)
end

_new_id() = "awi-" * string(uuid4())

"""
    widget_class(w::Instrument) -> String

Class name of a widget (`"Tank"`, …).
"""
widget_class(w::Instrument) = w.class

"""
    traits(w::Instrument; defaults = false) -> Dict{String,Any}

The trait dictionary of a widget in its JSON form (non-finite numbers as
`"nan"`, `"inf"`, `"-inf"`): the traits set by the user and `_kind`, or,
with `defaults = true`, every trait of the class (JL-API-010).
"""
function traits(w::Instrument; defaults::Bool=false)
    defaults || return deepcopy(w.traits)
    out = Dict{String,Any}(name => deepcopy(spec["default"]) for (name, spec) in trait_specs(w.class))
    return merge!(out, deepcopy(w.traits))
end

"""
    update(w::Instrument; traits...) -> Instrument

A copy of `w`, with the same id, where some traits are changed.
"""
function update(w::Instrument; kw...)
    u = Instrument(w.class, w.id, deepcopy(w.traits))
    for (k, v) in kw
        _settrait!(u, String(k), v)
    end
    _derive!(u)
    return u
end

const KIND_CLASSES = Dict{String,String}(widget_kind(c) => c for c in CLASSES)

"""
    class_of_kind(kind) -> String

Class of a widget kind (`"tank"` → `"Tank"`).
"""
function class_of_kind(kind::AbstractString)
    c = get(KIND_CLASSES, kind, nothing)
    c === nothing && throw(ArgumentError("unknown widget kind \"$kind\""))
    return c
end

"""
    merge_traits(d::AbstractDict; traits...) -> Dict{String,Any}

A copy of the trait dictionary `d` (for example the bound value of a widget in
a notebook host) with some traits changed and checked like the constructors
do; the class is found from `d["_kind"]`. Derived traits are updated when the
host owns the state (JL-API-014).
"""
function merge_traits(d::AbstractDict; kw...)
    src = _jsonify(d)::Dict{String,Any}
    kind = get(src, "_kind", nothing)
    kind isa AbstractString || throw(ArgumentError("the trait dictionary has no \"_kind\""))
    w = Instrument(class_of_kind(kind), "", src)
    for (k, v) in kw
        _settrait!(w, String(k), v)
    end
    _derive!(w)
    return w.traits
end

_key(k::Union{AbstractString,Symbol}) = String(k)

function _spec(w::Instrument, name::String)
    spec = get(trait_specs(w.class), name, nothing)
    spec === nothing && throw(ArgumentError("$(w.class) has no trait \"$name\""))
    return spec
end

function Base.getindex(w::Instrument, k::Union{AbstractString,Symbol})
    name = _key(k)
    spec = _spec(w, name)
    raw = haskey(w.traits, name) ? w.traits[name] : spec["default"]
    return get(spec, "nonfinite", false) ? decode_nonfinite(raw) : raw
end

function Base.setindex!(w::Instrument, v, k::Union{AbstractString,Symbol})
    _settrait!(w, _key(k), v)
    _derive!(w)
    return v
end

Base.haskey(w::Instrument, k::Union{AbstractString,Symbol}) = haskey(trait_specs(w.class), _key(k))
Base.get(w::Instrument, k::Union{AbstractString,Symbol}, default) = haskey(w, k) ? w[k] : default
Base.keys(w::Instrument) = keys(trait_specs(w.class))

function _settrait!(w::Instrument, name::String, v)
    spec = _spec(w, name)
    name == "_kind" && return nothing   # always the kind of the class (JL-API-008)
    w.traits[name] = _conform(spec, v, name, w.class)
    return nothing
end

# Derived traits a host computes when it owns the state (HOST-004, JL-LOG-004).
function _derive!(w::Instrument)
    (haskey(w, :_session) && !isempty(w[:_session])) || return w
    spec = get(trait_specs(w.class), "alarm_level", nothing)
    spec === nothing && return w
    source = w[get(spec, "source", "value")]
    source isa Real || return w
    w.traits["alarm_level"] = alarm_level(
        source; lolo=w[:lolo], lo=w[:lo], hi=w[:hi], hihi=w[:hihi], deadband=w[:deadband], previous=w[:alarm_level]
    )
    return w
end

# ── Conformance of a value to a trait spec (JL-API-005..007, JL-ENC-*) ─────────
# The strict counterpart of readValue (js/src/contract/traits.ts): the front end
# replaces a bad value by the default; the Julia API refuses it early.

struct _Invalid
    why::String
end

function _conform(spec, v, name, class)
    r = _value(spec, v)
    r isa _Invalid && throw(ArgumentError("$class.$name: $(r.why) (got $(repr(v)))"))
    return r
end

function _value(spec, v)
    if v === nothing
        return get(spec, "nullable", false) ? nothing : _Invalid("not nullable")
    end
    t = spec["type"]
    t in ("number", "integer") && return _number(spec, v)
    t == "string" && return v isa AbstractString ? String(v) : _Invalid("expected a string")
    t == "boolean" && return v isa Bool ? v : _Invalid("expected a Bool")
    t in ("enum", "const") && return _enum(spec, v)
    t == "array" && return _array(spec, v)
    t == "object" && return _object(spec, v)
    t == "bytes" && return _bytes(v)
    return _jsonify(v)
end

function _number(spec, v)
    nonfinite = get(spec, "nonfinite", false)
    x = if v isa Real && !(v isa Bool)
        v
    elseif nonfinite && v isa AbstractString && haskey(NONFINITE_STRINGS, v)
        NONFINITE_STRINGS[v]
    else
        return _Invalid("expected a number")
    end
    if !isfinite(x)
        return nonfinite ? encode_nonfinite(x) : _Invalid("NaN and infinities are not allowed")
    end
    haskey(spec, "modulo") && (x = wrap_modulo(x, spec["modulo"]))
    spec["type"] == "integer" && (x = round(Int, x))
    haskey(spec, "exclusiveMinimum") &&
        x <= spec["exclusiveMinimum"] &&
        return _Invalid("must be > $(spec["exclusiveMinimum"])")
    haskey(spec, "exclusiveMaximum") &&
        x >= spec["exclusiveMaximum"] &&
        return _Invalid("must be < $(spec["exclusiveMaximum"])")
    haskey(spec, "minimum") && x < spec["minimum"] && (x = oftype(float(x), spec["minimum"]))
    haskey(spec, "maximum") && x > spec["maximum"] && (x = oftype(float(x), spec["maximum"]))
    spec["type"] == "integer" && (x = round(Int, x))
    return x
end

function _enum(spec, v)
    x = v isa Symbol ? String(v) : v
    any(isequal(x), spec["values"]) && return x
    return _Invalid("expected one of $(join(repr.(spec["values"]), ", "))")
end

function _array(spec, v)
    (v isa AbstractVector || v isa Tuple) || return _Invalid("expected an array")
    items = collect(Any, v)
    if haskey(spec, "prefixItems")
        pre = spec["prefixItems"]
        length(items) == length(pre) || return _Invalid("expected $(length(pre)) items")
        out = Any[_value(s, x) for (s, x) in zip(pre, items)]
    elseif haskey(spec, "items")
        out = Any[_value(spec["items"], x) for x in items]
    else
        out = Any[_jsonify(x) for x in items]
    end
    bad = findfirst(x -> x isa _Invalid, out)
    bad === nothing || return _Invalid("item $bad: $(out[bad].why)")
    haskey(spec, "minItems") && length(out) < spec["minItems"] && return _Invalid("at least $(spec["minItems"]) items")
    haskey(spec, "maxItems") && length(out) > spec["maxItems"] && return _Invalid("at most $(spec["maxItems"]) items")
    get(spec, "uniqueItems", false) && !allunique(out) && return _Invalid("items must be unique")
    return out
end

function _object(spec, v)
    (v isa AbstractDict || v isa NamedTuple) || return _Invalid("expected a dictionary")
    d = _jsonify(v)::Dict{String,Any}
    if haskey(spec, "keys")
        for (k, x) in d
            k in spec["keys"] || return _Invalid("unknown key \"$k\", expected one of $(join(spec["keys"], ", "))")
            x isa String || return _Invalid("the value of \"$k\" must be a string")
        end
    end
    return d
end

function _bytes(v)
    v isa AbstractString && return String(v)
    v isa AbstractVector{UInt8} && return base64encode(v)
    return _Invalid("expected bytes (a Vector{UInt8}) or base64 text")
end

# Plain JSON form of a free-form value: dictionaries with string keys, arrays,
# strings for symbols, non-finite numbers as strings.
_jsonify(x::AbstractDict) = Dict{String,Any}(string(k) => _jsonify(v) for (k, v) in x)
_jsonify(x::NamedTuple) = Dict{String,Any}(string(k) => _jsonify(v) for (k, v) in pairs(x))
_jsonify(x::Union{AbstractVector,Tuple}) = Any[_jsonify(v) for v in x]
_jsonify(x::Symbol) = String(x)
_jsonify(x::AbstractFloat) = encode_nonfinite(x)
_jsonify(x) = x

function Base.show(io::IO, w::Instrument)
    print(io, w.class, "(")
    join(io, ("$k = $(repr(v))" for (k, v) in sort!(collect(w.traits); by=first) if k != "_kind"), ", ")
    return print(io, ")")
end

function Base.show(io::IO, ::MIME"text/plain", w::Instrument)
    print(io, w.class, " (", w.traits["_kind"], ") id=", repr(w.id))
    for (k, v) in sort!(collect(w.traits); by=first)
        k == "_kind" && continue
        print(io, "\n  ", k, " = ", repr(v))
    end
end
