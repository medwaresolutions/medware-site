"use client";

import { useState } from "react";
import { Button, Card, TextField } from "@/components/ds";
import { mwWrap } from "./shared";

function MwTextArea({
  label,
  rows = 4,
  value,
  onChange,
}: {
  label: string;
  rows?: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const [focus, setFocus] = useState(false);
  const float = focus || value.length > 0;
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <textarea
        rows={rows}
        value={value}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: "100%",
          boxSizing: "border-box",
          resize: "vertical",
          padding: "18px 15px 10px",
          fontFamily: "var(--md-sys-typescale-font-plain)",
          fontSize: "var(--md-sys-typescale-body-large-size)",
          lineHeight: "var(--md-sys-typescale-body-large-line)",
          color: "var(--md-sys-color-on-surface)",
          background: "transparent",
          outline: "none",
          border: focus
            ? "2px solid var(--md-sys-color-primary)"
            : "1px solid var(--md-sys-color-outline)",
          borderRadius: "var(--md-sys-shape-corner-extra-small)",
        }}
      />
      <label
        style={{
          position: "absolute",
          left: 12,
          top: float ? -8 : 18,
          padding: "0 4px",
          background: "var(--md-sys-color-surface-container-lowest)",
          pointerEvents: "none",
          color: float ? "var(--md-sys-color-primary)" : "var(--md-sys-color-on-surface-variant)",
          fontSize: float ? "var(--md-sys-typescale-body-small-size)" : "var(--md-sys-typescale-body-large-size)",
          transition: "all .15s var(--md-sys-motion-easing-standard)",
        }}
      >
        {label}
      </label>
    </div>
  );
}

export default function Contact({ onSend }: { onSend: (email: string) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  return (
    <section id="contact" style={{ ...mwWrap, padding: "80px 24px", maxWidth: 720 }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <h2 className="md-typescale-headline-large" style={{ margin: "0 0 12px", color: "var(--md-sys-color-on-surface)" }}>
          Get in touch
        </h2>
        <p className="md-typescale-body-large" style={{ margin: 0, color: "var(--md-sys-color-on-surface-variant)" }}>
          Have a project in mind? Want to learn AI? Just want to chat about what’s possible? Reach out.
        </p>
      </div>
      <Card variant="elevated" style={{ padding: 28 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div className="mw-2grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <TextField variant="outlined" label="Name" leadingIcon="person" value={name} onChange={(e) => setName(e.target.value)} />
            <TextField
              variant="outlined"
              label="Email"
              leadingIcon="mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <MwTextArea
            label="Tell me about your project or what you’d like to learn"
            rows={4}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <div>
            <Button variant="filled" size="large" icon="send" onClick={() => onSend(email)}>
              Send message
            </Button>
          </div>
        </div>
      </Card>
      <div style={{ display: "flex", gap: 28, justifyContent: "center", flexWrap: "wrap", marginTop: 28 }}>
        <a
          href="mailto:matt@medware.com.au"
          className="mw-contact-link"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", color: "var(--md-sys-color-on-surface-variant)" }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--md-sys-color-primary)" }}>
            mail
          </span>
          <span className="md-typescale-body-medium">matt@medware.com.au</span>
        </a>
        <a
          href="https://www.linkedin.com/in/matt-martin-34345914"
          target="_blank"
          rel="noopener noreferrer"
          className="mw-contact-link"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", color: "var(--md-sys-color-on-surface-variant)" }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--md-sys-color-primary)" }}>
            link
          </span>
          <span className="md-typescale-body-medium">LinkedIn</span>
        </a>
      </div>
    </section>
  );
}
