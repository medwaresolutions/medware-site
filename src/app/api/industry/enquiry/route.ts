/* Medware Group — industry enquiry handler (Next.js API route).
 * Replaces the old Netlify Forms submission. Emails the enquiry (contact
 * details + shortlist + rollout dates) to the team via Resend.
 * Requires RESEND_API_KEY. Optional RESEND_FROM (a verified sender on your
 * Resend domain; defaults to a noreply@medware.com.au address). */

import { NextRequest } from "next/server";

export const runtime = "nodejs";

const TO = ["matt@medware.com.au", "admin@medware.com.au"];
const FROM = process.env.RESEND_FROM || "Medware Industry <noreply@medware.com.au>";

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

  const html = `<div style="max-width:640px;margin:0 auto;font-family:Arial,sans-serif">
    <h2 style="color:#0E1B2A;margin:0 0 16px">New industry enquiry</h2>
    <table style="border-collapse:collapse;width:100%;border:1px solid #E4EAF0;border-radius:8px">
      ${row("Name", name)}${row("Work email", email)}${row("Company", company)}${row("Role", role)}
      ${row("Department", department)}${row("Overall timing", timing)}
      ${row("Shortlist", products)}${row("Involved with", involved)}${row("Message", message)}
    </table>
  </div>`;

  const text = `New industry enquiry

Name: ${name}
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

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to: TO, reply_to: email, subject: `Industry enquiry — ${company}`, html, text }),
    });
    if (!r.ok) {
      const d = (await r.json().catch(() => ({}))) as { message?: string };
      return Response.json({ error: d?.message || "Could not send your enquiry." }, { status: 502 });
    }
  } catch {
    return Response.json({ error: "Could not reach the email service." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
