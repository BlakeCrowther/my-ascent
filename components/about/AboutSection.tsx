"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useInView, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

import Autoplay from "embla-carousel-autoplay";
import { MotionCard } from "@/components/ui/card";
import { CarouselThumb } from "@/components/ui/CarouselThumb";
import Image from "next/image";
import { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";

const images = [
  "/images/about/Joshua_Bouldering.jpeg",
  "/images/about/LMU_bluff.jpeg",
  "/images/about/Stoney_Point_Undergrad.jpeg",
  "/images/about/viasat.jpeg",
  "/images/about/Stoney_Point_Undergrad_2.jpeg",
  "/images/about/ticketmaster_internship.jpeg",
];

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2 });
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const autoplay = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
      rootNode: (emblaRoot) => carouselWrapperRef.current,
    }),
  ).current;
  const plugins = useMemo(() => [autoplay], [autoplay]);

  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi],
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    setSelectedIndex(mainApi.selectedScrollSnap());
    thumbApi.scrollTo(mainApi.selectedScrollSnap());
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();

    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);

    return () => {
      mainApi.off("select", onSelect);
      mainApi.off("reInit", onSelect);
    };
  }, [mainApi, onSelect]);

  const animationVariants = {
    hidden: { opacity: 0, y: 75 },
    visible: { opacity: 1, y: 0 },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full flex-col items-center justify-center"
    >
      <motion.h2
        variants={titleVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.8, delay: 0 }}
        className="mb-8 text-center text-5xl font-bold text-white"
      >
        About me
      </motion.h2>
      <MotionCard
        variants={animationVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 1, delay: 0.1 }}
        className="w-full max-w-4xl"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Text Content */}
          <div>
            <p className="text-sub-text text-base">
              I'm a passionate and driven developer who thrives on building
              elegant, high-performance systems—from the frontend to the
              infrastructure that powers it. My journey in tech began with a
              curiosity about how things work, leading me to earn a B.S. in
              Computer Science from Loyola Marymount University.
            </p>
            <p className="text-sub-text mt-4 text-base">
              That curiosity took me into full-stack development and systems
              engineering, where I deepened my skills building across the stack.
              Later, I earned a Master's in Data Science and Engineering at UC
              San Diego, expanding my expertise into AI engineering, machine
              learning, and large-scale data systems.
            </p>
            <p className="text-sub-text mt-4 text-base">
              Each role has shaped a different facet of my skillset, and
              together they form the route I've taken—<em>my ascent</em>—through
              the world of software.
            </p>
            <p className="text-sub-text mt-4 text-base">
              When I'm not coding, I'm climbing. The focus, creativity, and
              problem-solving required on the rock wall are the same qualities I
              bring to my work. This portfolio is more than a showcase—it's a
              visual journey through the peaks of my projects and passions.
              Scroll to follow the climb.
            </p>
          </div>

          {/* Image Carousel */}
          <div
            ref={carouselWrapperRef}
            className="flex flex-col items-center justify-center"
          >
            <Carousel
              className="w-full max-w-xs"
              plugins={plugins}
              setApi={setMainApi}
            >
              <CarouselContent>
                {images.map((src, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <div className="relative aspect-square overflow-hidden rounded-lg">
                        <Image
                          src={src}
                          alt={`Climbing photo ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious variant="outline" className="text-foreground" />
              <CarouselNext variant="outline" className="text-foreground" />
            </Carousel>
            <div className="mt-2 w-full max-w-xs">
              <Carousel
                setApi={setThumbApi}
                opts={{
                  containScroll: "keepSnaps",
                  dragFree: true,
                }}
              >
                <CarouselContent>
                  {images.map((src, index) => (
                    <CarouselItem key={index} className="basis-auto">
                      <div className="h-20 w-20">
                        <CarouselThumb
                          onClick={() => onThumbClick(index)}
                          selected={index === selectedIndex}
                        >
                          <Image
                            src={src}
                            alt={`Climbing photo ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </CarouselThumb>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </MotionCard>
    </div>
  );
}
