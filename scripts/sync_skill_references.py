"""Sync skill-readable docs references from docs-src into skills/adapter/references.

Copies files and directories from docs-src while skipping any path segment whose
name starts with "_". The output is a markdown-focused reference snapshot that
AI skills can read without pulling in MkDocs-only assets or theme overrides.
"""

from __future__ import annotations

from pathlib import Path
import shutil


REPO_ROOT = Path(__file__).resolve().parent.parent
DOCS_SRC_DIR = REPO_ROOT / "docs-src"
REFERENCES_DIR = REPO_ROOT / "skills" / "adapter" / "references"


def should_skip(path: Path, base: Path) -> bool:
    return any(part.startswith("_") for part in path.relative_to(base).parts)


def main() -> None:
    if not DOCS_SRC_DIR.exists():
        raise SystemExit(f"docs source directory not found: {DOCS_SRC_DIR}")

    shutil.rmtree(REFERENCES_DIR, ignore_errors=True)
    REFERENCES_DIR.mkdir(parents=True, exist_ok=True)

    for source in sorted(DOCS_SRC_DIR.rglob("*")):
        if should_skip(source, DOCS_SRC_DIR):
            continue

        relative = source.relative_to(DOCS_SRC_DIR)
        destination = REFERENCES_DIR / relative

        if source.is_dir():
            destination.mkdir(parents=True, exist_ok=True)
            continue

        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, destination)


if __name__ == "__main__":
    main()
