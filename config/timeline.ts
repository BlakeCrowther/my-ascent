/**
 * The climb, oldest to newest. Each entry is pinned to a landmark on Triple
 * Direct; the climber reaches that landmark when the entry's card is centred
 * on screen (see Climber.tsx). Add entries in date order and keep `t` rising.
 */

export type MilestoneKind = "education" | "work" | "project" | "summit";

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
  base: { name: "The Base", t: 0.02 },
  freeblast: { name: "Freeblast", t: 0.1 },
  halfDollar: { name: "Half Dollar", t: 0.2 },
  mammoth: { name: "Mammoth Terraces", t: 0.28 },
  muirWall: { name: "Muir Wall", t: 0.38 },
  muirUpper: { name: "Upper Muir", t: 0.48 },
  grayLedges: { name: "Gray Ledges", t: 0.56 },
  campV: { name: "Camp V", t: 0.64 },
  greatRoof: { name: "The Great Roof", t: 0.72 },
  pancakeFlake: { name: "Pancake Flake", t: 0.79 },
  changingCorners: { name: "Changing Corners", t: 0.9 },
  summit: { name: "The Summit", t: 1 },
} satisfies Record<string, Landmark>;

export type Milestone = {
  id: string;
  kind: MilestoneKind;
  title: string;
  org?: string;
  dates: string;
  landmark: Landmark;
  summary: string;
  highlights?: string[];
  tags?: string[];
  /** Title of a matching entry in config/projects.ts, for a "see project" link. */
  project?: string;
  /** Photo from this spot on the real climb. */
  climbPhoto?: string;
  /** Photo from this point in life. */
  lifePhoto?: string;
};

export const timeline: Milestone[] = [
  {
    id: "lmu",
    kind: "education",
    title: "B.S. Computer Science",
    org: "Loyola Marymount University",
    dates: "2016 – 2020",
    landmark: LANDMARKS.base,
    summary:
      "Computer Science with a Business Administration minor. Algorithms, AI, databases, operating systems, and most weekends at Stoney Point.",
    lifePhoto: "/images/about/LMU_bluff.webp",
  },
  {
    id: "ticketmaster",
    kind: "work",
    title: "Software Engineering Intern",
    org: "Ticketmaster",
    dates: "Summer 2019",
    landmark: LANDMARKS.freeblast,
    summary:
      "First pitch in industry: interactive, consumer-facing UIs in React on top of Java services.",
    tags: ["React", "Java"],
    lifePhoto: "/images/about/ticketmaster_internship.webp",
  },
  {
    id: "headsup",
    kind: "work",
    title: "Lead Full-Stack Engineer",
    org: "HeadsUp Lab, LMU",
    dates: "2019 – 2021",
    landmark: LANDMARKS.halfDollar,
    summary:
      "Led development of CampusGANDR, an NIH R01-funded React Native research app that gamifies social-norms feedback for college students. Shipped on iOS and Android, plus a React admin dashboard.",
    tags: ["React Native", "TypeScript", "Firebase"],
    project: "CampusGANDR",
  },
  {
    id: "jumble",
    kind: "project",
    title: "Jumble",
    dates: "2021",
    landmark: LANDMARKS.mammoth,
    summary:
      "A music discovery app for DJs: harmonic-mixing recommendations from Spotify audio features.",
    tags: ["Next.js", "Spotify API"],
    project: "Jumble",
  },
  {
    id: "directv",
    kind: "work",
    title: "Software Engineer",
    org: "DIRECTV",
    dates: "2022 – 2023",
    landmark: LANDMARKS.muirWall,
    summary:
      "Engineering owner turning product requirements into technical designs, and system integration engineer on an internal stream validation tool for production video streams.",
    highlights: [
      "Delivered on time at 15% lower cost through tighter estimates and planning",
      "Monitored rollouts with Elasticsearch, Grafana, and Splunk",
    ],
    tags: ["Systems Integration", "Observability"],
  },
  {
    id: "ucsd",
    kind: "education",
    title: "M.A.S. Data Science & Engineering",
    org: "UC San Diego",
    dates: "2023 – 2025",
    landmark: LANDMARKS.muirUpper,
    summary:
      "Machine learning, scalable data analysis, data integration and ETL. Projects in distributed recommenders, audio deep learning, and music-and-mental-health research.",
    tags: ["ML", "Spark", "PyTorch"],
    project: "Scalable Music Recommender",
  },
  {
    id: "viasat-intern",
    kind: "work",
    title: "Graduate Data Scientist Intern",
    org: "Viasat",
    dates: "Summer 2024",
    landmark: LANDMARKS.grayLedges,
    summary:
      "Algorithms to optimize satellite capacity allocation across a large search space, built on network demand profiles from usage and satellite data.",
    highlights: ["Cut model training time 40% with Bayesian tuning on SageMaker"],
    tags: ["Python", "Postgres", "SageMaker"],
    lifePhoto: "/images/about/viasat.webp",
  },
  {
    id: "bizscape",
    kind: "project",
    title: "Bizscape",
    dates: "2024",
    landmark: LANDMARKS.campV,
    summary:
      "A business knowledge graph in Neo4j with natural-language querying and map visualizations.",
    tags: ["Neo4j", "LLMs", "Geospatial"],
    project: "Bizscape",
  },
  {
    id: "viasat-ds",
    kind: "work",
    title: "Data Scientist",
    org: "Viasat",
    dates: "2025",
    landmark: LANDMARKS.greatRoof,
    summary:
      "Rebuilt the satellite capacity planning dashboard with 3D multi-layer geospatial views, cutting load times by over 75%.",
    tags: ["React", "Deck.gl", "TypeScript"],
    project: "Satellite Capacity Allocation Visualization",
  },
  {
    id: "capstone",
    kind: "project",
    title: "Wildfire Knowledge Graph",
    org: "UCSD Capstone",
    dates: "2025",
    landmark: LANDMARKS.pancakeFlake,
    summary:
      "A “ChatGPT for land managers”: a LangGraph agent over a GraphDB knowledge graph of LiDAR, sensor, and weather data, deployed on Kubernetes.",
    tags: ["LangGraph", "Knowledge Graphs", "Kubernetes"],
    project:
      "Generating Narrative on the Immersive Forest with Knowledge Graphs and Conversational AI",
  },
  {
    id: "ai-lead",
    kind: "work",
    title: "AI Lead",
    dates: "Now",
    landmark: LANDMARKS.changingCorners,
    summary:
      "Leading AI across the whole picture: the models, the systems around them, and the product people actually use.",
    tags: ["AI Engineering", "Full-Stack"],
  },
  {
    id: "summit",
    kind: "summit",
    title: "Topped out on El Cap",
    dates: "October 26, 2026",
    landmark: LANDMARKS.summit,
    summary:
      "The goal this site started with. Next objective: whatever is worth climbing.",
  },
];
