# Cases shared with the Python kernel and the TypeScript front end
# (tests/parity/*.json of anywidget-instruments-industrial, copied into test/parity/).

@testmodule Parity begin
    using JSON
    load(name) = JSON.parse(read(joinpath(@__DIR__, "parity", name * ".json"), String); dicttype=Dict{String,Any})
    num(x) = x isa AbstractString ? AnywidgetInstruments.decode_nonfinite(x) : Float64(x)
    using AnywidgetInstruments
end

@testitem "alarm level parity (JL-LOG-001)" setup = [Parity] begin
    for case in Parity.load("alarm_level")["cases"]
        limits = case["limits"]
        previous = "normal"
        for step in case["steps"]
            # a step may change the limits first: [{limits}, value, expected]
            if length(step) == 3
                limits = merge(limits, step[1])
                step = step[2:3]
            end
            value = step[1]
            lim(k) = get(limits, k, nothing)
            level = alarm_level(
                Parity.num(value);
                lolo=lim("lolo"),
                lo=lim("lo"),
                hi=lim("hi"),
                hihi=lim("hihi"),
                deadband=something(lim("deadband"), 0),
                previous=previous,
            )
            @test (case["name"], value, level) == (case["name"], value, step[2])
            previous = level
        end
    end
end

@testitem "numeric parity (JL-LOG-002)" setup = [Parity] begin
    cases = Parity.load("numeric")
    for c in cases["coerce"]
        got = coerce_value(Parity.num(c["value"]), c["min"], c["max"], c["coerce"])
        exp = Parity.num(c["expected"])
        @test isequal(got, exp)
    end
    for c in cases["scale"]
        @test valid_scale(Parity.num(c["min"]), Parity.num(c["max"]), c["scale"]) == c["valid"]
    end
    for c in cases["modulo"]
        modulo = trait_specs(c["widget"])["value"]["modulo"]
        got = AnywidgetInstruments.wrap_modulo(Parity.num(c["value"]), modulo)
        @test isequal(got, Parity.num(c["expected"]))
    end
end

@testitem "value labels parity (JL-LOG-003)" setup = [Parity] begin
    for c in Parity.load("value_labels")["cases"]
        labels = normalize_value_labels(c["labels"])
        @test [l.label for l in labels] == c["sorted"]
        for (v, expected) in c["label_of"]
            @test value_label_of(labels, Parity.num(v), c["min"], c["max"]) == expected
        end
        for (text, expected) in c["value_of"]
            @test value_of_label(labels, text) == expected
        end
    end
end

@testitem "peak hold parity (JL-LOG-005)" setup = [Parity] begin
    for c in Parity.load("peak")["cases"]
        peak, t = nothing, 0.0
        previous = nothing
        for (now, value, expected) in c["steps"]
            v = Parity.num(value)
            # like the models, a repeated value is not a change event
            if previous === nothing || !isequal(v, previous)
                r = next_peak(v, peak, t; hold=c["hold"], decay=c["decay"], now=now)
                r === nothing || ((peak, t) = r)
            end
            previous = v
            @test (c["name"], now, peak) == (c["name"], now, expected)
        end
    end
end

@testitem "bar graph parity (JL-LOG-006)" setup = [Parity] begin
    cases = Parity.load("bars")
    for c in cases["normalize"]
        @test normalize_bars(c["bars"]) == c["expected"]
    end
    for c in cases["levels"]
        bars = normalize_bars(c["bars"])
        levels = String[]
        for (values, expected) in c["steps"]
            levels = bar_levels([Parity.num(v) for v in values], bars, c["deadband"], levels)
            @test (c["name"], values, levels) == (c["name"], values, expected)
        end
    end
end

@testitem "state machine parity (JL-LOG-007)" setup = [Parity] begin
    cases = Parity.load("statemachine")
    for c in cases["normalize"]
        @test normalize_machine(c["model"]) == c["expected"]
    end
    for m in cases["invalid"]
        @test normalize_machine(m) === nothing
    end
    spec = trait_specs("StateMachine")["machine"]
    for c in cases["sequences"]
        # a model given by name is a preset of the schema (IND-064, IND-065)
        raw = c["model"] isa AbstractString ? spec["presets"][c["model"]] : something(c["model"], spec["default"])
        m = normalize_machine(raw)
        state = m["initial"]
        for (command, expected, available) in c["steps"]
            next = next_state(m, state, command)
            next === nothing || (state = next)
            @test (c["name"], command, state, available_commands(m, state)) == (c["name"], command, expected, available)
        end
    end
end

@testitem "PID faceplate parity (JL-LOG-008)" setup = [Parity] begin
    specs = trait_specs("PIDFaceplate")
    for c in Parity.load("pid")["cases"]
        state = Dict{String,Any}(k => s["default"] for (k, s) in specs)
        merge!(state, c["traits"])
        haskey(c["traits"], "pv") && (state["pv"] = Parity.num(c["traits"]["pv"]))
        for key in ("pv", "sp", "op")
            state[key] isa AbstractString && (state[key] = Parity.num(state[key]))
        end
        for (step, expected) in c["steps"]
            if step[1] == "set"
                r = operator_set(state, step[2], step[3], step[4] == true)
                r.ok && (state[r.field] = r.value)
            else
                r = loop_mode_change(state, step[2])
                r.ok && merge!(state, r.changes)
            end
            for (name, v) in expected
                @test (c["name"], step, name, state[name]) == (c["name"], step, name, v)
            end
        end
    end
end

@testitem "annunciator parity (JL-LOG-009)" setup = [Parity] begin
    cases = Parity.load("annunciator")
    for (state, active, event, sequence, expected) in cases["transitions"]
        @test annunciator_transition(state, active, event, sequence) == expected
    end
    for c in cases["scenarios"]
        windows = [
            Dict{String,Any}(
                "tag" => t, "text" => t, "color" => "amber", "active" => false, "state" => "normal", "first" => false
            ) for t in c["windows"]
        ]
        p = AnnunciatorPanel(windows; sequence=c["sequence"], first_out=c["first_out"])
        for ((action, arg), windows, horn) in c["steps"]
            p = action == "set" ? annunciator_set(p, arg[1], arg[2]) : annunciator_action(p, action)
            got = Dict(w["tag"] => Any[w["state"], w["first"]] for w in p.windows)
            @test (c["name"], action, got, horn_on(p)) == (c["name"], action, windows, horn)
        end
    end
end

@testitem "alarm banner and list parity (JL-LOG-010)" setup = [Parity] begin
    tables = Parity.load("alarms")
    table = trait_specs("AlarmIndicator")["value"]["transitions"]
    now0 = tables["now"]
    function rows_of(rows, list, now)
        return map(rows) do r
            row = Dict{String,Any}("id" => string(r["id"]), "state" => string(r["state"]))
            if list
                shelved = get(r, "shelved_for", nothing)
                row["shelved_until"] = shelved === nothing ? nothing : AnywidgetInstruments.local_iso(now + shelved)
                row["suppressed"] = get(r, "suppressed", false) == true
                row["out_of_service"] = false
            end
            row
        end
    end
    state_of(rows) = Dict(r["id"] => Any[r["state"], get(r, "shelved_until", nothing) !== nothing] for r in rows)
    for c in tables["banner"]
        rows = rows_of(c["rows"], false, now0)
        for (step, expected) in c["steps"]
            rows = acknowledge_rows(rows, step[1] == "ack" ? step[2] : nothing, table, false)
            @test (c["name"], step, state_of(rows)) == (c["name"], step, expected)
        end
    end
    for c in tables["list"]
        now = now0
        rows = rows_of(c["rows"], true, now)
        for (step, expected) in c["steps"]
            if step[1] == "ack"
                rows = acknowledge_rows(rows, step[2], table, true)
            elseif step[1] == "ack_all"
                rows = acknowledge_rows(rows, nothing, table, true)
            elseif step[1] == "shelve"
                rows = something(shelve_row(rows, step[2], step[3], c["max_shelve"], now), rows)
            elseif step[1] == "unshelve"
                rows = unshelve_row(rows, step[2])
            else
                now += step[2]
                rows = expire_shelving(rows, now).rows
            end
            @test (c["name"], step, state_of(rows)) == (c["name"], step, expected)
        end
    end
end
