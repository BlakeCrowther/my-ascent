"use client";

import { CHAPTERS, PITCH_COUNT, chapterOf, goToPitch, navLabel, pitchLabel, useNavState } from "./pitchNav";
import { ChevronDown, ChevronRight, ChevronUp, X } from "lucide-react";
import { useEffect, useState } from "react";

import { timeline } from "@/config/timeline";

/** Pitch navigation: the route topo on desktop, the pitch dock on phones. */
export function PitchNav() {
  return (
    <>
      <RouteTopo />
      <PitchDock />
    </>
  );
}

function sub(i: number): string {
  const m = timeline[i];
  return [m.org, m.dates].filter(Boolean).join(" · ");
}

/* --------------------------------------------------------------------------
 * Mobile: pitch dock + full pitch-list sheet. The wall stays visible behind.
 * ------------------------------------------------------------------------ */

function Node({ i, active }: { i: number; active: number }) {
  const done = i < active;
  const on = i === active;
  return (
    <span
      className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
        on
          ? "bg-petal text-ink ring-ink ring-2"
          : done
            ? "bg-wine text-petal"
            : "border-wine/40 text-wine border"
      }`}
    >
      {i === 0 ? "•" : i === timeline.length - 1 ? "▲" : i}
    </span>
  );
}

function ChapterList({ active, onPick }: { active: number; onPick?: () => void }) {
  const activeChapter = chapterOf(active);
  const [manual, setManual] = useState<number | null>(null);
  useEffect(() => setManual(null), [activeChapter]);
  const open = manual ?? activeChapter;

  const go = (i: number) => {
    goToPitch(i);
    onPick?.();
  };

  const row = (i: number) => {
    const on = i === active;
    return (
      <li key={timeline[i].id}>
        <button
          type="button"
          onClick={() => go(i)}
          className={`flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left ${
            on ? "bg-ink text-petal" : "text-ink hover:bg-petal-deep"
          }`}
        >
          <Node i={i} active={active} />
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold">
              {navLabel(timeline[i])}
            </span>
            <span className={`block truncate text-xs ${on ? "text-petal/80" : "text-ink-soft"}`}>
              {sub(i) || pitchLabel(i)}
            </span>
          </span>
        </button>
      </li>
    );
  };

  return (
    <div className="text-ink">
      <ul>{row(0)}</ul>
      {CHAPTERS.map((c, ci) => (
        <div key={c.name} className="mt-1">
          <button
            type="button"
            aria-expanded={open === ci}
            onClick={() => setManual(open === ci ? -1 : ci)}
            className="hover:bg-petal-deep flex w-full items-center gap-3 rounded-lg px-2 py-1.5"
          >
            <span
              className={`flex size-6 items-center justify-center rounded-md text-xs font-bold ${
                ci === activeChapter ? "bg-ink text-petal" : "bg-petal-deep"
              }`}
            >
              {c.numeral}
            </span>
            <span className="flex-1 text-left text-sm font-semibold">{c.name}</span>
            <span className="text-ink-soft text-xs">
              P{c.from}
              {Math.min(c.to, PITCH_COUNT) > c.from ? `–${Math.min(c.to, PITCH_COUNT)}` : ""}
            </span>
            {open === ci ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
          {open === ci && (
            <ul className="border-wine/30 mt-1 ml-5 space-y-0.5 border-l border-dashed pl-2">
              {Array.from({ length: c.to - c.from + 1 }, (_, k) => row(c.from + k))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function PitchDock() {
  const { active, inClimb, pastHero } = useNavState();
  const [sheet, setSheet] = useState(false);
  const [manualMin, setMin] = useState<boolean | null>(null);
  const min = manualMin ?? !inClimb;
  const chapter = Math.max(0, chapterOf(active));
  const where =
    active === 0 ? "Base camp" : active === timeline.length - 1 ? "Summit" : `Pitch ${active}/${PITCH_COUNT}`;
  const ch = CHAPTERS[chapter];
  const show = inClimb || !pastHero ? "opacity-100" : "pointer-events-none opacity-0";

  return (
    <>
      {min && (
        <button
          type="button"
          onClick={() => setMin(false)}
          className={`panel text-wine fixed top-3 left-3 z-30 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wider uppercase shadow-md transition-opacity duration-300 md:hidden ${show}`}
        >
          {inClimb ? `${where} · Topo` : "Route topo"} <ChevronDown className="size-4" />
        </button>
      )}
      {min && !inClimb && (
        <div className={`fixed top-3 left-[9.5rem] z-30 md:hidden ${show}`}>
          <JumpToNow className="py-1.5" />
        </div>
      )}
      <div className={`fixed inset-x-0 top-0 z-30 transition-opacity duration-300 md:hidden ${min ? "pointer-events-none opacity-0" : show}`}>
        <div className="panel rounded-b-3xl border-t-0 px-3 pt-3 pb-3">
          <div className="flex items-center justify-between">
            {/* Same spot as the collapsed pill, so one thumb position toggles. */}
            <button
              type="button"
              onClick={() => setMin(true)}
              aria-label="Hide pitch dock"
              className="bg-petal-deep text-wine flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wider whitespace-nowrap uppercase"
            >
              {where} <ChevronUp className="size-4" />
            </button>
            <JumpToNow className="ml-auto mr-3" />
            <button
              type="button"
              onClick={() => setSheet(true)}
              className="text-wine flex items-center gap-1 text-sm font-semibold whitespace-nowrap"
            >
              All pitches <ChevronDown className="size-4" />
            </button>
          </div>
          <div className="bg-petal-deep mt-3 flex gap-1 rounded-full p-1">
            {CHAPTERS.map((c, ci) => (
              <button
                key={c.name}
                type="button"
                onClick={() => goToPitch(c.from)}
                className={`flex-auto truncate rounded-full px-2 py-1.5 text-xs font-semibold ${
                  ci === chapter ? "bg-ink text-petal" : "text-ink"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
          <ul className="mt-3 flex justify-around gap-2">
            {Array.from({ length: ch.to - ch.from + 1 }, (_, k) => ch.from + k).map((i) => (
              <li key={i} className="min-w-0 flex-1">
                <button type="button" onClick={() => goToPitch(i)} className="flex w-full flex-col items-center gap-1 text-center">
                  <Node i={i} active={active} />
                  <span className={`line-clamp-2 text-xs ${i === active ? "text-ink font-bold" : "text-ink-soft font-medium"}`}>
                    {navLabel(timeline[i])}
                  </span>
                  <span className="text-ink-soft text-[11px]">{timeline[i].dates}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {sheet && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button type="button" aria-label="Close pitch list" onClick={() => setSheet(false)} className="absolute inset-0 bg-ink/50" />
          <div className="panel absolute inset-x-0 top-0 max-h-[85svh] overflow-y-auto rounded-b-3xl p-4">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <p className="text-rose text-[11px] font-semibold tracking-wider uppercase">El Capitan · Triple Direct</p>
                <p className="font-hand text-ink text-4xl leading-none">Pitch list</p>
              </div>
              <button type="button" onClick={() => setSheet(false)} aria-label="Close" className="bg-petal-deep rounded-full p-2">
                <X className="size-5" />
              </button>
            </div>
            <ChapterList active={active} onPick={() => setSheet(false)} />
          </div>
        </div>
      )}
    </>
  );
}

/* --------------------------------------------------------------------------
 * Desktop: route topo, a taped guidebook sheet listing every pitch.
 * ------------------------------------------------------------------------ */

function RouteTopo() {
  const { active, inClimb, pastHero } = useNavState();
  const show = inClimb || !pastHero ? "opacity-100" : "pointer-events-none opacity-0";
  const [manualMin, setMin] = useState<boolean | null>(null);
  const min = manualMin ?? !inClimb;
  const years = (i: number) => (timeline[i].dates ?? "").replace(/^.*(\d{4}).*$/, "$1");

  return (
    <>
      {/* Desktop: taped topo sheet */}
      <aside className={`fixed top-20 left-5 z-30 hidden w-[296px] -rotate-1 transition-opacity duration-300 md:block ${show}`} style={{ width: "max-content", maxWidth: "min(500px, 42vw)" }}>
        <span aria-hidden className="absolute -top-2 left-1/2 z-10 h-4 w-20 -translate-x-1/2 rotate-2 bg-white/70 shadow-sm" />
        <div className="panel rounded-md px-4 pt-5 pb-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-hand text-ink text-3xl leading-none">Route topo</p>
              <p className="text-rose text-[11px] font-semibold tracking-wider uppercase">
                El Capitan · {PITCH_COUNT} pitches
              </p>
            </div>
            <button
              type="button"
              onClick={() => setMin(!min)}
              aria-label={min ? "Show route topo" : "Hide route topo"}
              className="text-ink-soft hover:bg-petal-deep rounded-md p-1"
            >
              {min ? <ChevronDown className="size-5" /> : <ChevronUp className="size-5" />}
            </button>
          </div>
          {min && <JumpToNow className="mt-2" />}
          {/* Kept rendered while collapsed so the sheet keeps its full width. */}
          <div className={min ? "invisible h-0 overflow-hidden" : ""} aria-hidden={min}>
          <ol className="mt-2 space-y-0.5">
            {timeline
              .map((_, i) => i)
              .map((i) => {
                const on = i === active;
                const done = i < active;
                const chStart = CHAPTERS.find((c) => c.from === i);
                return (
                  <li key={timeline[i].id}>
                    {chStart && (
                      <p className="text-rose mt-1.5 mb-0.5 flex items-center gap-1.5 px-1.5 text-[10px] font-semibold tracking-wider uppercase">
                        <span>{chStart.numeral}</span>
                        <span>{chStart.name}</span>
                        <span className="border-wine/20 flex-1 border-t border-dashed" />
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => goToPitch(i)}
                      tabIndex={min ? -1 : undefined}
                      className={`group flex w-full cursor-pointer items-center gap-2 rounded px-1.5 py-0.5 text-left text-[13px] transition-colors ${
                        on
                          ? "bg-ink text-petal"
                          : done
                            ? "text-ink hover:bg-petal-deep"
                            : "text-ink-soft hover:bg-petal-deep opacity-45 hover:opacity-100"
                      }`}
                    >
                      <span className="w-4 text-right text-[11px] opacity-70">{i === 0 || i === timeline.length - 1 ? "" : i}</span>
                      <span className={`size-2 shrink-0 rounded-full border ${done || on ? "bg-wine border-wine" : "border-wine/50"}`} />
                      <span className="min-w-0 flex-1 group-hover:underline group-hover:decoration-wine/40 group-hover:underline-offset-2">{navLabel(timeline[i])}</span>
                      <span className="text-[11px] opacity-70">{years(i)}</span>
                      <ChevronRight aria-hidden className="size-3.5 shrink-0 opacity-30 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </button>
                  </li>
                );
              })}
          </ol>
          <div className="mt-2 flex w-0 min-w-full items-center justify-between gap-2">
            <p className="font-hand text-wine text-lg">
              You are on {active === 0 ? "base camp" : active === timeline.length - 1 ? "the summit" : `pitch ${active}`}
            </p>
            <JumpToNow />
          </div>
          </div>
        </div>
      </aside>

    </>
  );
}

/** Skips to the latest stretch of the climb. */
function JumpToNow({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => goToPitch(timeline.length - 2)}
      className={`bg-wine text-petal flex items-center gap-1 rounded-full whitespace-nowrap px-3 py-1 text-xs font-semibold shadow-sm hover:brightness-110 ${className}`}
    >
      Jump to now <ChevronDown className="size-3.5" />
    </button>
  );
}
