"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import { CarouselThumb } from "@/components/ui/CarouselThumb";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

interface ProjectMediaCarouselProps {
  media: string[];
  projectTitle: string;
}

export function ProjectMediaCarousel({
  media,
  projectTitle,
}: ProjectMediaCarouselProps) {
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

  // Don't render anything if there's no media
  if (!media || media.length === 0) {
    return (
      <div className="bg-muted/20 text-muted-foreground flex h-48 w-full items-center justify-center rounded-lg">
        <span className="text-sm">No media available</span>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-md flex-col items-center">
      {/* Main Media Carousel */}
      <Carousel className="w-full" setApi={setMainApi}>
        <CarouselContent>
          {media.map((src, index) => (
            <CarouselItem key={index}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[2/1] w-full overflow-hidden rounded-lg"
              >
                <Image
                  src={src}
                  alt={`${projectTitle} media ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {media.length > 1 && (
          <>
            <CarouselPrevious variant="outline" className="text-foreground" />
            <CarouselNext variant="outline" className="text-foreground" />
          </>
        )}
      </Carousel>

      {/* Thumbnail Navigation */}
      {media.length > 1 && (
        <div className="mt-4 w-full">
          <Carousel
            setApi={setThumbApi}
            opts={{
              containScroll: "keepSnaps",
              dragFree: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-1">
              {media.map((src, index) => (
                <CarouselItem key={index} className="basis-auto pl-1">
                  <div className="h-12 w-16">
                    <CarouselThumb
                      onClick={() => onThumbClick(index)}
                      selected={index === selectedIndex}
                    >
                      <Image
                        src={src}
                        alt={`${projectTitle} thumbnail ${index + 1}`}
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
      )}
    </div>
  );
}
