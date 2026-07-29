from __future__ import annotations

import json
import shutil
import subprocess
import sys
from pathlib import Path

import cyclopts


REPO_ROOT = Path(__file__).resolve().parent.parent

app = cyclopts.App(help="Development workflows for @devcapsule/adapter.")
docs_app = cyclopts.App(name="docs", help="Documentation workflows.")
app.command(docs_app)


def run(*command: str) -> None:
    raise_for_missing_tool(command[0])
    subprocess.run(command, cwd=REPO_ROOT, check=True)


def raise_for_missing_tool(tool: str) -> None:
    if shutil.which(tool) is None:
        raise cyclopts.CycloptsError(f"Required tool not found on PATH: {tool}")


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
    run("uv", "sync")
    run("npm", "install")


@app.command
def dev() -> None:
    """Run the development test/watch workflow."""
    run("deno", "task", "test")


@docs_app.command(name="build")
def docs_build() -> None:
    """Build documentation."""
    run("npm", "run", "docs:build")


@docs_app.command(name="serve")
def docs_serve() -> None:
    """Serve documentation locally."""
    run("npm", "run", "docs:serve")


@docs_app.command(name="publish")
def docs_publish() -> None:
    """Publish current documentation with Docusaurus."""
    run("npm", "run", "docs:deploy")


@app.command
def build() -> None:
    """Build distributable output."""
    run("deno", "task", "dist")


@app.command
def publish() -> None:
    """Build and publish to JSR."""
    run("deno", "task", "dist")
    run("deno", "task", "publish")


if __name__ == "__main__":
    sys.exit(app())
