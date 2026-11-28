"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Project, projects } from "@/config/projects";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useCloseOnScroll } from "@/components/timeline/useCloseOnScroll";
import { openPhotoViewer } from "@/components/timeline/photoViewer";

import Image from "next/image";

const TILTS = [-4, 3, -2, 4, -3];

/** A strip of white athletic tape, the kind used to tape fingers. */
function ClimbingTape({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 bg-[repeating-linear-gradient(90deg,#fbf9f4_0_2px,#efebe2_2px_3px)] opacity-95 shadow-sm [clip-path:polygon(3%_0,97%_8%,100%_50%,96%_100%,2%_92%,0_45%)] ${className}`}
    />
  );
}

function Polaroid({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const tilt = TILTS[index % TILTS.length];
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      style={{ rotate: tilt }}
      whileHover={{ rotate: 0, scale: 1.06, y: -4 }}
      whileFocus={{ rotate: 0, scale: 1.06, y: -4 }}
      className="relative w-32 shrink-0 snap-center bg-white p-2 pb-8 text-left shadow-md shadow-black/30 outline-none sm:w-36"
      aria-label={`Open project: ${project.title}`}
    >
      <ClimbingTape className={index % 2 ? "rotate-3" : "-rotate-2"} />
      <span className="relative block aspect-square overflow-hidden bg-[#2b1e3a]">
        {project.media[0] && (
          <Image
            src={project.media[0]}
            alt=""
            fill
            sizes="144px"
            className="object-cover"
          />
        )}
      </span>
      <span className="font-hand text-ink absolute inset-x-1 bottom-1 truncate text-center text-lg leading-6">
        {project.title}
      </span>
    </motion.button>
  );
}

/**
 * Projects for one milestone as taped polaroids. Phones get a swipe row under
 * the card; desktop stacks them in a staggered two-column cascade in the lane
 * beside the route. Tapping one opens the project: a bottom sheet on phones,
 * a large centered card on desktop.
 */
export function ProjectPolaroids({
  slugs,
  label,
}: {
  slugs: string[];
  /** Milestone name for the "back" link, e.g. "UC San Diego". */
  label: string;
}) {
  const items = slugs.flatMap(
    (slug) => projects.find((p) => p.slug === slug) ?? [],
  );
  const [open, setOpen] = useState<number | null>(null);
  if (items.length === 0) return null;

  return (
    <div className="pointer-events-auto">
      <div className="-mx-1 flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto px-3 pt-5 pb-3 sm:flex-wrap sm:justify-center sm:gap-5 sm:overflow-visible md:mx-0 md:grid md:grid-cols-4 md:gap-x-[1.5vw] md:gap-y-6 md:px-0 md:[&>*]:w-full md:[&>*:nth-child(even)]:translate-y-6">
        {items.map((project, i) => (
          <Polaroid
            key={project.slug}
            project={project}
            index={i}
            onOpen={() => setOpen(i)}
          />
        ))}
      </div>
      {items.length > 2 && (
        <p className="ml-3 text-xs text-white/85 drop-shadow sm:hidden">
          {items.length} projects · swipe ›
        </p>
      )}
      <ProjectDetail
        items={items}
        label={label}
        index={open}
        onIndexChange={setOpen}
      />
    </div>
  );
}

/**
 * A project's screenshots: one large, thumbnails to pick another. Tapping the
 * large one opens every screenshot in the full-screen viewer.
 */
function Gallery({
  media,
  title,
  shot,
  onShot,
  onView,
}: {
  media: string[];
  title: string;
  shot: number;
  onShot: (i: number) => void;
  onView: (i: number) => void;
}) {
  const current = Math.min(shot, media.length - 1);
  return (
    // Stop presses here from starting the swipe between projects.
    <div
      className="flex flex-col gap-2 md:row-span-5 md:mt-2"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => onView(current)}
        aria-label={`View ${title} screenshots full screen`}
        className="relative block aspect-video cursor-zoom-in overflow-hidden rounded-lg bg-white shadow-md"
      >
        <Image
          src={media[current]}
          alt={`${title} screenshot ${current + 1}`}
          fill
          sizes="(min-width: 768px) 640px, 100vw"
          className="object-cover"
        />
        {media.length > 1 && (
          <span className="bg-ink/75 absolute right-2 bottom-2 rounded-full px-2 py-0.5 text-xs font-medium text-white">
            {current + 1} / {media.length}
          </span>
        )}
      </button>
      {media.length > 1 && (
        <div className="flex [scrollbar-width:none] gap-2 overflow-x-auto pb-1">
          {media.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => onShot(i)}
              aria-label={`Show screenshot ${i + 1}`}
              aria-current={i === current}
              className={`relative aspect-video w-20 shrink-0 overflow-hidden rounded-md bg-white transition md:w-24 ${
                i === current
                  ? "ring-wine ring-2"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Chips in config order (most important first), with "+N more" past a width-based limit. */
function ChipList({ label, items }: { label: string; items: string[] }) {
  const [wide, setWide] = useState(false);
  const [all, setAll] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  const limit = wide ? 10 : 6;
  const shown = all ? items : items.slice(0, limit);
  const hidden = items.length - shown.length;
  return (
    <div>
      <p className="text-rose mb-1.5 text-[11px] font-semibold tracking-wider uppercase">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {shown.map((item) => (
          <span
            key={item}
            className="bg-petal-deep text-ink rounded-full px-2.5 py-0.5 text-xs font-medium md:text-sm"
          >
            {item}
          </span>
        ))}
        {(hidden > 0 || (all && items.length > limit)) && (
          <button
            type="button"
            onClick={() => setAll((a) => !a)}
            className="text-wine rounded-full px-2 py-0.5 text-xs font-semibold hover:underline md:text-sm"
          >
            {all ? "Show less" : `+${hidden} more`}
          </button>
        )}
      </div>
    </div>
  );
}

/** The long write-up, folded away until asked for. */
function ReadMore({ html }: { html: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {open && (
        <div
          className="text-ink-soft [&_strong]:text-ink mb-2 text-sm leading-relaxed whitespace-pre-line md:text-base"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="text-wine text-sm font-semibold hover:underline"
      >
        {open ? "Show less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

function ProjectDetail({
  items,
  label,
  index,
  onIndexChange,
}: {
  items: Project[];
  label: string;
  index: number | null;
  onIndexChange: (i: number | null) => void;
}) {
  const project = index === null ? undefined : items[index];
  const [shot, setShot] = useState(0);
  // While the photo viewer is up the card steps aside, and comes back on exit.
  const [viewing, setViewing] = useState(false);
  const open = project !== undefined && !viewing;
  const close = useCallback(() => onIndexChange(null), [onIndexChange]);
  useCloseOnScroll(open, close);
  const go = (step: number) => {
    if (index === null) return;
    setShot(0);
    onIndexChange((index + step + items.length) % items.length);
  };
  const view = (i: number) => {
    if (!project) return;
    setViewing(true);
    openPhotoViewer(
      project.media.map((src, n) => ({
        src,
        alt: `${project.title} screenshot ${n + 1}`,
        caption: project.title,
      })),
      i,
      () => setViewing(false),
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          setShot(0);
          close();
        }
      }}
    >
      <DialogContent
        data-scroll-keep
        className="bg-petal text-ink top-auto bottom-0 max-h-[85dvh] max-w-none translate-y-0 gap-3 overflow-y-auto rounded-t-2xl rounded-b-none border-none p-5 sm:top-[50%] sm:bottom-auto sm:max-w-2xl sm:translate-y-[-50%] sm:rounded-2xl md:w-[min(1180px,86vw)] md:max-w-none md:p-8"
      >
        {project && (
          <motion.div
            key={project.slug}
            drag={items.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid gap-3 md:grid-cols-[1.35fr_1fr] md:gap-x-9"
          >
            <div className="bg-petal-edge mx-auto h-1 w-10 rounded-full sm:hidden" />
            <div className="text-ink-soft flex items-center gap-3 pr-8 text-sm md:col-span-2">
              <button
                type="button"
                onClick={close}
                className="text-wine font-semibold hover:underline"
              >
                ← {label}
              </button>
              {items.length > 1 && (
                <span className="ml-auto">
                  {index! + 1} / {items.length}
                </span>
              )}
            </div>
            {project.media.length > 0 && (
              <Gallery
                media={project.media}
                title={project.title}
                shot={shot}
                onShot={setShot}
                onView={view}
              />
            )}
            <DialogTitle className="text-ink text-xl font-bold md:mt-2 md:text-3xl">
              {project.title}
            </DialogTitle>
            <DialogDescription className="text-ink-soft text-sm md:text-base md:leading-relaxed">
              {project.subtitle}
            </DialogDescription>
            <ReadMore key={`${project.slug}-more`} html={project.description} />
            <ChipList
              key={`${project.slug}-skills`}
              label="Skills"
              items={project.skills}
            />
            <ChipList
              key={`${project.slug}-tools`}
              label="Tools"
              items={project.tools}
            />
            <div className="flex items-center gap-3 pt-1">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-wine rounded-full px-5 py-2 text-sm font-semibold text-[#fff3f1] md:text-base"
                >
                  Live
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="border-wine text-wine rounded-full border px-5 py-2 text-sm font-semibold md:text-base"
                >
                  GitHub
                </a>
              )}
            </div>
            {items.length > 1 && (
              <div className="text-wine border-petal-edge flex justify-between border-t pt-3 text-sm font-semibold">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="flex items-center gap-1 hover:underline"
                >
                  <ChevronLeft className="size-4" /> Prev
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="flex items-center gap-1 hover:underline"
                >
                  Next <ChevronRight className="size-4" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
