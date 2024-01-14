# Change Log

## [v2.4.7], 2024-01-14

### Added
- Support setting CSS by `<element>.setAttribute('css')`

## [v2.4.0], 2024-01-05

### Added
- Support for Shadow DOM 🎉

## [v2.3.5], 2024-01-02

### Changed
- Deprecate `Adapter.tagStyle()` and `Adapter.classStyle()`.
  Will be remove in v3.x

### Fixed
- perf: improve tree shaking process, refactor, formatter
- `npm run test` now works in Javascript Environment.


## [v2.3.4]

### Added
- `cssProcess()` : Can use CSS Processor like **stylis** or **lightencss**.
- **stylis** is the default CSS processor.

## [v2.1.0]

### Addded
- `AdapterMixin()` can be use to extends other classes which based on `HTMLElement`.
- Improve `Adapter.define()` <style> injection.
- `[Adapter Object].addStyle()` insert <style> inside component's tag.
- Test Framework and Unit Test.