"use client";

import { ChevronDown, ChevronUp, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  MotionCommand,
} from "@/components/ui/command";
import { Project, projects } from "@/config/projects";
import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";

import { ProjectNavigation } from "./ProjectNavigation";
import { ProjectThumbnails } from "./ProjectThumbnails";
import { ProjectsCarousel } from "./ProjectsCarousel";

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showMoreSkills, setShowMoreSkills] = useState(false);
  const [showMoreTools, setShowMoreTools] = useState(false);

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

  // Separate skills and tools
  const allSkills = [
    ...new Set(projects.flatMap((project) => project.skills)),
  ].sort();

  const allTools = [
    ...new Set(projects.flatMap((project) => project.tools)),
  ].sort();

  // Filter projects based on search text and selected filters
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Check if project matches search text (title or subtitle)
      const matchesSearch =
        searchText === "" ||
        project.title.toLowerCase().includes(searchText.toLowerCase()) ||
        project.subtitle.toLowerCase().includes(searchText.toLowerCase());

      // Check if project has all selected filter tags
      const projectTags = [...project.skills, ...project.tools];
      const matchesFilters =
        selectedFilters.length === 0 ||
        selectedFilters.every((filter) => projectTags.includes(filter));

      return matchesSearch && matchesFilters;
    });
  }, [searchText, selectedFilters]);

  // Available skills and tools that aren't already selected
  const availableSkills = allSkills.filter(
    (skill) => !selectedFilters.includes(skill),
  );
  const availableTools = allTools.filter(
    (tool) => !selectedFilters.includes(tool),
  );

  // Filter skills and tools based on search text first
  const filteredSkills = availableSkills.filter((skill) =>
    skill.toLowerCase().includes(searchText.toLowerCase()),
  );
  const filteredTools = availableTools.filter((tool) =>
    tool.toLowerCase().includes(searchText.toLowerCase()),
  );

  // Show/hide logic for filtered skills and tools
  const displayedSkills = showMoreSkills
    ? filteredSkills
    : filteredSkills.slice(0, 5);
  const displayedTools = showMoreTools
    ? filteredTools
    : filteredTools.slice(0, 5);

  const handleThumbClick = (index: number) => {
    setSelectedProjectIndex(index);
  };

  const handlePrevious = () => {
    setSelectedProjectIndex((prev) =>
      prev > 0 ? prev - 1 : filteredProjects.length - 1,
    );
  };

  const handleNext = () => {
    setSelectedProjectIndex((prev) =>
      prev < filteredProjects.length - 1 ? prev + 1 : 0,
    );
  };

  const handleTagSelect = (tag: string) => {
    if (!selectedFilters.includes(tag)) {
      setSelectedFilters((prev) => [...prev, tag]);
      setSelectedProjectIndex(0); // Reset to first project when adding filter
    }
    setSearchText(""); // Clear search input after selecting a tag
    setOpen(false);
  };

  const handleRemoveFilter = (tagToRemove: string) => {
    setSelectedFilters((prev) => prev.filter((tag) => tag !== tagToRemove));
    setSelectedProjectIndex(0); // Reset to first project when removing filter
  };

  const handleSearchChange = (value: string) => {
    setSearchText(value);
    setSelectedProjectIndex(0); // Reset to first project when searching
  };

  const canScrollPrev = selectedProjectIndex > 0;
  const canScrollNext = selectedProjectIndex < filteredProjects.length - 1;

  return (
    // We attach the ref to the outer container.
    <div
      ref={containerRef}
      className="flex w-full flex-col items-center justify-center gap-6"
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

      {/* Search and Filter UI */}
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
          <CommandInput
            placeholder="Search for a project or filter by specific skills and tools..."
            value={searchText}
            onValueChange={handleSearchChange}
          />
          <CommandList>
            {open && (
              <>
                {filteredSkills.length === 0 && filteredTools.length === 0 ? (
                  <CommandEmpty>No available tags found.</CommandEmpty>
                ) : (
                  <>
                    {/* Skills Group */}
                    {filteredSkills.length > 0 && (
                      <CommandGroup heading="Skills">
                        {displayedSkills.map((skill) => (
                          <CommandItem
                            key={skill}
                            onSelect={() => handleTagSelect(skill)}
                            className="cursor-pointer"
                          >
                            {skill}
                          </CommandItem>
                        ))}
                        {filteredSkills.length > 5 && (
                          <CommandItem
                            onSelect={() => setShowMoreSkills(!showMoreSkills)}
                            className="cursor-pointer text-white/60 italic"
                          >
                            <span className="flex items-center gap-2">
                              {showMoreSkills ? (
                                <>
                                  <ChevronUp className="h-3 w-3" />
                                  Show less skills
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="h-3 w-3" />
                                  Show {filteredSkills.length - 5} more skills
                                </>
                              )}
                            </span>
                          </CommandItem>
                        )}
                      </CommandGroup>
                    )}

                    {/* Tools Group */}
                    {filteredTools.length > 0 && (
                      <CommandGroup heading="Tools">
                        {displayedTools.map((tool) => (
                          <CommandItem
                            key={tool}
                            onSelect={() => handleTagSelect(tool)}
                            className="cursor-pointer"
                          >
                            {tool}
                          </CommandItem>
                        ))}
                        {filteredTools.length > 5 && (
                          <CommandItem
                            onSelect={() => setShowMoreTools(!showMoreTools)}
                            className="cursor-pointer text-white/60 italic"
                          >
                            <span className="flex items-center gap-2">
                              {showMoreTools ? (
                                <>
                                  <ChevronUp className="h-3 w-3" />
                                  Show less tools
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="h-3 w-3" />
                                  Show {filteredTools.length - 5} more tools
                                </>
                              )}
                            </span>
                          </CommandItem>
                        )}
                      </CommandGroup>
                    )}
                  </>
                )}
              </>
            )}
          </CommandList>
        </MotionCommand>
      </div>

      {/* Filter Banners */}
      {selectedFilters.length > 0 && (
        <motion.div
          variants={leftAnimation}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 1, delay: 0.2 }}
          className="-mt-2 flex w-full max-w-4xl flex-wrap justify-start gap-2"
        >
          {selectedFilters.map((filter) => (
            <div
              key={filter}
              className="inline-flex gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white/80"
            >
              <span>{filter}</span>
              <button
                onClick={() => handleRemoveFilter(filter)}
                className="rounded-full p-1 transition-colors hover:bg-white/20"
                aria-label={`Remove ${filter} filter`}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {selectedFilters.length > 1 && (
            <button
              onClick={() => {
                setSelectedFilters([]);
                setSelectedProjectIndex(0);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-red-500/50 bg-red-500/20 px-3 py-1 text-sm text-red-200 transition-colors hover:bg-red-500/30"
            >
              Clear All
            </button>
          )}
        </motion.div>
      )}

      {/* Results count */}
      {(selectedFilters.length > 0 || searchText !== "") && (
        <motion.div
          variants={leftAnimation}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 1, delay: 0.25 }}
          className="-mt-3 text-sm text-white/60"
        >
          Showing {filteredProjects.length} of {projects.length} projects
        </motion.div>
      )}

      {filteredProjects.length > 0 ? (
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <ProjectNavigation
            projects={filteredProjects}
            selectedIndex={selectedProjectIndex}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onDotClick={handleThumbClick}
            canScrollPrev={canScrollPrev}
            canScrollNext={canScrollNext}
            isInView={isInView}
          />
          <ProjectThumbnails
            projects={filteredProjects}
            selectedIndex={selectedProjectIndex}
            onThumbClick={handleThumbClick}
            isInView={isInView}
          />
          <div className="mt-3 w-full max-w-4xl">
            <ProjectsCarousel
              isInView={isInView}
              projects={filteredProjects}
              showThumbnails={false}
              selectedIndex={selectedProjectIndex}
              onSelectedIndexChange={setSelectedProjectIndex}
            />
          </div>
        </div>
      ) : (
        <motion.div
          variants={leftAnimation}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 1, delay: 0.3 }}
          className="glass rounded-xl p-8 text-center"
        >
          <p className="text-lg text-white/70">
            No projects found matching your filters.
          </p>
          <p className="mt-2 text-sm text-white/50">
            Try removing some filters or adjusting your search.
          </p>
        </motion.div>
      )}
    </div>
  );
}
