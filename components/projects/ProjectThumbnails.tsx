"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

import { CarouselThumb } from "@/components/ui/CarouselThumb";
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/config/projects";

interface ProjectThumbnailsProps {
  projects: Project[];
  selectedIndex: number;
  onThumbClick: (index: number) => void;
  isInView: boolean;
}

export function ProjectThumbnails({
  projects,
  selectedIndex,
  onThumbClick,
  isInView,
}: ProjectThumbnailsProps) {
  const [thumbApi, setThumbApi] = useState<CarouselApi>();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4,
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
      },
    },
  };

  useEffect(() => {
    if (!thumbApi) return;
    thumbApi.scrollTo(selectedIndex);
  }, [selectedIndex, thumbApi]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full max-w-4xl"
    >
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
                className="panel h-32 w-40 rounded-xl md:h-40 md:w-56"
              >
                <CarouselThumb
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
                >
                  <div className="text-sub-text flex h-full w-full flex-col items-center justify-center gap-2 p-2 text-center">
                    <div className="relative h-10 w-10 flex-shrink-0 md:h-14 md:w-14">
                      <Image
                        src={project.icon}
                        alt={`${project.title} icon`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-xs leading-tight font-semibold md:text-sm">
                      {project.title}
                    </span>
                  </div>
                </CarouselThumb>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant="outline" className="text-foreground" />
        <CarouselNext variant="outline" className="text-foreground" />
      </Carousel>
    </motion.div>
  );
}
