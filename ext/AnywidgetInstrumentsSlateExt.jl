"""
    AnywidgetInstrumentsSlateExt

KaimonSlate.jl integration (JL-SLATE-*), loaded with SlateExtensionsBase.

- An `AnywidgetInstruments.Instrument` converts to a
  `Widget` of the `SlateAFM.AFM` kind: `@bind level Tank(0.0; max = 4)` binds
  `level` to the trait dictionary, rendered by the host shim of SlateAFM.
- The vendored front end is served from this extension's `__slate_frontend`
  hook, under `/ext-assets/AnywidgetInstrumentsSlateExt/`.
- Messages go through `SlateAFM.afm_emit` when SlateAFM is loaded.
"""
module AnywidgetInstrumentsSlateExt

using AnywidgetInstruments: AnywidgetInstruments, Instrument, Message, traits
using SlateExtensionsBase: SlateExtensionsBase, Widget, ext_asset_url, provide_assets!

# The widget kind registered by SlateAFM's host shim (JL-SLATE-004).
const KIND = "SlateAFM.AFM"

function SlateExtensionsBase.to_widget(w::Instrument)
    return Widget(
        KIND,
        traits(w; defaults=true);
        src=ext_asset_url(@__MODULE__, "index.js"),
        css=[ext_asset_url(@__MODULE__, "index.css")],
        id=w.id,
    )
end

function _slateafm()
    for (id, m) in Base.loaded_modules
        id.name == "SlateAFM" && return m
    end
    return nothing
end

"""
    slate_transport(id, msg::Message)

Send `msg` to the views of message id `id` with `SlateAFM.afm_emit`.
"""
function slate_transport(id::AbstractString, msg::Message)
    afm = _slateafm()
    afm === nothing && error("SlateAFM is not loaded: add `using SlateAFM` to the notebook")
    Base.invokelatest(afm.afm_emit, id, msg.content; buffers=msg.buffers)
    return nothing
end

function __slate_frontend(slate_on)
    provide_assets!(@__MODULE__, AnywidgetInstruments.assets_dir())
    AnywidgetInstruments.TRANSPORT[] === nothing && AnywidgetInstruments.set_transport!(slate_transport)
    return nothing
end

function __init__()
    AnywidgetInstruments.TRANSPORT[] === nothing && AnywidgetInstruments.set_transport!(slate_transport)
    return nothing
end

end # module
