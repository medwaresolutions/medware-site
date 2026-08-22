import AboutRings from "./AboutRings";
import { mwWrap } from "./shared";


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
              width={76}
              height={76}
              loading="lazy"
              decoding="async"
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
              Matt Martin spent 17 years inside life science companies across sales, marketing, medical and digital,
              commissioning the agency work he now competes with. He has since founded multiple medical software
              companies.
            </p>
            <p className="md-typescale-body-large" style={{ margin: 0, color: "var(--md-sys-color-on-surface-variant)" }}>
              He saw early what AI would do to the agency model: the same output at a fraction of the cost and a
              fraction of the timeline. With more than 12,000 hours in production use of large language models, he has
              built AI infrastructure unique to Medware, an agentic build layer that lets a small team develop and
              maintain twenty products in specialist medicine.
            </p>
            <p className="md-typescale-body-large" style={{ margin: 0, color: "var(--md-sys-color-on-surface)", fontWeight: 500 }}>
              The result is software used daily by medical specialists across Australia.
            </p>
          </div>
        </div>
        <AboutRings />
      </div>
    </section>
  );
}
