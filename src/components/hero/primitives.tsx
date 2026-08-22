/* Shared primitives for the hero animation.
 * Ported from the Claude Design sources in hero_animation/:
 *   - clamp, Easing        → animations.jsx
 *   - PAL, ICON_PATHS,
 *     Icon, seeded,
 *     Glass, DrawPath      → shared.jsx
 * Kept deliberately self-contained: the animation runs in its own dark,
 * always-dark colour space (--acc1/2/3 scoped to the frame) and must not
 * reach into the site's M3 tokens.
 */

import type { CSSProperties, ReactNode } from "react";

export const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export const Easing = {
  linear: (t: number) => t,
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  easeInOutSine: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
  easeOutBack: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
};

/* Palette. sky/skyL/skyXL resolve against the --acc vars set on the frame. */
export const PAL = {
  ink: "#f8fafc",
  /* Lifted from the original #94a3b8: the stage is transparent now, so these
     sit on the hero's mid-blue rather than near-black. */
  body: "#aec3d6",
  emerald: "#34d399",
  glassBorder: "rgba(146,196,235,0.22)",
  line: "rgba(125,211,252,0.35)",
};

/* The animation uses the site's brand face rather than pulling a second webfont. */
export const FONT = "var(--md-sys-typescale-font-brand)";

/* Seeded pseudo-random — deterministic, so server and client render the
   identical star field and hydration stays clean. */
export function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 11) % 2147483647;
    return (s % 10000) / 10000;
  };
}

/* Lucide-style 24×24 glyphs, stroke 2, round caps. Covers every icon the
   hero loop asks for, which is why the animation needs no icon CDN. */
export const ICON_PATHS: Record<string, string> = {
  mail: "M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z M3 7l9 6 9-6",
  check: "M5 13l4 4L19 7",
  shield: "M12 2l8 3.5V12c0 4.8-3.4 8.3-8 10-4.6-1.7-8-5.2-8-10V5.5L12 2z",
  scale: "M12 3v18 M8 21h8 M5 7l7-2 7 2 M5 7l-2.7 6a3 3 0 0 0 5.4 0L5 7z M19 7l-2.7 6a3 3 0 0 0 5.4 0L19 7z",
  chart: "M5 21V11 M12 21V3 M19 21v-7",
  bug: "M9 8a3 3 0 0 1 6 0v1H9V8z M7 9h10a2 2 0 0 1 2 2v4a7 7 0 0 1-14 0v-4a2 2 0 0 1 2-2z M3 13h2 M19 13h2 M12 9v11",
  code: "M8 7l-5 5 5 5 M16 7l5 5-5 5",
  palette:
    "M12 21a9 9 0 1 1 9-9c0 2-1.5 3-3 3h-2a2 2 0 0 0-1.5 3.3c.6.7.2 2.7-2.5 2.7z M7.5 11.5h.01 M11 7.5h.01 M15.5 9.5h.01",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z",
  inbox: "M22 13h-5l-2 3h-6l-2-3H2 M4.5 5h15L22 13v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5L4.5 5z",
  library: "M5 3v18 M9 3v18 M13 4l5 1-3.5 16-5-1L13 4z",
  headset:
    "M4 14v-2a8 8 0 0 1 16 0v2 M3 15a2 2 0 0 1 2-2h1v6H5a2 2 0 0 1-2-2v-2z M21 15a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2z",
  pulse: "M3 12h4l2-7 4 14 2-7h6",
  database:
    "M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3z M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M15.5 8.5l-2 5-5 2 2-5 5-2z",
  graduation: "M12 4L2 9l10 5 10-5-10-5z M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5 M22 9v5",
  file: "M6 2h8l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z M14 2v5h5",
};

export function Icon({
  name,
  size = 24,
  color = "var(--acc1)",
  sw = 2,
  style = {},
}: {
  name: string;
  size?: number;
  color?: string;
  sw?: number;
  style?: CSSProperties;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} aria-hidden="true">
      <path d={ICON_PATHS[name]} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Panels read as glass sitting ON the hero gradient rather than as lighter
   patches of it: a deep navy tint gives them an edge against the mid-blue
   ground, where the old white-on-white wash dissolved into it.
   No backdrop-filter — it forced a composited layer that softened every
   glyph inside, and the tint now does that job without the blur. */
export function Glass({
  children,
  style = {},
  glow = false,
}: {
  children?: ReactNode;
  style?: CSSProperties;
  glow?: boolean;
}) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(4,28,52,0.58), rgba(2,18,38,0.42))",
        border: `1px solid ${PAL.glassBorder}`,
        borderRadius: 24,
        boxShadow: glow
          ? "0 8px 40px rgba(2,132,199,0.30), inset 0 1px 0 rgba(255,255,255,0.16)"
          : "0 8px 30px rgba(0,12,26,0.36), inset 0 1px 0 rgba(255,255,255,0.09)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* pathLength="1" normalises every path so `p` is a 0→1 draw-on progress
   regardless of the path's real length. */
export function DrawPath({
  d,
  p = 1,
  color = PAL.line,
  width = 2.5,
  dash = false,
  glowing = false,
}: {
  d: string;
  p?: number;
  color?: string;
  width?: number;
  dash?: boolean;
  glowing?: boolean;
}) {
  return (
    <path
      d={d}
      pathLength="1"
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeDasharray={dash ? "0.02 0.018" : "1"}
      strokeDashoffset={dash ? 0 : 1 - clamp(p, 0, 1)}
      style={{
        opacity: dash ? clamp(p, 0, 1) : 1,
        filter: glowing ? "drop-shadow(0 0 6px rgba(56,189,248,0.8))" : "none",
      }}
    />
  );
}
