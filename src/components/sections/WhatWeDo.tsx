import { Card } from "@/components/ds";
import { mwWrap } from "./shared";

const WWD = [
  {
    icon: "deployed_code",
    title: "Build",
    body: "We design and build AI-powered medical software — from concept to production, shipped and running in clinics.",
  },
  {
    icon: "lightbulb",
    title: "Consult",
    body: "Strategic AI consulting for healthcare organisations. We help you find the right approach and place the right bets.",
  },
  {
    icon: "school",
    title: "Train",
    body: "Hands-on AI training for teams and individuals, from fundamentals to advanced clinical and commercial workflows.",
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
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 48px" }}>
          <span
            className="md-typescale-title-small"
            style={{ color: "var(--md-sys-color-primary)", textTransform: "uppercase", letterSpacing: 1 }}
          >
            What we do
          </span>
          <h2
            className="md-typescale-headline-large"
            style={{ margin: "8px 0 12px", color: "var(--md-sys-color-on-surface)" }}
          >
            Three ways we help
          </h2>
          <p className="md-typescale-body-large" style={{ margin: 0, color: "var(--md-sys-color-on-surface-variant)" }}>
            Healthcare organisations harness AI — built on operator experience, not theory.
          </p>
        </div>
        <div className="mw-3grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {WWD.map((f) => (
            <Card key={f.title} variant="outlined" style={{ padding: 28 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 52,
                  height: 52,
                  borderRadius: "var(--md-sys-shape-corner-medium)",
                  background: "var(--md-sys-color-primary-container)",
                  color: "var(--md-sys-color-on-primary-container)",
                  marginBottom: 18,
                }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 28 }}>
                  {f.icon}
                </span>
              </span>
              <h3
                className="md-typescale-title-large"
                style={{ margin: "0 0 8px", color: "var(--md-sys-color-on-surface)" }}
              >
                {f.title}
              </h3>
              <p className="md-typescale-body-medium" style={{ margin: 0, color: "var(--md-sys-color-on-surface-variant)" }}>
                {f.body}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
