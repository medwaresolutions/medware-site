import { Card } from "@/components/ds";
import { TOTAL_PRODUCTS } from "@/data/portfolio";
import { mwWrap } from "./shared";

const WAYS = [
  {
    num: "01",
    icon: "draw",
    title: "Build it with you",
    body: "Bespoke digital and AI for pharma and specialist medicine — scoped, built and shipped at half the cost and half the timeline of a traditional agency or dev shop.",
    tags: ["flyer", "brochure", "video", "website", "app", "3D", "survey", "conference app"],
    cta: { label: "Start a project", href: "#contact" },
  },
  {
    num: "02",
    icon: "deployed_code",
    title: "Use what's already built",
    body: `${TOTAL_PRODUCTS} products already built for healthcare and running in Australian clinics, hospitals and pharma teams. Use them as they are, white-label them, or sponsor one.`,
    tags: [
      "Medflow",
      "Medcast",
      "MedPrep",
      "Medware AI HCP Assistant",
      "Conference App",
      "Medware CRM",
    ],
    cta: { label: "See the products", href: "#work" },
  },
  {
    num: "03",
    icon: "school",
    title: "Learn to lead it",
    body: "AI mentorship and training for healthcare leadership and commercial teams — built on the operator experience of having shipped AI products in healthcare, not on theory.",
    tags: ["1:1 mentorship", "team programs", "board sessions"],
    cta: { label: "Medware Advisory", href: "#advisory" },
  },
];

export default function WhatWeDo() {
  return (
    <section
      id="services"
      style={{
        background: "var(--md-sys-color-surface-container-low)",
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

        <div className="mw-3grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {WAYS.map((w) => (
            <Card key={w.num} variant="elevated" className="mw-way" style={{ padding: "30px 26px 26px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 48,
                    height: 48,
                    borderRadius: "var(--md-sys-shape-corner-medium)",
                    background: "var(--md-sys-color-primary-container)",
                    color: "var(--md-sys-color-on-primary-container)",
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 26 }}>
                    {w.icon}
                  </span>
                </span>
                <span
                  className="md-typescale-title-medium"
                  style={{
                    fontFamily: "var(--md-sys-typescale-font-mono)",
                    color: "var(--md-sys-color-primary)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {w.num}
                </span>
              </div>

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

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
                {w.tags.map((t) => (
                  <span key={t} className="mw-tag">
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={w.cta.href}
                className="md-typescale-label-large"
                style={{
                  marginTop: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  color: "var(--md-sys-color-primary)",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                {w.cta.label}
                <span className="material-symbols-rounded" style={{ fontSize: 18 }}>
                  arrow_forward
                </span>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
