"use client";

import { mwWrap, navLinkStyle } from "./shared";
import type { LegalDoc } from "./dialogs";

export default function Footer({ onOpenLegal }: { onOpenLegal: (doc: LegalDoc) => void }) {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--md-sys-color-outline-variant)",
        background: "var(--md-sys-color-surface-container)",
      }}
    >
      <div
        style={{
          ...mwWrap,
          padding: "40px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img className="mw-logo-dark" src="/medware-monogram.png" alt="Medware" style={{ height: 28, width: "auto" }} />
          <img className="mw-logo-white" src="/medware-monogram-white.png" alt="Medware" style={{ height: 28, width: "auto" }} />
          <span className="md-typescale-body-small" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
            © 2026 Medware Solutions. All rights reserved.
          </span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
          <a href="#work" style={navLinkStyle}>
            Products
          </a>
          <a href="https://framewright.site" target="_blank" rel="noopener noreferrer" style={navLinkStyle}>
            Framewright
          </a>
          <a href="https://github.com/medwaresolutions" target="_blank" rel="noopener noreferrer" style={navLinkStyle}>
            GitHub
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onOpenLegal("terms");
            }}
            style={navLinkStyle}
          >
            Terms
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onOpenLegal("privacy");
            }}
            style={navLinkStyle}
          >
            Privacy
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onOpenLegal("cookies");
            }}
            style={navLinkStyle}
          >
            Cookie policy
          </a>
        </div>
      </div>
    </footer>
  );
}
