# One constructor per concrete class of the contract (JL-API-001, JL-API-002,
# JL-API-012), generated when the package is precompiled.

const WRITERS = Dict("host" => "host", "both" => "host and operator", "front" => "front end", "derived" => "derived")

_md(s) = replace(String(s), "\$" => "\\\$", "|" => "\\|", "*" => "\\*", "_" => "\\_", "<" => "&lt;")

function _trait_doc(name, spec)
    t = spec["type"]
    t in ("enum", "const") && (t = join(("`$(repr(v))`" for v in spec["values"]), ", "))
    get(spec, "nullable", false) && (t *= " or `nothing`")
    line = "- `$name` ($t; default `$(JSON.json(spec["default"]))`; $(WRITERS[spec["writer"]]))"
    haskey(spec, "description") && (line *= ": " * _md(spec["description"]))
    return line
end

function _class_doc(class, positional)
    specs = trait_specs(class)
    sig = "    $class(; id, traits...) -> Instrument"
    positional && (sig *= "\n    $class(value; id, traits...) -> Instrument")
    names = sort!([n for n in keys(specs) if n != "_kind"])
    return """
$sig

A `$class` widget of anywidget-instruments (kind `\"$(widget_kind(class))\"`).
See [`instrument`](@ref) for the checks applied to the traits.

# Traits

$(join((_trait_doc(n, specs[n]) for n in names), "\n"))
"""
end

for class in CLASSES
    sym = Symbol(class)
    value = get(trait_specs(class), "value", nothing)
    positional = value !== nothing && !get(value, "readOnly", false)
    # a new function, even where Base has a type of the same name (Pipe)
    @eval function $sym end
    @eval $sym(; kw...) = instrument($class; kw...)
    positional && @eval $sym(value; kw...) = instrument($class, value; kw...)
    @eval @doc $(_class_doc(class, positional)) $sym
    # a name exported by Base stays reachable qualified (AnywidgetInstruments.Pipe)
    (isdefined(Base, sym) && Base.isexported(Base, sym)) || @eval export $sym
end
