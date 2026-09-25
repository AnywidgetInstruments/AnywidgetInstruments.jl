# Security policy

## Supported versions

AnywidgetInstruments.jl is pre-alpha: only the latest version on the `main`
branch receives security fixes.

## Reporting a vulnerability

Please do **not** open a public issue for a security problem.

Report it privately through a
[GitHub Security Advisory](https://github.com/s-celles/AnywidgetInstruments.jl/security/advisories/new)
(GHSA) of this repository. Include the version (package, Julia, and the
vendored front end from `assets/SOURCE.toml`), the steps to reproduce, and the
impact you expect.

You should receive an answer within 7 days. Once a fix is ready, the advisory
is published with credit to the reporter, unless they prefer otherwise.

Vulnerabilities of the front end itself (`assets/index.js`) belong to
[anywidget-instruments](https://github.com/s-celles/anywidget-instruments/security/advisories/new);
report them there, this package then vendors the fixed version.

## Scope

The widgets are a visualization for monitoring, teaching and prototyping. They
are not a protection layer and never replace the safety functions of a
process: a report that they cannot act as a safety system is not a
vulnerability.
