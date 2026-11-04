"use client";

import { useEffect, useRef } from "react";

import { AboutSection } from "@/components/about/AboutSection";
import { Climber } from "@/components/climber/Climber";
import { ContactSection } from "@/components/contact/ContactSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { WelcomeSection } from "@/components/welcome/WelcomeSection";
import { useInView } from "framer-motion";

export default function Home() {
  useEffect(() => {
    // On page load, check if there's a hash in the URL.
    if (window.location.hash) {
      // If so, scroll to the top of the page.
      window.scrollTo(0, 0);

      // Remove the hash from the URL without reloading the page.
      // This prevents the browser from trying to scroll to the hash again.
      history.pushState("", document.title, window.location.pathname);
    }
  }, []);

  const backgroundRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const welcomeInView = useInView(welcomeRef, { amount: 0.3 });
  const aboutInView = useInView(aboutRef, { amount: 0.2 });
  const projectsInView = useInView(projectsRef, { amount: 0.2 });
  const contactInView = useInView(contactRef, { amount: 0.2 });

  useEffect(() => {
    if (welcomeInView) {
      history.replaceState(null, "", " ");
    } else if (aboutInView) {
      history.replaceState(null, "", "#about");
    } else if (projectsInView) {
      history.replaceState(null, "", "#projects");
    } else if (contactInView) {
      history.replaceState(null, "", "#contact");
    }
  }, [welcomeInView, aboutInView, projectsInView, contactInView]);

  return (
    // We set a black background as a fallback.
    <main className="relative">
      {/* 
        This div is our new background. It's fixed, so it stays in place
        while the content below scrolls over it. The z-index keeps it in the back.
      */}
      <div ref={backgroundRef} className="bg-container-fixed -z-10">
        {/*
          Art direction: portrait screens (phones, tablets upright) get a
          left-anchored 3:4 crop of the original at 2560px tall, so the image
          stays sharp when it is scaled to the screen's height. Both files are
          anchored top-left and shown with object-cover, so on any screen
          narrower than 3:4 they render identically and the climber's path
          (see BACKGROUND_ASPECT in Climber) lines up with either one.
        */}
        <picture>
          <source
            media="(max-aspect-ratio: 3/4)"
            srcSet="/images/background-portrait.webp"
          />
          <img
            src="/images/background.webp"
            alt="A panoramic view of Yosemite Valley at sunset, with El Capitan prominently on the left."
            className="h-full w-full object-cover object-top-left"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>

      <Climber containerRef={backgroundRef} />

      {/* This container provides the scrollable space. It's on top of the fixed background. */}
      <div className="relative z-20 text-white">
        <section
          ref={welcomeRef}
          className="flex min-h-dvh items-center justify-center"
        >
          <WelcomeSection />
        </section>

        <section
          ref={aboutRef}
          id="about"
          className="flex min-h-dvh items-center justify-center px-4 py-12 pb-40 sm:px-6 sm:pb-12 lg:px-8"
        >
          <AboutSection />
        </section>

        <section
          ref={projectsRef}
          id="projects"
          className="my-12 flex min-h-dvh items-center justify-center px-4 py-12 pt-40 text-white sm:px-6 sm:pt-12 md:my-72 lg:px-8"
        >
          <ProjectsSection />
        </section>

        <section
          ref={contactRef}
          id="contact"
          className="flex min-h-dvh items-center justify-center px-4 text-white sm:px-6 lg:px-8"
        >
          <ContactSection />
        </section>
      </div>
    </main>
  );
}
