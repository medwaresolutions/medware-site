"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { CookieBanner, LegalDialog, type LegalDoc } from "@/components/sections/dialogs";
import { Button } from "@/components/ds";
import { mwWrap } from "@/components/sections/shared";
import {
  BY_KEY,
  DEPARTMENTS,
  GROUPS,
  initials,
  PRODUCTS,
  STATUS,
  type GroupKey,
  type IndustryProduct,
} from "@/data/industry";

type Plan = {
  brand?: string;
  country?: string;
  category?: string;
  overview?: string;
  swot?: { strengths?: string[]; weaknesses?: string[]; opportunities?: string[]; threats?: string[] };
  recommendations?: { key: string; why: string }[];
  summary?: string;
};

function fmtDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

/* ---------- Small presentational helpers ---------- */
function StatusBadge({ status }: { status: IndustryProduct["status"] }) {
  const s = STATUS[status];
  return (
    <span
      style={{
        position: "absolute",
        top: 11,
        left: 11,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11.5,
        fontWeight: 700,
        color: "#fff",
        padding: "4px 10px",
        borderRadius: 999,
        background: "rgba(14,27,42,.55)",
        backdropFilter: "blur(4px)",
      }}
    >
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: s.color }} />
      {s.label}
    </span>
  );
}

function Media({ p, height }: { p: IndustryProduct; height: number }) {
  const [err, setErr] = useState(false);
  const showImg = p.img && !err;
  return (
    <div
      style={{
        height,
        position: "relative",
        overflow: "hidden",
        background: "var(--md-sys-color-primary-container)",
      }}
    >
      {showImg ? (
        <img
          src={p.img as string}
          alt={p.title}
          onError={() => setErr(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
            color: "var(--md-sys-color-on-primary-container)",
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: ".02em",
          }}
        >
          {initials(p.title)}
        </div>
      )}
      <StatusBadge status={p.status} />
    </div>
  );
}

function PriceLine({ p }: { p: IndustryProduct }) {
  return (
    <div
      className="md-typescale-label-large"
      style={{
        marginTop: 14,
        fontWeight: 700,
        color: "var(--md-sys-color-on-surface)",
        background: "var(--md-sys-color-surface-container-high)",
        borderRadius: "var(--md-sys-shape-corner-small)",
        padding: "8px 11px",
      }}
    >
      {p.price}
      {p.priceNote ? (
        <span style={{ fontWeight: 500, color: "var(--md-sys-color-on-surface-variant)" }}> · {p.priceNote}</span>
      ) : null}
    </div>
  );
}

const sectionHead = (kicker: string, title: string, sub: string, onDark = false) => (
  <div style={{ maxWidth: "62ch", marginBottom: 34 }}>
    <div
      className="md-typescale-label-large"
      style={{ fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--md-sys-color-primary)" }}
    >
      {kicker}
    </div>
    <h2 className="md-typescale-headline-large" style={{ margin: "10px 0 0", color: "var(--md-sys-color-on-surface)" }}>
      {title}
    </h2>
    <p className="md-typescale-body-large" style={{ marginTop: 12, color: "var(--md-sys-color-on-surface-variant)" }}>
      {sub}
    </p>
  </div>
);

/* ============================================================ */
export default function IndustryPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [dates, setDates] = useState<Record<string, string>>({});
  const [involved, setInvolved] = useState<string[]>([]);
  const [dept, setDept] = useState("");
  const [groupFilter, setGroupFilter] = useState<GroupKey | "all">("all");
  const [modalKey, setModalKey] = useState<string | null>(null);
  const [legal, setLegal] = useState<LegalDoc | null>(null);

  // AI planner
  const [aiBrand, setAiBrand] = useState("");
  const [aiCountry, setAiCountry] = useState("Australia");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [plan, setPlan] = useState<Plan | null>(null);

  // Enquiry form
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "", timing: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const isSel = useCallback((k: string) => selected.includes(k), [selected]);
  const toggleSelect = useCallback((k: string) => {
    setSelected((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));
    setDates((prev) => {
      if (selected.includes(k)) {
        const next = { ...prev };
        delete next[k];
        return next;
      }
      return prev;
    });
  }, [selected]);
  const addSelect = useCallback((k: string) => setSelected((prev) => (prev.includes(k) ? prev : [...prev, k])), []);
  const toggleInvolved = useCallback(
    (k: string) => setInvolved((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k])),
    [],
  );

  const count = selected.length;

  /* ----- recommender matches ----- */
  const fit = useMemo(() => {
    let keys: string[] = [];
    let read = "";
    let heading = "";
    if (dept) {
      const d = DEPARTMENTS.find((x) => x.key === dept)!;
      keys = [...d.products];
      read = d.read;
      heading = "Recommended for " + d.label;
    }
    involved.forEach((k) => {
      if (!keys.includes(k)) keys.push(k);
    });
    if (!dept && involved.length) {
      heading = "Based on the products you selected";
      read =
        "Here is how the products you are involved with work together, plus a couple that pair naturally with them. Add any you would like a tailored proposal on.";
    }
    return { keys: keys.map((k) => BY_KEY[k]).filter(Boolean), read, heading };
  }, [dept, involved]);

  /* ----- AI planner ----- */
  async function generateBrand() {
    const brand = aiBrand.trim();
    const country = aiCountry.trim();
    if (!brand || !country) return;
    setAiLoading(true);
    setAiError("");
    setPlan(null);
    try {
      const res = await fetch("/api/industry/brand-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand, country }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data) throw new Error((data && data.error) || "Something went wrong generating the one-pager.");
      setPlan(data as Plan);
    } catch (e) {
      setAiError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setAiLoading(false);
    }
  }

  function addAllRecs() {
    if (!plan?.recommendations) return;
    setSelected((prev) => {
      const next = [...prev];
      plan.recommendations!.forEach((r) => {
        if (BY_KEY[r.key] && !next.includes(r.key)) next.push(r.key);
      });
      return next;
    });
    document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" });
  }

  /* ----- enquiry submit ----- */
  async function submitEnquiry(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    if (!form.name || !form.email || !form.company) {
      setFormError("Please provide your name, work email and company.");
      return;
    }
    setSubmitting(true);
    const products_and_dates = selected
      .map((k) => `${BY_KEY[k].title}${dates[k] ? ` (target: ${fmtDate(dates[k])})` : ""}`)
      .join("\n");
    const involved_with = involved.map((k) => BY_KEY[k].title).join(", ");
    const department = dept ? DEPARTMENTS.find((x) => x.key === dept)?.label ?? "" : "";
    try {
      const res = await fetch("/api/industry/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, department, products_and_dates, involved_with }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Could not send your enquiry.");
      setSubmitted(true);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Could not send your enquiry.");
    } finally {
      setSubmitting(false);
    }
  }

  /* ----- print one-pager ----- */
  function printOnePager() {
    if (!plan) return;
    const d = plan;
    const sw = d.swot || {};
    const esc = (s: string) => String(s ?? "").replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c] ?? c);
    const li = (a?: string[]) => (a || []).map((x) => `<li>${esc(x)}</li>`).join("");
    const recs = (d.recommendations || [])
      .map((r) => {
        const p = BY_KEY[r.key];
        return `<div class="r"><b>${esc(p ? p.title : r.key)}</b><div>${esc(r.why)}</div></div>`;
      })
      .join("");
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${esc(d.brand || "Brand")} — Medware one-pager</title>
<style>body{font-family:Arial,Helvetica,sans-serif;color:#0E1B2A;max-width:760px;margin:24px auto;padding:0 24px;line-height:1.5}
h1{font-size:22px;margin:0}.cat{color:#0B5B63;font-weight:bold;font-size:13px;margin:2px 0 16px}
h2{font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:#0E7C86;border-bottom:1px solid #E4EAF0;padding-bottom:4px;margin:20px 0 8px}
.swot{display:grid;grid-template-columns:1fr 1fr;gap:10px}.b{border:1px solid #E4EAF0;border-radius:8px;padding:8px 12px}.b h3{font-size:11px;color:#6B7C90;margin:0 0 4px;text-transform:uppercase}ul{margin:0;padding-left:16px;font-size:13px}
.r{border:1px solid #EEF2F6;border-radius:8px;padding:8px 12px;margin-bottom:8px}.r b{font-size:14px}.r div{font-size:13px;color:#33465B}
.note{font-size:11px;color:#6B7C90;margin-top:20px}</style></head><body>
<h1>${esc(d.brand || "")}${d.country ? " &middot; " + esc(d.country) : ""}</h1>${d.category ? `<div class="cat">${esc(d.category)}</div>` : ""}
${d.overview ? `<h2>Brand overview</h2><p>${esc(d.overview)}</p>` : ""}
<h2>SWOT</h2><div class="swot">
 <div class="b"><h3>Strengths</h3><ul>${li(sw.strengths)}</ul></div>
 <div class="b"><h3>Weaknesses</h3><ul>${li(sw.weaknesses)}</ul></div>
 <div class="b"><h3>Opportunities</h3><ul>${li(sw.opportunities)}</ul></div>
 <div class="b"><h3>Threats</h3><ul>${li(sw.threats)}</ul></div></div>
<h2>How the Medware Group would help</h2>${recs}
${d.summary ? `<h2>In short</h2><p>${esc(d.summary)}</p>` : ""}
<div class="note">AI generated from public sources for discussion only. Verify all facts before acting.</div>
</body></html>`);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 350);
  }

  const modalProduct = modalKey ? BY_KEY[modalKey] : null;
  const sectionPad = { padding: "64px 0" } as const;

  return (
    <>
      <Header />

      {/* ===== HERO ===== */}
      <section style={{ background: "var(--md-sys-color-surface-container-low)", borderBottom: "1px solid var(--md-sys-color-outline-variant)" }}>
        <div style={{ ...mwWrap, padding: "72px 24px 64px" }}>
          <div
            className="md-typescale-label-large"
            style={{ fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--md-sys-color-primary)", marginBottom: 16 }}
          >
            For pharmaceutical partners
          </div>
          <h1 className="md-typescale-display-medium" style={{ margin: 0, maxWidth: "16ch", color: "var(--md-sys-color-on-surface)" }}>
            One partner across the whole prescribing journey.
          </h1>
          <p
            className="md-typescale-body-large"
            style={{ marginTop: 20, maxWidth: "60ch", color: "var(--md-sys-color-on-surface-variant)" }}
          >
            The Medware Group builds the software doctors and patients use every day. That makes us one of the most
            effective ways for your brand to reach, support and understand your market. Browse what we offer, see what
            fits your team, and tell us what you would like to hear more about.
          </p>
          <div style={{ marginTop: 30, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button variant="filled" size="large" href="#fit" trailingIcon="arrow_forward">
              Find what fits your team
            </Button>
            <Button variant="outlined" size="large" href="#solutions">
              Browse all solutions
            </Button>
          </div>
          <div style={{ marginTop: 40, display: "flex", gap: 40, flexWrap: "wrap" }}>
            {[
              { b: "Doctors", s: "Tools used daily in clinics" },
              { b: "Patients", s: "Supported through their journey" },
              { b: "Your team", s: "Data, reach and efficiency" },
            ].map((x) => (
              <div key={x.b}>
                <div className="md-typescale-headline-small" style={{ color: "var(--md-sys-color-on-surface)" }}>{x.b}</div>
                <div className="md-typescale-label-medium" style={{ color: "var(--md-sys-color-on-surface-variant)", textTransform: "none" }}>
                  {x.s}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AI BRAND PLANNER ===== */}
      <section id="brandai" style={{ ...sectionPad }}>
        <div style={mwWrap}>
          {sectionHead(
            "AI brand planner",
            "Enter your brand. Get a plan in a minute.",
            "Tell us a brand and a country. Our AI researches it live, writes a short brief with a SWOT, and shows exactly how the Medware Group would help deliver your strategy and tactics.",
          )}
          <div
            style={{
              background: "var(--md-sys-color-surface-container-lowest)",
              border: "1px solid var(--md-sys-color-outline-variant)",
              borderRadius: "var(--md-sys-shape-corner-large)",
              padding: 22,
            }}
          >
            <div className="mw-ind-aiform">
              <div>
                <label className="md-typescale-label-medium" style={{ display: "block", marginBottom: 6, color: "var(--md-sys-color-on-surface-variant)", textTransform: "none" }}>
                  Brand or product
                </label>
                <input
                  className="mw-field"
                  value={aiBrand}
                  onChange={(e) => setAiBrand(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && generateBrand()}
                  placeholder="e.g. Humira, Ozempic, your brand"
                />
              </div>
              <div>
                <label className="md-typescale-label-medium" style={{ display: "block", marginBottom: 6, color: "var(--md-sys-color-on-surface-variant)", textTransform: "none" }}>
                  Country
                </label>
                <input
                  className="mw-field"
                  value={aiCountry}
                  onChange={(e) => setAiCountry(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && generateBrand()}
                />
              </div>
              <Button variant="filled" size="large" disabled={aiLoading} onClick={generateBrand}>
                {aiLoading ? "Researching…" : "Generate one-pager"}
              </Button>
            </div>
            <div className="md-typescale-body-small" style={{ marginTop: 12, color: "var(--md-sys-color-on-surface-variant)" }}>
              AI generated from public information for discussion only. Always verify before acting.
            </div>

            {aiLoading ? <LoadingFacts brand={aiBrand} country={aiCountry} /> : null}
            {aiError ? (
              <div
                className="md-typescale-body-medium"
                style={{
                  marginTop: 18,
                  padding: "14px 16px",
                  borderRadius: "var(--md-sys-shape-corner-small)",
                  background: "var(--md-sys-color-error-container)",
                  color: "var(--md-sys-color-on-error-container)",
                }}
              >
                {aiError}
              </div>
            ) : null}
            {plan ? <OnePager plan={plan} isSel={isSel} addSelect={addSelect} addAll={addAllRecs} print={printOnePager} /> : null}
          </div>
        </div>
      </section>

      {/* ===== RECOMMENDER ===== */}
      <section
        id="fit"
        style={{ ...sectionPad, background: "var(--md-sys-color-surface-container-low)", borderTop: "1px solid var(--md-sys-color-outline-variant)", borderBottom: "1px solid var(--md-sys-color-outline-variant)" }}
      >
        <div style={mwWrap}>
          {sectionHead(
            "Find what fits you",
            "Tell us your team, see what would make a difference.",
            "Pick the department you work in, or the products you are already involved with. We will filter the list and show how you would use them and the difference they could make.",
          )}
          <div className="mw-ind-fit">
            <div
              style={{
                background: "var(--md-sys-color-surface-container-lowest)",
                border: "1px solid var(--md-sys-color-outline-variant)",
                borderRadius: "var(--md-sys-shape-corner-large)",
                padding: 24,
              }}
            >
              <label className="md-typescale-title-small" style={{ display: "block", marginBottom: 6, color: "var(--md-sys-color-on-surface)" }}>
                Your department
              </label>
              <select className="mw-field" value={dept} onChange={(e) => setDept(e.target.value)}>
                <option value="">Select a department…</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d.key} value={d.key}>
                    {d.label}
                  </option>
                ))}
              </select>
              <div style={{ marginTop: 18 }}>
                <label className="md-typescale-title-small" style={{ display: "block", marginBottom: 8, color: "var(--md-sys-color-on-surface)" }}>
                  Products you are involved with
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {PRODUCTS.map((p) => (
                    <button
                      key={p.key}
                      className={`mw-chip-toggle ${involved.includes(p.key) ? "on" : ""}`}
                      onClick={() => toggleInvolved(p.key)}
                    >
                      {p.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ minHeight: 200 }}>
              {fit.keys.length ? (
                <div
                  style={{
                    background: "var(--md-sys-color-surface-container-lowest)",
                    border: "1px solid var(--md-sys-color-outline-variant)",
                    borderLeft: "4px solid var(--md-sys-color-primary)",
                    borderRadius: "var(--md-sys-shape-corner-large)",
                    padding: "24px 26px",
                  }}
                >
                  <h3 className="md-typescale-title-large" style={{ margin: 0, color: "var(--md-sys-color-on-surface)" }}>
                    {fit.heading}
                  </h3>
                  <p className="md-typescale-body-medium" style={{ marginTop: 10, color: "var(--md-sys-color-on-surface-variant)" }}>
                    {fit.read}
                  </p>
                  <div style={{ marginTop: 18, display: "grid", gap: 10 }}>
                    {fit.keys.map((p) => (
                      <div
                        key={p.key}
                        style={{
                          display: "flex",
                          gap: 12,
                          alignItems: "flex-start",
                          padding: "13px 14px",
                          border: "1px solid var(--md-sys-color-outline-variant)",
                          borderRadius: "var(--md-sys-shape-corner-small)",
                          background: "var(--md-sys-color-surface-container-low)",
                        }}
                      >
                        <span
                          style={{
                            flex: "none",
                            width: 34,
                            height: 34,
                            borderRadius: 8,
                            display: "grid",
                            placeItems: "center",
                            background: "var(--md-sys-color-primary-container)",
                            color: "var(--md-sys-color-on-primary-container)",
                            fontWeight: 800,
                            fontSize: 13,
                          }}
                        >
                          {initials(p.title)}
                        </span>
                        <div style={{ flex: 1 }}>
                          <b className="md-typescale-title-medium" style={{ color: "var(--md-sys-color-on-surface)" }}>{p.title}</b>
                          <div className="md-typescale-body-small" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>{p.impact}</div>
                        </div>
                        <AddBtn on={isSel(p.key)} onClick={() => toggleSelect(p.key)} />
                      </div>
                    ))}
                  </div>
                  <p className="md-typescale-body-small" style={{ marginTop: 16, color: "var(--md-sys-color-on-surface-variant)" }}>
                    Tick the ones you would like to hear about, then add your rollout dates in the enquiry section below.
                  </p>
                </div>
              ) : (
                <div className="md-typescale-body-large" style={{ color: "var(--md-sys-color-on-surface-variant)", padding: "30px 4px" }}>
                  Choose a department above to see a tailored shortlist and a short read on the difference it could make.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOLUTIONS ===== */}
      <section id="solutions" style={sectionPad}>
        <div style={mwWrap}>
          {sectionHead(
            "The portfolio",
            "Solutions, grouped by what you want to achieve.",
            'Everything below is one group, the Medware Group. Tap "Add to shortlist" on anything you would like a tailored proposal on, then send it to us at the bottom of the page.',
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 26 }}>
            <span className="md-typescale-label-medium" style={{ fontWeight: 700, color: "var(--md-sys-color-on-surface-variant)", marginRight: 4 }}>
              Show:
            </span>
            {(["all", ...GROUPS.map((g) => g.key)] as (GroupKey | "all")[]).map((key) => {
              const label = key === "all" ? "All" : GROUPS.find((g) => g.key === key)!.name;
              const on = groupFilter === key;
              return (
                <button
                  key={key}
                  onClick={() => setGroupFilter(key)}
                  className="md-typescale-label-large"
                  style={{
                    fontWeight: 600,
                    padding: "8px 15px",
                    borderRadius: 999,
                    cursor: "pointer",
                    border: on ? "1px solid var(--md-sys-color-on-surface)" : "1px solid var(--md-sys-color-outline)",
                    background: on ? "var(--md-sys-color-on-surface)" : "var(--md-sys-color-surface)",
                    color: on ? "var(--md-sys-color-surface)" : "var(--md-sys-color-on-surface-variant)",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {GROUPS.filter((g) => groupFilter === "all" || g.key === groupFilter).map((g) => {
            const items = PRODUCTS.filter((p) => p.group === g.key);
            if (!items.length) return null;
            return (
              <div key={g.key} style={{ marginBottom: 48 }}>
                <h3 className="md-typescale-headline-small" style={{ margin: "0 0 6px", color: "var(--md-sys-color-on-surface)" }}>
                  {g.name}
                </h3>
                <p className="md-typescale-body-medium" style={{ margin: "0 0 20px", maxWidth: "70ch", color: "var(--md-sys-color-on-surface-variant)" }}>
                  {g.sub}
                </p>
                <div className="mw-ind-cards">
                  {items.map((p) => (
                    <ProductCard
                      key={p.key}
                      p={p}
                      selected={isSel(p.key)}
                      onAdd={() => toggleSelect(p.key)}
                      onMore={() => setModalKey(p.key)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== ENQUIRE ===== */}
      <section
        id="enquire"
        style={{ ...sectionPad, background: "var(--md-sys-color-surface-container-low)", borderTop: "1px solid var(--md-sys-color-outline-variant)" }}
      >
        <div style={mwWrap}>
          {sectionHead(
            "Enquire",
            "Tell us what you would like to hear more about.",
            "Tick the solutions that interest you, add a rollout date if you have one, and we will come back to you with how it works, the benefit to you, and the cost.",
          )}
          <div className="mw-ind-enq">
            {/* basket */}
            <div
              style={{
                background: "var(--md-sys-color-surface-container-lowest)",
                border: "1px solid var(--md-sys-color-outline-variant)",
                borderRadius: "var(--md-sys-shape-corner-large)",
                padding: 22,
              }}
            >
              <h4 className="md-typescale-title-medium" style={{ margin: "0 0 4px", color: "var(--md-sys-color-on-surface)" }}>
                Your shortlist
              </h4>
              <div className="md-typescale-body-small" style={{ color: "var(--md-sys-color-on-surface-variant)", marginBottom: 14 }}>
                Add a target rollout date next to any item if you have one in mind.
              </div>
              {selected.length === 0 ? (
                <div
                  className="md-typescale-body-medium"
                  style={{
                    color: "var(--md-sys-color-on-surface-variant)",
                    padding: "18px 0",
                    textAlign: "center",
                    border: "1px dashed var(--md-sys-color-outline-variant)",
                    borderRadius: "var(--md-sys-shape-corner-medium)",
                  }}
                >
                  Nothing added yet. Browse the solutions above and tap &quot;Add to shortlist&quot;.
                </div>
              ) : (
                selected.map((k) => (
                  <div
                    key={k}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      background: "var(--md-sys-color-surface-container)",
                      border: "1px solid var(--md-sys-color-outline-variant)",
                      borderRadius: "var(--md-sys-shape-corner-small)",
                      padding: "11px 12px",
                      marginBottom: 10,
                    }}
                  >
                    <span className="md-typescale-body-medium" style={{ fontWeight: 600, color: "var(--md-sys-color-on-surface)" }}>
                      {BY_KEY[k].title}
                    </span>
                    <input
                      type="date"
                      aria-label={`Target rollout date for ${BY_KEY[k].title}`}
                      value={dates[k] || ""}
                      onChange={(e) => setDates((prev) => ({ ...prev, [k]: e.target.value }))}
                      className="mw-field"
                      style={{ marginLeft: "auto", width: 160, padding: "7px 9px", fontSize: 12.5 }}
                    />
                    <button
                      onClick={() => toggleSelect(k)}
                      aria-label="Remove"
                      style={{
                        flex: "none",
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: "var(--md-sys-color-surface-container-highest)",
                        color: "var(--md-sys-color-on-surface-variant)",
                        border: 0,
                        cursor: "pointer",
                        fontSize: 15,
                        lineHeight: 1,
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* form */}
            <div
              style={{
                background: "var(--md-sys-color-surface-container-lowest)",
                borderRadius: "var(--md-sys-shape-corner-large)",
                boxShadow: "var(--md-sys-elevation-level-1)",
                padding: 26,
              }}
            >
              {submitted ? (
                <div style={{ textAlign: "center", padding: "30px 10px" }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "var(--md-sys-color-primary-container)",
                      color: "var(--md-sys-color-on-primary-container)",
                      display: "grid",
                      placeItems: "center",
                      margin: "0 auto 16px",
                      fontSize: 30,
                      fontWeight: 800,
                    }}
                  >
                    ✓
                  </div>
                  <h3 className="md-typescale-headline-small" style={{ margin: 0, color: "var(--md-sys-color-on-surface)" }}>
                    Thanks, we have got it.
                  </h3>
                  <p className="md-typescale-body-medium" style={{ marginTop: 8, color: "var(--md-sys-color-on-surface-variant)" }}>
                    We will be in touch shortly with how it works, the benefit to you, and the cost for everything on your
                    shortlist.
                  </p>
                </div>
              ) : (
                <form onSubmit={submitEnquiry}>
                  <div className="mw-ind-formrow" style={{ marginBottom: 14 }}>
                    <Field label="Your name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                    <Field label="Work email" required type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                  </div>
                  <div className="mw-ind-formrow" style={{ marginBottom: 14 }}>
                    <Field label="Company" required value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
                    <Field label="Your role" value={form.role} onChange={(v) => setForm({ ...form, role: v })} placeholder="e.g. Brand Manager" />
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <FieldLabel>Overall timing</FieldLabel>
                    <select className="mw-field" value={form.timing} onChange={(e) => setForm({ ...form, timing: e.target.value })}>
                      <option value="">Select…</option>
                      <option>As soon as possible</option>
                      <option>Within 1 to 3 months</option>
                      <option>Within 3 to 6 months</option>
                      <option>Within 6 to 12 months</option>
                      <option>Just exploring for now</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <FieldLabel>Anything else we should know?</FieldLabel>
                    <textarea
                      className="mw-field"
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Therapy area, target specialty, questions…"
                      style={{ resize: "vertical" }}
                    />
                  </div>
                  {formError ? (
                    <div
                      className="md-typescale-body-small"
                      style={{ marginBottom: 12, color: "var(--md-sys-color-error)" }}
                    >
                      {formError}
                    </div>
                  ) : null}
                  <Button variant="filled" size="large" type="submit" disabled={submitting} className="mw-block-btn">
                    {submitting ? "Sending…" : "Send my enquiry"}
                  </Button>
                  <p className="md-typescale-body-small" style={{ marginTop: 8, color: "var(--md-sys-color-on-surface-variant)" }}>
                    Your shortlist and any rollout dates are sent with this form.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer onOpenLegal={setLegal} />

      {/* floating shortlist CTA */}
      {count > 0 ? (
        <button
          onClick={() => document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" })}
          className="md-typescale-label-large"
          style={{
            position: "fixed",
            right: 22,
            bottom: 22,
            zIndex: 55,
            display: "inline-flex",
            alignItems: "center",
            gap: 9,
            fontWeight: 700,
            padding: "14px 20px",
            borderRadius: 999,
            border: 0,
            cursor: "pointer",
            background: "var(--md-sys-color-secondary)",
            color: "var(--md-sys-color-on-secondary)",
            boxShadow: "var(--md-sys-elevation-level-3)",
          }}
        >
          My shortlist
          <span
            style={{
              background: "color-mix(in srgb, var(--md-sys-color-on-secondary) 25%, transparent)",
              borderRadius: 999,
              minWidth: 22,
              height: 22,
              display: "grid",
              placeItems: "center",
              fontSize: 12.5,
            }}
          >
            {count}
          </span>
        </button>
      ) : null}

      {/* product modal */}
      {modalProduct ? (
        <ProductModal
          p={modalProduct}
          selected={isSel(modalProduct.key)}
          onToggle={() => toggleSelect(modalProduct.key)}
          onClose={() => setModalKey(null)}
        />
      ) : null}

      <LegalDialog doc={legal} onClose={() => setLegal(null)} />
      <CookieBanner onPolicy={() => setLegal("cookies")} />
    </>
  );
}

/* ---------- sub-components ---------- */
function AddBtn({ on, onClick, full }: { on: boolean; onClick: () => void; full?: boolean }) {
  return (
    <button
      onClick={onClick}
      className="md-typescale-label-large"
      style={{
        flex: full ? 1 : "none",
        fontWeight: 700,
        border: on ? "1px solid transparent" : "1px solid var(--md-sys-color-primary)",
        background: on ? "var(--md-sys-color-primary)" : "var(--md-sys-color-surface-container-lowest)",
        color: on ? "var(--md-sys-color-on-primary)" : "var(--md-sys-color-primary)",
        borderRadius: 999,
        padding: full ? "9px 12px" : "6px 13px",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      {on ? (full ? "Added to shortlist" : "Added") : full ? "Add to shortlist" : "Add"}
    </button>
  );
}

function ProductCard({
  p,
  selected,
  onAdd,
  onMore,
}: {
  p: IndustryProduct;
  selected: boolean;
  onAdd: () => void;
  onMore: () => void;
}) {
  return (
    <div
      style={{
        background: "var(--md-sys-color-surface-container-lowest)",
        border: selected ? "1px solid var(--md-sys-color-primary)" : "1px solid var(--md-sys-color-outline-variant)",
        borderRadius: "var(--md-sys-shape-corner-large)",
        overflow: "hidden",
        boxShadow: selected ? "var(--md-sys-elevation-level-2)" : "var(--md-sys-elevation-level-1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Media p={p} height={130} />
      <div style={{ padding: "18px 18px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
        <h4 className="md-typescale-title-large" style={{ margin: 0, color: "var(--md-sys-color-on-surface)" }}>{p.title}</h4>
        <div className="md-typescale-label-medium" style={{ fontWeight: 600, color: "var(--md-sys-color-primary)", marginTop: 3, textTransform: "none" }}>
          {p.aud}
        </div>
        <div className="md-typescale-body-medium" style={{ color: "var(--md-sys-color-on-surface-variant)", marginTop: 10, flex: 1 }}>
          {p.short}
        </div>
        <PriceLine p={p} />
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          <AddBtn on={selected} onClick={onAdd} full />
          <button
            onClick={onMore}
            className="md-typescale-label-large"
            style={{
              fontWeight: 600,
              border: "1px solid var(--md-sys-color-outline-variant)",
              background: "var(--md-sys-color-surface-container-lowest)",
              color: "var(--md-sys-color-on-surface-variant)",
              borderRadius: 999,
              padding: "9px 14px",
              cursor: "pointer",
            }}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductModal({
  p,
  selected,
  onToggle,
  onClose,
}: {
  p: IndustryProduct;
  selected: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <div className="mdc-scrim" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1001,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "40px 20px",
          overflowY: "auto",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "relative",
            background: "var(--md-sys-color-surface-container-lowest)",
            borderRadius: "var(--md-sys-shape-corner-extra-large)",
            maxWidth: 680,
            width: "100%",
            boxShadow: "var(--md-sys-elevation-level-3)",
            overflow: "hidden",
            pointerEvents: "auto",
          }}
        >
          <Media p={p} height={170} />
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "rgba(14,27,42,.5)",
              color: "#fff",
              border: 0,
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            ×
          </button>
          <div style={{ padding: "26px 30px 30px" }}>
            <div className="md-typescale-label-medium" style={{ fontWeight: 700, color: "var(--md-sys-color-primary)", textTransform: "uppercase", letterSpacing: ".04em" }}>
              {p.aud}
            </div>
            <h3 className="md-typescale-headline-small" style={{ margin: "6px 0 0", color: "var(--md-sys-color-on-surface)" }}>{p.title}</h3>
            <p className="md-typescale-body-large" style={{ marginTop: 12, color: "var(--md-sys-color-on-surface-variant)" }}>{p.short}</p>

            <div style={{ marginTop: 22 }}>
              <h5 className="md-typescale-label-medium" style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em", color: "var(--md-sys-color-on-surface-variant)", marginBottom: 10 }}>
                How it works
              </h5>
              <p className="md-typescale-body-medium" style={{ margin: 0, color: "var(--md-sys-color-on-surface)" }}>{p.how}</p>
            </div>

            <div style={{ marginTop: 22 }}>
              <h5 className="md-typescale-label-medium" style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em", color: "var(--md-sys-color-on-surface-variant)", marginBottom: 10 }}>
                What is in it for you
              </h5>
              {p.benefits.map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 9 }}>
                  <span style={{ flex: "none", color: "var(--md-sys-color-primary)", fontWeight: 800, marginTop: 1 }}>✓</span>
                  <span className="md-typescale-body-medium" style={{ color: "var(--md-sys-color-on-surface)" }}>{b}</span>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 22,
                background: "var(--md-sys-color-primary-container)",
                color: "var(--md-sys-color-on-primary-container)",
                borderRadius: "var(--md-sys-shape-corner-medium)",
                padding: "14px 16px",
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              {p.price}
              {p.priceNote ? <span style={{ fontWeight: 500 }}> · {p.priceNote}</span> : null}
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
              <Button variant="filled" onClick={onToggle}>
                {selected ? "Remove from shortlist" : "Add to shortlist"}
              </Button>
              <Button variant="outlined" href={p.link} target="_blank" rel="noopener noreferrer" icon="open_in_new">
                Visit site
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function OnePager({
  plan,
  isSel,
  addSelect,
  addAll,
  print,
}: {
  plan: Plan;
  isSel: (k: string) => boolean;
  addSelect: (k: string) => void;
  addAll: () => void;
  print: () => void;
}) {
  const sw = plan.swot || {};
  const box = (cls: string, title: string, arr?: string[], color?: string) => (
    <div
      style={{
        border: "1px solid var(--md-sys-color-outline-variant)",
        borderTop: `3px solid ${color}`,
        borderRadius: "var(--md-sys-shape-corner-medium)",
        padding: "13px 15px",
      }}
      key={cls}
    >
      <h5 className="md-typescale-label-medium" style={{ fontWeight: 700, textTransform: "uppercase", color: "var(--md-sys-color-on-surface-variant)", marginBottom: 7 }}>
        {title}
      </h5>
      <ul style={{ listStyle: "none", display: "grid", gap: 5, margin: 0, padding: 0 }}>
        {(arr && arr.length ? arr : ["Not specified"]).map((x, i) => (
          <li key={i} className="md-typescale-body-small" style={{ color: "var(--md-sys-color-on-surface)", paddingLeft: 14, position: "relative" }}>
            <span style={{ position: "absolute", left: 0, top: 7, width: 5, height: 5, borderRadius: "50%", background: "var(--md-sys-color-outline)" }} />
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
  const recs = (plan.recommendations || []).filter((r) => BY_KEY[r.key]);
  return (
    <div
      style={{
        marginTop: 18,
        background: "var(--md-sys-color-surface-container-lowest)",
        borderRadius: "var(--md-sys-shape-corner-large)",
        overflow: "hidden",
        boxShadow: "var(--md-sys-elevation-level-2)",
        border: "1px solid var(--md-sys-color-outline-variant)",
      }}
    >
      <div style={{ background: "var(--md-sys-color-inverse-surface)", color: "var(--md-sys-color-inverse-on-surface)", padding: "20px 26px" }}>
        <h3 className="md-typescale-title-large" style={{ margin: 0 }}>
          {plan.brand}
          {plan.country ? ` · ${plan.country}` : ""}
        </h3>
        {plan.category ? <div className="md-typescale-label-medium" style={{ color: "var(--md-sys-color-primary)", marginTop: 3 }}>{plan.category}</div> : null}
      </div>
      <div style={{ padding: "24px 26px" }}>
        {plan.overview ? (
          <div style={{ marginBottom: 22 }}>
            <h4 className="md-typescale-label-medium" style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--md-sys-color-primary)", marginBottom: 9 }}>Brand overview</h4>
            <p className="md-typescale-body-medium" style={{ margin: 0, color: "var(--md-sys-color-on-surface-variant)" }}>{plan.overview}</p>
          </div>
        ) : null}
        <div style={{ marginBottom: 22 }}>
          <h4 className="md-typescale-label-medium" style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--md-sys-color-primary)", marginBottom: 9 }}>SWOT</h4>
          <div className="mw-ind-swot">
            {box("s", "Strengths", sw.strengths, "#16A34A")}
            {box("w", "Weaknesses", sw.weaknesses, "#B8862F")}
            {box("o", "Opportunities", sw.opportunities, "var(--md-sys-color-primary)")}
            {box("t", "Threats", sw.threats, "#B23B19")}
          </div>
        </div>
        <div style={{ marginBottom: 8 }}>
          <h4 className="md-typescale-label-medium" style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--md-sys-color-primary)", marginBottom: 9 }}>How the Medware Group would help</h4>
          {recs.length ? (
            recs.map((r) => {
              const p = BY_KEY[r.key];
              return (
                <div
                  key={r.key}
                  style={{
                    display: "flex",
                    gap: 13,
                    alignItems: "flex-start",
                    border: "1px solid var(--md-sys-color-outline-variant)",
                    borderRadius: "var(--md-sys-shape-corner-medium)",
                    padding: "14px 15px",
                    marginBottom: 11,
                    background: "var(--md-sys-color-surface-container-low)",
                  }}
                >
                  <span style={{ flex: "none", width: 36, height: 36, borderRadius: 9, background: "var(--md-sys-color-primary-container)", color: "var(--md-sys-color-on-primary-container)", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 13 }}>
                    {initials(p.title)}
                  </span>
                  <div style={{ flex: 1 }}>
                    <b className="md-typescale-title-medium" style={{ color: "var(--md-sys-color-on-surface)" }}>{p.title}</b>
                    <p className="md-typescale-body-small" style={{ margin: "3px 0 0", color: "var(--md-sys-color-on-surface-variant)" }}>{r.why}</p>
                  </div>
                  <AddBtn on={isSel(r.key)} onClick={() => addSelect(r.key)} />
                </div>
              );
            })
          ) : (
            <p className="md-typescale-body-medium" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>No specific products matched. Talk to us about a bespoke build.</p>
          )}
        </div>
        {plan.summary ? (
          <div style={{ marginTop: 14 }}>
            <h4 className="md-typescale-label-medium" style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--md-sys-color-primary)", marginBottom: 9 }}>In short</h4>
            <p className="md-typescale-body-medium" style={{ margin: 0, color: "var(--md-sys-color-on-surface-variant)" }}>{plan.summary}</p>
          </div>
        ) : null}
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", padding: "0 26px 24px" }}>
        <Button variant="filled" onClick={addAll}>Add all to my shortlist</Button>
        <Button variant="outlined" icon="print" onClick={print}>Print or save as PDF</Button>
      </div>
    </div>
  );
}

/* ---------- AI planner loading state: rotating product facts ---------- */
function LoadingFacts({ brand, country }: { brand: string; country: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % PRODUCTS.length), 3800);
    return () => clearInterval(t);
  }, []);
  const p = PRODUCTS[i];
  return (
    <div style={{ marginTop: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--md-sys-color-on-surface-variant)" }}>
        <span className="material-symbols-rounded mw-spin" style={{ fontSize: 20, color: "var(--md-sys-color-primary)" }}>
          progress_activity
        </span>
        <span className="md-typescale-body-medium">
          Researching {brand || "your brand"} in {country || "Australia"} and building your one-pager — this can take up to a
          minute. While you wait…
        </span>
      </div>
      <div
        style={{
          marginTop: 16,
          border: "1px solid var(--md-sys-color-outline-variant)",
          borderRadius: "var(--md-sys-shape-corner-large)",
          background: "var(--md-sys-color-surface-container-low)",
          padding: 20,
        }}
      >
        <div
          className="md-typescale-label-medium"
          style={{ color: "var(--md-sys-color-primary)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}
        >
          From the Medware Group
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <span
            style={{
              width: 36,
              height: 36,
              borderRadius: 9,
              display: "grid",
              placeItems: "center",
              background: "var(--md-sys-color-primary-container)",
              color: "var(--md-sys-color-on-primary-container)",
              fontWeight: 800,
              fontSize: 13,
              flex: "none",
            }}
          >
            {initials(p.title)}
          </span>
          <div>
            <div className="md-typescale-title-medium" style={{ color: "var(--md-sys-color-on-surface)" }}>
              {p.title}
            </div>
            <div className="md-typescale-label-medium" style={{ color: "var(--md-sys-color-on-surface-variant)", textTransform: "none" }}>
              {p.aud}
            </div>
          </div>
        </div>
        <p className="md-typescale-body-medium" style={{ margin: "0 0 6px", color: "var(--md-sys-color-on-surface)", fontWeight: 500 }}>
          {p.impact}
        </p>
        <p className="md-typescale-body-medium mw-clamp2" style={{ margin: 0, color: "var(--md-sys-color-on-surface-variant)" }}>
          {p.short}
        </p>
        <div style={{ display: "flex", gap: 5, marginTop: 14, flexWrap: "wrap" }}>
          {PRODUCTS.map((_, n) => (
            <span
              key={n}
              style={{
                width: n === i ? 18 : 6,
                height: 6,
                borderRadius: 999,
                background: n === i ? "var(--md-sys-color-primary)" : "var(--md-sys-color-outline-variant)",
                transition: "width .2s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- form field helpers ---------- */
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="md-typescale-label-large" style={{ display: "block", fontWeight: 700, color: "var(--md-sys-color-on-surface)", marginBottom: 6 }}>
      {children}
    </label>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel>
        {label} {required ? <span style={{ color: "var(--md-sys-color-secondary)" }}>*</span> : null}
      </FieldLabel>
      <input
        className="mw-field"
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
