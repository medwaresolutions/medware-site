"use client";

import { useEffect, useState } from "react";
import { Badge, Button, Card, Chip, LinearProgress, List, ListDivider, ListItem } from "@/components/ds";
import { mwWrap } from "./shared";

const HERO_WORDS = ["transforms medicine", "learns from data", "scales with you", "empowers clinicians"];

export default function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % HERO_WORDS.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" style={{ position: "relative", overflow: "hidden" }}>
      <div
        className="mw-hero-grid"
        style={{
          ...mwWrap,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 56,
          alignItems: "center",
          padding: "80px 24px 88px",
        }}
      >
        <div>
          <Chip leadingIcon="cardiology" elevated>
            AI × healthcare · Australia
          </Chip>
          <h1
            className="md-typescale-display-large"
            style={{ margin: "20px 0 18px", color: "var(--md-sys-color-on-surface)", letterSpacing: "-1px" }}
          >
            We build AI that{" "}
            <span style={{ display: "block", position: "relative", height: "1.15em", overflow: "hidden" }}>
              {HERO_WORDS.map((w, n) => (
                <span
                  key={w}
                  className="mw-rotword"
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    color: "var(--md-sys-color-primary)",
                    transform:
                      n === i
                        ? "translateY(0)"
                        : n === (i - 1 + HERO_WORDS.length) % HERO_WORDS.length
                          ? "translateY(-100%)"
                          : "translateY(100%)",
                    opacity: n === i ? 1 : 0,
                    transition:
                      "transform 520ms var(--md-sys-motion-easing-emphasized, cubic-bezier(0.2,0,0,1)), opacity 380ms ease",
                  }}
                >
                  {w}
                </span>
              ))}
            </span>
          </h1>
          <p
            className="md-typescale-body-large"
            style={{ margin: "0 0 28px", maxWidth: 480, color: "var(--md-sys-color-on-surface-variant)" }}
          >
            Medical software, AI consulting, and training — built by people who understand healthcare. Nineteen
            products shipped at the intersection of AI and care.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button variant="filled" size="large" href="#work" trailingIcon="arrow_forward">
              See the work
            </Button>
            <Button variant="outlined" size="large" href="#advisory" icon="event">
              Book a diagnostic
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 28,
              color: "var(--md-sys-color-on-surface-variant)",
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--md-sys-color-primary)" }}>
              check_circle
            </span>
            <span className="md-typescale-body-medium">Live in clinics across Australia · 12,000+ hours with AI</span>
          </div>
        </div>
        <div className="mw-hero-art">
          <HeroMonitor />
        </div>
      </div>
    </section>
  );
}

/* Clean M3 "live vitals" preview card with an animated ECG sweep. */
function HeroMonitor() {
  return (
    <Card
      variant="elevated"
      style={{
        borderRadius: "var(--md-sys-shape-corner-extra-large)",
        overflow: "hidden",
        boxShadow: "var(--md-sys-elevation-level-3)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 16px",
          background: "var(--md-sys-color-surface-container-lowest)",
          borderBottom: "1px solid var(--md-sys-color-outline-variant)",
        }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--md-sys-color-primary)" }}>
          monitor_heart
        </span>
        <span className="md-typescale-label-large" style={{ color: "var(--md-sys-color-on-surface)" }}>
          Medware · live
        </span>
        <div style={{ flex: 1 }} />
        <span className="mw-pulse-dot" />
        <span className="md-typescale-label-medium" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
          streaming
        </span>
      </div>
      <div style={{ padding: 16 }}>
        <div
          style={{
            background: "var(--md-sys-color-surface-container-lowest)",
            border: "1px solid var(--md-sys-color-outline-variant)",
            borderRadius: "var(--md-sys-shape-corner-large)",
            padding: "12px 8px",
            marginBottom: 14,
            overflow: "hidden",
          }}
        >
          <svg viewBox="0 0 320 80" width="100%" height="72" preserveAspectRatio="none" aria-hidden="true">
            <path
              className="mw-ecg"
              d="M0 40 H40 l8 0 l6 -26 l8 50 l7 -42 l6 18 H120 l8 0 l6 -26 l8 50 l7 -42 l6 18 H240 l8 0 l6 -26 l8 50 l7 -42 l6 18 H320"
              fill="none"
              stroke="var(--md-sys-color-primary)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span className="md-typescale-title-medium" style={{ color: "var(--md-sys-color-on-surface)" }}>
            Shipping today
          </span>
          <Badge count={4}>
            <span className="material-symbols-rounded" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
              deployed_code
            </span>
          </Badge>
        </div>
        <List>
          <ListItem
            avatar="MC"
            headline="Medcast Specialist"
            supportingText="Audio briefings · live"
            trailing={
              <span className="material-symbols-rounded" style={{ color: "var(--md-sys-color-primary)" }}>
                graphic_eq
              </span>
            }
          />
          <ListDivider />
          <ListItem
            avatar="MF"
            headline="Medflow Clinic"
            supportingText="PBS authority · 200+ clinics"
            trailing={
              <span className="material-symbols-rounded" style={{ color: "var(--md-sys-color-tertiary)" }}>
                verified
              </span>
            }
          />
        </List>
        <div style={{ padding: "10px 16px 4px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span className="md-typescale-label-medium" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
              Portfolio shipped
            </span>
            <span className="md-typescale-label-medium" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
              12 / 19 live
            </span>
          </div>
          <LinearProgress value={63} />
        </div>
      </div>
    </Card>
  );
}
