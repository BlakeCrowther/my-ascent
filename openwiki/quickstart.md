---
type: quickstart
title: Quickstart
description: What my-ascent is and which wiki page answers which kind of question.
tags: [overview, routing]
verified:
  - by: openwiki/0.9.0
    at: 2026-11-20T00:31:46.360Z
sources:
  - id: openwiki-source-f63ba5482783f8aa31cd7fbd
    resource: repo://app/page.tsx
  - id: openwiki-source-b49b640e6c7f78211688fde9
    resource: repo://config/timeline.ts
generated: { by: "claude-code", at: "2026-11-20T00:31:46.360Z" }
---

# Quickstart

my-ascent is a Next.js portfolio presented as a climb of El Capitan: scrolling moves a climber along a traced route past cards for education, work and projects, with film photos from the real climb. It deploys on Vercel.

## Where to look

| Question                                                  | Page                                                              |
| --------------------------------------------------------- | ----------------------------------------------------------------- |
| How is the page laid out; why do clicks pass through?     | [Page structure](architecture/page-structure.md)                  |
| How do config entries become cards and climber movement?  | [Climb model](architecture/climb-model.md)                        |
| Adding or reordering a milestone, project or film frame   | [Climb model](architecture/climb-model.md) (`t` scale, invariants) |
| How to run, verify, deploy, or set up a cloud sandbox     | [Toolchain, CI and environment](operations/toolchain-and-ci.md)   |

## Layout

- `app/`: the single route and layout.
- `components/`: `climber/`, `timeline/`, `welcome/`, `contact/`, `ui/` (shadcn-style primitives).
- `config/`: typed content (`timeline.ts`, `projects.ts`, `climbFilm.ts`).
- `tests/`: content-integrity and env-check tests.

Exact commands are in `AGENTS.md`; `pnpm verify` is the gate.
