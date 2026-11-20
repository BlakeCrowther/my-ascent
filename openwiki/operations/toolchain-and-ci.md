---
type: operations
title: Toolchain, CI and environment
description: How to bootstrap, run and verify my-ascent, how env vars are checked, what CI runs, and how it deploys on Vercel.
tags: [pnpm, ci, env, portless, vercel]
verified:
  - by: openwiki/0.9.0
    at: 2026-11-20T00:31:46.360Z
sources:
  - id: openwiki-source-164e2da859b5277df81c7d94
    resource: repo://.github/workflows/ci.yml
  - id: openwiki-source-50a18d054b596a7ed0eeffb0
    resource: repo://next.config.ts
  - id: openwiki-source-5b54a58d1b51cd490b0e7162
    resource: repo://package.json
  - id: openwiki-source-6d38ddc8e5301aa275fb2edd
    resource: repo://scripts/bootstrap.mjs
generated: { by: "claude-code", at: "2026-11-20T00:31:46.360Z" }
---

# Toolchain, CI and environment

## Commands

All are `package.json` scripts, run with pnpm (version pinned by `packageManager`; Node 24 via `.nvmrc`; `corepack enable` selects the pinned pnpm).

| Command            | Does                                                                |
| ------------------ | ------------------------------------------------------------------- |
| `pnpm bootstrap`   | `scripts/bootstrap.mjs`: frozen install, create `.env`, check vars  |
| `pnpm dev`         | `portless run next dev --turbopack`; stable `my-ascent.localhost`   |
| `pnpm lint`        | ESLint with zero warnings, then Prettier check                      |
| `pnpm typecheck`   | `tsc --noEmit`                                                      |
| `pnpm test`        | Vitest over `tests/**/*.test.ts`                                    |
| `pnpm verify`      | lint, typecheck, test in order; the gate before claiming done       |

The script is named `bootstrap` because `pnpm setup` is a pnpm builtin that edits shell config.

## Environment

The app reads no env vars, so `.env.example` is header-only. `bootstrap` still copies it to `.env` and fails if any variable marked `required` is empty or still the placeholder, unless the process env supplies it (cloud secrets). The check lives in `scripts/env.mjs` and is unit-tested.

## CI and cloud shims

- `.github/workflows/ci.yml` runs one job, `verify`: checkout, pnpm, Node from `.nvmrc`, `pnpm bootstrap`, `pnpm verify`. It runs on PRs and pushes to main, and `verify` is a required status check on main.
- Cursor (`.cursor/environment.json`, `.cursor/worktrees.json`) and Copilot (`copilot-setup-steps.yml`) shims only run `corepack enable && pnpm bootstrap`.
- Fresh worktrees get `.env` copied via `.worktreeinclude`.

## Dev server and ports

No ports are hardcoded. portless assigns `PORT` and serves a named URL; in a linked worktree the branch's last `/` segment becomes the subdomain. Default mode is HTTPS and may need sudo on first run; agents and sandboxes use `PORTLESS_HTTPS=0` or `PORTLESS=0`.

## Deploy

Vercel deploys from main with per-PR previews. `next.config.ts` sets `images.unoptimized` so images are served as static files rather than through Vercel Image Optimization (Hobby plan cap); images in `public/images` are pre-converted to WebP.
