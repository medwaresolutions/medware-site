"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

/**
 * Point-source spherical soundwave, ported from the "3D Sound Wave Background"
 * artifact (public/3D Sound Wave Background.html). Pure 2D canvas — a hazy
 * spherical pulse with a visible leading ring, textured by a sparse
 * fibonacci-lattice shell of dots, slowly rotating. Follows the site theme
 * unless a render theme is forced via the `theme` prop.
 */
type SoundwaveProps = {
  accent?: string;
  theme?: "Deep blue" | "Black" | "Light";
  speed?: number;
  period?: number;
  density?: number;
  showRings?: boolean;
  /** Pulse origin as fractions of canvas width/height (0.5 = centred). */
  originX?: number;
  originY?: number;
  /** Skip the opaque ground so the pulses composite over the section's own
   *  background. Used where the section already carries the brand gradient. */
  groundless?: boolean;
};

type Dir = { ux: number; uy: number; uz: number; j: number; tw: number };

export default function SoundwaveBackground({
  accent = "#6DB0D3",
  theme: themeOverride,
  speed = 0.3,
  period = 3.5,
  density = 140,
  showRings = true,
  originX = 0.5,
  originY = 0.5,
  groundless = false,
}: SoundwaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { dark } = useTheme();
  const theme = themeOverride ?? (dark ? "Deep blue" : "Light");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const hexToRgb = (h: string) => {
      const m = h.replace("#", "");
      return {
        r: parseInt(m.substring(0, 2), 16),
        g: parseInt(m.substring(2, 4), 16),
        b: parseInt(m.substring(4, 6), 16),
      };
    };

    // even point distribution on a unit sphere (fibonacci lattice)
    const buildDirs = (n: number): Dir[] => {
      const arr: Dir[] = new Array(n);
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < n; i++) {
        const y = 1 - (i / Math.max(1, n - 1)) * 2;
        const rad = Math.sqrt(Math.max(0, 1 - y * y));
        const th = golden * i;
        arr[i] = {
          ux: Math.cos(th) * rad,
          uy: y,
          uz: Math.sin(th) * rad,
          j: Math.random(), // per-point radial jitter → organic shell thickness
          tw: 0.55 + Math.random() * 0.45, // per-point brightness variance
        };
      }
      return arr;
    };

    const dirs = buildDirs(density);
    let w = 0;
    let h = 0;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth || window.innerWidth;
      h = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const camDist = 5.0;
    const maxLife = 1.7; // world radius at which a shell has fully diffused
    const thickness = 0.09; // radial spread of a wavefront
    const acc = hexToRgb(accent);
    const light = theme === "Light";
    const lifeSecs = maxLife / speed;
    const start = performance.now();

    const smooth = (a: number, b: number, x: number) => {
      const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
      return t * t * (3 - 2 * t);
    };

    const frame = (now: number) => {
      const t = (now - start) / 1000;
      const cx = w * originX;
      const cy = h * originY;
      const focal = Math.min(w, h) * 1.7;
      const rot = t * 0.14;
      const ca = Math.cos(rot);
      const sa = Math.sin(rot);

      // ---- background gradient (a still, radial field the pulses travel over)
      let bg0: string, bg1: string, tint: number;
      if (theme === "Black") {
        bg0 = "#0A0A0E"; bg1 = "#000000"; tint = 0.10;
      } else if (light) {
        bg0 = "#F3F8FC"; bg1 = "#DCE7F0"; tint = 0;
      } else {
        bg0 = "#123049"; bg1 = "#050C15"; tint = 0.14;
      }
      if (groundless) {
        // The section paints the ground; just clear last frame.
        ctx.clearRect(0, 0, w, h);
      } else {
        const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.75);
        bgGrad.addColorStop(0, bg0);
        bgGrad.addColorStop(1, bg1);
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);
      }
      // faint accent bloom seated at the source
      if (!light && tint > 0) {
        const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, focal * 0.32);
        bloom.addColorStop(0, `rgba(${acc.r},${acc.g},${acc.b},${tint})`);
        bloom.addColorStop(1, `rgba(${acc.r},${acc.g},${acc.b},0)`);
        ctx.fillStyle = bloom;
        ctx.fillRect(0, 0, w, h);
      }

      const newest = Math.floor(t / period);

      // ---- hazy translucent shells. A see-through sphere in projection is
      // brightest at its rim (the line of sight grazes the most material
      // there), so a limb-brightened gradient reads as a 3D pulse, not a
      // flat ring. A crisp line runs just ahead of the haze as the leading
      // edge of each wavefront.
      ctx.globalCompositeOperation = light ? "source-over" : "lighter";
      for (let p = 0; ; p++) {
        const idx = newest - p;
        if (idx < 0) break;
        const age = t - idx * period;
        if (age > lifeSecs) break;
        const radius = age * speed;
        const u = radius / maxLife;
        const env = smooth(0, 0.06, u) * (1 - smooth(0.5, 1.0, u));
        if (env <= 0.004) continue;
        const rr = (radius * focal) / camDist;
        if (rr < 2) continue;
        const lead = Math.max(6, rr * 0.05);
        const outer = rr + lead;
        const hazeA = env * (light ? 0.16 : 0.22);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, outer);
        g.addColorStop(0, `rgba(${acc.r},${acc.g},${acc.b},${hazeA * 0.22})`);
        g.addColorStop(Math.max(0, (rr * 0.7) / outer), `rgba(${acc.r},${acc.g},${acc.b},${hazeA * 0.35})`);
        g.addColorStop(rr / outer, `rgba(${acc.r},${acc.g},${acc.b},${hazeA})`);
        g.addColorStop(1, `rgba(${acc.r},${acc.g},${acc.b},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, outer, 0, Math.PI * 2);
        ctx.fill();

        if (showRings) {
          ctx.beginPath();
          ctx.arc(cx, cy, rr + lead * 0.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${acc.r},${acc.g},${acc.b},${env * (light ? 0.32 : 0.45)})`;
          ctx.lineWidth = 1.25;
          ctx.stroke();
        }
      }
      ctx.globalCompositeOperation = "source-over";

      // ---- the expanding spherical wavefronts, as clouds of air particles
      ctx.globalCompositeOperation = light ? "source-over" : "lighter";
      for (let p = 0; ; p++) {
        const idx = newest - p;
        if (idx < 0) break;
        const age = t - idx * period;
        if (age > lifeSecs) break;
        const baseR = age * speed;
        const u = baseR / maxLife; // 0 at source .. 1 gone
        const env = smooth(0, 0.05, u) * (1 - smooth(0.45, 1.0, u)); // rise then diffuse
        if (env <= 0.002) continue;
        const atten = 1 / (1 + baseR * 1.3); // energy spreads over the sphere

        for (let i = 0; i < dirs.length; i++) {
          const d = dirs[i];
          const r = baseR + (d.j - 0.5) * thickness;
          if (r <= 0) continue;
          const x = d.ux * r;
          const y = d.uy * r;
          const z = d.uz * r;
          const xr = x * ca - z * sa;
          const zr = x * sa + z * ca;
          const scale = focal / (camDist - zr);
          const sx = cx + xr * scale;
          const sy = cy + y * scale;
          if (sx < -20 || sx > w + 20 || sy < -20 || sy > h + 20) continue;

          const depth = (zr / maxLife + 1) / 2; // back .. front
          let alpha = env * atten * d.tw * (0.2 + depth * 0.4);
          if (light) alpha *= 0.75;
          if (alpha <= 0.004) continue;
          const size = Math.max(0.5, (0.7 + depth * 1.3) * (scale / (focal / camDist)));

          if (light) {
            const mix = 0.55 + depth * 0.45;
            const rC = Math.round(acc.r * mix + 40 * (1 - mix));
            const gC = Math.round(acc.g * mix + 60 * (1 - mix));
            const bC = Math.round(acc.b * mix + 90 * (1 - mix));
            ctx.fillStyle = `rgba(${rC},${gC},${bC},${alpha})`;
          } else {
            const hot = depth; // front edge whitens slightly
            const rC = Math.round(acc.r + (255 - acc.r) * hot * 0.12);
            const gC = Math.round(acc.g + (255 - acc.g) * hot * 0.12);
            const bC = Math.round(acc.b + (255 - acc.b) * hot * 0.12);
            ctx.fillStyle = `rgba(${rC},${gC},${bC},${alpha})`;
          }
          ctx.beginPath();
          ctx.arc(sx, sy, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ---- pulsing point source, flashing as each new wavefront is emitted
      const ageNewest = t - newest * period;
      const flash = 1 - smooth(0, 0.32, ageNewest);
      const glowR = focal * 0.05 * (0.7 + flash * 0.9);
      const src = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
      src.addColorStop(0, `rgba(${acc.r},${acc.g},${acc.b},${light ? 0.85 : 0.95})`);
      src.addColorStop(0.35, `rgba(${acc.r},${acc.g},${acc.b},${0.4 * (0.4 + flash * 0.6)})`);
      src.addColorStop(1, `rgba(${acc.r},${acc.g},${acc.b},0)`);
      ctx.fillStyle = src;
      ctx.beginPath();
      ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalCompositeOperation = "source-over";
      if (!reduced) raf = requestAnimationFrame(frame);
    };

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    frame(performance.now());

    const onVisibility = () => {
      if (!document.hidden && !reduced) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [accent, theme, speed, period, density, showRings, originX, originY, groundless]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}
