"use client";

import { useEffect, useRef, useState } from "react";
import { TOTAL_PRODUCTS } from "@/data/portfolio";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/* Nested rings: a career contains the AI hours, and the AI hours contain the
 * products. The containment is the point, so each band carries its own label
 * curved along the bottom of its own arc rather than sitting in a legend.
 *
 * Text colour is the brand blue throughout. The M3 `on-*-container` tokens are
 * near-black by construction (#00192E, #310500) and read as heavy, flat black
 * on these light bands.
 */
const CX = 220;
const CY = 220;

/* Bottom arc of a circle, traversed left → right, so text on it reads upright
 * and curves with the band. sweep-flag 0 takes the path under the circle. */
const bottomArc = (r: number) => `M ${CX - r} ${CY} A ${r} ${r} 0 0 0 ${CX + r} ${CY}`;

const RINGS = [
  { id: "mw-arc-outer", r: 190, w: 56, value: 30, suffix: "", label: "YEARS IN PHARMA & MEDTECH",
    stroke: "var(--md-sys-color-surface-container-high)" },
  { id: "mw-arc-mid", r: 128, w: 56, value: 12, suffix: "K", label: "HOURS WITH AI",
    stroke: "var(--md-sys-color-primary-container)" },
];

const DISC_R = 88;
const DRAW_MS = 1200;

export default function AboutRings() {
  const ref = useRef<SVGSVGElement>(null);
  const still = usePrefersReducedMotion();
  const [shown, setShown] = useState(false);
  const [drawn, setDrawn] = useState(0);

  /* Reduced motion lands on the finished state directly rather than being
     mirrored into state from an effect. */
  const p = still ? 1 : drawn;

  useEffect(() => {
    const el = ref.current;
    if (!el || still) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [still]);

  // One clock drives the ring draw-on and the number count-up together.
  useEffect(() => {
    if (!shown || still) return;
    let raf = 0;
    let t0 = 0;
    const tick = (now: number) => {
      if (!t0) t0 = now;
      const k = Math.min((now - t0) / DRAW_MS, 1);
      setDrawn(1 - Math.pow(1 - k, 3)); // easeOutCubic
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, still]);

  const count = (n: number) => Math.round(n * p);

  return (
    <svg
      ref={ref}
      viewBox="0 0 440 440"
      width="100%"
      role="img"
      aria-label={`30 years in pharma and medtech, containing 12,000 hours with AI, containing ${TOTAL_PRODUCTS} products shipped.`}
      style={{ display: "block", maxWidth: 440, margin: "0 auto" }}
    >
      <defs>
        {RINGS.map((ring) => (
          <path key={ring.id} id={ring.id} d={bottomArc(ring.r)} fill="none" />
        ))}
      </defs>

      {RINGS.map((ring) => (
        <g key={ring.id}>
          <circle
            cx={CX}
            cy={CY}
            r={ring.r}
            fill="none"
            stroke={ring.stroke}
            strokeWidth={ring.w}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - p}
            transform={`rotate(-90 ${CX} ${CY})`}
          />
          <text fill="var(--md-sys-color-primary)" opacity={p}>
            <textPath href={`#${ring.id}`} startOffset="50%" textAnchor="middle">
              <tspan
                style={{
                  fontFamily: "var(--md-sys-typescale-font-brand)",
                  fontStretch: "var(--md-sys-typescale-width-brand)",
                  fontSize: 24,
                  fontWeight: 700,
                }}
              >
                {count(ring.value)}
                {ring.suffix}
              </tspan>
              <tspan
                dx="7"
                style={{
                  fontFamily: "var(--md-sys-typescale-font-plain)",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.09em",
                }}
              >
                {ring.label}
              </tspan>
            </textPath>
          </text>
        </g>
      ))}

      {/* Scale about the centre the SVG way — transform-origin is not a
          presentation attribute, so it has to be composed explicitly. */}
      <circle
        cx={CX}
        cy={CY}
        r={DISC_R}
        fill="var(--md-sys-color-primary)"
        transform={`translate(${CX} ${CY}) scale(${0.6 + 0.4 * p}) translate(${-CX} ${-CY})`}
        opacity={p}
      />
      <text
        x={CX}
        y={CY + 6}
        textAnchor="middle"
        fill="var(--md-sys-color-on-primary)"
        opacity={p}
        style={{
          fontFamily: "var(--md-sys-typescale-font-brand)",
          fontStretch: "var(--md-sys-typescale-width-brand)",
          fontSize: 58,
          fontWeight: 700,
        }}
      >
        {count(TOTAL_PRODUCTS)}
      </text>
      <text
        x={CX}
        y={CY + 36}
        textAnchor="middle"
        fill="var(--md-sys-color-on-primary)"
        opacity={p * 0.9}
        style={{
          fontFamily: "var(--md-sys-typescale-font-plain)",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.09em",
        }}
      >
        PRODUCTS SHIPPED
      </text>
    </svg>
  );
}
