"use client";

import {
  Briefcase,
  FolderGit2,
  GraduationCap,
  Mountain,
  Tent,
} from "lucide-react";
import { Milestone, MilestoneKind, timeline } from "@/config/timeline";
import { useInView } from "framer-motion";
import { useRef } from "react";

import { FilmFrame } from "@/components/timeline/FilmFrame";
import Image from "next/image";
import { MotionCard } from "@/components/ui/card";
import { ProjectPolaroids } from "@/components/timeline/ProjectPolaroids";
import { REVEAL } from "@/components/timeline/reveal";
import { navLabel } from "@/components/timeline/pitchNav";
import { climbFilm } from "@/config/climbFilm";

const KIND_ICON: Record<MilestoneKind, typeof Briefcase> = {
  intro: Tent,
  education: GraduationCap,
  work: Briefcase,
  project: FolderGit2,
  summit: Mountain,
};

const KIND_LABEL: Record<MilestoneKind, string> = {
  intro: "Base camp",
  education: "Education",
  work: "Work",
  project: "Project",
  summit: "Summit",
};

type Entry =
  | { kind: "milestone"; t: number; index: number }
  | { kind: "film"; t: number; index: number };

/** Milestones and film frames merged into one list, base to summit. */
const ENTRIES: Entry[] = [
  ...timeline.map((m, index) => ({
    kind: "milestone" as const,
    t: m.landmark.t,
    index,
  })),
  ...climbFilm.map((f, index) => ({ kind: "film" as const, t: f.t, index })),
].sort((a, b) => a.t - b.t);

/** Cards are the only clickable parts of this section; the route shows through. */
export function TimelineSection() {
  return (
    <ol className="pointer-events-none flex flex-col">
      {ENTRIES.map((entry) =>
        entry.kind === "milestone" ? (
          <MilestoneCard
            key={timeline[entry.index].id}
            milestone={timeline[entry.index]}
            index={entry.index}
          />
        ) : (
          <FilmFrame
            key={climbFilm[entry.index].id}
            frame={climbFilm[entry.index]}
            index={entry.index}
          />
        ),
      )}
    </ol>
  );
}

function MilestoneCard({
  milestone,
  index,
}: {
  milestone: Milestone;
  index: number;
}) {
  const next = timeline[index + 1];
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, REVEAL);
  const Icon = KIND_ICON[milestone.kind];
  const isIntro = milestone.kind === "intro";
  const isMinor = milestone.kind === "project";
  const showPitch = milestone.kind !== "intro" && milestone.kind !== "summit";

  return (
    <li
      ref={ref}
      id={`climb-${milestone.id}`}
      data-climb-t={milestone.landmark.t}
      className="flex min-h-[70svh] flex-col justify-center py-8 md:min-h-[80svh]"
    >
      {/* One lane: centred on the page, pushed right only when the topo needs the room. */}
      <div
        className={`mr-14 w-full max-w-xl sm:mx-auto md:mr-0 md:ml-[max(26.5rem,calc((100%-42rem)/2))] md:w-[42rem] md:max-w-[calc(100%-28.5rem)]`}
      >
        <MotionCard
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pointer-events-auto w-full gap-4"
        >
          <div className="text-rose flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold tracking-wider uppercase">
            <span className="flex items-center gap-1.5">
              <Icon className="size-4" aria-hidden />
              {KIND_LABEL[milestone.kind]}
            </span>
            <span aria-hidden>·</span>
            <span>
              {showPitch ? `Pitch ${index} · ` : ""}
              {milestone.landmark.name}
            </span>
          </div>

          <div className="flow-root [&>p]:mt-4">
            {milestone.lifePhoto && isIntro && (
              <div className="relative float-left mr-4 mb-2 size-32 overflow-hidden rounded-lg sm:size-40">
                <Image src={milestone.lifePhoto} alt="" fill sizes="160px" className="object-cover" />
              </div>
            )}
            <div className="flex gap-4">
              <div className="min-w-0 flex-1">
                {milestone.dates && (
                  <p className="text-ink-soft text-sm">{milestone.dates}</p>
                )}
                <h3
                  className={`text-ink font-bold ${
                    isMinor ? "text-xl" : "text-2xl"
                  }`}
                >
                  {milestone.title}
                </h3>
                {milestone.org && (
                  <p className="text-wine font-medium">{milestone.org}</p>
                )}
              </div>
              {milestone.lifePhoto && !isIntro && (
                <div className="relative size-20 shrink-0 overflow-hidden rounded-lg sm:size-24">
                  <Image src={milestone.lifePhoto} alt="" fill sizes="96px" className="object-cover" />
                </div>
              )}
            </div>
          {milestone.summary.split("\n\n").map((para) => (
            <p key={para} className="text-ink-soft">
              {para}
            </p>
          ))}
          </div>

          {milestone.highlights && (
            <ul className="text-ink-soft list-disc space-y-1 pl-5 text-sm">
              {milestone.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          )}

          {milestone.tags && (
            <div className="flex flex-wrap gap-2">
              {milestone.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-petal-deep text-ink rounded-full px-2.5 py-0.5 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </MotionCard>
        {next && (
          <div className="border-wine/25 bg-[#f1d3cf]/95 pointer-events-auto mt-3 rounded-xl border px-4 py-3 shadow-md backdrop-blur-sm md:hidden">
            <p className="text-rose text-[11px] font-semibold tracking-wider uppercase">
              Next ·{" "}
              {next.kind === "summit"
                ? next.landmark.name
                : `Pitch ${index + 1} · ${next.landmark.name}`}
            </p>
            <p className="font-hand text-ink text-2xl leading-tight">
              {navLabel(next)}
            </p>
          </div>
        )}
      </div>
      {milestone.projects && (
        <div className={`mr-14 w-full max-w-xl sm:mx-auto md:mt-6 md:mr-0 md:ml-[max(26.5rem,calc((100%-42rem)/2))] md:w-[42rem] md:max-w-[calc(100%-28.5rem)]`}>
          <ProjectPolaroids
            slugs={milestone.projects}
            label={milestone.org ?? milestone.title}
          />
        </div>
      )}
    </li>
  );
}
