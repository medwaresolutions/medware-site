"use client";

import { Card } from "@/components/ds";
import { TOTAL_PRODUCTS } from "@/data/portfolio";
import { useInView } from "@/lib/useInView";
import { mwWrap } from "./shared";

/* Each card takes a different tonal role from the M3 palette, so the trio
   reads as one system rather than three identical boxes. */
const WAYS = [
  {
    num: "01",
    icon: "draw",
    tone: "primary",
    title: "Build it with you",
    body: "Bespoke digital and AI for pharma and specialist medicine — scoped, built and shipped at half the cost and half the timeline of a traditional agency or dev shop.",
    tags: ["flyer", "brochure", "video", "website", "app", "3D", "survey", "conference app"],
    cta: { label: "Start a project", href: "#contact" },
  },
  {
    num: "02",
    icon: "deployed_code",
    tone: "secondary",
    title: "Use what's already built",
    body: `${TOTAL_PRODUCTS} products already built for healthcare and running in Australian clinics, hospitals and pharma teams. Use them as they are, white-label them, or sponsor one.`,
    tags: ["Medflow", "Medcast", "MedPrep", "Medware AI", "Conference App", "Medware CRM"],
    cta: { label: "See the products", href: "#work" },
  },
  {
    num: "03",
    icon: "school",
    tone: "tertiary",
    title: "Learn to lead it",
    body: "AI mentorship and training for healthcare leadership and commercial teams — built on the operator experience of having shipped AI products in healthcare, not on theory.",
    tags: ["1:1 mentorship", "team programs", "board sessions"],
    cta: { label: "Medware Advisory", href: "#advisory" },
  },
];

export default function WhatWeDo() {
  const { ref: gridRef, shown } = useInView<HTMLDivElement>(0.15);

  return (
    <section
      id="services"
      className="mw-ways-band"
      style={{
        borderTop: "1px solid var(--md-sys-color-outline-variant)",
        borderBottom: "1px solid var(--md-sys-color-outline-variant)",
      }}
    >
      <div style={{ ...mwWrap, padding: "80px 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 48px" }}>
          <span
            className="md-typescale-title-small"
            style={{ color: "var(--md-sys-color-primary)", textTransform: "uppercase", letterSpacing: 1 }}
          >
            How we work
          </span>
          <h2
            className="md-typescale-headline-large"
            style={{ margin: "8px 0 12px", color: "var(--md-sys-color-on-surface)", fontWeight: 700 }}
          >
            Three ways to work with us
          </h2>
          <p className="md-typescale-body-large" style={{ margin: 0, color: "var(--md-sys-color-on-surface-variant)" }}>
            Bespoke production, products already built for healthcare, and the advisory that helps you lead it.
          </p>
        </div>

        <div
          ref={gridRef}
          className={`mw-ways mw-3grid${shown ? " is-in" : ""}`}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
        >
          {WAYS.map((w) => (
            <div key={w.num} className="mw-ways__slot">
              <Card
                variant="elevated"
                interactive
                className="mw-way"
                style={
                  {
                    "--mw-way-container": `var(--md-sys-color-${w.tone}-container)`,
                    "--mw-way-on-container": `var(--md-sys-color-on-${w.tone}-container)`,
                    /* Mid-tone accent for the tags — the on-*-container roles
                       are near-black and read as flat grey-black on a chip. */
                    "--mw-way-accent": `var(--md-sys-color-${w.tone})`,
                  } as React.CSSProperties
                }
              >
                {/* Header band — the card's media area, carrying the tonal role. */}
                <div className="mw-way__band">
                  <span className="mw-way__icon">
                    <span className="material-symbols-rounded" style={{ fontSize: 26 }}>
                      {w.icon}
                    </span>
                  </span>
                  <span className="mw-way__num md-typescale-title-medium">{w.num}</span>
                </div>

                <div className="mw-way__body">
                  <h3
                    className="md-typescale-title-large"
                    style={{ margin: "0 0 10px", color: "var(--md-sys-color-on-surface)", fontWeight: 700 }}
                  >
                    {w.title}
                  </h3>
                  <p
                    className="md-typescale-body-medium"
                    style={{ margin: "0 0 20px", color: "var(--md-sys-color-on-surface-variant)" }}
                  >
                    {w.body}
                  </p>
                  <div className="mw-way__tags">
                    {w.tags.map((t) => (
                      <span key={t} className="mw-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions area. The link stretches over the whole card, so the
                    card is a single target with a single accessible name. */}
                <div className="mw-way__actions">
                  <a href={w.cta.href} className="mw-way__cta md-typescale-label-large">
                    {w.cta.label}
                    <span className="material-symbols-rounded" style={{ fontSize: 18 }}>
                      arrow_forward
                    </span>
                  </a>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
