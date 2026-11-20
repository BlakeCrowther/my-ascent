---
type: architecture
title: Climb model
description: How the typed content in config/ (timeline, landmarks, projects, film frames) drives the climber animation, the timeline cards, the pitch navigation, and the content-integrity tests.
tags: [climb, config, timeline, climber, content]
verified:
  - by: openwiki/0.9.0
    at: 2026-11-20T00:31:46.360Z
sources:
  - id: openwiki-source-6b017b29ed221ced4203b6c9
    resource: repo://components/climber/Climber.tsx
  - id: openwiki-source-3bbce64e54efa04ab15008e4
    resource: repo://components/timeline/TimelineSection.tsx
  - id: openwiki-source-c7cfe54b27e8d5b3e4a43ffb
    resource: repo://config/climbFilm.ts
  - id: openwiki-source-b49b640e6c7f78211688fde9
    resource: repo://config/timeline.ts
  - id: openwiki-source-6e3f9f925439059c780a519e
    resource: repo://tests/content.test.ts
generated: { by: "claude-code", at: "2026-11-20T00:31:46.360Z" }
---

# Climb model

The site is a portfolio told as an ascent of El Capitan via Triple Direct. Content is data in `config/`; components render it and a scroll-driven climber icon follows a traced route over a background photo.

## One scale: `t`

Every placed item carries `t`, a fraction along the route (0 = base camp, 1 = summit).

- `LANDMARKS` in `config/timeline.ts` names points on the route (Base camp `0` through The Summit `1`).
- Each `Milestone` in `timeline` has a `landmark`; its `t` is the landmark's `t`.
- Each `FilmFrame` in `config/climbFilm.ts` has its own `t`, placed between two milestones.
- `projects` in `config/projects.ts` are not placed on the route. Milestones reference them by `slug` and show them in a project panel.

## Rendering

- `TimelineSection` merges milestones and film frames into one list sorted by `t` and renders it as cards.
- Cards mark themselves with a `data-climb-t` attribute. `Climber` reads every such element, centres its keypoints on screen position, and interpolates the climber's position along `climbingPath` (currently `tripleDirectPath` in `components/climber/path.ts`) from scroll. Keypoints must increase in both scroll and `t`; out-of-order anchors are skipped.
- `pitchNav.ts` derives pitch numbers and chapter groupings from timeline indexes: pitches are everything between base camp and the summit, and `CHAPTERS` ranges are index-based, so inserting a milestone shifts chapter boundaries.

## Invariants

- Timeline and film entries stay sorted by `t`. Out-of-order entries break the climber interpolation and card order.
- Image paths used by projects, life photos and film frames must exist under `public/`.
- Milestone project slugs must resolve in `projects`.

`tests/content.test.ts` enforces all three and is the main test that catches content mistakes. Route coordinates and `PATH_TRANSFORM_MATRIX` are tuned by eye against `public/images/background.webp`; re-exporting the SVG trace means re-checking the landmark `t` values.
