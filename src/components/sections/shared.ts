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

// Deterministic, locale- and timezone-independent date formatting.
// Using toLocaleDateString caused a hydration mismatch: Node's ICU rendered
// "June" for month:"short" while the browser rendered "Jun". UTC getters keep
// server and client identical regardless of the runtime timezone.
const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function dateParts(value?: string | null): [number, number, number] | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return [d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()];
}

export function formatPostDate(value?: string | null): string {
  const p = dateParts(value);
  return p ? `${p[2]} ${MONTHS_SHORT[p[1]]} ${p[0]}` : "";
}

export function formatPostDateLong(value?: string | null): string {
  const p = dateParts(value);
  return p ? `${p[2]} ${MONTHS_LONG[p[1]]} ${p[0]}` : "";
}
