# my-ascent

Rock-climbing-themed portfolio: a scroll-driven climb up El Capitan's Triple Direct. Next.js 15, React 19, Tailwind 4, Framer Motion. Deployed on Vercel.

## Quickstart

Needs Node 24 (`.nvmrc`). `corepack enable` once makes `pnpm` resolve to the version pinned in `package.json`.

```bash
pnpm bootstrap   # install + create .env
pnpm dev         # https://my-ascent.localhost via portless
pnpm verify      # lint + typecheck + test
```

`pnpm dev` runs through [portless](https://github.com/vercel-labs/portless): Next gets a free `PORT` and a stable URL. In a linked git worktree, the last segment of the branch name becomes a subdomain (`feat/nav` → `https://nav.my-ascent.localhost`), so worktrees run side by side.

The first HTTPS run creates a local certificate authority, adds it to the system trust store, and may ask for `sudo`. Agents and sandboxes skip that:

- `PORTLESS_HTTPS=0 pnpm dev`: plain HTTP through the proxy (`http://my-ascent.localhost`)
- `PORTLESS=0 pnpm dev`: no proxy; Next on its default port

## Environment variables

None required. See `.env.example` for the format used when one is added.

## Cloud environments

No secrets are needed. Every tool runs one command:

| Tool                | Setup                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------- |
| Claude Code (cloud) | Environment setup script: `corepack enable && pnpm bootstrap`                          |
| Cursor              | `.cursor/environment.json` (`install`) and `.cursor/worktrees.json`; already committed |
| Codex               | Setup script field: `corepack enable && pnpm bootstrap`                                |
| Copilot             | `.github/workflows/copilot-setup-steps.yml`; already committed                         |

Known limits: in a sandbox run `PORTLESS=0 pnpm dev` (or `PORTLESS_HTTPS=0`). There are no backing services.
