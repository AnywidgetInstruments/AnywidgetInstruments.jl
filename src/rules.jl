# More rules shared with the Python kernel and the TypeScript front end
# (js/src/contract/peak.ts, bars.ts, statemachine.ts, pid.ts, annunciator.ts and
# alarms.ts of anywidget-instruments-industrial), checked against the same parity
# cases (JL-LOG-005 .. JL-LOG-010). They let a Julia host own the state of these
# widgets as the Python kernel does.

_finite(v) = v isa Real && !(v isa Bool) && isfinite(v)
_opt(v) = _finite(v) ? v : nothing

# -- peak hold (NUM-110) --------------------------------------------------------------

"""
    next_peak(value, peak, time; hold, decay, now) -> Union{Tuple,Nothing}

New `(peak, time)` after `value` arrives at time `now` (seconds), or `nothing`
when the held peak does not change (NUM-110). `peak` is `nothing` when none is
held. A higher value is taken at once; a lower one replaces the peak only when
the held peak is older than `decay` seconds (`decay = 0`: held until reset).
Non-finite values are ignored, and nothing is held unless `hold`.
"""
function next_peak(value::Real, peak, time::Real; hold::Bool, decay::Real, now::Real)
    (hold && isfinite(value)) || return nothing
    expired = decay > 0 && now - time > decay
    (peak === nothing || value >= peak || expired) && return (value, now)
    return nothing
end

# -- bar graph (IND-102) ----------------------------------------------------------

const BAR_LIMITS = ("normal_lo", "normal_hi", "lolo", "lo", "hi", "hihi")

"""
    normalize_bars(raw) -> Vector{Dict{String,Any}}

Bars as the kernel stores them (IND-102): a label becomes `{label}`, a missing
or non-finite limit is `nothing`, the default label is the bar number. Unknown
keys are ignored; items that are neither a string nor a dictionary are dropped.
"""
function normalize_bars(raw)
    out = Dict{String,Any}[]
    raw isa AbstractVector || return out
    for (i, item) in enumerate(raw)
        bar = if item isa AbstractString
            Dict{String,Any}("label" => item)
        elseif item isa AbstractDict
            Dict{String,Any}(string(k) => v for (k, v) in item)
        else
            continue
        end
        label = get(bar, "label", nothing)
        clean = Dict{String,Any}("label" => label === nothing ? string(i) : string(label))
        for key in BAR_LIMITS
            clean[key] = _opt(get(bar, key, nothing))
        end
        push!(out, clean)
    end
    return out
end

"""
    bar_levels(values, bars, deadband, previous) -> Vector{String}

Alarm level of each bar from its value and limits, with hysteresis
([`alarm_level`](@ref)); a bar without a value is `"normal"`. `previous` holds
the levels of the last call.
"""
function bar_levels(values, bars, deadband::Real, previous)
    return map(enumerate(bars)) do (i, bar)
        i > length(values) && return "normal"
        prev = i <= length(previous) ? String(previous[i]) : "normal"
        return alarm_level(
            values[i]; lolo=bar["lolo"], lo=bar["lo"], hi=bar["hi"], hihi=bar["hihi"], deadband=deadband, previous=prev
        )
    end
end

# -- state machine (IND-060 .. IND-065) ---------------------------------------------

# Completion of an acting state: a host event, not an operator command.
const SC = "SC"

# JavaScript truthiness, as the front end reads a flag (!!value)
_truthy(v) = !(v === nothing || v === false || (v isa Real && (iszero(v) || isnan(v))) || v == "")

_isnum(v) = v isa Real && !(v isa Bool) && isfinite(v)
_quad(r) = r isa AbstractVector && length(r) == 4 && all(_isnum, r)
_pair(p) = p isa AbstractVector && length(p) == 2 && all(_isnum, p)

function _drawing(m, names, commands)
    out = Dict{String,Any}()
    if haskey(m, "zones")
        m["zones"] isa AbstractVector || return nothing
        zones = Dict{String,Any}[]
        for z in m["zones"]
            z isa AbstractDict || return nothing
            rects = get(z, "rects", nothing)
            (rects isa AbstractVector && !isempty(rects) && all(_quad, rects)) || return nothing
            zone = Dict{String,Any}("rects" => [collect(r) for r in rects])
            if haskey(z, "label")
                z["label"] isa AbstractString || return nothing
                zone["label"] = z["label"]
            end
            if haskey(z, "commands")
                cs = z["commands"]
                (cs isa AbstractVector && all(c -> c in commands, cs)) || return nothing
                zone["commands"] = String[string(c) for c in cs]
            end
            haskey(z, "shade") && (zone["shade"] = _truthy(z["shade"]))
            push!(zones, zone)
        end
        out["zones"] = zones
    end
    if haskey(m, "routes")
        m["routes"] isa AbstractDict || return nothing
        routes = Dict{String,Any}()
        for (key, pts) in m["routes"]
            ends = split(string(key), ">")
            (length(ends) == 2 && all(e -> e in names, ends)) || return nothing
            (pts isa AbstractVector && all(_pair, pts)) || return nothing
            routes[string(key)] = [collect(p) for p in pts]
        end
        out["routes"] = routes
    end
    return out
end

"""
    normalize_machine(raw) -> Union{Dict{String,Any},Nothing}

State machine model as the kernel stores it (IND-060 .. IND-063): default
positions (5 per row) and acting flags, commands completed from the
transitions, initial state (the first one by default); `nothing` for a model
the kernel would refuse.
"""
function normalize_machine(raw)
    raw isa AbstractDict || return nothing
    m = raw
    sts = get(m, "states", nothing)
    (sts isa AbstractVector && !isempty(sts)) || return nothing
    states = Dict{String,Any}[]
    for (k0, s) in enumerate(sts)
        k = k0 - 1
        (s isa AbstractDict && get(s, "name", nothing) isa AbstractString) || return nothing
        state = Dict{String,Any}(
            "name" => s["name"],
            "x" => haskey(s, "x") ? s["x"] : k % 5,
            "y" => haskey(s, "y") ? s["y"] : k ÷ 5,
            "acting" => haskey(s, "acting") ? _truthy(s["acting"]) : false,
        )
        for key in ("title", "group")
            haskey(s, key) || continue
            s[key] isa AbstractString || return nothing
            state[key] = s[key]
        end
        push!(states, state)
    end
    names = [s["name"] for s in states]
    allunique(names) || return nothing
    cs = get(m, "commands", nothing)
    commands = cs isa AbstractVector ? String[string(c) for c in cs] : String[]
    transitions = Vector{Any}[]
    trs = get(m, "transitions", Any[])
    for tr in (trs isa AbstractVector ? trs : Any[])
        (tr isa AbstractVector && length(tr) == 3 && tr[1] in names && tr[3] in names) || return nothing
        push!(transitions, Any[string(tr[1]), string(tr[2]), string(tr[3])])
        cmd = string(tr[2])
        cmd != SC && !(cmd in commands) && push!(commands, cmd)
    end
    initial = get(m, "initial", names[1])
    (initial isa AbstractString && initial in names) || return nothing
    machine = Dict{String,Any}(
        "states" => states, "transitions" => transitions, "commands" => commands, "initial" => initial
    )
    if haskey(m, "global_commands")
        g = m["global_commands"]
        (g isa AbstractVector && all(c -> string(c) in commands, g)) || return nothing
        machine["global_commands"] = String[string(c) for c in g]
    end
    drawing = _drawing(m, names, commands)
    drawing === nothing && return nothing
    return merge(machine, drawing)
end

"""
    next_state(machine, state, command) -> Union{String,Nothing}

State after `command` from `state`, or `nothing` when the command is not valid
there. `machine` comes from [`normalize_machine`](@ref).
"""
function next_state(machine, state::AbstractString, command::AbstractString)
    for tr in machine["transitions"]
        tr[1] == state && tr[2] == command && return String(tr[3])
    end
    return nothing
end

"""
    available_commands(machine, state) -> Vector{String}

Commands valid in `state`, in the order of the model (IND-061).
"""
function available_commands(machine, state::AbstractString)
    return String[c for c in machine["commands"] if next_state(machine, state, c) !== nothing]
end

# -- PID faceplate (IND-030 .. IND-034) ----------------------------------------------

_get(state, k) = get(state, k, get(state, Symbol(k), nothing))

"""
    sp_limits(state) -> Tuple

Setpoint limits of a PID faceplate: `sp_min` / `sp_max`, or the PV range where
they are not set. `state` is a dictionary of its traits.
"""
function sp_limits(state)
    return (
        something(_get(state, "sp_min"), _get(state, "pv_min")), something(_get(state, "sp_max"), _get(state, "pv_max"))
    )
end

const _EDITABLE_IN = Dict("sp" => "AUTO", "op" => "MAN")

"""
    operator_set(state, field, value, confirmed = false) -> NamedTuple

Operator entry on a PID faceplate with its rules (IND-031, IND-032): SP in
AUTO, OP in MAN, a finite number, clamped to the limits; with `confirm_delta`,
a larger change needs `confirmed`. Returns `(ok = true, field, value)` or
`(ok = false, reason)`.
"""
function operator_set(state, field::AbstractString, value, confirmed::Bool=false)
    haskey(_EDITABLE_IN, field) || return (ok=false, reason="unknown field '$field'")
    mode = _EDITABLE_IN[field]
    _get(state, "loop_mode") == mode ||
        return (ok=false, reason="$(uppercase(field)) can only be changed in $mode mode")
    v = if value isa Real && !(value isa Bool)
        Float64(value)
    elseif value isa AbstractString && !isempty(strip(value))
        something(tryparse(Float64, strip(value)), NaN)
    else
        NaN
    end
    isfinite(v) || return (ok=false, reason="not a number")
    lo, hi = field == "sp" ? sp_limits(state) : (_get(state, "op_min"), _get(state, "op_max"))
    next = clamp(v, lo, hi)
    old = _clamped(state, field)
    delta = _get(state, "confirm_delta")
    delta !== nothing && abs(next - old) > delta && !confirmed && return (ok=false, reason="confirmation required")
    return (ok=true, field=field, value=next)
end

# SP and OP as the kernel stores them: clamped to their limits
function _clamped(state, field)
    field == "sp" && return clamp(_get(state, "sp"), sp_limits(state)...)
    return clamp(_get(state, "op"), _get(state, "op_min"), _get(state, "op_max"))
end

"""
    loop_mode_change(state, mode) -> NamedTuple

A loop mode request on a PID faceplate (IND-034): `(ok = true, changes)` with
the new `loop_mode` and, leaving MAN with `sp_tracking`, `sp` set to the PV;
`(ok = false, reason)` for a mode that is not enabled.
"""
function loop_mode_change(state, mode::AbstractString)
    mode in something(_get(state, "modes"), String[]) || return (ok=false, reason="mode '$mode' is not enabled")
    changes = Dict{String,Any}("loop_mode" => mode)
    pv = _get(state, "pv")
    if _get(state, "loop_mode") == "MAN" && mode != "MAN" && _get(state, "sp_tracking") == true && _finite(pv)
        changes["sp"] = clamp(pv, sp_limits(state)...)
    end
    return (ok=true, changes=changes)
end

# -- annunciator (IND-040 .. IND-043) --------------------------------------------------

const _CLEARED = Dict("A" => "normal", "M" => "acknowledged", "R" => "ringback")

"""
    annunciator_transition(state, active, event, sequence) -> String

State of an annunciator window after `event` (`"process"`, `"acknowledge"` or
`"reset"`) in the ISA-18.1 `sequence` `"A"`, `"M"` or `"R"` (IND-040 .. IND-042).
"""
function annunciator_transition(state::AbstractString, active::Bool, event::AbstractString, sequence::AbstractString)
    if event == "process"
        active && (state == "normal" || state == "ringback") && return "alert"
        !active && state == "acknowledged" && return _CLEARED[sequence]
        return String(state)
    end
    if event == "acknowledge"
        state == "alert" || return String(state)
        return active ? "acknowledged" : _CLEARED[sequence]
    end
    active && return String(state)
    ((sequence == "M" && state == "acknowledged") || (sequence == "R" && state == "ringback")) && return "normal"
    return String(state)
end

"""
    AnnunciatorPanel(windows; sequence = "A", first_out = false, silenced = false)

An annunciator panel: its windows (dictionaries with `tag`, `active`, `state`,
`first`), its sequence, the first-out option and the horn silence.
"""
Base.@kwdef struct AnnunciatorPanel
    windows::Vector{Dict{String,Any}}
    sequence::String = "A"
    first_out::Bool = false
    silenced::Bool = false
end
AnnunciatorPanel(windows; kw...) = AnnunciatorPanel(; windows=windows, kw...)

function _copy(p::AnnunciatorPanel; silenced=p.silenced)
    return AnnunciatorPanel(;
        windows=[copy(w) for w in p.windows], sequence=p.sequence, first_out=p.first_out, silenced=silenced
    )
end

"""
    annunciator_set(panel, tag, active) -> AnnunciatorPanel

The process condition of window `tag` becomes `active`: its state follows the
sequence, a new alert sounds the horn again, and the first window to alert is
marked first out when the panel asks for it (IND-043).
"""
function annunciator_set(panel::AnnunciatorPanel, tag::AbstractString, active::Bool)
    p = _copy(panel)
    silenced = p.silenced
    i = findfirst(w -> w["tag"] == tag, p.windows)
    i === nothing && return p
    w = p.windows[i]
    w["active"] = active
    old = w["state"]
    w["state"] = annunciator_transition(old, active, "process", p.sequence)
    (w["state"] == "alert" || w["state"] == "ringback") && old != w["state"] && (silenced = false)
    if p.first_out && old == "normal" && w["state"] == "alert" && !any(x -> x["first"] == true, p.windows)
        w["first"] = true
    end
    w["state"] == "normal" && (w["first"] = false)
    return _copy(p; silenced=silenced)
end

"""
    annunciator_action(panel, action) -> AnnunciatorPanel

Operator action on the whole panel: `"acknowledge"`, `"reset"` or `"silence"`
(IND-043).
"""
function annunciator_action(panel::AnnunciatorPanel, action::AbstractString)
    action == "silence" && return _copy(panel; silenced=true)
    p = _copy(panel)
    for w in p.windows
        w["state"] = annunciator_transition(w["state"], w["active"] == true, action, p.sequence)
        (w["state"] == "normal" || action == "reset") && (w["first"] = false)
    end
    return p
end

"""
    horn_on(panel) -> Bool

True while a window alerts or rings back and the horn is not silenced.
"""
horn_on(p::AnnunciatorPanel) = !p.silenced && any(w -> w["state"] in ("alert", "ringback"), p.windows)

# -- alarm banner and alarm list (SCADA-006, SCADA-007, IND-050 .. IND-053) -----------

function _apply_transition(table, state, event)
    table === nothing && return String(state)
    for row in table
        row[1] == state && row[2] == event && return String(row[3])
    end
    return String(state)
end

_shelved(r) = get(r, "shelved_until", nothing) !== nothing

"""
    keep_row(row, list) -> Bool

A row stays listed while not normal; in an alarm list also while shelved,
suppressed or out of service.
"""
function keep_row(r, list::Bool)
    return r["state"] != "normal" ||
           (list && (_shelved(r) || get(r, "suppressed", false) == true || get(r, "out_of_service", false) == true))
end

"""
    acknowledge_rows(rows, id, table, list) -> Vector

Acknowledge the alarm `id`, or every alarm when `id` is `nothing`, with the
ISA-18.2 transition `table` (the `transitions` of the `value` trait of
`AlarmIndicator`); rows that no longer need showing leave.
"""
function acknowledge_rows(rows, id, table, list::Bool)
    out = map(rows) do r
        (id === nothing || r["id"] == id) || return r
        return merge(r, Dict{String,Any}("state" => _apply_transition(table, r["state"], "acknowledge")))
    end
    return filter(r -> keep_row(r, list), out)
end

"""
    local_iso(seconds) -> String

Local `"YYYY-MM-DDTHH:MM:SS"` of a Unix time, as the kernel writes
`shelved_until`.
"""
local_iso(seconds::Real) = Libc.strftime("%Y-%m-%dT%H:%M:%S", floor(seconds))

"""
    iso_seconds(iso) -> Float64

Unix time of a local ISO time written by [`local_iso`](@ref).
"""
function iso_seconds(iso::AbstractString)
    tm = Libc.strptime("%Y-%m-%dT%H:%M:%S", String(first(iso, 19)))
    tm.isdst = -1 # let the C library find daylight saving time
    return time(tm)
end

"""
    shelve_row(rows, id, seconds, max_shelve, now) -> Union{Vector,Nothing}

Shelve the alarm `id` for `seconds` (`0 < seconds <= max_shelve`) from `now`
(Unix seconds), or `nothing` when refused (IND-051).
"""
function shelve_row(rows, id, seconds::Real, max_shelve::Real, now::Real)
    (0 < seconds <= max_shelve && any(r -> r["id"] == id, rows)) || return nothing
    return map(r -> r["id"] == id ? merge(r, Dict{String,Any}("shelved_until" => local_iso(now + seconds))) : r, rows)
end

"""
    unshelve_row(rows, id) -> Vector

Unshelve the alarm `id`; it leaves the list when nothing else keeps it there.
"""
function unshelve_row(rows, id)
    out = map(r -> r["id"] == id ? merge(r, Dict{String,Any}("shelved_until" => nothing)) : r, rows)
    return filter(r -> keep_row(r, true), out)
end

"""
    expire_shelving(rows, now) -> (rows, expired)

Unshelve the alarms whose shelving time has passed at `now` (Unix seconds);
`expired` lists their ids.
"""
function expire_shelving(rows, now::Real)
    expired = [r["id"] for r in rows if _shelved(r) && iso_seconds(r["shelved_until"]) <= now]
    isempty(expired) && return (rows=collect(rows), expired=expired)
    out = map(r -> r["id"] in expired ? merge(r, Dict{String,Any}("shelved_until" => nothing)) : r, rows)
    return (rows=filter(r -> keep_row(r, true), out), expired=expired)
end
