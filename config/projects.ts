export type Project = {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  media: string[];
  skills: string[];
  tools: string[];
  github?: string;
  link?: string;
};

export const projects: Project[] = [
  {
    title:
      "Generating Narrative on the Immersive Forest with Knowledge Graphs and Conversational AI",
    subtitle:
      "A “ChatGPT for Land Managers” built on a semantic knowledge graph and conversational AI, allowing users to ask natural-language questions about vegetation, fire behavior, and burn planning.",
    description:
      "This capstone project is a <strong>wildfire decision support system</strong> that combines real-time environmental data with conversational AI. Built on a semantic knowledge graph, the system ingests LiDAR, sensor, and weather data to model complex ecosystem relationships using OWL/RDF ontologies.\n\n<strong>Key features:</strong>\n• <strong>Natural language querying</strong> of fire readiness, vegetation change, and ecosystem health\n• <strong>AI-powered insights</strong> using a ReAct-style agent with reasoning and tool integration\n• <strong>Multi-modal access</strong> supporting both conversational queries and structured SPARQL\n• <strong>Real-time data synthesis</strong> across sensors, weather APIs, and geospatial metrics\n\nThe architecture spans from data ingestion (Airflow + S3) through knowledge modeling (GraphDB) to an intelligent agent layer (LangGraph + LangChain), culminating in a <em>Next.js chatbot interface</em> deployed on Kubernetes.\n\nDeveloped for burn bosses, ecologists, and land managers to enable data-driven wildfire planning and ecosystem monitoring.",
    icon: "/images/projects/capstone/wildfire_commons_logo.png",
    media: [
      "/images/projects/capstone/langgraph_studio.png",
      "/images/projects/capstone/System_Architecture.drawio.png",
      "/images/projects/capstone/graphdb.png",
      "/images/projects/capstone/langsmith_eval.png",
    ],
    skills: [
      "Knowledge Graph Design",
      "Agentic Development",
      "Full-Stack Development",
      "Data Pipelines & ETL",
      "Ontology Design",
      "Solution Architecture",
      "Prompt Engineering",
    ],
    tools: [
      "GraphDB",
      "RDF",
      "OWL",
      "SPARQL",
      "LangGraph",
      "LangChain",
      "LangSmith",
      "React",
      "OpenAI",
      "LiteLLM",
      "Apache Airflow",
      "Next.js",
      "FastAPI",
      "Docker",
      "Kubernetes",
      "Helm",
      "NRP(Nautilus)",
    ],
    github: "https://github.com/wildfire-commons/wildfire-kg",
    link: "https://wildfire.nrp-nautilus.io/",
  },
  {
    title: "Satellite Capacity Allocation Visualization",
    subtitle:
      "A high-performance visualization system for satellite network capacity allocation using React, Next.js, and Deck.gl.",
    description:
      "This project is a <strong>data visualization prototype</strong> developed to reimagine how capacity planners and network operators at Viasat analyze capacity allocation across global service regions. Built as a replacement for a legacy Dash-based dashboard, the system delivers a fluid, modern, and interactive frontend experience using React, Next.js, and Deck.gl.\n\nUsing fully synthetic but structurally realistic data, the tool visualizes how satellite demand and supply change over time and space, enabling users to:\n\n• <strong>Analyze beam footprints</strong> and regional demand across global networks\n• <strong>Understand allocation effectiveness</strong> using dynamic ratio-based metrics\n• <strong>Toggle between baseline and peak scenarios</strong> to support forecasting\n• <strong>Explore 24-hour demand cycles</strong> through animated playback\n• <strong>Adjust spatial granularity</strong> using H3 hex binning (resolutions 2–7)\n• <strong>Compare optimized vs. non-optimized</strong> capacity configurations",
    icon: "/images/projects/sat-viz/sat-cap-alloc.png",
    media: [
      "/images/projects/sat-viz/Sat-Net-Viz-1.png",
      "/images/projects/sat-viz/Sat-Net-Viz-2.png",
      "/images/projects/sat-viz/Sat-Net-Viz-3.png",
    ],
    skills: [
      "Frontend Development",
      "Data Visualization",
      "Data Analysis",
      "Data Science",
      "Geospatial Analysis",
      "Interactive Dashboards",
      "UI/UX Design",
    ],
    tools: ["React", "Next.js", "Deck.gl", "TypeScript"],
    github: "https://github.com/BlakeCrowther/satellite-capacity-allocation",
    link: "https://satellite-capacity-allocation.vercel.app/",
  },
  {
    title: "Bizscape",
    subtitle:
      "AI-powered business intelligence platform with interactive geospatial analysis and natural language querying of Neo4j knowledge graphs.",
    description:
      "Bizscape is a sophisticated business intelligence application that transforms complex demographic and business data into actionable insights through natural language queries. The platform leverages a Neo4j knowledge graph containing businesses, geographic regions, demographic data, and enrichment information to provide comprehensive market analysis. Users can ask questions in plain English about business landscapes, demographics, crime rates, and economic indicators, and receive detailed responses with interactive map visualizations. The system features real-time query processing with streaming responses, intelligent follow-up question suggestions, and a 'thinking' display that shows the AI's reasoning process including Cypher query generation and statistical analysis.",
    icon: "/images/projects/bizscape/bizscape_icon.svg",
    media: [
      "/images/projects/bizscape/bizscape_1.png",
      "/images/projects/bizscape/bizscape_2.png",
      "/images/projects/bizscape/bizscape_3.png",
    ],
    skills: [
      "Full-Stack Development",
      "Data Pipelines & ETL",
      "Data Science",
      "Geospatial Analysis",
      "Interactive Dashboards",
      "UI/UX Design",
      "Prompt Engineering",
      "API Development",
    ],
    tools: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Neo4j",
      "OpenAI",
      "Leaflet",
      "Python",
      "GCP",
      "Docker",
    ],
    github: "https://github.com/BlakeCrowther/bizscape",
    link: "https://bizscape.vercel.app/",
  },
  {
    title: "Scalable Music Recommender",
    subtitle:
      "A distributed music recommendation system built with Apache Spark and ALS collaborative filtering, processing 1.4+ GB of user-song interactions from the Yahoo! Music dataset.",
    description:
      "This project implements a <strong>large-scale music recommendation system</strong> using Apache Spark to handle the massive Yahoo! Music dataset (1.4+ GB). The system employs <em>Alternating Least Squares (ALS) collaborative filtering</em> to generate music recommendations based on user-song rating patterns.\n\n<strong>Key technical achievements:</strong>\n• <strong>Complete ML pipeline</strong> from data loading to HDFS through model evaluation\n• <strong>Distributed processing</strong> with Apache Spark for handling big data at scale\n• <strong>Containerized development</strong> using Docker for consistent environments\n• <strong>Comprehensive evaluation</strong> using RMSE, MAE, Precision/Recall, and Coverage metrics\n• <strong>Data engineering pipeline</strong> including preprocessing, cleaning, and balancing\n\nThe project demonstrates the <em>technical infrastructure</em> needed for scalable recommendation systems, showcasing distributed computing capabilities and big data processing rather than focusing on recommendation accuracy optimization.\n\nBuilt with Jupyter notebooks for experimentation and uses industry-standard tools for large-scale machine learning deployment.",
    icon: "/images/projects/smr/SMR_icon.png",
    media: [
      "/images/projects/smr/SMR_1.png",
      "/images/projects/smr/SMR_2.png",
      "/images/projects/smr/SMR_3.png",
    ],
    skills: [
      "Big Data Processing",
      "Distributed Computing",
      "Machine Learning",
      "Data Engineering",
      "MLOps",
      "System Architecture",
    ],
    tools: [
      "Apache Spark",
      "Docker",
      "Hadoop HDFS",
      "Jupyter Notebooks",
      "PySpark",
      "Python",
      "Spark MLlib",
    ],
    github: "https://github.com/BlakeCrowther/scalable-music-recommender",
  },
  {
    title: "Music, Mental Health, and Emotion",
    subtitle:
      "Data science research investigating correlations between music preferences, emotional content, and mental health indicators using Spotify data and survey analysis.",
    description:
      "This research project explores the fascinating relationship between <strong>music preferences and mental health</strong> by analyzing two comprehensive datasets: the Music & Mental Health Survey Results (736 responses) and the 278k Emotion Labeled Spotify Songs (Moodify dataset). The study investigates how individuals' self-reported music preferences correlate with mental health indicators including anxiety, depression, insomnia, and OCD.\n\n<strong>Key research achievements:</strong>\n• <strong>Cross-dataset analysis</strong> mapping emotional trends in Spotify's audio features to survey responses\n• <strong>API-enhanced data enrichment</strong> using Spotify Web API to add genre information\n• <strong>Emotional pattern discovery</strong> across music genres (e.g., high happiness in rap/hip-hop, high sadness in rock/classical)\n• <strong>Statistical correlation analysis</strong> between music preferences and mental health indicators\n• <strong>Comprehensive data visualization</strong> of complex relationships in music and psychology data\n\nThe project demonstrates solid <em>data science fundamentals</em> with API integration and exploratory analysis, revealing meaningful insights into how musical emotional content may relate to psychological well-being, while acknowledging sample size limitations for definitive conclusions.\n\nBuilt entirely in Python using industry-standard data science libraries for analysis and visualization.",
    icon: "/images/projects/System_Architecture.drawio.svg",
    media: [],
    skills: [
      "Data Science",
      "Statistical Analysis",
      "Exploratory Data Analysis",
      "Research Methodology",
      "Data Visualization",
      "API Integration",
    ],
    tools: [
      "Python",
      "Jupyter Notebooks",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Spotify Web API",
    ],
    github: "https://github.com/BlakeCrowther/music-mental-health-and-emotion",
  },
  {
    title: "Music Genre Classifier",
    subtitle:
      "A mobile app that helps climbers find the best routes for their skill level. It uses a combination of machine learning and traditional search algorithms to find the best routes for a given climber. The app is built with React Native and Expo, and uses the Google Maps API for mapping and navigation.",
    description:
      "A mobile app that helps climbers find the best routes for their skill level.",
    icon: "/images/projects/System_Architecture.drawio.svg",
    media: [],
    skills: ["React Native", "Expo", "Google Maps API"],
    tools: ["React Native", "Expo", "Google Maps API"],
  },
  {
    title: "Jumble",
    subtitle:
      "A mobile app that helps climbers find the best routes for their skill level. It uses a combination of machine learning and traditional search algorithms to find the best routes for a given climber. The app is built with React Native and Expo, and uses the Google Maps API for mapping and navigation.",
    description:
      "A mobile app that helps climbers find the best routes for their skill level.",
    icon: "/images/projects/jumble/jumble_icon.svg",
    media: [],
    skills: ["React Native", "Expo", "Google Maps API"],
    tools: ["React Native", "Expo", "Google Maps API"],
  },
  {
    title: "CampusGandr",
    subtitle:
      "A mobile app that helps climbers find the best routes for their skill level. It uses a combination of machine learning and traditional search algorithms to find the best routes for a given climber. The app is built with React Native and Expo, and uses the Google Maps API for mapping and navigation.",
    description:
      "A mobile app that helps climbers find the best routes for their skill level.",
    icon: "/images/projects/jumble/jumble_icon.svg",
    media: [],
    skills: ["React Native", "Expo", "Google Maps API"],
    tools: ["React Native", "Expo", "Google Maps API"],
  },
];
