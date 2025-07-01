"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
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

  useEffect(() => {
    if (!thumbApi) return;
    thumbApi.scrollTo(selectedIndex);
  }, [selectedIndex, thumbApi]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay: 0.4 }}
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
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="glass h-32 w-40 rounded-xl md:h-40 md:w-56"
              >
                <CarouselThumb
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
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
    </motion.div>
  );
}
