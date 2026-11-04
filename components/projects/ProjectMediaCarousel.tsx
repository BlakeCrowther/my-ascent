"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CarouselThumb } from "@/components/ui/CarouselThumb";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

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

  const openModal = useCallback((index: number) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const navigateModal = useCallback(
    (direction: "prev" | "next") => {
      if (direction === "prev") {
        setModalImageIndex((prev) => (prev - 1 + media.length) % media.length);
      } else {
        setModalImageIndex((prev) => (prev + 1) % media.length);
      }
    },
    [media.length],
  );

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

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          navigateModal("prev");
          break;
        case "ArrowRight":
          e.preventDefault();
          navigateModal("next");
          break;
        case "Escape":
          e.preventDefault();
          closeModal();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, navigateModal, closeModal]);

  // Don't render anything if there's no media
  if (!media || media.length === 0) {
    return (
      <div className="bg-muted/20 text-muted-foreground flex h-48 w-full items-center justify-center rounded-lg">
        <span className="text-sm">No media available</span>
      </div>
    );
  }

  return (
    <>
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
                  className="relative aspect-[2/1] w-full cursor-pointer overflow-hidden rounded-lg transition-opacity hover:opacity-90"
                  onClick={() => openModal(index)}
                >
                  <Image
                    src={src}
                    alt={`${projectTitle} media ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Expand indicator */}
                  <div className="absolute top-2 right-2 rounded bg-black/50 p-1 text-white opacity-0 transition-opacity hover:opacity-100">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 21l-6-6m6 6v-4.8m0 4.8h-4.8" />
                      <path d="M3 16.2V21m0 0h4.8M3 21l6-6" />
                      <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6" />
                      <path d="M3 7.8V3m0 0h4.8M3 3l6 6" />
                    </svg>
                  </div>
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
                    <div className="h-12 w-16 rounded-md">
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

      {/* Expandable Image Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="h-[95vh] w-[95vw] max-w-none border-none bg-black/95 p-0 sm:h-[90vh] sm:w-[90vw] lg:h-[85vh] lg:max-w-7xl">
          <DialogTitle className="sr-only">
            {projectTitle} - Image {modalImageIndex + 1} of {media.length}
          </DialogTitle>
          <div className="relative flex h-full w-full items-center justify-center p-2 sm:p-4 lg:p-6">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 text-white hover:bg-white/20 sm:top-4 sm:right-4"
              onClick={closeModal}
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>

            {/* Navigation buttons */}
            {media.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 z-10 text-white hover:bg-white/20 sm:left-4"
                  onClick={() => navigateModal("prev")}
                >
                  <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 z-10 text-white hover:bg-white/20 sm:right-4"
                  onClick={() => navigateModal("next")}
                >
                  <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
                </Button>
              </>
            )}

            {/* Modal Image */}
            <div className="relative h-full max-h-full w-full max-w-full sm:max-h-[75vh] sm:max-w-5xl lg:max-h-[70vh] lg:max-w-6xl">
              <Image
                src={media[modalImageIndex]}
                alt={`${projectTitle} expanded view ${modalImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 95vw, (max-width: 1024px) 85vw, 75vw"
                priority
              />
            </div>

            {/* Image counter */}
            {media.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 transform rounded-full bg-black/70 px-2 py-1 text-xs text-white sm:bottom-4 sm:px-3 sm:text-sm">
                {modalImageIndex + 1} / {media.length}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
