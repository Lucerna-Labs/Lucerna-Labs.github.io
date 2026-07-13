# Lucerna Labs — Atom architecture mirror

This repository publishes the static GitHub Pages mirror of Jesse G Alicea's
Atom architecture journal.

- GitHub Pages mirror: <https://lucerna-labs.github.io>
- Canonical interactive site: <https://atom-architecture-lab.jgalicea.chatgpt.site>
- Lucerna Labs source collection: <https://github.com/Lucerna-Labs>

The snapshot preserves the public articles, project pages, images, styles, and
browser-side architecture demonstrations.

## Refreshing the mirror

Run `node scripts/snapshot.mjs` after validating and publishing the canonical
site. The script copies the current client assets and captures every public
route into a GitHub Pages-compatible directory.

## License

PolyForm Small Business License 1.0.0. See [LICENSE](LICENSE).
