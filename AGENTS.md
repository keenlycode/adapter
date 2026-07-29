# Agent Guidance

- Use the `automata-agent` and `automata-agent-opencode` skills when creating, reviewing, or changing this repository's OpenCode agents.
- Runtime OpenCode agent definitions live in `.opencode/agents/`.
- Durable automata workspace files should live under `agents/`.
- Keep this file minimal; put larger references, task state, and artifacts under `agents/`.

## Docs Workflow

- use `deno task docs:build` for docs builds
- use `deno task docs:serve` for local docs preview
- edit human documentation in `docs-src/docs/`
