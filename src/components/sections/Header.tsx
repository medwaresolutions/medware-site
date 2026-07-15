"use client";

import { useState } from "react";
import { Button, IconButton } from "@/components/ds";
import { useTheme } from "@/components/ThemeProvider";
import { mwWrap, navLinkStyle, NAV } from "./shared";

export function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <IconButton
      icon={dark ? "light_mode" : "dark_mode"}
      aria-label="Toggle light or dark theme"
      onClick={toggle}
      suppressHydrationWarning
    />
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="dark"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#0D2033",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ ...mwWrap, display: "flex", alignItems: "center", gap: 16, height: 72 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          {/* Theme-aware mark (CSS toggles which one shows) */}
          <img className="mw-logo-dark" src="/medware-monogram.png" alt="Medware" style={{ height: 30, width: "auto" }} />
          <img className="mw-logo-white" src="/medware-monogram-white.png" alt="Medware" style={{ height: 30, width: "auto" }} />
          <span
            className="mw-wordmark"
            style={{
              fontFamily: "'Manrope', var(--md-sys-typescale-font-brand)",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: "0.10em",
              color: "var(--md-sys-color-on-surface)",
            }}
          >
            MEDWARE
          </span>
        </a>

        <nav className="mw-navlinks" style={{ display: "flex", gap: 2, marginLeft: 20 }}>
          {NAV.map((l) => (
            <a key={l.href} href={l.href} style={navLinkStyle}>
              {l.label}
            </a>
          ))}
        </nav>

        <div style={{ flex: 1 }} />

        <ThemeToggle />

        <div className="mw-headcta">
          <Button variant="filled" href="/#contact" trailingIcon="arrow_forward">
            Get in touch
          </Button>
        </div>

        <span className="mw-mobile-toggle">
          <IconButton
            icon={open ? "close" : "menu"}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          />
        </span>
      </div>

      {open ? (
        <nav
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            background: "#0D2033",
          }}
        >
          <div style={{ ...mwWrap, display: "flex", flexDirection: "column", padding: "12px 24px" }}>
            {NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ ...navLinkStyle, padding: "12px 8px", fontSize: 16 }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
