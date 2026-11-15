"use client";

import {
  Briefcase,
  FolderGit2,
  GraduationCap,
  Mountain,
  Tent,
} from "lucide-react";
import { Milestone, MilestoneKind, timeline } from "@/config/timeline";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

import Image from "next/image";
import { MotionCard } from "@/components/ui/card";
import { projects } from "@/config/projects";

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

/** Cards are the only clickable parts of this section; the route shows through. */
export function TimelineSection() {
  return (
    <ol className="pointer-events-none flex flex-col">
      {timeline.map((milestone, index) => (
        <MilestoneCard key={milestone.id} milestone={milestone} index={index} />
      ))}
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
      className="flex min-h-[70dvh] items-center py-8 md:min-h-[80dvh]"
    >
      <MotionCard
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 0.7 }}
        className={`pointer-events-auto mr-14 w-full gap-4 sm:mx-auto md:mr-[8%] md:ml-auto ${
          isMinor ? "max-w-md" : "max-w-xl"
        }`}
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

        {milestone.projects && <ProjectPanel slugs={milestone.projects} />}

        {milestone.climbPhoto && (
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={milestone.climbPhoto}
              alt={`On the wall at ${milestone.landmark.name}`}
              fill
              sizes="(min-width: 768px) 576px, 100vw"
              className="object-cover"
            />
          </div>
        )}
      </MotionCard>
    </li>
  );
}

/**
 * Placeholder project panel (chip drawer). Swap this component to try the
 * other layouts; it only needs a list of project slugs.
 */
function ProjectPanel({ slugs }: { slugs: string[] }) {
  const items = slugs.flatMap((slug) => projects.find((p) => p.slug === slug) ?? []);
  const [selected, setSelected] = useState(0);
  const current = items[selected];
  if (!current) return null;

  return (
    <div className="flex flex-col gap-3">
      {items.length > 1 && (
        <div role="tablist" className="flex flex-wrap gap-2">
          {items.map((p, i) => (
            <button
              key={p.slug}
              role="tab"
              aria-selected={i === selected}
              onClick={() => setSelected(i)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                i === selected
                  ? "bg-wine text-white"
                  : "bg-petal-deep text-ink hover:bg-petal-edge"
              }`}
            >
              {p.title.length > 28 ? `${p.title.slice(0, 26)}…` : p.title}
            </button>
          ))}
        </div>
      )}
      <div className="flex gap-3 rounded-lg bg-[#fff8f6] p-3">
        {current.media[0] && (
          <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md">
            <Image
              src={current.media[0]}
              alt=""
              fill
              sizes="112px"
              className="object-cover"
            />
          </div>
        )}
        <div className="min-w-0 text-sm">
          <p className="text-ink font-semibold">{current.title}</p>
          <p className="text-ink-soft mt-1 line-clamp-3">{current.subtitle}</p>
          <div className="mt-2 flex gap-4 font-semibold">
            {current.link && (
              <a
                href={current.link}
                target="_blank"
                rel="noreferrer"
                className="text-rose hover:underline"
              >
                Live →
              </a>
            )}
            {current.github && (
              <a
                href={current.github}
                target="_blank"
                rel="noreferrer"
                className="text-rose hover:underline"
              >
                Code →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
