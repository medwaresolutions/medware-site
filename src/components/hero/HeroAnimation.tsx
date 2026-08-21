"use client";

import { useEffect, useRef, useState } from "react";
import HeroLoop, { CY, SQ } from "./HeroLoop";

/* The frame renders at t ≈ 4.2s for reduced-motion users: mid-engagement, where
   the fan-out lines are drawn and the first agent check marks have landed — so
   the still frame still reads as "project in → agents work it → shipped". */
const STILL_T = 4.2;

/* Square stage for the hero loop.
 *
 * Owns three things the animation itself deliberately doesn't:
 *   1. scale-to-fit — the loop is authored on a fixed 1080px canvas
 *   2. cost control — the rAF only runs while the frame is actually on screen
 *      and the tab is visible; a 60fps re-render of ~40 positioned nodes is not
 *      something to leave running under the fold
 *   3. prefers-reduced-motion — no rAF at all, one frozen frame instead
 */
export default function HeroAnimation() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [{ t, cycle }, setClock] = useState({ t: 0, cycle: 0 });
  const [still, setStill] = useState(false);

  // Scale the 1080 canvas down to whatever width the column gives us.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const fit = () => setScale(el.clientWidth / SQ);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Reduced motion: freeze on a representative frame, never start the loop.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setStill(mq.matches);
      if (mq.matches) setClock({ t: STILL_T, cycle: 0 });
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // The clock. Elapsed time accumulates across pauses, so scrolling away and
  // back resumes where it left off rather than jumping.
  useEffect(() => {
    if (still) return;
    const el = frameRef.current;
    if (!el) return;

    let raf = 0;
    let elapsed = 0;
    let last = 0;
    let onScreen = false;
    let cycles = 0;
    let prev = 0;

    const tick = (now: number) => {
      const dt = last ? (now - last) / 1000 : 0;
      last = now;
      elapsed += dt;
      const nt = elapsed % CY;
      if (nt < prev) cycles += 1;
      prev = nt;
      setClock({ t: nt, cycle: cycles });
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf) return;
      last = 0; // discard the gap we spent paused
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const sync = () => {
      if (onScreen && document.visibilityState === "visible") start();
      else stop();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [still]);

  return (
    <div
      ref={frameRef}
      className="mw-hero-stage"
      style={
        {
          // Scoped to the frame — these must not leak into the site's M3 tokens.
          "--acc1": "#38bdf8",
          "--acc2": "#0ea5e9",
          "--acc3": "#7dd3fc",
        } as React.CSSProperties
      }
      role="img"
      aria-label="A client project enters the Medware hub, is worked by a team of AI agents across clinical, legal, design, engineering and compliance disciplines against a knowledge bank of TGA, FDA, PBS and ISO sources, and ships as a delivered product."
    >
      <div
        className="mw-hero-canvas"
        style={{ transform: `scale(${scale})`, visibility: scale ? "visible" : "hidden" }}
      >
        <HeroLoop t={t} cycle={cycle} still={still} />
      </div>
    </div>
  );
}
