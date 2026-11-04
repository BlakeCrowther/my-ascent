"use client";

import { motion, useMotionValue, useScroll } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

import { climbingPath } from "./path";

// =============================================================================
// 🎯 Tuning Configuration
//
// Refactored for simplicity! Positioning is now mainly handled by CSS in the
// returned JSX. Adjust these values to fine-tune the animation.
// =============================================================================

/**
 * PATH_TRANSFORM: Matrix transformation applied to the raw SVG path coordinates.
 * This is necessary because the original path data is not at the origin (0,0).
 * These values are from the original `freerider.svg` file and should generally
 * not be changed unless you re-export the path.
 *
 * It combines two transforms from the original SVG:
 * 1. The group transform: translate(-72.97, -40.41)
 * 2. The path transform: scale(0.2645) translate(-8.69, -0.68)
 *
 * We bake these into the path itself so our coordinate system is simpler.
 */
const PATH_TRANSFORM_MATRIX =
  "matrix(0.26458333,0,0,0.26458333,-81.665308,-41.091832)";

/**
 * applyInvertedScroll: Set to `true` if the climber moves down when you
 * scroll down. Setting this to true will reverse the animation direction.
 */
const INVERT_SCROLL = false;

const IMAGE_SRC = "/images/background.webp";

// The base height of our viewBox, which we'll use for our scaling calculations.
const BASE_VIEWBOX_HEIGHT = 350;

// The Climber component is now much simpler and doesn't need props.
export function Climber() {
  const pathRef = useRef<SVGPathElement>(null);
  const [scale, setScale] = useState(1);
  // State to hold the natural dimensions of the background image.
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const { scrollYProgress } = useScroll({
    // Determines the scroll range over which the animation occurs.
    // "start start" means animation begins when the top of the page hits the top of the viewport.
    // "end end" means animation ends when the bottom of the page hits the bottom of the viewport.
    offset: ["start start", "end end"],
  });

  // Motion values to hold the climber's x and y coordinates.
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // This effect runs once to get the natural dimensions of the background image.
  // This is crucial for correctly mimicking the `object-cover` behavior.
  useLayoutEffect(() => {
    const img = new Image();
    img.src = IMAGE_SRC;
    img.onload = () => {
      setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
    };
  }, []);

  // This effect calculates the scale factor, ensuring the SVG path scales
  // perfectly in sync with the `object-cover` background image.
  useLayoutEffect(() => {
    function updateScale() {
      if (!imageSize) return; // Don't run if we don't know the image size yet.

      const vW = window.innerWidth;
      const vH = window.innerHeight;
      const { width: iW, height: iH } = imageSize;

      // Calculate the scale factors for both width and height.
      const scaleX = vW / iW;
      const scaleY = vH / iH;

      // The `object-cover` logic is to use the LARGER of the two scales.
      // This ensures the image covers the entire container.
      const coverScale = Math.max(scaleX, scaleY);

      // The final rendered height of the background image.
      const finalImageHeight = iH * coverScale;

      // We want our SVG's final height to match the image's final height.
      // So, we calculate the scale needed to get from our base height to the target height.
      const newScale = finalImageHeight / BASE_VIEWBOX_HEIGHT;

      setScale(newScale);
    }

    window.addEventListener("resize", updateScale);
    // updateScale depends on imageSize, so we call it here.
    if (imageSize) {
      updateScale();
    }

    return () => window.removeEventListener("resize", updateScale);
  }, [imageSize]); // Rerun this effect when the image size is known.

  // This effect is for setting the initial position and logging debug info.
  // It runs whenever the scale changes, ensuring we have the latest info.
  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path || !scale) return; // Wait for path and scale to be ready

    // 1. Get Path Information
    const pathBBox = path.getBBox();
    // console.log("--- DEBUG INFO ---");
    // console.log("Path Bounding Box:", {
    //   x: pathBBox.x.toFixed(2),
    //   y: pathBBox.y.toFixed(2),
    //   width: pathBBox.width.toFixed(2),
    //   height: pathBBox.height.toFixed(2),
    // });

    // 2. Get Circle Information
    const startPoint = path.getPointAtLength(0);
    // console.log("Circle's Target Coordinates:", {
    //   cx: startPoint.x.toFixed(2),
    //   cy: startPoint.y.toFixed(2),
    // });
    // console.log("--------------------");

    // 3. Set Circle Position
    x.set(startPoint.x);
    y.set(startPoint.y);
  }, [scale, x, y]); // Rerun when scale changes.

  // This effect ONLY handles scroll animation.
  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path || !scale) return;

    const pathLength = path.getTotalLength();

    const unsubscribe = scrollYProgress.onChange((progress) => {
      const currentProgress = INVERT_SCROLL ? 1 - progress : progress;
      const point = path.getPointAtLength(currentProgress * pathLength);
      x.set(point.x);
      y.set(point.y);
    });

    return () => unsubscribe();
  }, [scrollYProgress, scale, x, y]);

  return (
    <svg
      // This viewBox is our "default" or "base" view, which we've fine-tuned.
      viewBox="-75 -33 210 294"
      // We now set a fixed pixel-based size that matches the viewBox.
      // This creates a 1:1 default that we can then scale with a transform.
      width="250"
      height="350"
      preserveAspectRatio="xMidYMid meet"
      // The className now only handles positioning. Fixed positioning locks it to the viewport.
      className="pointer-events-none fixed top-0 left-0 z-10"
      style={{
        // The transform now dynamically scales the SVG from the top-left corner,
        // keeping it anchored with the background image.
        transform: `scale(${scale})`,
        transformOrigin: "top left",

        // Debugging visuals removed for the final version.
        // background: "rgba(255, 0, 0, 0.1)",
        // border: "2px dashed rgba(255, 255, 255, 0.5)",
      }}
    >
      {/*
        The <g> (group) element now handles the transform for the path and climber,
        ensuring they move together and use a consistent coordinate system.
      */}
      <g transform={PATH_TRANSFORM_MATRIX}>
        <path
          ref={pathRef}
          d={climbingPath}
          fill="none"
          stroke="rgba(255, 255, 255, 0.8)"
          strokeWidth={3}
          strokeDasharray="10 6"
          // The transform is now on the parent <g> element
          // transform={PATH_TRANSFORM_MATRIX}
        />
        {/*
          We wrap the climber in a <g> element to solve the transform issue.
          The outer <g> handles the dynamic x/y positioning along the path.
          The inner <image> handles the static centering adjustment.
        */}
        <motion.g style={{ x, y }}>
          <image
            href="/climber/climber.svg"
            width={70}
            height={70}
            style={{
              // We adjust the transform to shift the climber.
              transform: "translate(-17%, -10%)",
              transformOrigin: "center",
              filter: "drop-shadow(0px 1px 3px rgba(0,0,0,0.5))",
            }}
          />
        </motion.g>
      </g>
    </svg>
  );
}
