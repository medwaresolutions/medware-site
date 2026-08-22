"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/* One-shot "has this scrolled into view yet" flag for entrance animations.
 *
 * The observer disconnects on first intersection, so scrolling back up doesn't
 * replay the reveal. Under prefers-reduced-motion it reports true immediately
 * and never observes — the content is simply already there.
 */
export function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const reduced = usePrefersReducedMotion();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, threshold]);

  return { ref, shown: reduced || entered } as const;
}
