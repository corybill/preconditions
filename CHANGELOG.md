# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.0.2] - 2026-05-15

### Changed

- **`errr`** raised to **5.2.0** (see [errr changelog](https://github.com/corybill/errr/blob/master/CHANGELOG.md)).

### Added

- This **`CHANGELOG.md`**.

## [4.0.1] - 2026-05-15

### Changed

- **`errr`** raised from 5.0.x to **5.1.0** (e.g. `formatDebugParams` and related debug-stack helpers in errr).

## [4.0.0] - 2026-05-15

### Added

- **ESM** package layout (`"type": "module"`) with explicit **`exports`**: `import` → `lib/preconditions.js`, `require` → `lib/preconditions.cjs` (CommonJS consumers still use `require("preconditions")` unchanged).
- **`lib/util/type-checks.js`** — native type checks replacing the **`core-util-is`** dependency.
- **`eslint.config.js`** — ESLint 9 flat config.
- **GitHub Actions** CI (`.github/workflows/ci.yml`) on Node.js **24.x** and **25.x**; `actions/checkout@v5`, `actions/setup-node@v6`.
- **`npm overrides`** for dev dependency trees (e.g. maddox + mocha) to keep audits clean.

### Changed

- **Minimum Node.js** is **24** (`engines.node`: `>=24.0.0`).
- **`errr`** updated to **5.x** (fluent builder API remains; `ErrrDecorator` still uses `Errr.newError`, `.debug`, `.appendTo`, `.throw`).
- **Dev tooling**: Mocha 11, Chai 5, **Maddox 4** (default export wrapper in `spec/maddox.js`), jsdoc-to-markdown 9.
- **Singleton** message formatting uses `node:util` **`format`** instead of `util.format.apply`.
- README build badge points to GitHub Actions instead of Travis CI.

### Removed

- **`core-util-is`** dependency.
- **`.travis.yml`** (replaced by GitHub Actions).
- Legacy scripts such as **`coverage`** that referenced a missing `bin/maddox-cov.js`.

### Breaking

- **Node &lt; 24** is not supported.
- **`errr` 5.x** is required as a runtime dependency; upgrade errr in consuming apps if they pin it tightly.
- **`core-util-is`** is no longer a transitive dependency.

[4.0.2]: https://github.com/corybill/preconditions/compare/v4.0.1...v4.0.2
[4.0.1]: https://github.com/corybill/preconditions/compare/v4.0.0...v4.0.1
[4.0.0]: https://github.com/corybill/preconditions/compare/v3.0.2...v4.0.0
