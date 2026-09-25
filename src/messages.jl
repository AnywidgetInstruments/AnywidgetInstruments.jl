# Custom messages between a host and the front end (JL-MSG-*).

"""
    Message(content, buffers = Vector{UInt8}[])

A custom message: its JSON `content` (with a `"type"` field) and its binary
buffers, sent with it in order (little-endian bytes, see
[`encode_buffer`](@ref)).
"""
struct Message
    content::Dict{String,Any}
    buffers::Vector{Vector{UInt8}}
end
Message(content::AbstractDict) = Message(Dict{String,Any}(content), Vector{UInt8}[])

function _message_spec(w::Instrument, type::AbstractString)
    for m in message_specs(w.class)
        m["type"] == type && m["direction"] == "host-to-front" && return m
    end
    return throw(ArgumentError("$(w.class) has no host-to-front message \"$type\""))
end

"""
    message(w, type; strict = true, fields...) -> Message

A message of `type` for widget `w` with JSON `fields` and no buffer. With
`strict = true`, `type` must be a `host-to-front` message of the class in the
contract (JL-MSG-005).
"""
function message(w::Instrument, type::AbstractString; strict::Bool=true, fields...)
    strict && _message_spec(w, type)
    content = Dict{String,Any}("type" => String(type))
    for (k, v) in fields
        content[String(k)] = _jsonify(v)
    end
    return Message(content)
end

"""
    heartbeat_message(session, interval) -> Message

The heartbeat `{"type": "hb", "session", "interval"}` a host sends every
`_heartbeat` seconds to announce that it is alive (HOST-003).
"""
function heartbeat_message(session::AbstractString, interval::Real)
    return Message(Dict{String,Any}("type" => "hb", "session" => String(session), "interval" => interval))
end

"""
    append_message(w, values) -> Message

New values of a `Sparkline` or a `KPITile` (a number or a vector, oldest
first): `{"type": "append", "n"}` and one float32 buffer.
"""
function append_message(w::Instrument, values)
    spec = _message_spec(w, "append")
    haskey(spec, "repeat") && throw(
        ArgumentError("the append message of $(w.class) takes times and values: append_message(w, times, values)")
    )
    vals = values isa Real ? [values] : collect(values)
    return Message(
        Dict{String,Any}("type" => "append", "n" => length(vals)), [encode_buffer(spec["buffers"][1]["dtype"], vals)]
    )
end

"""
    append_message(w, times, values; totals = nothing) -> Message

New samples of the pens of a `TrendChart`: `times[i]` (Unix seconds) and
`values[i]` are the samples of pen `i` (in the order of the `pens` trait);
pens without samples are skipped. `totals[i]` is the number of samples of
pen `i` since the last clear (default: the samples sent). One float64 time
buffer and one float32 value buffer are sent per pen.
"""
function append_message(w::Instrument, times::AbstractVector, values::AbstractVector; totals=nothing)
    return _pens_message(w, "append", times, values, totals)
end

"""
    snapshot_message(w, times, values; totals = nothing) -> Message

Kept samples of every pen of a `TrendChart`, in reply to `sync_request`; the
arguments are those of [`append_message`](@ref).
"""
function snapshot_message(w::Instrument, times::AbstractVector, values::AbstractVector; totals=nothing)
    return _pens_message(w, "snapshot", times, values, totals)
end

function _pens_message(w, type, times, values, totals)
    spec = _message_spec(w, type)
    get(spec, "repeat", "") == "pens" || throw(ArgumentError("$(w.class) has no per-pen \"$type\" message"))
    npens = length(w[:pens])
    length(times) == length(values) || throw(ArgumentError("times and values must have one entry per pen"))
    length(times) <= npens || throw(ArgumentError("$(length(times)) pens given, $(w.class) has $npens"))
    tdtype, vdtype = spec["buffers"][1]["dtype"], spec["buffers"][2]["dtype"]
    entries = Any[]
    buffers = Vector{UInt8}[]
    for (i, (t, v)) in enumerate(zip(times, values))
        length(t) == length(v) || throw(ArgumentError("pen $i: $(length(t)) times and $(length(v)) values"))
        n = length(t)
        n == 0 && continue
        total = totals === nothing ? n : totals[i]
        push!(entries, Any[i - 1, n, total])
        push!(buffers, encode_buffer(tdtype, t), encode_buffer(vdtype, v))
    end
    return Message(Dict{String,Any}("type" => type, "pens" => entries), buffers)
end

# ── Transport (JL-MSG-006) ─────────────────────────────────────────────────────

const TRANSPORT = Ref{Any}(nothing)

"""
    set_transport!(f)

Install the function sending messages to the front end: `f(id, msg::Message)`,
`id` being the widget's message id. Host integrations install one (the
KaimonSlate.jl extension sends through SlateAFM); `nothing` removes it.
"""
set_transport!(f) = (TRANSPORT[]=f; nothing)

"""
    send_message(w, msg::Message)
    send_message(id, msg::Message)

Send a message to the views of widget `w` (or of message id `id`) through the
installed transport (see [`set_transport!`](@ref)).
"""
send_message(w::Instrument, msg::Message) = send_message(w.id, msg)
function send_message(id::AbstractString, msg::Message)
    f = TRANSPORT[]
    f === nothing && error(
        "no message transport installed: load a host integration (in KaimonSlate.jl: " *
        "`using SlateAFM, AnywidgetInstruments`) or call AnywidgetInstruments.set_transport!((id, msg) -> …)",
    )
    f(String(id), msg)
    return nothing
end
