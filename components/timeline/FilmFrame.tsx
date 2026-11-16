"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FILM_STOCK, FilmFrame as Frame, climbFilm } from "@/config/climbFilm";
import { REVEAL } from "@/components/timeline/reveal";
import { openPhotoViewer } from "@/components/timeline/photoViewer";
import { motion, useInView } from "framer-motion";
import { useCallback, useRef, useState } from "react";

import Image from "next/image";
import { useCloseOnScroll } from "@/components/timeline/useCloseOnScroll";

const HOLES = 12;

function Sprockets({ vertical }: { vertical?: boolean }) {
  return (
    <div
      className={
        vertical
          ? "flex flex-col justify-between py-1"
          : "flex justify-between px-2"
      }
      aria-hidden
    >
      {Array.from({ length: HOLES }, (_, i) => (
        <span
          key={i}
          className={`bg-petal-deep rounded-[2px] ${
            vertical ? "h-1.5 w-2 sm:h-2 sm:w-2.5" : "h-2 w-1.5 sm:h-2.5 sm:w-2"
          }`}
        />
      ))}
    </div>
  );
}

/** A slip of paper held on by a pushpin, for a handwritten aside. */
function PinnedNote({ text, large }: { text: string; large?: boolean }) {
  return (
    <span
      className={`font-hand text-ink absolute -top-4 -right-5 z-10 block rotate-3 bg-[#fbf9f4] px-3 pt-3 pb-2.5 leading-tight shadow-md shadow-black/40 ${
        large ? "w-60 text-2xl" : "w-44 text-lg"
      }`}
    >
      <span
        aria-hidden
        className="absolute -top-1.5 left-1/2 size-3.5 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#e86a7e,#7d3446)] shadow shadow-black/50"
      />
      {text}
    </span>
  );
}

/** The strip itself: edge text, sprocket holes, the photo. */
function FilmStrip({ frame, sizes }: { frame: Frame; sizes: string }) {
  const next = String(Number(frame.frame) + 1).padStart(2, "0");
  const photo = (
    <Image
      src={frame.src}
      alt={frame.alt}
      fill
      sizes={sizes}
      className="object-cover"
    />
  );
  return (
    <div className="bg-[#1c1420] py-1.5 shadow-lg shadow-black/30">
      <div className="flex justify-between px-2.5 pb-1 font-mono text-[10px] tracking-wider text-amber-500 sm:text-xs">
        <span>{FILM_STOCK}</span>
        <span>{frame.frame}A</span>
      </div>
      {frame.portrait ? (
        // A frame shot sideways: the strip runs down, holes on the sides.
        <div className="flex gap-2 px-1.5">
          <Sprockets vertical />
          <div className="relative aspect-[2/3] flex-1 overflow-hidden">
            {photo}
          </div>
          <Sprockets vertical />
        </div>
      ) : (
        <>
          <Sprockets />
          <div className="relative mx-3 my-1.5 aspect-[3/2] overflow-hidden">
            {photo}
          </div>
          <Sprockets />
        </>
      )}
      <div className="px-2.5 pt-1 font-mono text-[10px] text-amber-500 sm:text-xs">
        ▸ {frame.frame} &nbsp; ▸ {next}
      </div>
    </div>
  );
}

/**
 * A 35mm frame from the climb, pinned between milestone cards in the lane
 * beside the route. Click it to see the photo as large as the screen allows.
 */
export function FilmFrame({ frame, index }: { frame: Frame; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, REVEAL);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  useCloseOnScroll(open, close);
  const tilt = index % 2 === 0 ? -3 : 2.5;

  // Phones get the full-screen photo viewer, swiping through the whole roll;
  // larger screens blow the strip up in place.
  const enlarge = () => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      openPhotoViewer(
        climbFilm.map((f) => ({
          src: f.src,
          alt: f.alt,
          caption: f.caption,
          note: f.note,
        })),
        index,
      );
    } else setOpen(true);
  };

  return (
    <li
      ref={ref}
      id={`climb-${frame.id}`}
      data-climb-t={frame.t}
      className="flex min-h-[50svh] items-center py-6"
    >
      <motion.figure
        initial={{ opacity: 0, y: 24, rotate: 0 }}
        animate={inView ? { opacity: 1, y: 0, rotate: tilt } : undefined}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`pointer-events-auto relative ml-2 sm:mx-auto md:mr-auto md:ml-[34%] md:max-w-none ${
          frame.portrait
            ? "mr-auto w-[58%] max-w-[15rem] md:w-[18vw]"
            : "mr-16 w-full max-w-sm md:w-[30vw]"
        }`}
      >
        <button
          type="button"
          onClick={enlarge}
          aria-label={`Enlarge photo: ${frame.alt}`}
          className="block w-full cursor-zoom-in text-left"
        >
          <FilmStrip frame={frame} sizes="(min-width: 768px) 30vw, 384px" />
        </button>
        {frame.note && <PinnedNote text={frame.note} />}
        <figcaption className="font-hand mt-1 ml-3 text-2xl text-white drop-shadow-[0_1px_2px_rgba(43,30,58,0.8)]">
          {frame.caption}
        </figcaption>
      </motion.figure>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          onClick={close}
          className={`${
            frame.portrait
              ? "w-[min(92vw,calc(78dvh*0.6))]"
              : "w-[min(92vw,calc(78dvh*1.42))]"
          } max-w-none cursor-zoom-out gap-2 border-none bg-transparent p-0 shadow-none outline-none sm:max-w-none`}
        >
          <DialogTitle className="sr-only">{frame.alt}</DialogTitle>
          <div className="relative">
            <FilmStrip frame={frame} sizes="92vw" />
            {frame.note && <PinnedNote text={frame.note} large />}
          </div>
          <p className="font-hand text-center text-3xl text-white">
            {frame.caption}
          </p>
        </DialogContent>
      </Dialog>
    </li>
  );
}
