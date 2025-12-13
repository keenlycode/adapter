# Workflows

This file describes how to build, test, and release Adapter.

## Prerequisites

* Deno
* Git
* Optional: Node.js + npm

## Setup

```bash title="Bash"
git clone https://github.com/keenlycode/adapter.git
cd adapter
npm install # optional
```

## Build

```bash title="Bash"
deno task dist
```

Outputs go to `dist/`.

## Test

```bash title="Bash"
deno task test
# or
npm test
```

## Docs (if configured)

```bash title="Bash"
deno task docs
```

If this task does nothing yet, it’s safe to ignore.
