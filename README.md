# my-ascent

Rock-climbing-themed portfolio: a scroll-driven climb up El Capitan's Triple Direct. Next.js 15, React 19, Tailwind 4, Framer Motion. Deployed on Vercel.

## Quickstart

Needs Node 24 (`.nvmrc`) and pnpm (`corepack enable` picks the pinned version).

```bash
pnpm run setup   # install + create .env
pnpm dev         # http://<branch>.my-ascent.localhost via portless
pnpm verify      # lint + typecheck + test
```

Use `pnpm run setup`, not `pnpm setup`: the latter is a pnpm builtin that edits your shell config.

`PORTLESS=0 pnpm dev` runs Next directly on its default port, skipping the proxy.

## Environment variables

None required. See `.env.example` for the format used when one is added.

## Cloud environments

No secrets are needed. Every tool only has to run one command:

| Tool                | Setup                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------- |
| Claude Code (cloud) | Environment setup script: `corepack enable && pnpm run setup`                          |
| Cursor              | `.cursor/environment.json` (`install`) and `.cursor/worktrees.json`; already committed |
| Codex               | Setup script field: `corepack enable && pnpm run setup`                                |
| Copilot             | `.github/workflows/copilot-setup-steps.yml`; already committed                         |

Known limits: `pnpm dev` needs portless, which wants Node 24+ and, for HTTPS, a local CA; in a sandbox use `PORTLESS=0 pnpm dev`. There are no backing services.
