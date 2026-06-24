/* Medware Group — industry enquiry handler (Next.js API route).
 * Replaces the old Netlify Forms submission. Sends two emails via Resend:
 *   1. the enquiry (contact details + shortlist + dates) to the team
 *      (matt@medware.com.au, or ENQUIRY_TO), reply-to the enquirer;
 *   2. a confirmation + copy to the person who enquired, reply-to matt@.
 * Requires RESEND_API_KEY. Optional RESEND_FROM (a verified sender on your
 * Resend domain; defaults to noreply@medware.com.au) and ENQUIRY_TO. */

import { NextRequest } from "next/server";

export const runtime = "nodejs";

// Where the enquiry notification is sent (override with ENQUIRY_TO, comma-separated).
const TEAM_TO = (process.env.ENQUIRY_TO || "matt@medware.com.au")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const FROM = process.env.RESEND_FROM || "Medware Group <noreply@medware.com.au>";
const REPLY_TO = "matt@medware.com.au";

const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c] ?? c);

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const get = (k: string) => String(body?.[k] ?? "").trim().slice(0, 4000);

  // Honeypot — silently accept bots without sending.
  if (get("bot-field")) return Response.json({ ok: true });

  const name = get("name");
  const email = get("email");
  const company = get("company");
  if (!name || !email || !company) {
    return Response.json({ error: "Please provide your name, work email and company." }, { status: 400 });
  }

  const role = get("role");
  const timing = get("timing");
  const message = get("message");
  const department = get("department");
  const products = get("products_and_dates");
  const involved = get("involved_with");

  if (!apiKey) {
    return Response.json(
      { error: "Enquiry email is not configured yet (RESEND_API_KEY missing). Please email matt@medware.com.au." },
      { status: 503 },
    );
  }

  const row = (label: string, val: string) =>
    val
      ? `<tr><td style="padding:6px 14px;color:#6B7C90;font:600 13px Arial,sans-serif;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 14px;font:14px Arial,sans-serif;color:#0E1B2A">${esc(val).replace(/\n/g, "<br>")}</td></tr>`
      : "";

  const detailsTable = `<table style="border-collapse:collapse;width:100%;border:1px solid #E4EAF0;border-radius:8px">
      ${row("Name", name)}${row("Work email", email)}${row("Company", company)}${row("Role", role)}
      ${row("Department", department)}${row("Overall timing", timing)}
      ${row("Shortlist", products)}${row("Involved with", involved)}${row("Message", message)}
    </table>`;

  const detailsText = `Name: ${name}
Work email: ${email}
Company: ${company}
Role: ${role}
Department: ${department}
Overall timing: ${timing}

Shortlist:
${products}

Involved with: ${involved}

Message:
${message}`;

  // 1) Notification to the team.
  const notifyHtml = `<div style="max-width:640px;margin:0 auto;font-family:Arial,sans-serif">
    <h2 style="color:#0E1B2A;margin:0 0 16px">New industry enquiry</h2>
    ${detailsTable}
  </div>`;
  const notifyText = `New industry enquiry\n\n${detailsText}`;

  // 2) Confirmation + copy to the person who enquired.
  const confirmHtml = `<div style="max-width:640px;margin:0 auto;font-family:Arial,sans-serif;color:#0E1B2A">
    <h2 style="margin:0 0 12px">Thanks, ${esc(name)} — we have your enquiry</h2>
    <p style="font:15px Arial,sans-serif;color:#33465B;margin:0 0 18px">
      We will be in touch shortly with how each solution works, the benefit to you, and the cost.
      Here is a copy of what you sent:
    </p>
    ${detailsTable}
    <p style="font:13px Arial,sans-serif;color:#6B7C90;margin:18px 0 0">
      Medware Group · reply to this email or contact matt@medware.com.au.
    </p>
  </div>`;
  const confirmText = `Thanks, ${name} — we have your enquiry.

We will be in touch shortly with how each solution works, the benefit to you, and the cost.
Here is a copy of what you sent:

${detailsText}

Medware Group · reply to this email or contact matt@medware.com.au.`;

  const send = (to: string[], subject: string, html: string, text: string, replyTo: string) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to, reply_to: replyTo, subject, html, text }),
    });

  // The team notification is the critical send — fail the request if it errors.
  try {
    const r = await send(TEAM_TO, `Industry enquiry — ${company}`, notifyHtml, notifyText, email);
    if (!r.ok) {
      const d = (await r.json().catch(() => ({}))) as { message?: string };
      return Response.json({ error: d?.message || "Could not send your enquiry." }, { status: 502 });
    }
  } catch {
    return Response.json({ error: "Could not reach the email service." }, { status: 502 });
  }

  // Confirmation to the enquirer is best-effort — never lose the lead over it.
  try {
    await send([email], "We have received your enquiry — Medware Group", confirmHtml, confirmText, REPLY_TO);
  } catch {
    /* ignore — the team notification already captured the lead */
  }

  return Response.json({ ok: true });
}
