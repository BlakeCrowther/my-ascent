"use client";

import { motion, useMotionValue, useScroll } from "framer-motion";
import { RefObject, useLayoutEffect, useRef, useState } from "react";

import { climbingPath } from "./path";
import { timeline } from "@/config/timeline";

/** Elements with this attribute pin the climber to a spot on the route. */
const ANCHOR_ATTR = "data-climb-t";

type Keypoint = { scroll: number; t: number };

/**
 * Builds scroll -> route keypoints from every [data-climb-t] element: the
 * climber reaches an element's `t` when that element is centred on screen.
 * The page top is the base (t = 0); past the last anchor it stays put.
 */
function readKeypoints(): Keypoint[] {
  const anchors = Array.from(
    document.querySelectorAll<HTMLElement>(`[${ANCHOR_ATTR}]`),
  );
  const points: Keypoint[] = [{ scroll: 0, t: 0 }];
  for (const el of anchors) {
    const t = Number(el.getAttribute(ANCHOR_ATTR));
    if (Number.isNaN(t)) continue;
    const rect = el.getBoundingClientRect();
    const centre = rect.top + window.scrollY + rect.height / 2;
    const scroll = Math.max(0, centre - window.innerHeight / 2);
    const last = points[points.length - 1];
    // Keep keypoints strictly increasing in both scroll and t.
    if (scroll > last.scroll && t >= last.t) points.push({ scroll, t });
  }
  return points;
}

function routeProgress(points: Keypoint[], scroll: number): number {
  if (points.length < 2) return 0;
  if (scroll <= points[0].scroll) return points[0].t;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    if (scroll <= b.scroll) {
      return a.t + ((scroll - a.scroll) / (b.scroll - a.scroll)) * (b.t - a.t);
    }
  }
  return points[points.length - 1].t;
}

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
 * Width / height of the background image (public/images/background.webp is
 * 2560x1707, from a 5472x3648 original). The portrait crop is narrower, but it
 * is only served to screens narrower than 3:4, where object-cover scales either
 * file to the container's height, so this ratio gives the same result.
 */
const BACKGROUND_ASPECT = 5472 / 3648;

// The base height of our viewBox, which we'll use for our scaling calculations.
const BASE_VIEWBOX_HEIGHT = 350;

type ClimberProps = {
  /**
   * The fixed background container. The climber scales from this element's
   * size, not from window.innerHeight, so it always matches the image exactly,
   * including on mobile where the browser toolbar grows and shrinks.
   */
  containerRef: RefObject<HTMLDivElement | null>;
};

export function Climber({ containerRef }: ClimberProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [scale, setScale] = useState(0);

  const { scrollY } = useScroll();
  const keypoints = useRef<Keypoint[]>([]);
  // How many milestones the climber has reached; only changes at belays.
  const [reached, setReached] = useState(0);
  const [belays, setBelays] = useState<
    { x: number; y: number; t: number; id: string; label: string }[]
  >([]);

  // Motion values to hold the climber's x and y coordinates.
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Scale the SVG so it tracks the `object-cover` background exactly. The
  // container is sized in lvh, so it (and this scale) does not change when a
  // mobile toolbar collapses; it only changes on real resizes or rotation.
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function updateScale(width: number, height: number) {
      if (!width || !height) return;
      // object-cover scales the image to the larger of the two fits, so the
      // rendered image height is whichever is bigger: the container height,
      // or the height the image needs to span the container's width.
      const renderedImageHeight = Math.max(height, width / BACKGROUND_ASPECT);
      setScale(renderedImageHeight / BASE_VIEWBOX_HEIGHT);
    }

    const rect = container.getBoundingClientRect();
    updateScale(rect.width, rect.height);

    const observer = new ResizeObserver(([entry]) => {
      updateScale(entry.contentRect.width, entry.contentRect.height);
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef]);

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

  // Belay dots: one per timeline milestone, at its landmark on the route.
  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path || !scale) return;
    const length = path.getTotalLength();
    setBelays(
      timeline.map(({ landmark, id, title, dates }) => {
        const p = path.getPointAtLength(landmark.t * length);
        return {
          x: p.x,
          y: p.y,
          t: landmark.t,
          id,
          label: dates ? `${title} (${dates})` : title,
        };
      }),
    );
  }, [scale]);

  // Scroll animation: map page scroll to route progress through the anchors.
  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path || !scale) return;

    const pathLength = path.getTotalLength();

    function update(scroll: number) {
      const t = routeProgress(keypoints.current, scroll);
      const point = path!.getPointAtLength(t * pathLength);
      x.set(point.x);
      y.set(point.y);
      setReached(
        timeline.filter(({ landmark }) => landmark.t <= t + 0.001).length,
      );
    }

    function remeasure() {
      keypoints.current = readKeypoints();
      update(window.scrollY);
    }

    remeasure();
    // Anchors move as images load and sections animate in, so re-measure
    // whenever the page height changes.
    const observer = new ResizeObserver(remeasure);
    observer.observe(document.body);
    const unsubscribe = scrollY.on("change", update);

    return () => {
      observer.disconnect();
      unsubscribe();
    };
  }, [scrollY, scale, x, y]);

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
        {belays.map((b, i) => {
          const isReached = i < reached;
          const goTo = () =>
            document
              .getElementById(`climb-${b.id}`)
              ?.scrollIntoView({ behavior: "smooth", block: "center" });
          return (
            <g
              key={b.id}
              role="button"
              tabIndex={0}
              aria-label={`Go to ${b.label}`}
              onClick={goTo}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  goTo();
                }
              }}
              style={{ pointerEvents: "all", cursor: "pointer", outline: "none" }}
            >
              <title>{b.label}</title>
              {/* Oversized invisible target so dots are easy to hit on touch. */}
              <circle cx={b.x} cy={b.y} r={14} fill="transparent" />
              <circle
                cx={b.x}
                cy={b.y}
                r={isReached ? 7 : 5.5}
                fill={isReached ? "#f9e5e2" : "rgba(43, 30, 58, 0.55)"}
                stroke="rgba(255, 255, 255, 0.9)"
                strokeWidth={2.5}
                style={{ transition: "all 300ms ease" }}
              />
            </g>
          );
        })}
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
