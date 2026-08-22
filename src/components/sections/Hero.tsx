import { Button, Chip } from "@/components/ds";
import HeroAnimation from "@/components/hero/HeroAnimation";
import { TOTAL_PRODUCTS } from "@/data/portfolio";
import { mwWrap } from "./shared";

const PROOF = [`${TOTAL_PRODUCTS} products built`, "200+ specialist clinics", "Live across Australia"];

export default function Hero() {
  return (
    <section id="top" className="dark" style={{ position: "relative", overflow: "hidden", background: "#0D2033" }}>
      <div
        className="mw-hero-grid"
        style={{
          ...mwWrap,
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 56,
          alignItems: "center",
          padding: "80px 24px 88px",
        }}
      >
        <div>
          <Chip leadingIcon="cardiology" elevated>
            Medware Group · Australia
          </Chip>
          <h1
            className="md-typescale-display-large"
            style={{ margin: "20px 0 18px", color: "var(--md-sys-color-on-surface)", letterSpacing: "-1px" }}
          >
            Healthcare digital production{" "}
            <span style={{ display: "block", color: "var(--md-sys-color-primary)" }}>
              at half the cost, half the timeline.
            </span>
          </h1>
          <p
            className="md-typescale-body-large"
            style={{ margin: "0 0 28px", maxWidth: 520, color: "var(--md-sys-color-on-surface-variant)" }}
          >
            Bespoke digital and AI for pharma and specialist medicine — anything from a flyer to a video to a website
            to an app. Plus {TOTAL_PRODUCTS} products already built for healthcare, ready to use and ready to sponsor.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button variant="filled" size="large" href="#work" trailingIcon="arrow_forward">
              See the products
            </Button>
            <Button variant="outlined" size="large" href="#contact" icon="draw">
              Start a project
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px 20px",
              flexWrap: "wrap",
              marginTop: 28,
              color: "var(--md-sys-color-on-surface-variant)",
            }}
          >
            {/* Each item carries its own tick, so a wrap can't strand a separator. */}
            {PROOF.map((item) => (
              <span key={item} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--md-sys-color-primary)" }}>
                  check_circle
                </span>
                <span className="md-typescale-body-medium">{item}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="mw-hero-art">
          <HeroAnimation />
        </div>
      </div>
    </section>
  );
}
