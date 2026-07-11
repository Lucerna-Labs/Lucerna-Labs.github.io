# Lucerna Labs — Atom architecture mirror

This repository publishes the static GitHub Pages mirror of Jesse G Alicea's
Atom architecture journal.

- GitHub Pages mirror: <https://lucerna-labs.github.io>
- Canonical interactive site: <https://atom-architecture-lab.jgalicea.chatgpt.site>
- Lucerna Labs source collection: <https://github.com/Lucerna-Labs>

The snapshot preserves the public articles, project pages, images, styles, and
browser-side architecture demonstrations. GitHub Pages cannot host the
authenticated OpenRouter and D1 runtime, so Atom Vibe Coder generations open on
the canonical Sites deployment. Generated application ZIPs remain available
there.

## Refreshing the mirror

Run `node scripts/snapshot.mjs` after validating and publishing the canonical
site. The script copies the current client assets and captures every public
route into a GitHub Pages-compatible directory.

## License

PolyForm Small Business License 1.0.0. See [LICENSE](LICENSE).
