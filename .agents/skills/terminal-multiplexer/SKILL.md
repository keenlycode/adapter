---
name: terminal-multiplexer
description: Use when starting, managing, or inspecting long-running terminal processes such as dev servers, watchers, or logs. Detect the current OS and available tools, prefer `tmux` when available, discover suitable platform-specific fallback tools automatically, reuse existing sessions when safe, and confirm the session-management approach with the user before starting a new long-running process.
---

# Terminal Multiplexer

Use this skill when work involves a long-running process that should survive beyond a single shell command, especially dev servers, file watchers, and log tails.

At the start of a relevant task, confirm the session-management approach with the user before creating a new long-running process. A skill cannot force a prompt at the literal start of every session, so apply this confirmation when the task first involves long-running process management.

## Defaults

- Prefer `tmux` for long-lived dev servers when it is available.
- If `tmux` is unavailable or unsuitable, discover the best available persistent-session tool for the current OS and shell.
- Prefer direct commands for short-lived checks that do not need a managed session.

## Operating Rules

- Prefer non-interactive commands and scripted session management over driving interactive UIs manually.
- Reuse existing sessions when safe instead of creating duplicates.
- Use clear, task-specific session names when creating a new session.
- Do not kill unrelated sessions unless explicitly requested.
- If a process is already running in a suitable session, attach, inspect, or reuse it instead of starting another copy.
- Detect the operating system and available tools before choosing the session manager.
- On Windows, favor solutions that work in the current shell environment instead of assuming Unix tooling is present.

## Workflow

1. Decide whether the command is long-running enough to justify a managed session.
2. Detect the OS and probe for available tools, preferring `tmux` when it exists.
3. Confirm the intended approach with the user before starting a new long-running process.
4. Look for an existing relevant session before creating a new one.
5. If no suitable session exists, create one with a clear name and start the process there.
6. Capture enough output to confirm startup success, the listening address, or the immediate failure mode.
7. Report the session name and the command used so the user can reconnect or manage it later.

## Tool Selection

Choose `tmux` first when it is available and practical for the current environment.

If `tmux` is unavailable, probe for suitable alternatives appropriate to the current OS and shell instead of assuming a fixed fallback list. Prefer tools that support persistent sessions, non-interactive startup, and later log inspection.

Probe availability with simple checks appropriate to the shell, for example `command -v tmux` on POSIX shells or the PowerShell equivalent on Windows.

## Command Guidance

Prefer patterns like these, adjusting names to the project:

```bash
tmux list-sessions
tmux new-session -d -s <session-name> '<cmd>'
tmux capture-pane -pt <session-name>
```

```powershell
Get-Command tmux
Start-Job -Name <job-name> -ScriptBlock { <cmd> }
Get-Job -Name <job-name>
Receive-Job -Name <job-name>
```

If `tmux` is unavailable, choose a platform-appropriate alternative that supports persistence and later inspection. On Windows, a persistent PowerShell or terminal-job approach is acceptable when no better multiplexer is available.

## What To Avoid

- Do not create a new session for every command.
- Do not start duplicate dev servers on the same port unless the user asked for parallel instances.
- Do not rely on interactive UI navigation when a direct command can create, inspect, or reuse the session.
- Do not assume any specific non-`tmux` tool exists without checking first.
