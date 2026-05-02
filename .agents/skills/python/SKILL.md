---
name: python
description: Use for Python work. Follow the repo's existing conventions first. Otherwise default to the user's standard Python tools and start with a short repo investigation.
---

# Python

## Purpose

Use this skill for Python tasks.
Follow the repo's existing conventions first.
If the repo does not make them clear, use the defaults below.

## Tooling Standard

- Package and environment management: `uv`
- Run project commands: `uv run`
- Ad hoc tool entrypoints outside the repo: `uvx`
- Tests: `pytest`
- Linting: `ruff`
- Type checking: `ty`
- Project config: `pyproject.toml`

## Start By Investigating

1. Inspect the repo first:
   - Read `pyproject.toml` if present.
   - Inspect the package layout and test layout.
   - Check how the repo runs tests, linting, and type checking.
   - Look for existing workflow files such as `pytest.ini`, `ruff.toml`, `ty.toml`, `tox.ini`, `noxfile.py`, `manage.py`, or `requirements*.txt`.
2. Prefer the repo's existing commands and structure when they are explicit.
3. Otherwise use the tooling standard in this skill.
