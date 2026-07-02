"use client";

import { useState } from "react";
import { Card, StatusPill } from "@/components/ds";
import type { Product } from "@/data/portfolio";

/* Shared product card used by the home Work section and the /industry company views.
   Shows the product image when one exists; otherwise a colour block (the company
   accent) with the product initials. */
export default function ProductCard({
  p,
  accent,
  onOpen,
}: {
  p: Product;
  accent?: string;
  onOpen: () => void;
}) {
  const [imgErr, setImgErr] = useState(false);
  const showImg = p.image && !imgErr;

  return (
    <Card
      variant="outlined"
      interactive
      onClick={onOpen}
      style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}
    >
      <div
        style={{
          position: "relative",
          height: 124,
          flex: "none",
          background: accent ?? "var(--md-sys-color-secondary-container)",
        }}
      >
        {showImg ? (
          <img
            src={p.image as string}
            alt={p.title}
            onError={() => setImgErr(true)}
            loading="lazy"
            decoding="async"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
              color: "#fff",
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: "0.04em",
              textShadow: "0 1px 3px rgba(0,0,0,0.25)",
            }}
          >
            {p.short}
          </div>
        )}
        <span style={{ position: "absolute", top: 10, right: 10 }}>
          <StatusPill type={p.statusType} label={p.status} />
        </span>
      </div>
      <div style={{ padding: 18, display: "flex", flexDirection: "column", flex: 1 }}>
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
      </div>
    </Card>
  );
}
