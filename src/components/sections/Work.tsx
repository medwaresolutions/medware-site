"use client";

import { useState } from "react";
import { Button, Card } from "@/components/ds";
import { COMPANIES, TOTAL_PRODUCTS, type Product } from "@/data/portfolio";
import ProductCard from "@/components/ProductCard";
import { mwWrap } from "./shared";

/* Apple-style segmented control (see apple.com/mac "Explore the lineup"):
   a rounded track with a sliding thumb behind equal-width segments. */
function LineupToggle({
  tabs,
  value,
  onChange,
}: {
  tabs: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  const idx = Math.max(0, tabs.findIndex((t) => t.value === value));
  return (
    <div
      role="tablist"
      aria-label="Operating companies"
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: `repeat(${tabs.length}, 1fr)`,
        background: "var(--md-sys-color-surface-container-high)",
        borderRadius: 999,
        padding: 4,
        maxWidth: "100%",
        overflowX: "auto",
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 4,
          width: `calc((100% - 8px) / ${tabs.length})`,
          transform: `translateX(${idx * 100}%)`,
          transition: "transform 380ms cubic-bezier(0.3, 0, 0, 1)",
          background: "var(--md-sys-color-surface-bright)",
          borderRadius: 999,
          boxShadow: "0 1px 4px rgba(0,0,0,0.16)",
        }}
      />
      {tabs.map((t) => {
        const on = t.value === value;
        return (
          <button
            key={t.value}
            role="tab"
            aria-selected={on}
            onClick={() => onChange(t.value)}
            className="md-typescale-label-large"
            style={{
              position: "relative",
              zIndex: 1,
              border: 0,
              background: "transparent",
              cursor: "pointer",
              padding: "9px 18px",
              borderRadius: 999,
              whiteSpace: "nowrap",
              color: on ? "var(--md-sys-color-on-surface)" : "var(--md-sys-color-on-surface-variant)",
              fontWeight: on ? 700 : 500,
              transition: "color 200ms ease",
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

export default function Work({ onOpenProduct }: { onOpenProduct: (p: Product) => void }) {
  const [tab, setTab] = useState(COMPANIES[0].id);
  const co = COMPANIES.find((c) => c.id === tab) ?? COMPANIES[0];

  return (
    <section id="work" style={{ ...mwWrap, padding: "80px 24px" }}>
      <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 36px" }}>
        <span
          className="md-typescale-title-small"
          style={{ color: "var(--md-sys-color-primary)", textTransform: "uppercase", letterSpacing: 1 }}
        >
          The portfolio
        </span>
        <h2 className="md-typescale-headline-large" style={{ margin: "8px 0 12px", color: "var(--md-sys-color-on-surface)" }}>
          Four operating companies. {TOTAL_PRODUCTS} products.
        </h2>
        <p className="md-typescale-body-large" style={{ margin: 0, color: "var(--md-sys-color-on-surface-variant)" }}>
          Built at the intersection of AI and healthcare — shipped by a small operator team working alongside AI coding
          agents every day.
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
        <LineupToggle value={tab} onChange={setTab} tabs={COMPANIES.map((c) => ({ value: c.id, label: c.name }))} />
      </div>

      <Card
        variant="filled"
        style={{ padding: 0, overflow: "hidden", background: "var(--md-sys-color-surface-container-low)", marginBottom: 24 }}
      >
        <div className="mw-co-head" style={{ display: "grid", gridTemplateColumns: "200px 1fr", alignItems: "stretch" }}>
          <div className="mw-co-img" style={{ position: "relative", minHeight: 150, background: "var(--md-sys-color-surface-container)" }}>
            <img
              src={co.img}
              alt={co.name}
              loading="lazy"
              decoding="async"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h3 className="md-typescale-headline-small" style={{ margin: "0 0 2px", color: "var(--md-sys-color-on-surface)" }}>
              {co.name}
            </h3>
            <div
              className="md-typescale-label-medium"
              style={{ color: "var(--md-sys-color-on-surface-variant)", textTransform: "none", marginBottom: 12 }}
            >
              {co.entity}
            </div>
            <p
              className="md-typescale-body-medium"
              style={{ margin: "0 0 18px", maxWidth: 560, color: "var(--md-sys-color-on-surface-variant)" }}
            >
              {co.description}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 36, flexWrap: "wrap" }}>
              {co.stats.map((s) => (
                <div key={s.lbl}>
                  <div className="md-typescale-headline-small" style={{ color: "var(--md-sys-color-primary)" }}>
                    {s.num}
                  </div>
                  <div
                    className="md-typescale-label-medium"
                    style={{ color: "var(--md-sys-color-on-surface-variant)", textTransform: "none" }}
                  >
                    {s.lbl}
                  </div>
                </div>
              ))}
              <div style={{ flex: 1 }} />
              <Button variant="text" href={co.link} target="_blank" rel="noopener noreferrer" icon="open_in_new">
                Visit website
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="mw-prod-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {co.products.map((p) => (
          <ProductCard key={p.title} p={p} accent={co.color} onOpen={() => onOpenProduct(p)} />
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
        <Button variant="tonal" href="/industry" trailingIcon="arrow_forward">
          See the full portfolio
        </Button>
      </div>

      <p
        className="md-typescale-body-medium"
        style={{ textAlign: "center", margin: "24px auto 0", maxWidth: 640, color: "var(--md-sys-color-on-surface-variant)" }}
      >
        Previously founded MyInteract (medical digital engagement) and built digital solutions across 17 years in
        pharmaceutical sales, management and medical digital.
      </p>
    </section>
  );
}
