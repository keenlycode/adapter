# Changelog

## 3.3.1

- Fixed the JSR one-shot skill installer so it can install packaged skills when
  run from a remote `jsr:` URL.
- Clarified AI skill install docs for JSR npm-compatibility setup instead of
  assuming a separately published npm package.

## 3.3.0

- Added the packaged `adapter-design-system` skill for step-by-step
  Adapter-based design-system planning.
- Renamed the packaged runtime guidance skill to `adapter-framework` and
  clarified its boundary with design-system guidance.
- Updated `adapter-skill-install` to install both `adapter-framework` and
  `adapter-design-system`.
- Added docs/dev CLI workflow support for syncing docs into packaged skill
  references.
- Kept OpenCode config, task state, and Python bytecode caches local-only via
  `.gitignore`.

## 3.2.2

- Refined the Adapter AI skill description to focus on building, reviewing, and
  debugging `Adapter` and `AdapterMixin` components.
- Rewrote the `# Adapter` introduction in the skill to describe what Adapter is
  using the repo's public product wording.
- Removed installed-package doc discovery workflow from the skill, including
  `docs-src` lookup and package-resolution commands.
- Made the skill itself the default guide for normal Adapter answers.
- Kept repo-local references under
  `src/agent-skills/adapter-framework/references/` as optional deeper reading.
