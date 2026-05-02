---
name: automata-agent
description: Use when setting up, reviewing, or coordinating an agent team for a repository or environment; creating or adjusting project subagents; creating, reviewing, or modifying AGENTS.md or repository agent guidance; deciding whether to delegate; choosing and prompting subagents based on role, cost, speed, and reasoningEffort; synthesizing subagent results; or combining delegated work with task/workspace state skills. For OpenCode-specific agent files, opencode.json, built-in agent disables, and discovery verification, also use automata-agent-opencode.
---

# Automata Agent

Use this skill to set up a small project-suitable agent team, keep repository agent guidance usable, and coordinate delegated work without duplicating runtime configuration.

## Core Rules

- Primary agent owns user communication, final decisions, edits, commits, task-state writes, and final synthesis unless explicitly delegated.
- Prefer narrow, low-context subagents. Create subagents only when they reduce context, cost, risk, or repeated setup work.
- Keep subagents read-only by default. Grant write access only with explicit approval and narrow scope.
- Use the environment's verified agent configuration mechanism. If the mechanism cannot be found or verified, do not invent config-like files. For OpenCode-specific configuration, use `automata-agent-opencode` as an add-on.
- Keep AGENTS.md minimal; put larger instructions, references, config notes, and artifacts under the automata workspace and link to them.

## Setup Workflow

1. Inspect project conventions: agent config, skills, AGENTS.md, automata workspace, and task/workspace state.
2. Decide whether the current agent team is sufficient.
3. If creating or changing agents is multi-step, implementation-heavy, delegated, artifact-producing, or likely to be resumed, use `task-management` before editing so the plan, action, and progress are durable.
4. Present the default minimal agent team and configuration assumptions to the user before editing:
   - `automata` primary agent
   - `explore-local` narrow exploration subagent
   - automata workspace, usually `agents/`
   - runtime agent configuration mechanism and location, if known
   - model, reasoningEffort, speed, cost/costWeight, and permissions when supported
5. Ask whether the user wants to modify agent names, roles, model choices, permissions, workspace location, or runtime configuration. Discuss until the intended setup is clear.
6. Wait for explicit user confirmation before creating or modifying agents, AGENTS.md, runtime config, or workspace references.
7. Configure agents only through a verified environment mechanism, then verify discovery. For OpenCode project agents, load `automata-agent-opencode` for concrete file formats and commands.
8. Keep AGENTS.md and automata references current.
9. Record concise project-local state only when useful and only in the project’s chosen state location.

## Automata Workspace

Default automata workspace: `agents/`, not `.agents/`.

Use it for durable agent state, task state, skill workspace state, and artifacts. AGENTS.md should define or link this location.

If a skill needs durable workspace or persistent storage:
- ask the user to confirm the location before creating it
- recommend a subdirectory under the automata workspace, such as `agents/<skill-name>/`
- keep generated state out of reusable skill folders and runtime config folders
- record the confirmed location in AGENTS.md or a linked automata reference

## AGENTS.md

Trigger this skill for AGENTS.md creation, review, or modification.

Read the current AGENTS.md before changing it. Do not re-check it on unrelated tasks; it is usually loaded at session start by the environment.

AGENTS.md should contain only:
- when to use `automata-agent`
- the automata workspace location, defaulting to `agents/`
- links to larger automata references, if any

Warn the user when required guidance is missing or stale, then ask before editing. After editing, use the updated guidance locally. Mention restart only when the user expects future sessions or global startup guidance to load the update automatically.

When delegating after AGENTS.md changes, pass relevant updated guidance directly in the subagent prompt.

## Agent Team Design

Recommended minimal automata team:

- `automata`: primary project agent for user communication, final decisions, edits, verification, task state, commits when requested, and synthesis. It should load/use `task-management` for durable, resumable, multi-step, delegated, implementation-heavy, or artifact-producing work, especially when the work is complex enough to need a todo list. It should not start implementation or broad changes without an explicit user order or confirmation; when the user is discussing or asking "are we ready," answer with readiness and wait for a clear go-ahead.
- `explore-local`: narrow subagent for repository exploration, agent config inspection, skill guidance review, and workspace-state checks.

Treat this as a default starting point, not a requirement. Create fewer agents when the environment already has a sufficient team or the project does not benefit from delegation.

Good subagents need little startup context and have narrow roles, such as:
- repository exploration
- skill or instruction review
- task/workspace state review
- repeated domain-specific checks

For each subagent, define role, trigger, model, reasoningEffort, speed, cost/costWeight when supported, permissions, forbidden actions, and output shape.

Avoid subagents that duplicate the primary agent, need broad context, or require frequent back-and-forth.

## Delegation

Delegate only when it improves correctness, speed, validation, structure, or context efficiency. Execute directly when work is simple, unclear, conversational, or cheaper to do directly.

Choose agents by:
1. role fit and required permissions
2. lowest suitable cost
3. speed as a tie-breaker
4. higher reasoningEffort only for ambiguity, high risk, failed validation, architecture, migration, or explicit user request

Do not choose a cheap agent that lacks the needed role, permissions, or reasoning depth.

When delegating, give each subagent: goal, scope, exact files/context to read, allowed updates if any, validation needs, and expected output. Keep parallel subagents independent and unlikely to conflict.

Require concise findings, changes, validation, risks, blockers, and next steps. Synthesize results, resolve contradictions, validate high-risk claims when practical, and update active task/workspace state before final response.

Escalate only after failure, incomplete results, uncertainty, validation errors, or explicit user request. State why escalation is needed.

## Task And Workspace Skills

Use task-management or other available workspace-state skills when work is durable, resumable, multi-step, delegated, or artifact-producing.

When active:
- keep one task/workspace scope per execution flow
- pass subagents only the files and state they need
- merge subagent outputs into task/workspace state before completion

If no task/workspace mechanism exists, proceed ad hoc for simple work or ask before creating durable state.

## Avoid

- silently creating agents
- speculative config files
- duplicate agent inventories when verified environment config already exists
- default subagent write access
- unnecessary delegation details in final user responses
