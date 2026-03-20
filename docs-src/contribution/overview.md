# Adapter Dev Guide – Overview

This folder contains development notes for humans and AI tools working on Adapter.

## What is Adapter?

Adapter is a lightweight CSS-in-JS toolkit for Web Components. It focuses on:

- Styling custom elements using plain JavaScript/TypeScript.
- Scoped, composable CSS for Web Components and Shadow DOM.
- A tiny, framework-agnostic runtime that runs in Browser, Deno, and Node.

For a user-facing introduction, see the main `readme.md`.

## Repository Layout

- `src/` – Core TypeScript source code for Adapter.
- `test-src/` – Tests, experiments, and examples.
- `esbuild/` – Build scripts and bundling configs (browser / Node bundles).
- `dev-guide/` – Development docs (this folder).
- `deno.json` – Deno tasks for build, test, docs.
- `package.json` – npm metadata and legacy tooling.
- `changelog.md` – Version history.
- `LICENSE.md` – License.

## Design Philosophy

- **Web Components first** – The primary target is custom elements + Shadow DOM.
- **Tiny and predictable** – Avoid heavy dependencies and surprising magic.
- **CSS is data** – Treat CSS as composable strings, not opaque blobs.
- **Stable base class** – `Adapter` should remain stable and well-documented.
- **Multi-runtime** – Behaviour should be consistent across Browser, Deno, Node.

## How to Read the Rest of Dev Guide

- `workflows.md` - Build, test, docs commands.
- `docstring.md` - Docstring style guide and rules: TSDoc/JSDoc conventions, required tags, examples, and policies for documenting APIs.
- `development.md` - AI Development Guide: goals, repo overview, task style for AI/human contributors, testing/build expectations, docstring policy, and change-safety rules to keep changes small, focused, and non‑breaking.
