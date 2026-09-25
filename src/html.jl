# Standalone HTML display (JL-HTML-*): the front-end module runs with a model
# held in the page, like the kernel-less host page of anywidget-instruments
# (e2e/host/index.html). No kernel: operator actions stay in the page.

const ASSET_BASE = Ref{Union{Nothing,String}}(nothing)

"""
    set_asset_base!(url::Union{AbstractString,Nothing})

Base URL the HTML display loads `index.js` and `index.css` from (for example
the directory where a documentation build copied [`assets_dir`](@ref)).
`nothing` (the default) inlines them in each output, which makes the output
self-contained but about 1 MB larger (JL-HTML-003, JL-HTML-004).
"""
function set_asset_base!(url::Union{AbstractString,Nothing})
    ASSET_BASE[] = url === nothing ? nothing : (endswith(url, "/") ? String(url) : url * "/")
    return nothing
end

# JSON safe inside <script>: no "</", no "<!--", no line separators (JL-HTML-002).
function _script_json(x)
    return replace(JSON.json(x), "<" => "\\u003c", ">" => "\\u003e", "&" => "\\u0026", " " => "\\u2028", " " => "\\u2029")
end

const _INLINE = Ref{Union{Nothing,Tuple{String,String}}}(nothing)

function _inline_assets()
    if _INLINE[] === nothing
        js = base64encode(read(joinpath(ASSETS_DIR, "index.js")))
        css = base64encode(read(joinpath(ASSETS_DIR, "index.css")))
        _INLINE[] = (js, css)
    end
    return _INLINE[]::Tuple{String,String}
end

# The module and the styles, once per output (inline) or as URLs.
function _write_assets(io::IO)
    ASSET_BASE[] === nothing || return nothing
    js, css = _inline_assets()
    v = frontend_version()
    print(io, "<script type=\"text/plain\" data-awi-esm=\"", v, "\">", js, "</script>\n")
    print(io, "<script type=\"text/plain\" data-awi-css=\"", v, "\">", css, "</script>\n")
    return nothing
end

# Loader: imports the module once per page, adds the styles once, then runs
# initialize and render with a model holding the traits.
const _LOADER = raw"""
const awiLoad = (urls) => {
  if (window.__awiModule) return window.__awiModule;
  const text = (sel) => {
    const el = document.querySelector(sel);
    const bin = atob(el.textContent);
    return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
  };
  if (!document.querySelector("[data-awi-style]")) {
    const style = urls ? document.createElement("link") : document.createElement("style");
    style.setAttribute("data-awi-style", "");
    if (urls) { style.rel = "stylesheet"; style.href = urls.css; }
    else style.textContent = text("script[data-awi-css]");
    document.head.appendChild(style);
  }
  const url = urls ? urls.js
    : URL.createObjectURL(new Blob([text("script[data-awi-esm]")], { type: "text/javascript" }));
  window.__awiModule = import(url).then((m) => m.default);
  return window.__awiModule;
};
const awiModel = (traits) => {
  const handlers = {};
  const fire = (ev, ...a) => (handlers[ev] || []).slice().forEach((h) => h(...a));
  return {
    get: (k) => traits[k],
    set(k, v) {
      if (JSON.stringify(traits[k]) === JSON.stringify(v)) return;
      traits[k] = v;
      fire(`change:${k}`);
    },
    save_changes: () => {},
    on: (ev, cb) => (handlers[ev] ||= []).push(cb),
    off: (ev, cb) => (handlers[ev] = (handlers[ev] || []).filter((h) => h !== cb)),
    send: () => {},
  };
};
"""

function _write_widget(io::IO, w::Instrument)
    uid = "awi-" * string(uuid4())
    base = ASSET_BASE[]
    urls = base === nothing ? "null" : _script_json(Dict("js" => base * "index.js", "css" => base * "index.css"))
    print(io, "<div id=\"", uid, "\" class=\"awi-host\"></div>\n")
    print(io, "<script type=\"application/json\" id=\"", uid, "-traits\">")
    print(io, _script_json(traits(w; defaults=true)), "</script>\n")
    print(io, "<script type=\"module\">\n", _LOADER)
    print(io, "const el = document.getElementById(\"", uid, "\");\n")
    print(io, "const traits = JSON.parse(document.getElementById(\"", uid, "-traits\").textContent);\n")
    print(io, "const afm = await awiLoad(", urls, ");\n")
    print(io, "const model = awiModel(traits);\n")
    print(io, "await afm.initialize?.({ model });\n")
    print(io, "await afm.render({ model, el });\n")
    print(io, "</script>\n")
    return nothing
end

function Base.show(io::IO, ::MIME"text/html", w::Instrument)
    _write_assets(io)
    _write_widget(io, w)
    return nothing
end

"""
    html_page(widgets...; title = "AnywidgetInstruments") -> String
    html_page(path, widgets...; title = "AnywidgetInstruments") -> path

A standalone HTML page showing `widgets` side by side, the front-end module
included once (JL-HTML-005). With a `path`, the page is written to that file.
"""
function html_page(widgets::Instrument...; title::AbstractString="AnywidgetInstruments")
    io = IOBuffer()
    print(io, "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n")
    print(io, "<title>", replace(title, "&" => "&amp;", "<" => "&lt;", ">" => "&gt;"), "</title>\n")
    print(
        io,
        "<style>body { font-family: sans-serif; display: flex; flex-wrap: wrap; gap: 24px; padding: 16px; }</style>\n",
    )
    print(io, "</head>\n<body>\n")
    _write_assets(io)
    for w in widgets
        _write_widget(io, w)
    end
    print(io, "</body>\n</html>\n")
    return String(take!(io))
end

function html_page(path::AbstractString, widgets::Instrument...; kw...)
    write(path, html_page(widgets...; kw...))
    return path
end
