from __future__ import annotations

import json
import shutil
import subprocess
import sys
from pathlib import Path

import cyclopts


REPO_ROOT = Path(__file__).resolve().parent.parent
DOCS_SRC_DIR = REPO_ROOT / "docs-src"
SKILL_REFERENCES_DIR = REPO_ROOT / "src" / "agent-skills" / "adapter-framework" / "references"

app = cyclopts.App(help="Development workflows for @devcapsule/adapter.")
docs_app = cyclopts.App(name="docs", help="Documentation and skill-reference workflows.")
app.command(docs_app)


def run(*command: str) -> None:
    raise_for_missing_tool(command[0])
    subprocess.run(command, cwd=REPO_ROOT, check=True)


def raise_for_missing_tool(tool: str) -> None:
    if shutil.which(tool) is None:
        raise cyclopts.CycloptsError(f"Required tool not found on PATH: {tool}")


def should_skip(path: Path, base: Path) -> bool:
    return any(part.startswith("_") for part in path.relative_to(base).parts)


def sync_skill_references() -> None:
    """Sync docs-src into src/agent-skills/adapter-framework/references."""
    if not DOCS_SRC_DIR.exists():
        raise cyclopts.CycloptsError(f"Docs source directory not found: {DOCS_SRC_DIR}")

    shutil.rmtree(SKILL_REFERENCES_DIR, ignore_errors=True)
    SKILL_REFERENCES_DIR.mkdir(parents=True, exist_ok=True)

    for source in sorted(DOCS_SRC_DIR.rglob("*")):
        if should_skip(source, DOCS_SRC_DIR):
            continue

        relative = source.relative_to(DOCS_SRC_DIR)
        destination = SKILL_REFERENCES_DIR / relative

        if source.is_dir():
            destination.mkdir(parents=True, exist_ok=True)
            continue

        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, destination)

    print(
        f"Synced skill references: {DOCS_SRC_DIR.relative_to(REPO_ROOT)} -> {SKILL_REFERENCES_DIR.relative_to(REPO_ROOT)}",
        flush=True,
    )


def package_version() -> str:
    """Read the Adapter package version from deno.json."""
    with (REPO_ROOT / "deno.json").open(encoding="utf-8") as config_file:
        config = json.load(config_file)
    version = config.get("version")
    if not isinstance(version, str) or not version:
        raise cyclopts.CycloptsError("Could not read package version from deno.json")
    return version


@app.command
def setup() -> None:
    """Install or sync local development dependencies."""
    run("uv", "sync", "--group", "docs")
    sync_skill_references()


@app.command
def dev() -> None:
    """Run the development test/watch workflow."""
    run("deno", "task", "test")


@docs_app.command(name="skill-sync")
def docs_skill_sync() -> None:
    """Sync docs into agent skill references."""
    sync_skill_references()


@docs_app.command(name="build")
def docs_build() -> None:
    """Sync skill references and build documentation."""
    sync_skill_references()
    run("uv", "run", "--group", "docs", "mkdocs", "build")


@docs_app.command(name="serve")
def docs_serve() -> None:
    """Sync skill references and serve documentation locally."""
    sync_skill_references()
    run("uv", "run", "--group", "docs", "mkdocs", "serve", "--livereload")


@docs_app.command(name="publish")
def docs_publish(version: str | None = None, alias: str = "latest") -> None:
    """Publish versioned documentation with mike."""
    docs_version = version or package_version()
    sync_skill_references()
    run(
        "uv",
        "run",
        "--group",
        "docs",
        "mike",
        "deploy",
        "--push",
        "--update-aliases",
        "--alias-type",
        "copy",
        "--branch",
        "docs",
        "--remote",
        "origin",
        docs_version,
        alias,
    )
    run(
        "uv",
        "run",
        "--group",
        "docs",
        "mike",
        "set-default",
        "--push",
        "--branch",
        "docs",
        "--remote",
        "origin",
        alias,
    )


@app.command
def build() -> None:
    """Sync skill references and build distributable output."""
    sync_skill_references()
    run("deno", "task", "dist")


@app.command
def publish() -> None:
    """Sync skill references, build, and publish to JSR."""
    sync_skill_references()
    run("deno", "task", "dist")
    run("deno", "task", "publish")


if __name__ == "__main__":
    sys.exit(app())
