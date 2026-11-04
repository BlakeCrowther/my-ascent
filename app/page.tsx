"use client";

import { useEffect, useRef } from "react";

import { AboutSection } from "@/components/about/AboutSection";
import { Climber } from "@/components/climber/Climber";
import { ContactSection } from "@/components/contact/ContactSection";
import Image from "next/image";
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
      <div className="bg-container-fixed -z-10">
        <Image
          src="/images/background.webp"
          alt="A panoramic view of Yosemite Valley at sunset, with El Capitan prominently on the left."
          // The `fill` prop makes the image expand to fit its parent container.
          fill
          // `priority` tells Next.js to load this image first, as it's the
          // largest and most important visual element on the page (LCP).
          priority
          // This is the key for our mobile-first strategy:
          // - `object-cover`: Scales the image to cover the entire container.
          // - `object-left`: Aligns the image to the left, keeping El Capitan in view.
          className="object-cover object-top-left"
          quality={100}
          sizes="100vw"
        />
      </div>

      <div className="z-10">
        <Climber />
      </div>

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
