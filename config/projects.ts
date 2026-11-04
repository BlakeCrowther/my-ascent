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
    icon: "/images/projects/capstone/capstone_icon.png",
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
    icon: "/images/projects/mxmh/mxmh_icon.png",
    media: [
      "/images/projects/mxmh/mxmh_1.png",
      "/images/projects/mxmh/mxmh_2.png",
      "/images/projects/mxmh/mxmh_3.png",
      "/images/projects/mxmh/mxmh_4.png",
    ],
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
    title: "Music Genre Classification",
    subtitle:
      "Machine learning system using audio feature extraction and neural networks to automatically classify music genres from the Free Music Archive dataset with 106,000+ tracks.",
    description:
      "A comprehensive <strong>machine learning pipeline for automatic music genre classification</strong> using audio signal processing and neural networks. Built for my Master's Data Science program using the Free Music Archive dataset (106,000+ tracks across 161 genres).\n\n<strong>Key technical features:</strong>\n• <strong>Audio feature extraction</strong> using MFCC, chroma, and spectral characteristics via Librosa\n• <strong>PyTorch neural networks</strong> trained to classify genres from audio patterns\n• <strong>Systematic experimentation</strong> comparing feature combinations across multiple dataset sizes\n• <strong>Modular architecture</strong> with custom dataset handlers and evaluation frameworks\n\nDemonstrates <em>end-to-end ML workflow</em> from raw audio data to trained classification models with rigorous performance analysis.",
    icon: "/images/projects/mgc/mgc_icon.png",
    media: [
      "/images/projects/mgc/mgc_1.png",
      "/images/projects/mgc/mgc_2.png",
      "/images/projects/mgc/mgc_3.png",
    ],
    skills: [
      "Deep Learning",
      "Audio Signal Processing",
      "Feature Engineering",
      "Neural Networks",
      "Data Science",
      "Machine Learning",
    ],
    tools: [
      "PyTorch",
      "Librosa",
      "Python",
      "Jupyter Notebooks",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Matplotlib",
    ],
  },
  {
    title: "Jumble",
    subtitle:
      "A music discovery web application that helps DJs and producers find harmonically compatible tracks for seamless mixing using Spotify's audio analysis data.",
    description:
      "Jumble is a <strong>sophisticated music recommendation platform</strong> designed specifically for DJs, producers, and music enthusiasts who want to create seamless mixes. The application leverages <em>Spotify's Web API</em> to analyze musical attributes like BPM, key, genre, energy, danceability, and acousticness to recommend tracks that will mix well together.\n\nUsers can search for songs or artists, view detailed <strong>audio feature visualizations</strong> using radar graphs, and receive color-coded recommendations based on harmonic mixing compatibility. The platform features <em>harmonic mixing theory</em> with visual indicators (green for perfect matches, light green for good matches) based on BPM differences and key relationships using the circle of fifths.\n\n<strong>Key features:</strong>\n• <strong>Comprehensive track analysis</strong> with detailed audio feature breakdowns\n• <strong>Harmonic compatibility scoring</strong> using music theory principles\n• <strong>Real-time recommendations</strong> for seamless DJ mixing\n• <strong>Popular music tracking</strong> and trend analysis\n• <strong>Educational content</strong> about harmonic mixing techniques\n• <strong>Progressive Web App</strong> features for mobile DJs\n\nBuilt with modern web technologies and optimized for creative professionals in the music industry.",
    icon: "/images/projects/jumble/jumble_icon.svg",
    media: [
      "/images/projects/jumble/jumble_1.png",
      "/images/projects/jumble/jumble_2.png",
      "/images/projects/jumble/jumble_3.png",
    ],
    skills: [
      "Full-Stack Development",
      "Music Theory & Harmonic Mixing",
      "API Integration",
      "Data Visualization",
      "UI/UX Design",
      "Audio Feature Analysis",
      "Progressive Web Apps",
      "SEO Optimization",
    ],
    tools: [
      "Next.js",
      "React",
      "Firebase",
      "Spotify Web API",
      "Material-UI",
      "Node.js",
      "Firestore",
      "OAuth",
    ],
    github: "https://github.com/BlakeCrowther/jumble",
    link: "https://jumble-it.com/",
  },
  {
    title: "CampusGANDR",
    subtitle:
      "A gamified mobile research platform for studying college student social norms and drinking behaviors through weekly prediction contests.",
    description:
      "CampusGANDR is a <strong>React Native mobile application</strong> developed for an NIH-funded research study in collaboration with the HeadsUp! Lab. The app serves as a sophisticated intervention tool designed to address college students' misperceptions about peer drinking behaviors through <em>gamification and Personalized Normative Feedback</em>.\n\nThe core concept leverages key psychological principles: students tend to overestimate peers' risky behaviors (like drinking), and these perceived social norms directly influence their own behavior. The app <strong>disguises normative feedback as an engaging game</strong> about college life.\n\n<strong>Weekly engagement features:</strong>\n• <strong>Prediction contests</strong> where participants guess peer behaviors (perceived social norms)\n• <strong>Self-assessment questions</strong> about their own behaviors\n• <strong>Scenario rating system</strong> across academics, health, drinking, emotions, and dorm life\n• <strong>Gamified rewards</strong> with coins/points for accurate predictions\n• <strong>Social competition</strong> via leaderboards and prize raffles\n\nAt week's end, participants receive <em>evidence-based feedback</em> showing actual peer norms versus their perceptions, how they compared to real norms, and peer ratings of behaviors. This approach has been proven to reduce risky drinking behaviors by correcting inflated perceptions.\n\nThe app features sophisticated <strong>gamification elements</strong> including slot machine animations, coin systems, progress tracking, and social features to maintain long-term engagement in what is essentially a longitudinal research study.",
    icon: "/images/projects/campusgandr/campusgandr_icon.png",
    media: [
      "/images/projects/campusgandr/campusgandr_1.png",
      "/images/projects/campusgandr/campusgandr_2.png",
      "/images/projects/campusgandr/campusgandr_3.png",
    ],
    skills: [
      "Mobile Development",
      "Research Application Development",
      "Gamification & UX Design",
      "Full-Stack Development",
      "Data Analytics",
      "Animation & UI/UX",
      "Behavioral Psychology Integration",
      "Longitudinal Study Design",
    ],
    tools: [
      "React Native",
      "React",
      "Expo",
      "TypeScript",
      "Firebase",
      "Firestore",
      "UI Kitten",
    ],
    github: "https://github.com/JustusWest/CampusGANDR",
    link: "https://campusgandr.app/",
  },
];
