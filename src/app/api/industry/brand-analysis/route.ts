/* Medware Group — AI brand planner (Next.js API route).
 * Ported from the Netlify function. Calls Claude with live web search and
 * returns a structured brand one-pager: overview, SWOT, recommended products.
 * Requires ANTHROPIC_API_KEY in the environment. Optional ANTHROPIC_MODEL
 * (defaults to claude-sonnet-4-6). The catalogue keys MUST stay in sync with
 * the PRODUCTS array in src/data/industry.ts. */

import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

// The only product keys the model may recommend. Keep in sync with the page.
const CATALOGUE: [string, string, string][] = [
  ["medflow-clinic", "Medflow Clinic", "PBS authority software doctors use daily; sponsor for point-of-prescribing placement, doctor alerts and auto program enrolment."],
  ["medcast-sponsor", "Medcast Sponsored Channel", "Your own branded channel in the specialist app; publish articles to a specialty with full engagement tracking."],
  ["medprep", "MedPrep", "QR-code colonoscopy prep for patients; product placement and effortless switching to your prep product (gastroenterology)."],
  ["medcast-hcp", "Medcast HCP App", "Specialist app doctors use; sponsor a specialty so its doctors get it free beside your brand."],
  ["pbs-script", "PBS Script Generator", "Shows doctors exactly what to write, especially for biologics; eases correct prescribing of complex therapies."],
  ["cellmap", "CellMap", "Detailed cell and mechanism-of-action visuals for HCP training and client distribution; consulting available."],
  ["medwareai", "MedwareAI", "Offline AI companion for surgeries; a brand presence in privacy-sensitive clinics that avoid cloud AI."],
  ["medflow-patient", "Medflow Patient", "Patient hub and app; place your content in clinic sends, or white-label as your own patient system."],
  ["medflow-metrix", "Medflow Metrix", "Your own live view of PBS market data; track market entry, your activity and your marketing."],
  ["doctor-db", "Doctor Database (AU and US)", "Current doctor database for sharper sales and marketing targeting across Australia and the US."],
  ["relay", "Relay", "Lets field reps record calls right after meetings so nothing is lost."],
  ["earpiece", "Earpiece", "Personal recall tool for high-stakes meetings."],
  ["constellation", "Constellation", "Embed to run a lean, highly efficient operation; fits any IT setup."],
  ["adsafe", "AdSafe", "Free ad-compliance checks you can give customers; sponsor a specialty and hand out codes in clinics."],
  ["medcast-industry", "Medcast Industry App", "Free industry app to keep your team across the market."],
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
Use web search to research the brand "${brand}" in "${country}": its therapeutic area, indication, mechanism, competitors, market access and PBS status where relevant, and recent commercial activity. Australian context and PBS apply when the country is Australia.

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

  const payload = {
    model: MODEL,
    max_tokens: 2200,
    system,
    tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 6 }],
    messages: [{ role: "user", content: `Brand: ${brand}\nCountry: ${country}\n\nResearch this and return the JSON brief.` }],
  };

  let data: { content?: { type: string; text?: string }[]; error?: { message?: string } };
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(payload),
    });
    data = await r.json();
    if (!r.ok) {
      return Response.json({ error: data?.error?.message || "AI request failed." }, { status: 502 });
    }
  } catch (e) {
    return Response.json({ error: "Could not reach the AI service.", detail: String(e) }, { status: 502 });
  }

  const text = (data.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();

  let parsed: { recommendations?: { key: string; why: string }[] } | null = null;
  try {
    parsed = JSON.parse(text);
  } catch {
    const m = text.match(/\{[\s\S]*\}/);
    if (m) {
      try {
        parsed = JSON.parse(m[0]);
      } catch {
        parsed = null;
      }
    }
  }
  if (!parsed) {
    return Response.json({ error: "The AI returned an unexpected format. Please try again." }, { status: 502 });
  }

  if (Array.isArray(parsed.recommendations)) {
    parsed.recommendations = parsed.recommendations.filter((x) => x && VALID_KEYS.has(x.key));
  }

  return Response.json(parsed);
}
