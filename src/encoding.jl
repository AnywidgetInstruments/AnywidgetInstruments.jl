# JSON form of trait values and binary buffers (JL-ENC-*).

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

# dtype (numpy notation, as in contract.json) -> Julia element type
const DTYPES = Dict{String,DataType}(
    "<f4" => Float32,
    "<f8" => Float64,
    "<i1" => Int8,
    "<i2" => Int16,
    "<i4" => Int32,
    "<i8" => Int64,
    "<u1" => UInt8,
    "<u2" => UInt16,
    "<u4" => UInt32,
    "<u8" => UInt64,
    "u1" => UInt8,
    "|u1" => UInt8,
    "uint8" => UInt8,
    "i1" => Int8,
    "|i1" => Int8,
    "int8" => Int8,
    "float32" => Float32,
    "float64" => Float64,
)

"""
    encode_buffer(dtype, values) -> Vector{UInt8}

Bytes of a binary buffer of a contract `dtype` (`"<f4"`, `"<f8"`, `"u1"`,
`"uint8"`, `"<i4"`, …): each value is converted to the element type and
written little-endian, whatever the byte order of the host (JL-ENC-004).
"""
function encode_buffer(dtype::AbstractString, values)
    T = get(DTYPES, String(dtype), nothing)
    T === nothing &&
        throw(ArgumentError("unsupported buffer dtype \"$dtype\" (little-endian integers and floats only)"))
    data = T[htol(convert(T, v)) for v in values]
    return collect(reinterpret(UInt8, data))
end

"""
    to_json(w; defaults = false) -> String

JSON text of the traits of a widget, as a host hands them to the front end
(JL-ENC-003). With `defaults = true`, every trait of the class is included.
"""
to_json(w; defaults::Bool=false) = JSON.json(traits(w; defaults=defaults))
