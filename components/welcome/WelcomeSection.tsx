"use client";

import { useEffect, useRef, useState } from "react";

import { ChevronDown } from "lucide-react";
import { useScroll } from "framer-motion";

const ROLES = [
  "Data Scientist (M.A.S.)",
  "AI/ML Explorer",
  "Full Stack Developer",
  "UI/UX Enthusiast",
  "Rock Climbing Aficionado",
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
    <div className="relative flex h-full w-full flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold">My Ascent as a</h1>
      <p
        className={`mt-2 text-xl font-medium tracking-wide drop-shadow-sm transition-opacity duration-500 sm:text-3xl ${
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
        className={`group absolute bottom-0 left-0 flex h-[30%] w-full cursor-pointer items-end justify-center pb-8 transition-opacity duration-700 ${
          hidden ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))",
        }}
      >
        <ChevronDown
          size={56}
          className="animate-bounce text-white drop-shadow-md transition-transform group-hover:scale-110"
        />
      </a>
    </div>
  );
}
