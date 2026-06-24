"use client";

import { Card, StatusPill } from "@/components/ds";
import type { Product } from "@/data/portfolio";

/* Shared product card used by the home Work section and the /industry company views. */
export default function ProductCard({ p, onOpen }: { p: Product; onOpen: () => void }) {
  return (
    <Card
      variant="outlined"
      interactive
      onClick={onOpen}
      style={{ padding: 18, display: "flex", flexDirection: "column", gap: 0, height: "100%" }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 12 }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            flexShrink: 0,
            borderRadius: "var(--md-sys-shape-corner-medium)",
            background: "var(--md-sys-color-secondary-container)",
            color: "var(--md-sys-color-on-secondary-container)",
          }}
        >
          <span className="md-typescale-title-small">{p.short}</span>
        </span>
        <StatusPill type={p.statusType} label={p.status} />
      </div>
      <h4 className="md-typescale-title-medium" style={{ margin: "0 0 2px", color: "var(--md-sys-color-on-surface)" }}>
        {p.title}
      </h4>
      <div
        className="md-typescale-label-medium"
        style={{ color: "var(--md-sys-color-on-surface-variant)", textTransform: "none", marginBottom: 10 }}
      >
        {p.audience}
      </div>
      <p
        className="md-typescale-body-medium mw-clamp3"
        style={{ margin: "0 0 12px", color: "var(--md-sys-color-on-surface-variant)" }}
      >
        {p.purpose}
      </p>
      <span
        className="md-typescale-label-large"
        style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", gap: 6, color: "var(--md-sys-color-primary)" }}
      >
        View detail{" "}
        <span className="material-symbols-rounded" style={{ fontSize: 18 }}>
          arrow_forward
        </span>
      </span>
    </Card>
  );
}
