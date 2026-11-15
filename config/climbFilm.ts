/**
 * Film from the real climb, pinned between milestone cards at the spot on the
 * route where each frame was shot. Every frame was shot on 35mm film,
 * developed, and scanned. Keep entries in `t` order; `t` uses the same scale
 * as LANDMARKS in config/timeline.ts and should fall between two milestones.
 */

export type FilmFrame = {
  id: string;
  src: string;
  alt: string;
  /** Fraction of the way along the route path, 0 = base, 1 = summit. */
  t: number;
  /** Handwritten caption under the frame, e.g. "P7 · Gray Ledges bivy". */
  caption: string;
  /** Frame number printed on the film edge, e.g. "15". */
  frame: string;
  /** Optional handwritten aside on a pinned slip of paper. */
  note?: string;
};

/** Film stock printed along the edge of every frame. */
// TODO: confirm the stock from the scans or lab envelope.
export const FILM_STOCK = "PORTRA 400";

// TODO: swap placeholders for real scans and set each `t` to where it was shot.
const PLACEHOLDER = "/images/background.webp";

export const climbFilm: FilmFrame[] = [
  {
    id: "film-freeblast",
    src: PLACEHOLDER,
    alt: "Racking up at the base of Freeblast",
    t: 0.14,
    caption: "Day 1 · Freeblast",
    frame: "04",
    note: "Every photo of the climb was shot on 35mm film, developed, and scanned.",
  },
  {
    id: "film-muir",
    src: PLACEHOLDER,
    alt: "Hauling up the Muir Wall",
    t: 0.38,
    caption: "Hauling the Muir Wall",
    frame: "11",
  },
  {
    id: "film-campv",
    src: PLACEHOLDER,
    alt: "Bivy on the ledge at Camp V",
    t: 0.62,
    caption: "Camp V bivy",
    frame: "19",
  },
  {
    id: "film-corners",
    src: PLACEHOLDER,
    alt: "Looking down from Changing Corners",
    t: 0.92,
    caption: "Almost there",
    frame: "31",
  },
];
