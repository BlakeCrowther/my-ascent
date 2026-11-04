"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Project } from "@/config/projects";
import { motion } from "framer-motion";

interface ProjectNavigationProps {
  projects: Project[];
  selectedIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  isInView: boolean;
}

export function ProjectNavigation({
  projects,
  selectedIndex,
  onPrevious,
  onNext,
  onDotClick,
  canScrollPrev,
  canScrollNext,
  isInView,
}: ProjectNavigationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay: 0.0 }}
      className="flex w-full max-w-4xl items-center justify-between"
    >
      {/* Arrow Buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onPrevious}
          disabled={!canScrollPrev}
          className="glass text-foreground h-8 w-8 rounded-full disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onNext}
          disabled={!canScrollNext}
          className="glass text-foreground h-8 w-8 rounded-full disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Dot Indicators */}
      <div className="flex items-center gap-1">
        {projects.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => onDotClick(index)}
            className={`h-2 w-2 rounded-full p-0 transition-all ${
              index === selectedIndex
                ? "bg-black"
                : "bg-black/30 hover:bg-black/50"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
