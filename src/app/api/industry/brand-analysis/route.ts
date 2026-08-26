/* Medware Group — AI brand planner (Next.js API route).
 * Ported from the Netlify function. Calls Claude with live web search and
 * returns a structured brand one-pager: overview, SWOT, recommended products.
 * Requires ANTHROPIC_API_KEY in the environment. Optional ANTHROPIC_MODEL
 * (defaults to claude-sonnet-4-6). The catalogue keys MUST stay in sync with
 * the PRODUCTS array in src/data/industry.ts. */

import { NextRequest } from "next/server";

export const runtime = "nodejs";
// Web search + generation can take ~30-60s; allow headroom (needs a Vercel
// plan that permits long functions — Hobby caps at 60s).
export const maxDuration = 120;

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

// The only product keys the model may recommend. Keep in sync with the page.
const CATALOGUE: [string, string, string][] = [
  ["medflow-clinic", "Medflow Clinic + PBS API Gateway", "PBS authority software doctors use daily; sponsor for point-of-prescribing placement, doctor alerts and auto program enrolment."],
  ["medcast-sponsor", "Medcast Sponsor Portal", "Your own branded channel in the specialist app; publish articles to a specialty with full engagement tracking."],
  ["medprep", "MedPrep Patient", "QR-code colonoscopy prep for patients; product placement and effortless switching to your prep product (gastroenterology)."],
  ["medwayfinder", "MedWayfinder", "Digital wayfinding across a hospital campus, on the patient’s own phone; sponsor the campuses that matter to your therapy."],
  ["conference-app", "Medware Conference App", "White-label conference app a college or society reuses each year; sponsor and exhibitor listings plus delegate notifications."],
  ["medcast-hcp", "Medcast Specialist App", "Specialist app doctors use; sponsor a specialty so its doctors get it free beside your brand."],
  ["pbs-script", "PBS Script Generator", "Shows doctors exactly what to write, especially for biologics; eases correct prescribing of complex therapies."],
  ["cellmap", "CellMap", "Detailed cell and mechanism-of-action visuals for HCP training and client distribution; consulting available."],
  ["medwareai", "Medware AI", "Offline AI companion for surgeries; a brand presence in privacy-sensitive clinics that avoid cloud AI."],
  ["audience-participation", "Medware Audience Participation", "Live polling and audience sentiment in symposia and advisory boards; a read on the room during your sponsored session."],
  ["medflow-patient", "Medflow Patient", "Patient hub and app; place your content in clinic sends, or white-label as your own patient system."],
  ["medprep-clinic", "MedPrep Clinic", "Clinician dashboard tracking colonoscopy prep compliance in real time; adherence evidence for a sponsored prep product."],
  ["medflow-metrix", "Medflow Metrics", "Your own live view of PBS market data; track market entry, your activity and your marketing."],
  ["doctor-db", "Medware CRM", "Verified AU and US physician database with campaign email and pipeline in one system; segment, send and track on the same records."],
  ["survey-research", "Medware Survey & Research", "Survey and research platform built for healthcare audiences; branching instruments, verified respondents, segmented results."],
  ["practice-referral", "Practice Referral", "Maps a US specialist’s referral network from CMS Medicare data and generates dollar-valued outreach campaigns to GPs."],
  ["relay", "Relay", "Lets field reps record calls right after meetings so nothing is lost."],
  ["earpiece", "Earpiece", "Personal recall tool for high-stakes meetings."],
  ["constellation", "Constellation", "Embed to run a lean, highly efficient operation; fits any IT setup."],
  ["adsafe", "AdSafe", "Free ad-compliance checks you can give customers; sponsor a specialty and hand out codes in clinics."],
  ["medcast-industry", "Medcast Industry App", "Free industry app to keep your team across the market."],
  ["ai-training", "AI Training", "Enterprise AI training built on your team’s real workflows, with pre/post KPIs that prove the productivity gain in dollars."],
  ["bespoke", "Bespoke builds and AI", "We build any healthcare technology fast and affordably; AI advisory and embedding."],
];

const VALID_KEYS = new Set(CATALOGUE.map((c) => c[0]));

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Server not configured: ANTHROPIC_API_KEY is missing." }, { status: 500 });
  }

  let brand = "";
  let country = "";
  try {
    const b = await req.json();
    brand = String(b.brand || "").trim().slice(0, 120);
    country = String(b.country || "").trim().slice(0, 80);
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (!brand || !country) {
    return Response.json({ error: "Please provide both a brand and a country." }, { status: 400 });
  }

  const catalogueText = CATALOGUE.map((c) => `- ${c[0]} | ${c[1]}: ${c[2]}`).join("\n");

  const system = `You are a pharmaceutical brand strategy analyst working for the Medware Group, which sells software and services to pharmaceutical companies.
Run no more than three focused web searches to research the brand "${brand}" in "${country}": its therapeutic area, indication, mechanism, competitors, market access and PBS status where relevant, and recent commercial activity. Then write the brief from what you have found — do not keep searching for completeness. Australian context and PBS apply when the country is Australia.

Then produce a concise one-page brief for a Medware sales conversation. Be specific and commercially useful. Use Australian spelling. Do not use em-dashes or emojis.

Only recommend products from this Medware catalogue, using the exact key on the left:
${catalogueText}

Pick the 3 to 6 products that genuinely fit this brand's strategy and tactics. For each, explain in one or two sentences how it would be implemented in THIS brand's plan and what strategic or tactical objective it delivers.

Return ONLY a JSON object, no preamble, no markdown fences, in exactly this shape:
{
  "brand": string,
  "country": string,
  "category": string,
  "overview": string,
  "swot": {
    "strengths": [string, ...],
    "weaknesses": [string, ...],
    "opportunities": [string, ...],
    "threats": [string, ...]
  },
  "recommendations": [
    { "key": string, "why": string }
  ],
  "summary": string
}`;

  type Block = { type: string; text?: string };
  type ApiBody = { content?: Block[]; stop_reason?: string; error?: { message?: string } };
  type Msg = { role: string; content: unknown };

  const messages: Msg[] = [
    { role: "user", content: `Brand: ${brand}\nCountry: ${country}\n\nResearch this and return the JSON brief.` },
  ];

  const callAnthropic = async (msgs: Msg[]): Promise<{ ok: boolean; body: ApiBody }> => {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 3000,
        system,
        // Basic web search (no code-exec dynamic-filtering overhead); cap uses
        // low so the server-tool loop finishes in one pass without a pause_turn.
        tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 3 }],
        messages: msgs,
      }),
    });
    return { ok: r.ok, body: (await r.json()) as ApiBody };
  };

  let final: ApiBody = {};
  try {
    // The web-search server tool runs its own loop; if it exceeds ~10 iterations
    // the response comes back with stop_reason:"pause_turn" and no final JSON.
    // Re-send the conversation (no extra user turn) until the model finishes.
    for (let i = 0; i < 5; i++) {
      const { ok, body } = await callAnthropic(messages);
      if (!ok) return Response.json({ error: body?.error?.message || "AI request failed." }, { status: 502 });
      final = body;
      if (body.stop_reason === "pause_turn" && body.content) {
        messages.push({ role: "assistant", content: body.content });
        continue;
      }
      break;
    }
  } catch (e) {
    return Response.json({ error: "Could not reach the AI service.", detail: String(e) }, { status: 502 });
  }

  let text = (final.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text || "")
    .join("\n")
    .trim();
  // Strip any markdown code fences the model may have added.
  text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();

  const tryParse = (s: string): { recommendations?: { key: string; why: string }[] } | null => {
    try {
      return JSON.parse(s);
    } catch {
      return null;
    }
  };

  let parsed = tryParse(text);
  if (!parsed) {
    const a = text.indexOf("{");
    const b = text.lastIndexOf("}");
    if (a >= 0 && b > a) parsed = tryParse(text.slice(a, b + 1));
  }
  if (!parsed) {
    return Response.json({ error: "The AI returned an unexpected format. Please try again." }, { status: 502 });
  }

  if (Array.isArray(parsed.recommendations)) {
    parsed.recommendations = parsed.recommendations.filter((x) => x && VALID_KEYS.has(x.key));
  }

  return Response.json(parsed);
}
