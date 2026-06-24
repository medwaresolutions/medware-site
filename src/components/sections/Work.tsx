"use client";

import { useState } from "react";
import { Button, Card, Tabs } from "@/components/ds";
import { COMPANIES, TOTAL_PRODUCTS, type Product } from "@/data/portfolio";
import ProductCard from "@/components/ProductCard";
import { mwWrap } from "./shared";

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
        <Tabs value={tab} onChange={setTab} tabs={COMPANIES.map((c) => ({ value: c.id, label: c.name }))} />
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
          <ProductCard key={p.title} p={p} onOpen={() => onOpenProduct(p)} />
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
