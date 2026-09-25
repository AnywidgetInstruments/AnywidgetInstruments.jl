# JSON form of trait values (JL-ENC-*); binary buffers come from Anywidget.jl.

const NONFINITE_STRINGS = Dict{String,Float64}(
    "nan" => NaN, "NaN" => NaN, "inf" => Inf, "Infinity" => Inf, "-inf" => -Inf, "-Infinity" => -Inf
)

"""
    encode_nonfinite(x)

Wire form of a number: `NaN`, `Inf` and `-Inf` become `"nan"`, `"inf"` and
`"-inf"` (JSON has no such numbers); any other value is returned unchanged.
"""
function encode_nonfinite(x::Real)
    isnan(x) && return "nan"
    isinf(x) && return x > 0 ? "inf" : "-inf"
    return x
end
encode_nonfinite(x) = x

"""
    decode_nonfinite(x)

Inverse of [`encode_nonfinite`](@ref): `"nan"`, `"inf"`, `"-inf"` (and
`"NaN"`, `"Infinity"`, `"-Infinity"`) become `Float64`; other values are
returned unchanged.
"""
decode_nonfinite(x::AbstractString) = get(NONFINITE_STRINGS, x, x)
decode_nonfinite(x) = x

"""
    to_json(w; defaults = false) -> String

JSON text of the traits of a widget, as a host hands them to the front end
(JL-ENC-003). With `defaults = true`, every trait of the class is included.
"""
to_json(w; defaults::Bool=false) = JSON.json(traits(w; defaults=defaults))
