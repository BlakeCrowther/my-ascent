"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useInView } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

import Autoplay from "embla-carousel-autoplay";
import { MotionCard } from "@/components/ui/card";
import { CarouselThumb } from "@/components/ui/CarouselThumb";
import Image from "next/image";
import { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";

const images = [
  "/images/about/Joshua_Bouldering.jpeg",
  "/images/about/ticketmaster_internship.jpeg",
  "/images/about/Stoney_Point_Undergrad.jpeg",
  "/images/about/Stoney_Point_Undergrad_2.jpeg",
];

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5 });
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

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full items-center justify-center"
    >
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
            <h2 className="mb-4 text-4xl font-bold text-white">About Me</h2>
            <p className="text-lg text-white">
              I am a passionate and driven developer with a love for creating
              elegant and performant solutions. My journey in technology began
              with a deep curiosity for how things work, which led me to pursue
              a degree in Computer Science. Since then, I've had the privilege
              of working on a diverse range of projects, from complex data
              science models to beautifully animated user interfaces.
            </p>
            <p className="mt-4 text-lg text-white">
              When I'm not at my keyboard, you can find me on a rock wall,
              planning my next climbing adventure. The focus, problem-solving,
              and sheer joy of climbing mirror the challenges I love in software
              development. This portfolio is a testament to that synergy—a
              "digital ascent" through my skills and projects.
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
              <CarouselPrevious variant="ghost" />
              <CarouselNext variant="ghost" />
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
