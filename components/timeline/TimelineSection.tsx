"use client";

import { Briefcase, FolderGit2, GraduationCap, Mountain } from "lucide-react";
import { Milestone, MilestoneKind, timeline } from "@/config/timeline";
import { motion, useInView } from "framer-motion";

import Image from "next/image";
import { MotionCard } from "@/components/ui/card";
import { useRef } from "react";

const KIND_ICON: Record<MilestoneKind, typeof Briefcase> = {
  education: GraduationCap,
  work: Briefcase,
  project: FolderGit2,
  summit: Mountain,
};

const KIND_LABEL: Record<MilestoneKind, string> = {
  education: "Education",
  work: "Work",
  project: "Project",
  summit: "Summit",
};

export function TimelineSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { amount: 0.5 });

  return (
    <div className="w-full">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: -30 }}
        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.8 }}
        className="mr-14 flex min-h-[50dvh] max-w-xl flex-col items-center justify-center text-center sm:mx-auto md:mr-[8%] md:ml-auto"
      >
        <h2 className="text-5xl font-bold">The climb</h2>
        <p className="mt-4 text-lg text-white/90 drop-shadow-sm">
          From the base to the summit: school, work, and the projects in
          between, pitch by pitch.
        </p>
      </motion.div>

      <ol className="flex flex-col">
        {timeline.map((milestone, index) => (
          <MilestoneCard
            key={milestone.id}
            milestone={milestone}
            pitch={index + 1}
          />
        ))}
      </ol>
    </div>
  );
}

function MilestoneCard({
  milestone,
  pitch,
}: {
  milestone: Milestone;
  pitch: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const Icon = KIND_ICON[milestone.kind];
  const isMinor = milestone.kind === "project";
  const isSummit = milestone.kind === "summit";

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
        className={`mr-14 w-full gap-4 sm:mx-auto md:mr-[8%] md:ml-auto ${
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
            {isSummit ? "" : `Pitch ${pitch} · `}
            {milestone.landmark.name}
          </span>
        </div>

        <div className="flex gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-ink-soft text-sm">{milestone.dates}</p>
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

        {(milestone.tags || milestone.project) && (
          <div className="flex flex-wrap items-center gap-2">
            {milestone.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-petal-deep text-ink rounded-full px-2.5 py-0.5 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
            {milestone.project && (
              <a
                href="#projects"
                className="text-rose ml-auto text-sm font-semibold hover:underline"
              >
                See project →
              </a>
            )}
          </div>
        )}

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
