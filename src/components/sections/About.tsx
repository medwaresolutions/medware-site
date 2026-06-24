import { Card } from "@/components/ds";
import { mwWrap } from "./shared";

const STATS = [
  { value: "17+", label: "Years in pharma & health tech" },
  { value: "12,000+", label: "Hours with AI" },
  { value: "19", label: "Products shipped" },
  { value: "50s", label: "Started coding" },
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        background: "var(--md-sys-color-surface-container-low)",
        borderTop: "1px solid var(--md-sys-color-outline-variant)",
        borderBottom: "1px solid var(--md-sys-color-outline-variant)",
      }}
    >
      <div
        className="mw-about-grid"
        style={{ ...mwWrap, padding: "80px 24px", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 56, alignItems: "center" }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 20 }}>
            <img
              src="/matt.png"
              alt="Matt Martin"
              style={{ width: 76, height: 76, borderRadius: "50%", objectFit: "cover", border: "1px solid var(--md-sys-color-outline-variant)" }}
            />
            <div>
              <span
                className="md-typescale-title-small"
                style={{ color: "var(--md-sys-color-primary)", textTransform: "uppercase", letterSpacing: 1 }}
              >
                About
              </span>
              <h2 className="md-typescale-headline-large" style={{ margin: "2px 0 0", color: "var(--md-sys-color-on-surface)" }}>
                Matt Martin
              </h2>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <p className="md-typescale-body-large" style={{ margin: 0, color: "var(--md-sys-color-on-surface-variant)" }}>
              17 years in pharmaceutical sales and management. Founded multiple medical software companies. Started
              coding in his 50s with AI.
            </p>
            <p className="md-typescale-body-large" style={{ margin: 0, color: "var(--md-sys-color-on-surface-variant)" }}>
              Now builds production software used by medical specialists across Australia.{" "}
              <span style={{ color: "var(--md-sys-color-on-surface)", fontWeight: 500 }}>
                12,000+ hours with AI and counting.
              </span>
            </p>
            <p className="md-typescale-body-large" style={{ margin: 0, color: "var(--md-sys-color-on-surface-variant)" }}>
              Not a developer by training. Not a computer scientist. Just someone who saw what AI could do, picked up the
              tools, and started building things that solve real problems in healthcare.
            </p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {STATS.map((s) => (
            <Card key={s.label} variant="elevated" style={{ padding: 24, textAlign: "center" }}>
              <div className="md-typescale-display-small" style={{ color: "var(--md-sys-color-primary)", marginBottom: 6 }}>
                {s.value}
              </div>
              <div className="md-typescale-body-medium" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
                {s.label}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
