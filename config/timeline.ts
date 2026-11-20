/**
 * The climb, oldest to newest. Each entry is pinned to a landmark on Triple
 * Direct; the climber reaches that landmark when the entry's card is centred
 * on screen (see Climber.tsx). Keep entries in date order and `t` rising.
 * Projects are referenced by slug from config/projects.ts.
 */

export type MilestoneKind =
  "intro" | "education" | "work" | "project" | "summit";

export type Landmark = {
  name: string;
  /** Fraction of the way along the route path, 0 = base, 1 = summit. */
  t: number;
};

/**
 * Landmarks on Triple Direct, base to summit. `t` values are rough fractions
 * along tripleDirectPath; nudge them to line up with the photo.
 */
export const LANDMARKS = {
  camp: { name: "Base camp", t: 0 },
  base: { name: "The Base", t: 0.04 },
  freeblast: { name: "Freeblast", t: 0.11 },
  halfDollar: { name: "Half Dollar", t: 0.18 },
  mammoth: { name: "Mammoth Terraces", t: 0.26 },
  muirWall: { name: "Muir Wall", t: 0.34 },
  muirUpper: { name: "Upper Muir", t: 0.42 },
  grayLedges: { name: "Gray Ledges", t: 0.5 },
  campV: { name: "Camp V", t: 0.58 },
  greatRoof: { name: "The Great Roof", t: 0.66 },
  pancakeFlake: { name: "Pancake Flake", t: 0.74 },
  changingCorners: { name: "Changing Corners", t: 0.86 },
  summit: { name: "The Summit", t: 1 },
} satisfies Record<string, Landmark>;

export type Milestone = {
  id: string;
  kind: MilestoneKind;
  title: string;
  org?: string;
  dates?: string;
  landmark: Landmark;
  summary: string;
  highlights?: string[];
  tags?: string[];
  /** Slugs from config/projects.ts shown in this milestone's project panel. */
  projects?: string[];
  /** Photo from this point in life. */
  lifePhoto?: string;
};

export const timeline: Milestone[] = [
  {
    id: "basecamp",
    kind: "intro",
    title: "Hey, I'm Blake",
    landmark: LANDMARKS.camp,
    summary:
      "AI lead and full-stack engineer in San Diego, rock climber everywhere else. I like building things that are useful, not just clever.\n\nI studied Computer Science at Loyola Marymount, spent years working across the stack, then earned a master's in Data Science and Engineering at UC San Diego, focused on machine learning and AI engineering. Most recently I led AI at Space Heater: the models, the systems around them, and the product people actually use.\n\nOff the keyboard, I climb, surf, and make room for the occasional whimsical side quest. This site started as a goal: one day, climb El Capitan. On October 26, 2026, we topped out, via Triple Direct. Scroll to follow the route, or tap a dot on the wall.",
    lifePhoto: "/images/about/Joshua_Bouldering.webp",
  },
  {
    id: "lmu-start",
    kind: "education",
    title: "Started bachelor's at Loyola Marymount",
    org: "B.S. Computer Science",
    dates: "2016",
    landmark: LANDMARKS.base,
    summary:
      "Computer Science with a Business Administration minor. Algorithms, AI, databases, and operating systems, plus weekends at Stoney Point.",
    // TODO: swap in the glasses + suit jacket photo.
    lifePhoto: "/images/about/LMU_bluff.webp",
  },
  {
    id: "ticketmaster",
    kind: "work",
    title: "Internship at Ticketmaster",
    org: "Software Engineering",
    dates: "Summer 2019",
    landmark: LANDMARKS.freeblast,
    summary:
      "First pitch in industry: interactive, consumer-facing UIs in React on top of Java services.",
    tags: ["React", "Java"],
    lifePhoto: "/images/about/ticketmaster_internship.webp",
  },
  {
    id: "lmu-grad",
    kind: "education",
    title: "Earned bachelor's, Loyola Marymount",
    org: "B.S. Computer Science",
    dates: "2020",
    landmark: LANDMARKS.halfDollar,
    summary: "Cap and gown, Business Administration minor, and a job to find.",
    // TODO: cap and gown photo by the rock.
  },
  {
    id: "headsup",
    kind: "work",
    title: "Full-Stack Engineer",
    org: "HeadsUp Lab, LMU",
    dates: "2019 – 2021",
    landmark: LANDMARKS.mammoth,
    summary:
      "Built CampusGANDR, an NIH R01-funded React Native research app that gamifies social-norms feedback for college students, plus a React admin dashboard. Shipped on iOS and Android.",
    tags: ["React Native", "TypeScript", "Firebase"],
    projects: ["campusgandr"],
  },
  {
    id: "jumble",
    kind: "project",
    title: "Jumble",
    dates: "2020 – 2021",
    landmark: LANDMARKS.muirWall,
    summary:
      "A music discovery app for DJs: harmonic-mixing recommendations from Spotify audio features.",
    tags: ["Next.js", "Spotify API"],
    projects: ["jumble"],
  },
  {
    id: "directv",
    kind: "work",
    title: "Systems Engineer",
    org: "DIRECTV",
    dates: "2022 – 2023",
    landmark: LANDMARKS.muirUpper,
    summary:
      "Engineering owner turning product requirements into technical designs, and system integration engineer on an internal stream validation tool for production video streams.",
    highlights: [
      "Delivered on time at 15% lower cost through tighter estimates and planning",
      "Monitored rollouts with Elasticsearch, Grafana, and Splunk",
    ],
    tags: ["Systems Integration", "Observability"],
  },
  {
    id: "ucsd-start",
    kind: "education",
    title: "Started master's at UC San Diego",
    org: "Data Science and Engineering",
    dates: "2023",
    landmark: LANDMARKS.grayLedges,
    summary:
      "Machine learning, scalable data analysis, data integration and ETL. These are the projects from that stretch.",
    projects: [
      "wildfire-kg",
      "music-recommender",
      "genre-classifier",
      "music-mental-health",
      "bizscape",
    ],
  },
  {
    id: "viasat-intern",
    kind: "work",
    title: "Graduate Data Scientist Intern",
    org: "Viasat",
    dates: "Summer 2024",
    landmark: LANDMARKS.campV,
    summary:
      "Algorithms to optimize satellite capacity allocation across a large search space, built on network demand profiles from usage and satellite data.",
    highlights: [
      "Cut model training time 40% with Bayesian tuning on SageMaker",
    ],
    tags: ["Python", "Postgres", "SageMaker"],
    lifePhoto: "/images/about/viasat.webp",
  },
  {
    id: "viasat-ds",
    kind: "work",
    title: "Data Scientist",
    org: "Viasat",
    // TODO: confirm end date.
    dates: "2025",
    landmark: LANDMARKS.greatRoof,
    summary:
      "Rebuilt the satellite capacity planning dashboard with 3D multi-layer geospatial views, cutting load times by over 75%.",
    tags: ["React", "Deck.gl", "TypeScript"],
    projects: ["satellite-viz"],
  },
  {
    id: "ucsd-grad",
    kind: "education",
    title: "Earned master's, UC San Diego",
    org: "Data Science and Engineering",
    dates: "2025",
    landmark: LANDMARKS.pancakeFlake,
    summary: "Capstone done, degree in hand.",
  },
  {
    id: "space-heater",
    kind: "work",
    // TODO: confirm title and start date.
    title: "AI Lead",
    org: "Space Heater",
    dates: "2025 – 2026",
    landmark: LANDMARKS.changingCorners,
    summary:
      "Led AI across the whole picture: the models, the systems around them, and the product people actually use.",
    tags: ["AI Engineering", "Full-Stack"],
  },
  {
    id: "summit",
    kind: "summit",
    title: "Topped out on El Cap",
    dates: "October 26, 2026",
    landmark: LANDMARKS.summit,
    summary:
      "The goal this site started with, climbed via Triple Direct. Next objective: whatever is worth climbing.",
  },
];
