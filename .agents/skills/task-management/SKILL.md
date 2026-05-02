---
name: task-management
description: Use when managing tracked task work, including creating or resuming tasks, deciding when work needs durable task state, maintaining summary/progress/action files, lifecycle states, artifact rules, task numbering, completing tasks, reading or updating 000-summary, summarizing completed tasks, pruning summarized completed task folders, and suggesting task maintenance after many completed tasks.
---

# Task Management

Use this skill to manage durable, resumable task work.

The environment or project may define where task folders are stored. This skill only cares about the structure inside that task root. Do not require agents to provide or repeat a workspace directory. In task instructions and reports, use paths relative to the task root, starting with `<task-id>/` or `000-summary/`.

## Modes

Use ad hoc mode for simple one-shot work that does not need tracking, delegation, artifacts, or resumption.

Use clarification mode when requirements, scope, constraints, or outcome are unclear. Ask minimal targeted questions before planning.

Use task mode when work has multiple steps, may be resumed, benefits from delegation, needs artifacts, needs progress tracking, or belongs to an existing task.

If work is complex enough to need a todo list and involves implementation, validation, delegation, artifacts, or likely resumption, prefer task mode over only an ephemeral in-session todo list. For simple short-lived checklists that do not need durable state, ad hoc mode is enough.

Task mode rules:
- tell the user work is handled as a task before starting
- identify or create a task directory first
- keep one active task per execution flow
- do not mix unrelated tasks
- stay within task scope unless explicitly switching tasks

## Directory structure

```text
<task-id>/
  summary.md
  plan.md
  action.md
  progress.md
  artifact/
```

Rules:
- each task has its own directory
- all task state stays inside its task directory
- no shared global task state
- `summary.md` must exist
- `plan.md`, `action.md`, and `progress.md` are optional but recommended
- artifacts must be stored under `artifact/` and referenced by at least one task markdown file

## Naming

Task ID format:

```text
001-short-name
```

Rules:
- use a stable numeric prefix
- choose the lowest available numeric prefix in the active task root
- ignore `000-summary` when choosing the next task number
- after summarized completed tasks are pruned, numbering may restart from `001`
- use a short descriptive slug
- avoid renaming tasks

## Lifecycle states

Track state in `progress.md` and update it whenever it changes.

States:
- `planning`: task is being defined or structured
- `doing`: active execution is in progress
- `hold`: paused intentionally, not blocked
- `blocked`: cannot proceed due to dependency or issue
- `done`: completed and validated
- `cancelled`: intentionally abandoned

Use `hold` vs `blocked` intentionally.

## File roles

- `summary.md`: goal, scope, constraints, expected outcome, owner, references
- `plan.md`: approach, phases, dependencies
- `action.md`: checklist, execution state, validation steps, blockers
- `progress.md`: lifecycle state, current status, recent changes, next steps, blockers
- `artifact/`: supporting files, examples, logs, notes

When resuming or delegating task work, read:
1. `summary.md`
2. `progress.md`
3. `plan.md` / `action.md`
4. `artifact/`

Keep files task-local. Avoid unrelated files, duplicated state, and orphan artifacts.

## Boundaries and switching

- product or repository files may be changed only when explicitly allowed by the task/request
- no cross-task operations unless explicitly switching tasks
- before switching tasks, update current `progress.md`, ensure `action.md` is current, and clearly indicate the switch

## Execution workflow

Replan when scope changes, assumptions break, the task is blocked, or validation fails. Then update `plan.md`, `action.md`, and `progress.md`.

When work is split across helpers or sub-agents:
- keep one task directory as the shared source of truth
- give each helper clear scope, allowed files, artifact rules, and required progress updates
- keep helper work inside the current task scope unless explicitly switching tasks
- merge helper results into `progress.md` or `action.md` before completing the task
- complete the task only after delegated or helper work has been synthesized and validated

Validate that:
- work matches scope
- checklist is updated
- artifacts are referenced
- blockers are recorded

When done:
- complete `action.md`
- update `progress.md`
- mark state as `done`
- summarize to the user
- stop modifying unless reopened

## Summary archive

`000-summary/` is long-term compressed memory for completed task history.

Read it when:
- starting work in a repository with existing task history
- resuming context after old task folders were removed
- the user asks what has been done so far
- planning work that may depend on previous decisions, constraints, outcomes, or validation

Recommended read order:
1. `README.md`
2. `completed.md`
3. `decisions.md`
4. `outcomes.md`
5. `constraints.md`
6. `validations.md`
7. `next.md`

Do not update `000-summary` unless task maintenance, summarization, pruning, or history compaction was requested.

## Summarize and prune completed tasks

When asked to summarize, archive, compact, digest, prune, clean up, or maintain task history, summarize completed task folders into `000-summary/`, then prune completed task folders that were safely summarized.

Create or update:

```text
000-summary/
  README.md
  completed.md
  decisions.md
  outcomes.md
  constraints.md
  validations.md
  next.md
```

For each task folder, read files in this order when present:
1. `summary.md`
2. `progress.md`
3. `plan.md`
4. `action.md`
5. files under `artifact/`

Rules:
- exclude `000-summary/`
- if no task folders exist besides `000-summary`, report that there is nothing new to summarize
- summarize completed tasks into the archive as appropriate
- do not present active, blocked, held, incomplete, cancelled, or uncertain tasks as completed work
- mention relevant incomplete tasks in `next.md` with their state
- infer missing task state cautiously; when uncertain, treat it as not completed
- digest durable facts; do not concatenate task files or copy long logs
- preserve useful existing archive context when updating `000-summary`
- do not invent validation unsupported by task files
- keep artifacts out of `000-summary` unless explicitly requested; summarize them instead

Prune only task folders that:
- are normal task directories under the active task root
- are not `000-summary`
- are clearly `done`
- were included in the current summary update or are clearly already covered by the existing summary archive
- are not active, blocked, held, incomplete, cancelled, or uncertain

If state or summary coverage is unclear, do not prune the folder.

Before finishing, verify:
- `000-summary/README.md` exists
- `completed.md`, `decisions.md`, `outcomes.md`, `constraints.md`, `validations.md`, and `next.md` exist
- pruned task folders were completed and covered by the summary archive
- active/incomplete/uncertain tasks were not deleted or presented as completed
- `outcomes.md` is not an exhaustive low-value file list
- validation claims are supported by source task files

Final response should report:
- which summary files were created or updated
- which task folders were covered
- whether active/incomplete tasks were skipped or placed in `next.md`
- which completed task folders were pruned
- which task folders were skipped and why

## Maintenance suggestion

When the number of completed task directories reaches `010` or higher, suggest task maintenance before creating or starting the next task.

Rules:
- count only completed task directories, excluding `000-summary`
- do not interrupt active task execution to suggest maintenance
- make the suggestion during task transition, after the current task is marked `done`
- explain that maintenance summarizes completed tasks into `000-summary` and prunes completed task folders afterward
- let the user decide whether to run it now, delay it, or choose a different threshold such as after `020` completed tasks
- do not run maintenance automatically unless the user explicitly requests it
