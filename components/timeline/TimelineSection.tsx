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
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const Icon = KIND_ICON[milestone.kind];
  const isMinor = milestone.kind === "project";
  const showPitch = milestone.kind !== "intro" && milestone.kind !== "summit";

  return (
    <li
      ref={ref}
      id={`climb-${milestone.id}`}
      data-climb-t={milestone.landmark.t}
      className={`flex min-h-[70dvh] flex-col justify-center py-8 md:grid md:min-h-[80dvh] md:grid-cols-[34%_30vw_minmax(0,1fr)] md:gap-x-[3vw] ${
        milestone.projects ? "md:items-start md:pt-[12vh]" : "md:items-center"
      }`}
    >
      {/* Right column; with projects it stays put while they scroll by. */}
      <div
        className={`mr-14 w-full sm:mx-auto md:col-start-3 md:row-start-1 md:mr-[8%] md:ml-0 ${
          isMinor ? "max-w-md" : "max-w-xl"
        } ${milestone.projects ? "md:sticky md:top-[12vh]" : ""}`}
      >
        <MotionCard
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.7 }}
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
            {milestone.lifePhoto && (
              <div className="relative size-20 shrink-0 overflow-hidden rounded-lg sm:size-24">
                <Image
                  src={milestone.lifePhoto}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <p className="text-ink-soft">{milestone.summary}</p>

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
      </div>
      {milestone.projects && (
        <div className="mr-14 w-full max-w-xl sm:mx-auto md:col-start-2 md:row-start-1 md:mx-0 md:max-w-none">
          <ProjectPolaroids
            slugs={milestone.projects}
            label={milestone.org ?? milestone.title}
          />
        </div>
      )}
    </li>
  );
}
