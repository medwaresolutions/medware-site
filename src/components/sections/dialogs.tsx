"use client";

import { useEffect, useState } from "react";
import { Button, Dialog, StatusPill } from "@/components/ds";
import type { Product } from "@/data/portfolio";
import { ZONE_CLOCK_URL } from "./ZoneClock";

/* ---------- Product detail dialog ---------- */
function Field({ label, body }: { label: string; body?: string }) {
  if (!body) return null;
  return (
    <div>
      <div
        className="md-typescale-label-medium"
        style={{ color: "var(--md-sys-color-on-surface-variant)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}
      >
        {label}
      </div>
      <p className="md-typescale-body-medium" style={{ margin: 0, color: "var(--md-sys-color-on-surface)" }}>
        {body}
      </p>
    </div>
  );
}

export function ProductDialog({ product, onClose }: { product: Product | null; onClose: () => void }) {
  if (!product) return null;
  return (
    <Dialog
      open={!!product}
      onClose={onClose}
      headline={product.title}
      actions={
        <>
          <Button variant="text" onClick={onClose}>
            Close
          </Button>
          <Button variant="filled" href={product.link} target="_blank" rel="noopener noreferrer" icon="open_in_new">
            Visit product
          </Button>
        </>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 18, paddingTop: 4 }}>
        {product.image ? (
          <div
            style={{
              borderRadius: "var(--md-sys-shape-corner-large)",
              overflow: "hidden",
              aspectRatio: "16 / 7",
              background: "var(--md-sys-color-surface-container)",
            }}
          >
            <img src={product.image} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ) : null}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <StatusPill type={product.statusType} label={product.status} />
          <span className="md-typescale-label-large" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
            {product.audience}
          </span>
        </div>
        <p className="md-typescale-body-large" style={{ margin: 0, color: "var(--md-sys-color-on-surface)" }}>
          {product.purpose}
        </p>
        <Field label="Problem" body={product.problem} />
        <Field label="How it works" body={product.howItWorks} />
        <Field label="Revenue model" body={product.revenue} />
        <Field label="Market" body={product.market} />
        <Field label="Customers" body={product.customers} />
      </div>
    </Dialog>
  );
}

/* ---------- Zone Clock (live app in a modal) ---------- */
export function ZoneClockDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <Dialog
      open
      onClose={onClose}
      className="mdc-dialog--app"
      headline={
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="material-symbols-rounded" style={{ color: "var(--md-sys-color-primary)" }}>
            schedule
          </span>
          Zone Clock
        </span>
      }
      actions={
        <>
          <Button variant="text" onClick={onClose}>
            Close
          </Button>
          <Button variant="tonal" href={ZONE_CLOCK_URL} target="_blank" rel="noopener noreferrer" icon="open_in_new">
            Open full screen
          </Button>
        </>
      }
    >
      <div className="mw-app-frame">
        <iframe
          src={ZONE_CLOCK_URL}
          title="Zone Clock"
          loading="lazy"
          allow="clipboard-write"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </Dialog>
  );
}

/* ---------- Legal dialogs (Terms / Privacy / Cookies) ---------- */
export type LegalDoc = "terms" | "privacy" | "cookies";

const LEGAL_DOCS: Record<LegalDoc, { title: string; updated: string; sections: { h: string; p: string }[] }> = {
  terms: {
    title: "Terms of use",
    updated: "Last updated June 2026",
    sections: [
      {
        h: "Agreement",
        p: "By accessing medware.com.au (“the site”) you agree to these terms. If you do not agree, please do not use the site. Medware Solutions Pty Ltd (“Medware”, “we”, “us”) may update these terms from time to time; continued use means you accept the current version.",
      },
      {
        h: "Use of the site",
        p: "You may use the site for lawful, personal and business-information purposes. You agree not to misuse the site, attempt to gain unauthorised access, or disrupt its operation.",
      },
      {
        h: "No medical advice",
        p: "Content on this site is general information about our products and services. It is not medical, clinical or professional advice and must not be relied on for diagnosis or treatment. Always consult a qualified professional.",
      },
      {
        h: "Intellectual property",
        p: "All content, branding, software and design on this site are owned by or licensed to Medware Solutions and protected by Australian and international law. You may not reproduce or redistribute them without written permission.",
      },
      {
        h: "Third-party links",
        p: "The site links to our products and to external sites we do not control. We are not responsible for their content or practices.",
      },
      {
        h: "Liability",
        p: "To the extent permitted by law, the site is provided “as is”. We exclude liability for any loss arising from use of the site, except for rights that cannot be excluded under the Australian Consumer Law.",
      },
      { h: "Governing law", p: "These terms are governed by the laws of Victoria, Australia." },
      { h: "Contact", p: "Questions about these terms? Email matt@medware.com.au." },
    ],
  },
  privacy: {
    title: "Privacy policy",
    updated: "Last updated June 2026",
    sections: [
      {
        h: "Our commitment",
        p: "Medware Solutions Pty Ltd handles personal information in line with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.",
      },
      {
        h: "What we collect",
        p: "When you contact us we collect your name, email and the details you include in your message. We also collect basic, non-identifying usage data such as pages viewed and device type.",
      },
      {
        h: "How we use it",
        p: "To respond to your enquiry, to provide and improve our products and services, and to meet legal obligations. We do not sell your personal information.",
      },
      {
        h: "Disclosure",
        p: "We may share information with trusted service providers (for example hosting and email) who are bound to protect it, or where required by law.",
      },
      { h: "Cookies", p: "We use cookies and browser local storage as described in our Cookie policy." },
      {
        h: "Security",
        p: "We take reasonable steps to protect personal information from misuse, loss and unauthorised access.",
      },
      {
        h: "Access, correction & complaints",
        p: "You may request access to or correction of your personal information, or make a privacy complaint, by emailing matt@medware.com.au. You may also contact the Office of the Australian Information Commissioner (oaic.gov.au).",
      },
      { h: "Contact", p: "Privacy questions? Email matt@medware.com.au." },
    ],
  },
  cookies: {
    title: "Cookie policy",
    updated: "Last updated June 2026",
    sections: [
      {
        h: "What cookies are",
        p: "Cookies and similar technologies (including browser local storage) are small pieces of data stored on your device that help a website function and remember your preferences.",
      },
      {
        h: "How we use them",
        p: "Essential — keep the site working. Preferences — remember choices such as your light or dark theme. Analytics — help us understand how the site is used so we can improve it.",
      },
      {
        h: "Your choices",
        p: "You can accept or decline cookies using the banner, and manage or delete cookies through your browser settings at any time. Disabling some cookies may affect how the site works.",
      },
      {
        h: "Consent",
        p: "By selecting Accept, or by continuing to use the site, you consent to our use of cookies as described here.",
      },
      { h: "Contact", p: "Cookie questions? Email matt@medware.com.au." },
    ],
  },
};

export function LegalDialog({ doc, onClose }: { doc: LegalDoc | null; onClose: () => void }) {
  if (!doc) return null;
  const d = LEGAL_DOCS[doc];
  return (
    <Dialog open onClose={onClose} headline={d.title} actions={<Button variant="filled" onClick={onClose}>Close</Button>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 4 }}>
        <div
          className="md-typescale-label-medium"
          style={{ color: "var(--md-sys-color-on-surface-variant)", textTransform: "uppercase", letterSpacing: 1 }}
        >
          {d.updated}
        </div>
        {d.sections.map((s, i) => (
          <div key={i}>
            <h4 className="md-typescale-title-medium" style={{ margin: "0 0 4px", color: "var(--md-sys-color-on-surface)" }}>
              {s.h}
            </h4>
            <p className="md-typescale-body-medium" style={{ margin: 0, color: "var(--md-sys-color-on-surface-variant)" }}>
              {s.p}
            </p>
          </div>
        ))}
      </div>
    </Dialog>
  );
}

/* ---------- Cookie consent banner ---------- */
export function CookieBanner({ onPolicy }: { onPolicy: () => void }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (localStorage.getItem("mw-cookie-consent") == null) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);
  if (!show) return null;
  const set = (v: string) => {
    try {
      localStorage.setItem("mw-cookie-consent", v);
    } catch {
      /* ignore */
    }
    setShow(false);
  };
  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 1200,
        margin: "0 auto",
        maxWidth: 560,
        display: "flex",
        alignItems: "center",
        gap: 16,
        flexWrap: "wrap",
        justifyContent: "space-between",
        background: "var(--md-sys-color-surface-container-high)",
        color: "var(--md-sys-color-on-surface)",
        border: "1px solid var(--md-sys-color-outline-variant)",
        borderRadius: "var(--md-sys-shape-corner-large)",
        boxShadow: "var(--md-sys-elevation-level-3)",
        padding: "16px 20px",
      }}
    >
      <p
        className="md-typescale-body-medium"
        style={{ margin: 0, flex: "1 1 260px", color: "var(--md-sys-color-on-surface-variant)" }}
      >
        We use cookies to keep the site working, remember your preferences, and understand usage.{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onPolicy();
          }}
          style={{ color: "var(--md-sys-color-primary)", textDecoration: "none", fontWeight: 500 }}
        >
          Cookie policy
        </a>
      </p>
      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        <Button variant="text" onClick={() => set("declined")}>
          Decline
        </Button>
        <Button variant="filled" onClick={() => set("accepted")}>
          Accept
        </Button>
      </div>
    </div>
  );
}
