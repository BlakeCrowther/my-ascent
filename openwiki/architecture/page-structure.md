---
type: architecture
title: Page structure
description: The single-page layout in app/page.tsx - fixed background, climber overlay, three scrolling sections, URL hash sync, and the contact form's external dependency.
tags: [layout, nextjs, scroll, contact]
verified:
  - by: openwiki/0.9.0
    at: 2026-11-20T00:31:46.360Z
sources:
  - id: openwiki-source-f63ba5482783f8aa31cd7fbd
    resource: repo://app/page.tsx
  - id: openwiki-source-f6eada2955e4ff851ab7ef3d
    resource: repo://components/contact/ContactSection.tsx
generated: { by: "claude-code", at: "2026-11-20T00:31:46.360Z" }
---

# Page structure

The whole site is one client-rendered route, `app/page.tsx`, inside the root layout in `app/layout.tsx` (fonts via `next/font/google`, site metadata and social cards).

## Layers

1. A fixed full-screen background `<picture>`: a landscape image and a portrait crop (`max-aspect-ratio: 3/4`) of Yosemite Valley with El Capitan.
2. `Climber`, an overlay that animates along the route over that background (see [Climb model](climb-model.md)), and `PitchNav`, the pitch and chapter navigation.
3. A scrolling content container above them with `pointer-events-none`; only cards and the contact section opt back into pointer events, so clicks reach the route.

The content container holds three sections: welcome (full viewport), `#climb` (`TimelineSection`), and `#contact` (`ContactSection`).

## URL hash sync

`page.tsx` uses `useInView` on the three sections and rewrites the URL with `history.replaceState`: empty for welcome, `#climb`, or `#contact`. On load, any existing hash is cleared and the page scrolls to top, so deep links to sections do not stick.

## Contact form

`ContactSection` posts the form with `fetch` to a Formspree endpoint. That is the site's only external write dependency; there are no app env vars (see [Toolchain and CI](../operations/toolchain-and-ci.md)).

## Gotchas

- Background art direction matters: the climber's path is traced against the landscape image and `BACKGROUND_ASPECT` in `Climber.tsx`; swapping the background image means re-tracing the route.
- Because the content layer ignores pointer events, new interactive elements need `pointer-events-auto`.
