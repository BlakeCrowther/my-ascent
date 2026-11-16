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
  /** Shot with the camera turned on its side. */
  portrait?: boolean;
};

/** Film stock printed along the edge of every frame. */
// TODO: confirm the stock from the scans or lab envelope.
export const FILM_STOCK = "PORTRA 400";

// TODO: confirm each `t`, caption, and frame number against where it was shot.
export const climbFilm: FilmFrame[] = [
  {
    id: "film-camp",
    src: "/images/climb/camp4.webp",
    alt: "The four of us with coffee mugs at camp in the valley, El Cap behind the trees",
    t: 0.02,
    caption: "Coffee before the wall",
    frame: "03",
    note: "Every photo of the climb was shot on 35mm film, developed, and scanned.",
  },
  {
    id: "film-portaledge",
    src: "/images/climb/portaledge.webp",
    alt: "Two climbers in sleeping bags on a portaledge, looking down the wall",
    t: 0.3,
    caption: "Night on the portaledge",
    frame: "12",
  },
  {
    id: "film-pooh",
    src: "/images/climb/pooh.webp",
    alt: "A climber in a Winnie the Pooh costume at a hanging belay above the valley",
    t: 0.54,
    caption: "Belay snack, dressed as Pooh",
    frame: "21",
  },
  {
    id: "film-clouds",
    src: "/images/climb/clouds.webp",
    alt: "Two climbers in helmets grinning as clouds roll over the valley rim",
    t: 0.8,
    caption: "Clouds rolling in up high",
    frame: "29",
    portrait: true,
  },
  {
    id: "film-summit",
    src: "/images/climb/summit.webp",
    alt: "The four of us on the summit slabs with Half Dome behind",
    t: 0.93,
    caption: "Topped out · Half Dome behind",
    frame: "35",
  },
];
