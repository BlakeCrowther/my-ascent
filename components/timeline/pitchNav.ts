"use client";

import { Milestone, timeline } from "@/config/timeline";
import { useEffect, useState } from "react";

/** Pitches are everything between base camp and the summit. */
export const PITCH_COUNT = timeline.length - 2;

/** Chapter names are layout copy, not data; ranges are timeline indexes. */
export const CHAPTERS = [
  { numeral: "I", name: "Undergrad", from: 1, to: 3 },
  { numeral: "II", name: "Engineering", from: 4, to: 6 },
  { numeral: "III", name: "AI & Data Science", from: 7, to: 12 },
];

export function chapterOf(index: number): number {
  return CHAPTERS.findIndex((c) => index >= c.from && index <= c.to);
}

/** Short label for nav lists. Never shows a "Lead" title for HeadsUp Lab. */
export function navLabel(m: Milestone): string {
  return m.org === "HeadsUp Lab" && /\bLead\b/.test(m.title) ? m.org : m.title;
}

export function pitchLabel(index: number): string {
  if (index === 0) return "Base camp";
  if (index === timeline.length - 1) return "Summit";
  return `Pitch ${index}`;
}

export function goToPitch(index: number) {
  document
    .getElementById(`climb-${timeline[index].id}`)
    ?.scrollIntoView({ behavior: "smooth", block: "center" });
}

type NavState = { active: number; pastHero: boolean; inClimb: boolean };

/** Which milestone is nearest screen centre, plus where the reader is. */
export function useNavState(): NavState {
  const [state, setState] = useState<NavState>({
    active: 0,
    pastHero: false,
    inClimb: false,
  });

  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const mid = window.innerHeight * 0.5;
      let best = 0;
      let bestDist = Infinity;
      timeline.forEach((m, i) => {
        const el = document.getElementById(`climb-${m.id}`);
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      const climb = document.getElementById("climb")?.getBoundingClientRect();
      const inClimb = !!climb && climb.top < mid && climb.bottom > mid;
      const pastHero = window.scrollY > window.innerHeight * 0.6;
      setState((s) =>
        s.active === best && s.inClimb === inClimb && s.pastHero === pastHero
          ? s
          : { active: best, inClimb, pastHero },
      );
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return state;
}
