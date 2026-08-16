# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

This is the source repository for [QGIS Tutorials and Tips](http://www.qgistutorials.com). It is a documentation/content site, not an application — tutorials are written in reStructuredText (`.rst`) and built into static HTML with Sphinx. There is no test suite or linter.

Full setup and build instructions: @README.md

## Content location

- New tutorials go under `source/docs/3/` (current QGIS 3.x content).
- `source/docs/` (without the `3/`) is legacy QGIS 2.x content, much of it superseded — pages there often contain a `.. warning::` redirect to the `docs/3/` equivalent. Don't add new tutorials here.
- Tutorial images/assets live in `resources/en/docs/`. Sample datasets referenced by tutorials live in `downloads/`.
- `i18n/<lang>/LC_MESSAGES/` holds translated `.po`/`.mo` catalogs (~22 languages), managed via Transifex — don't hand-edit these.

## Build gotchas

- Set `export LC_ALL=C` before running `make` (locale error otherwise) — see README for the persistent setup.
- `make html` builds English HTML into `build/html/en/`; preview with `python -m http.server` at `http://localhost:8000/build/html/en/`.
- `make gh-pages` switches to the `gh-pages` branch, commits, and force-pushes directly — avoid running it with uncommitted changes on `master`. In normal use it's unnecessary: the GitHub Action (`.github/workflows/deploy.yml`) deploys `gh-pages` automatically on every push to `master`.

## Linting

Run `sphinx-lint <file>.rst` against files you add or edit before committing (it's Sphinx-aware, unlike `doc8`/`rstcheck`, so it doesn't false-positive on Sphinx roles like `:menuselection:` or `code-block:: none`). Don't run it repo-wide — the existing content has a large backlog of pre-existing whitespace/tab warnings that aren't worth fixing as a side effect of unrelated changes.

## RST style

Follow the formatting guide table in README.md (title/heading underlines, `:menuselection:`, `:guilabel:`, `kbd:`, literal layer/file names, etc.) for all tutorial content.

## Git conventions

Commit messages in this repo are almost always the terse `update` — match that existing style rather than writing descriptive messages.
