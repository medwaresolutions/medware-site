"use client";

import { Button, Card } from "@/components/ds";
import { useInView } from "@/lib/useInView";
import { mwWrap } from "./shared";

const OUTCOMES = [
  {
    num: "01",
    icon: "forum",
    tone: "primary",
    title: "Lead AI conversations in any room.",
    body: "Boardroom, executive team, doctors, pharmaceutical partners, regulators. The most informed person in any room — without overclaiming.",
  },
  {
    num: "02",
    icon: "bolt",
    tone: "secondary",
    title: "Produce more, in less time.",
    body: "Less email triage. Less meeting prep. Less rework. The hours AI gives back go to the work only you can do.",
  },
  {
    num: "03",
    icon: "ads_click",
    tone: "tertiary",
    title: "Place the right AI bets.",
    body: "Know how to tell a high-leverage application from an expensive demo. A written yes-list and no-list, with reasoning.",
  },
  {
    num: "04",
    icon: "translate",
    tone: "primary",
    title: "Fluent, not technical.",
    body: "Know what a competent person needs to know to make the right decisions and the right hires. That’s the line.",
  },
];

const FORMATS = [
  {
    name: "One-to-one mentorship",
    who: "CEO, executive, director",
    desc: "Eight weeks. Six private working sessions plus between-session access. The flagship engagement.",
    price: "From AUD $24,000",
  },
  {
    name: "Team programs",
    who: "Executive & commercial teams",
    desc: "Eight weeks. Workflow discovery, four team sessions, individual check-ins. Pre/post KPI measurement.",
    price: "From AUD $32,000",
  },
  {
    name: "Board & executive sessions",
    who: "Single event",
    desc: "A confidential 60–90 minute session that resets the room’s posture on AI for the next twelve months.",
    price: "From AUD $8,500",
  },
];

export default function Advisory() {
  const { ref: outcomesRef, shown: outcomesShown } = useInView<HTMLDivElement>(0.15);

  return (
    <section
      id="advisory"
      style={{
        background: "var(--md-sys-color-surface-container-low)",
        borderTop: "1px solid var(--md-sys-color-outline-variant)",
        borderBottom: "1px solid var(--md-sys-color-outline-variant)",
      }}
    >
      <div style={{ ...mwWrap, padding: "80px 24px" }}>
        {/* Banner. The photo carries the mA mark; a navy scrim weighted to the
            left keeps the copy legible over it and ties the band to the site's
            hero ground. Scoped `.dark` so M3 roles resolve to their dark values
            inside the band regardless of the page theme. */}
        <div className="dark mw-adv-hero">
          <div className="mw-adv-hero__scrim" />
          <div className="mw-adv-hero__body">
            <span
              className="md-typescale-title-small"
              style={{ color: "var(--md-sys-color-primary)", textTransform: "uppercase", letterSpacing: 1 }}
            >
              Medware Advisory · By appointment
            </span>
            <h2
              className="md-typescale-headline-large"
              style={{ margin: "10px 0 14px", color: "var(--md-sys-color-on-surface)", fontWeight: 700 }}
            >
              The AI guide for{" "}
              <span style={{ color: "var(--md-sys-color-primary)" }}>healthcare leadership</span>
            </h2>
            <p
              className="md-typescale-body-large"
              style={{ margin: "0 0 24px", maxWidth: 480, color: "var(--md-sys-color-on-surface-variant)" }}
            >
              An eight-week mentorship engagement for leaders of healthcare and pharmaceutical organisations. Plain
              language. No theatre. Built on the operator experience of having shipped AI products in healthcare.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Button
                variant="filled"
                href="https://medwareadvisory.com"
                target="_blank"
                rel="noopener noreferrer"
                icon="open_in_new"
              >
                Visit Medware Advisory
              </Button>
              <Button
                variant="outlined"
                href="https://cal.com/matt-martin/diagnostic"
                target="_blank"
                rel="noopener noreferrer"
                icon="event"
              >
                Book a 90-minute diagnostic
              </Button>
            </div>
          </div>
        </div>

        <div
          className="md-typescale-label-medium"
          style={{
            color: "var(--md-sys-color-on-surface-variant)",
            textTransform: "uppercase",
            letterSpacing: 1.4,
            textAlign: "center",
            marginBottom: 18,
          }}
        >
          What you walk away with
        </div>
        <div
          ref={outcomesRef}
          className={`mw-2grid mw-rise${outcomesShown ? " is-in" : ""}`}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}
        >
          {OUTCOMES.map((o) => (
            <Card
              key={o.num}
              variant="elevated"
              className="mw-adv-outcome"
              style={
                {
                  "--mw-tone-container": `var(--md-sys-color-${o.tone}-container)`,
                  "--mw-tone-accent": `var(--md-sys-color-${o.tone})`,
                } as React.CSSProperties
              }
            >
              <span aria-hidden className="mw-adv-outcome__watermark">
                {o.num}
              </span>
              <span className="mw-adv-outcome__icon">
                <span className="material-symbols-rounded" style={{ fontSize: 24 }}>
                  {o.icon}
                </span>
              </span>
              <h3
                className="md-typescale-title-large"
                style={{ margin: "0 0 8px", color: "var(--md-sys-color-on-surface)", fontWeight: 700 }}
              >
                {o.title}
              </h3>
              <p className="md-typescale-body-medium" style={{ margin: 0, color: "var(--md-sys-color-on-surface-variant)" }}>
                {o.body}
              </p>
            </Card>
          ))}
        </div>

        <div
          className="md-typescale-label-medium"
          style={{
            color: "var(--md-sys-color-on-surface-variant)",
            textTransform: "uppercase",
            letterSpacing: 1.4,
            textAlign: "center",
            marginBottom: 18,
          }}
        >
          How we work together
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
          {FORMATS.map((f) => (
            <Card key={f.name} variant="outlined" className="mw-adv-format" style={{ padding: 20 }}>
              <div
                className="mw-format-row"
                style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr auto", gap: 20, alignItems: "center" }}
              >
                <div>
                  <div className="md-typescale-title-medium" style={{ color: "var(--md-sys-color-on-surface)" }}>
                    {f.name}
                  </div>
                  <div
                    className="md-typescale-label-medium"
                    style={{ color: "var(--md-sys-color-on-surface-variant)", textTransform: "none", marginTop: 2 }}
                  >
                    {f.who}
                  </div>
                </div>
                <div className="md-typescale-body-medium" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
                  {f.desc}
                </div>
                <div
                  className="md-typescale-title-medium"
                  style={{ color: "var(--md-sys-color-primary)", whiteSpace: "nowrap", textAlign: "right" }}
                >
                  {f.price}
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
