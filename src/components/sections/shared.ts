import type { CSSProperties } from "react";

/* Shared layout constants for the marketing sections (ported from the redesign). */
export const mwWrap: CSSProperties = {
  maxWidth: 1160,
  margin: "0 auto",
  padding: "0 24px",
};

export const navLinkStyle: CSSProperties = {
  padding: "8px 12px",
  borderRadius: "var(--md-sys-shape-corner-small)",
  color: "var(--md-sys-color-on-surface-variant)",
  textDecoration: "none",
  fontFamily: "var(--md-sys-typescale-font-plain)",
  fontSize: 14,
  fontWeight: 500,
};

export const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/blog", label: "The Signal" },
  { href: "/#advisory", label: "AI Advisory" },
  { href: "/industry", label: "Industry" },
  { href: "/#contact", label: "Contact" },
];

export function formatPostDate(value?: string | null): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" });
}
