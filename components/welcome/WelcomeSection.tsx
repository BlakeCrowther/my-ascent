"use client";

import { useEffect, useRef, useState } from "react";

import { ChevronDown } from "lucide-react";
import { useScroll } from "framer-motion";

const ROLES = [
  "Data Scientist (M.A.S.)",
  "AI/ML Explorer",
  "Full Stack Developer",
  "UI/UX Enthusiast",
  "Rock Climber",
  "Problem Solver",
  "Computer Scientist (B.S.)",
  "Lifelong Learner",
  "Adventurer",
  "Systems Engineer",
];

export function WelcomeSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setHidden(latest > 50);
    });
  }, [scrollY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % ROLES.length);
        setIsFading(false);
      }, 500); // Half-second for the fade-out
    }, 2500); // 2 seconds visible + 0.5s fade

    return () => clearInterval(interval);
  }, []);

  // Fade chevron and scroll to #about on click
  const handleChevronClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const about = document.getElementById("about");
    if (about) {
      about.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex h-dvh w-full flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold sm:text-6xl lg:text-7xl">
        My ascent as a
      </h1>
      <p
        className={`mt-2 text-2xl font-medium tracking-wide drop-shadow-sm transition-opacity duration-500 sm:text-4xl ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        {ROLES[currentRoleIndex]}
      </p>

      {/* Scroll Down Arrow */}
      <a
        href="#about"
        aria-label="Scroll to next section"
        onClick={handleChevronClick}
        className={`group absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer transition-opacity duration-700 ${
          hidden ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <ChevronDown
          size={56}
          className="animate-bounce text-white drop-shadow-md transition-transform group-hover:scale-110"
        />
      </a>
    </div>
  );
}
