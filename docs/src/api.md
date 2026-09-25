# API reference

## Contract, widgets, encoding, messages and rules

```@autodocs
Modules = [AnywidgetInstruments]
Filter = f -> !(nameof(f) in Symbol.(widget_classes()))
```

## Widget constructors

One constructor per concrete class of anywidget-instruments, generated from
the trait contract. `Pipe` is not exported (Base exports a `Pipe` type): call
it `AnywidgetInstruments.Pipe`.

```@autodocs
Modules = [AnywidgetInstruments]
Filter = f -> nameof(f) in Symbol.(widget_classes())
```
