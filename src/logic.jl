# Rules shared with the Python kernel and the TypeScript front end
# (js/src/contract/alarm.ts and numeric.ts of anywidget-instruments-industrial), checked
# against the same parity cases (JL-LOG-*).

const HIGH_LEVELS = ("normal", "hi", "hihi")
const LOW_LEVELS = ("normal", "lo", "lolo")

_isset(x) = x !== nothing

function _raw_level(value, lolo, lo, hi, hihi)
    _isset(hihi) && value >= hihi && return "hihi"
    _isset(hi) && value >= hi && return "hi"
    _isset(lolo) && value <= lolo && return "lolo"
    _isset(lo) && value <= lo && return "lo"
    return "normal"
end

"""
    alarm_level(value; lolo = nothing, lo = nothing, hi = nothing, hihi = nothing,
                deadband = 0, previous = "normal") -> String

Alarm level of `value` (`"normal"`, `"lo"`, `"lolo"`, `"hi"` or `"hihi"`,
ALARM-002, ALARM-003). Limits are inclusive; `nothing` is an unset limit.
Entering a more severe level is immediate; leaving a level requires the value
to move back beyond that level's limit by at least `deadband`. A non-finite
value keeps the previous level.
"""
function alarm_level(
    value::Real; lolo=nothing, lo=nothing, hi=nothing, hihi=nothing, deadband::Real=0, previous::AbstractString="normal"
)
    isfinite(value) || return String(previous)
    raw = _raw_level(value, lolo, lo, hi, hihi)
    bounds = Dict("lolo" => lolo, "lo" => lo, "hi" => hi, "hihi" => hihi)
    for (side, sign) in ((HIGH_LEVELS, 1), (LOW_LEVELS, -1))
        p = something(findfirst(==(previous), side), 0)
        r = something(findfirst(==(raw), side), 0)
        if p >= 2 && r >= 1 && r < p
            level = p
            while level > r
                limit = bounds[side[level]]
                # still inside the band around the limit: stay in this level
                _isset(limit) && sign * (value - limit) > -deadband && return side[level]
                level -= 1
            end
            return raw
        end
    end
    return raw
end

"""
    coerce_value(value, min, max, coerce) -> value

Value as the kernel stores it: clamped to `[min, max]` when `coerce` is set
and the value is finite (NUM-006, NUM-010).
"""
function coerce_value(value::Real, min::Real, max::Real, coerce::Bool)
    return coerce && isfinite(value) ? clamp(value, min, max) : value
end

"""
    valid_scale(min, max, scale = "linear") -> Bool

A usable scale: finite bounds, `max > min`, and `min > 0` on a `"log"` scale.
"""
function valid_scale(min::Real, max::Real, scale::AbstractString="linear")
    return isfinite(min) && isfinite(max) && max > min && (scale != "log" || min > 0)
end

"""
    wrap_modulo(value, modulo)

A finite value wrapped into `[0, modulo)` (a compass heading); a non-finite
value is returned unchanged.
"""
wrap_modulo(value::Real, modulo::Real) = isfinite(value) ? mod(float(value), modulo) : value

"""
    normalize_value_labels(items) -> Vector{@NamedTuple{value::Float64, label::String}}

Usable value labels sorted by value (IND-118): an item lacking a finite
numeric `value` or a non-blank `label` is dropped; of two items with the
same value the first is kept. Items are dictionaries (string or symbol keys)
or named tuples.
"""
function normalize_value_labels(items)
    out = @NamedTuple{value::Float64, label::String}[]
    for item in items
        v = _field(item, "value")
        l = _field(item, "label")
        (v isa Real && !(v isa Bool) && isfinite(v) && l isa AbstractString && !isempty(strip(l))) || continue
        any(o -> o.value == v, out) && continue
        push!(out, (value=Float64(v), label=String(l)))
    end
    return sort!(out; by=o -> o.value)
end

_field(item::AbstractDict, k) = get(item, k, get(item, Symbol(k), nothing))
_field(item::NamedTuple, k) = get(item, Symbol(k), nothing)
_field(item, k) = nothing

"""
    value_label_of(labels, value, lo, hi) -> Union{String,Nothing}

Label of `value` within `1e-9` of the scale span `[lo, hi]`, or `nothing`.
`labels` comes from [`normalize_value_labels`](@ref).
"""
function value_label_of(labels, value::Real, lo::Real, hi::Real)
    isfinite(value) || return nothing
    tol = 1e-9 * max(1, abs(hi - lo))
    for it in labels
        abs(it.value - value) <= tol && return it.label
    end
    return nothing
end

"""
    value_of_label(labels, text) -> Union{Float64,Nothing}

Value of the label `text`, ignoring case and surrounding spaces, or `nothing`.
"""
function value_of_label(labels, text::AbstractString)
    key = lowercase(strip(text))
    for it in labels
        lowercase(strip(it.label)) == key && return it.value
    end
    return nothing
end
