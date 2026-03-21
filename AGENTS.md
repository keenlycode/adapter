# Repo Notes

## Docs Workflow

- use `deno task docs:build` for docs builds
- use `deno task docs:serve` for local docs preview
- these commands also refresh `skills/adapter/references/` from `docs-src/`
- `skills/adapter/references/` is generated output and should not be edited by hand
- docs reference syncing skips files and folders whose names start with `_`
