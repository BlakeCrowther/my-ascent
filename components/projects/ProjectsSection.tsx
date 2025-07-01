"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  MotionCommand,
} from "@/components/ui/command";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

import { ProjectNavigation } from "./ProjectNavigation";
import { ProjectThumbnails } from "./ProjectThumbnails";
import { ProjectsCarousel } from "./ProjectsCarousel";
import { projects } from "@/config/projects";

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  // `useInView` is often better for simple "enter viewport" triggers,
  // especially with scroll-snapping. `once: true` ensures the animation
  // only runs once when the component enters the screen.
  // `amount: 0.5` means it will trigger when 50% of the element is visible.
  const isInView = useInView(containerRef, { amount: 0.2 });

  // Variants define the states of our animation.
  const leftAnimation = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const allTags = [
    ...new Set(
      projects.flatMap((project) => [...project.skills, ...project.tools]),
    ),
  ];

  const handleThumbClick = (index: number) => {
    setSelectedProjectIndex(index);
  };

  const handlePrevious = () => {
    setSelectedProjectIndex((prev) =>
      prev > 0 ? prev - 1 : projects.length - 1,
    );
  };

  const handleNext = () => {
    setSelectedProjectIndex((prev) =>
      prev < projects.length - 1 ? prev + 1 : 0,
    );
  };

  const canScrollPrev = selectedProjectIndex > 0;
  const canScrollNext = selectedProjectIndex < projects.length - 1;

  return (
    // We attach the ref to the outer container.
    <div
      ref={containerRef}
      className="flex w-full flex-col items-center justify-center gap-8"
    >
      <motion.h2
        variants={leftAnimation}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 1 }}
        className="text-5xl font-bold tracking-tight"
      >
        Projects
      </motion.h2>
      <div
        onFocus={() => setOpen(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setOpen(false);
          }
        }}
        className="w-full max-w-4xl"
      >
        <MotionCommand
          variants={leftAnimation}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 1, delay: 0.1 }}
          className="glass rounded-xl"
        >
          <CommandInput placeholder="Filter projects..." />
          <CommandList>
            {open && (
              <>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  {allTags.map((tag) => (
                    <CommandItem key={tag}>{tag}</CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </MotionCommand>
      </div>
      <ProjectNavigation
        projects={projects}
        selectedIndex={selectedProjectIndex}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onDotClick={handleThumbClick}
        canScrollPrev={canScrollPrev}
        canScrollNext={canScrollNext}
        isInView={isInView}
      />
      <ProjectThumbnails
        projects={projects}
        selectedIndex={selectedProjectIndex}
        onThumbClick={handleThumbClick}
        isInView={isInView}
      />
      <ProjectsCarousel
        isInView={isInView}
        projects={projects}
        showThumbnails={false}
        selectedIndex={selectedProjectIndex}
        onSelectedIndexChange={setSelectedProjectIndex}
      />
    </div>
  );
}
