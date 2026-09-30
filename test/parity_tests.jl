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
