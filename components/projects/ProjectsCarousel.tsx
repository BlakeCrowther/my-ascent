"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useCallback, useEffect, useState } from "react";

import { CardContent } from "@/components/ui/card";
import { CarouselThumb } from "@/components/ui/CarouselThumb";
import Image from "next/image";
import { ClipboardList } from "lucide-react";
import { motion } from "framer-motion";
import { ProjectMediaCarousel } from "./ProjectMediaCarousel";
import useEmblaCarousel from "embla-carousel-react";
import { Project, projects } from "@/config/projects";

const projectThumbnails = [
  "/images/about/Joshua_Bouldering.jpeg",
  "/images/about/Stoney_Point_Undergrad.jpeg",
  "/images/about/Stoney_Point_Undergrad_2.jpeg",
  "/images/about/Joshua_Bouldering.jpeg",
  "/images/about/Stoney_Point_Undergrad.jpeg",
];

export function ProjectsCarousel({
  isInView,
  projects,
  showThumbnails = true,
  selectedIndex: externalSelectedIndex,
  onSelectedIndexChange,
}: {
  isInView: boolean;
  projects: Project[];
  showThumbnails?: boolean;
  selectedIndex?: number;
  onSelectedIndexChange?: (index: number) => void;
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
    },
  };

  const [api, setApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Use external selectedIndex if provided, otherwise use internal state
  const currentSelectedIndex =
    externalSelectedIndex !== undefined ? externalSelectedIndex : selectedIndex;

  const onThumbClick = useCallback(
    (index: number) => {
      if (!api) return;
      api.scrollTo(index);
      if (onSelectedIndexChange) {
        onSelectedIndexChange(index);
      } else {
        setSelectedIndex(index);
      }
    },
    [api, onSelectedIndexChange],
  );

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const newSelectedIndex = api.selectedScrollSnap();
      if (onSelectedIndexChange) {
        onSelectedIndexChange(newSelectedIndex);
      } else {
        setSelectedIndex(newSelectedIndex);
      }
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelectedIndexChange]);

  useEffect(() => {
    if (!thumbApi) return;
    thumbApi.scrollTo(currentSelectedIndex);
  }, [currentSelectedIndex, thumbApi]);

  // Sync external selectedIndex changes to the main carousel
  useEffect(() => {
    if (!api || externalSelectedIndex === undefined) return;
    api.scrollTo(externalSelectedIndex);
  }, [api, externalSelectedIndex]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mx-auto w-full max-w-4xl"
    >
      <Carousel setApi={setApi} orientation="horizontal">
        <CarouselContent>
          {projects.map((project, index) => (
            <CarouselItem key={index}>
              <motion.div
                variants={itemVariants}
                className="glass rounded-xl p-6"
              >
                {/* Title - Full Width */}
                <div className="mb-6 text-center">
                  <h3 className="text-3xl font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-lg text-white/70">
                    {project.subtitle}
                  </p>
                </div>

                {/* Two column layout with manual assignments */}
                <div className="flex flex-col gap-8 md:flex-row">
                  {/* Left Column - Description Only */}
                  <div className="flex-1">
                    <div
                      className="text-base leading-relaxed whitespace-pre-line text-white/80"
                      dangerouslySetInnerHTML={{ __html: project.description }}
                    />
                  </div>

                  {/* Right Column - Skills, Tools, Media */}
                  <div className="flex-1 space-y-6">
                    {/* Skills */}
                    <div>
                      <h4 className="mb-2 text-sm font-semibold text-white/90">
                        Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[...project.skills].sort().map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/80"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tools */}
                    <div>
                      <h4 className="mb-2 text-sm font-semibold text-white/90">
                        Tools
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[...project.tools].sort().map((tool, toolIndex) => (
                          <span
                            key={toolIndex}
                            className="rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/80"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Media */}
                    <div className="flex items-center justify-center">
                      <ProjectMediaCarousel
                        media={project.media}
                        projectTitle={project.title}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant="outline" className="text-foreground" />
        <CarouselNext variant="outline" className="text-foreground" />
      </Carousel>
      {showThumbnails && (
        <div className="mt-4">
          <Carousel
            setApi={setThumbApi}
            orientation="horizontal"
            opts={{
              align: "start",
              dragFree: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 flex">
              {projects.map((project, index) => (
                <CarouselItem key={index} className="basis-auto pl-2">
                  <motion.div
                    variants={itemVariants}
                    className="glass h-32 w-40 rounded-xl md:h-40 md:w-56"
                  >
                    <CarouselThumb
                      onClick={() => onThumbClick(index)}
                      selected={index === currentSelectedIndex}
                    >
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center text-white">
                        <div className="relative h-14 w-14 flex-shrink-0">
                          <Image
                            src={project.icon}
                            alt={`${project.title} icon`}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="text-sm leading-tight font-semibold">
                          {project.title}
                        </span>
                      </div>
                    </CarouselThumb>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}
    </motion.div>
  );
}
