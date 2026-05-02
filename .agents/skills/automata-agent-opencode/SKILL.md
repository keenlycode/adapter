---
name: automata-agent-opencode
description: Use when configuring, creating, reviewing, or fixing OpenCode project agents and subagents; editing `.opencode/agents/*.md`, `opencode.json`, or OpenCode-specific AGENTS.md guidance; disabling built-in OpenCode agents; choosing OpenCode model IDs, permissions, speed, costWeight, reasoningEffort, and agent modes; avoiding `opencode agent create` generator loops in non-interactive sessions; or verifying discovery with `opencode agent list`.
---

# Automata Agent OpenCode

Use this skill as the OpenCode-specific add-on to `automata-agent`.

First apply `automata-agent` for general team design, delegation, workspace, task-state, and `AGENTS.md` principles. Then use this skill for concrete OpenCode configuration mechanics: `.opencode/agents/*.md`, `opencode.json`, model IDs, permissions, disabling built-ins, and discovery verification.

## Core Rules

- Use repo-local Markdown agent files in `.opencode/agents/*.md` for project agents and subagents.
- Do not use `opencode agent create` in non-interactive/API sessions; it can enter a long generator flow. Write Markdown agent files directly and verify with `opencode agent list`.
- Keep `AGENTS.md` minimal. Put durable references, task state, and artifacts under `agents/`.
- Keep runtime OpenCode configuration in `.opencode/agents/` and `opencode.json`, not in reusable skill folders or `agents/`.
- Prefer OpenCode's standard permissive permission fields when the user wants smooth operation, then express safety policy in the prompt instructions.
- Disable built-in agents in `opencode.json` when installing a clean automata-only team, or when explicitly requested.

## Setup Workflow

1. Load/use `automata-agent` when the task involves team design, `AGENTS.md`, delegation policy, or durable workspace state.
2. Inspect existing `AGENTS.md`, `.opencode/agents/`, `opencode.json`, `agents/`, and relevant skill files.
3. Edit `.opencode/agents/*.md` directly using documented Markdown agent format.
4. Update `opencode.json` for global project agent overrides such as disabling built-ins.
5. Verify with `opencode agent list`.
6. If model IDs matter, verify with `opencode models <provider>` before editing.

## OpenCode Agent Format

Use one Markdown file per agent. The filename is the agent name.

```markdown
---
description: Short role and trigger description.
mode: primary
model: openai/gpt-5.5
reasoningEffort: medium
speed: normal
costWeight: 1.0
permission:
  edit: allow
  bash: allow
  webfetch: allow
---
# Agent Name

Agent-specific operating instructions.
```

Use `mode: primary` for user-facing main agents. Use `mode: subagent` for delegated agents. Use permissive standard OpenCode permissions when requested, but put behavioral constraints in the prompt.

## Team Installation Notes

Use `automata-agent` for the minimal team recommendation, including the `automata` primary agent and `explore-local` subagent. This skill only maps that team into OpenCode agent files and project configuration.

When installing the minimal automata team, disable OpenCode's default visible agents in `opencode.json`: `build`, `plan`, `explore`, and `general`.

For subagents, prefer lower-cost or faster verified models when suitable. If the user requests specific models, run `opencode models <provider>` and use only IDs listed there.

## Permissions Policy

When permissions are permissive, include prompt policy such as:

- Do not run destructive commands such as `git reset --hard`, `git checkout --`, mass deletes, or force pushes unless explicitly requested.
- Do not commit, amend, or push unless explicitly requested.
- Do not modify files outside the repository unless explicitly requested or required by a loaded skill.
- Preserve user changes in a dirty worktree; never revert work you did not make unless asked.
- Ask before broad, irreversible, or high-risk changes.

For read-mostly subagents, keep config permissive if requested but state that the role is read-mostly and writes require explicit scope from the primary agent.

## Built-In Agents

Disable OpenCode's default visible agents with `opencode.json` for a clean automata-only project team:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "agent": {
    "build": { "disable": true },
    "plan": { "disable": true },
    "explore": { "disable": true },
    "general": { "disable": true }
  }
}
```

`compaction`, `summary`, and `title` are OpenCode hidden/system agents and may still appear.

## OpenCode AGENTS.md Additions

Use `automata-agent` for general AGENTS.md guidance. If AGENTS.md needs OpenCode-specific notes, keep them short and include only:

- when to use OpenCode automata/agent skills
- primary agent name, if project-specific
- OpenCode project agent location, usually `.opencode/agents/`
- any project-specific OpenCode runtime notes that future sessions must know
- links to larger references under `agents/`, if any

Do not duplicate full agent prompts in AGENTS.md.

## Verification

- Run `opencode agent list` after agent or config edits.
- Run `opencode models openai` before setting OpenAI model IDs when exact names matter.
- Read the edited files if validation output is noisy or truncated.
- Report which agents are discovered and any built-ins that remain visible.
