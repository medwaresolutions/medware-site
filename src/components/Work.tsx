"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "./SectionWrapper";

type StatusType = "live" | "soon" | "internal" | "tba";

interface Product {
  title: string;
  shortLabel: string;
  audience: string;
  purpose: string;
  problem: string;
  howItWorks: string;
  revenue: string;
  market: string;
  customers: string;
  link: string;
  status: string;
  statusType: StatusType;
}

interface Company {
  id: string;
  name: string;
  entity: string;
  description: string;
  stats: { num: string; lbl: string }[];
  link: string;
  accent: string;
  products: Product[];
}

const STATUS_STYLES: Record<StatusType, { bg: string; dot: string; text: string }> = {
  live: { bg: "bg-emerald-500/15", dot: "bg-emerald-400", text: "text-emerald-300" },
  soon: { bg: "bg-amber-500/15", dot: "bg-amber-400", text: "text-amber-300" },
  internal: { bg: "bg-sky-500/15", dot: "bg-sky-400", text: "text-sky-300" },
  tba: { bg: "bg-slate-500/15", dot: "bg-slate-400", text: "text-slate-300" },
};

const companies: Company[] = [
  {
    id: "medcast",
    name: "Medcast Media",
    entity: "Medcast Media Pty Ltd",
    description:
      "AI-curated medical audio platform for healthcare professionals and pharmaceutical sponsors.",
    stats: [
      { num: "17", lbl: "Specialties" },
      { num: "3", lbl: "Products" },
    ],
    link: "https://medcast.media",
    accent: "#06B6D4",
    products: [
      {
        title: "Medcast Media Specialist App",
        shortLabel: "Medcast Specialist",
        audience: "Healthcare professionals",
        purpose:
          "AI-curated medical audio platform that turns the 135 specialist articles published daily into personalised audio briefings for time-poor specialists.",
        problem:
          "Specialist journals publish around 135 articles per day per specialty. Keeping current is no longer optional, and reading at that pace is no longer possible.",
        howItWorks:
          "AI scans thousands of journals daily and matches articles to each specialist's registered specialty and interests. Selected articles are summarised and narrated using ElevenLabs voices, then surfaced in a personalised audio feed delivered via PWA or native iOS app.",
        revenue:
          "$5 USD/month per HCP, or free where a country+specialty sponsor is in place under the Sponsor Portal model.",
        market:
          "Specialist physicians globally — initial focus on Australia, UK, US and Asian markets.",
        customers:
          "Live in Australia. Active HCP user base across multiple specialties via web and iOS App Store.",
        link: "https://medcast.media",
        status: "Live",
        statusType: "live",
      },
      {
        title: "Medcast Media Sponsor Portal",
        shortLabel: "Medcast Sponsor",
        audience: "Pharmaceutical employees",
        purpose:
          "Self-serve portal where pharmaceutical sponsors commission, manage and measure audio campaigns — one sponsor per specialty per country.",
        problem:
          "Pharmaceutical companies struggle to reach engaged, verified HCPs in their exact specialty after the field-force visit ends. Generic medical media inventory is expensive and undifferentiated.",
        howItWorks:
          "Sponsors commission a country+specialty package, upload branded articles through a self-serve portal, and watch real-time engagement metrics by specialty. The Medcast model takes one sponsor per specialty per country, creating exclusive category ownership.",
        revenue:
          "Single specialty, single country: $xx/year. Multi-specialty or large market: $xx/year. Right of first refusal in year two.",
        market:
          "Global pharmaceutical marketing budgets — Australia and New Zealand currently activated; UK, US and Asian markets to follow.",
        customers:
          "Inservio, Apellis, AstraZeneca. Active outreach: Takeda, Gilead, CSL, Novo Nordisk, Pfizer.",
        link: "https://sponsor.medcast.media",
        status: "Live",
        statusType: "live",
      },
      {
        title: "Medcast Media Industry App",
        shortLabel: "Medcast Industry",
        audience: "Pharmaceutical employees",
        purpose:
          "Audio briefings for pharma teams summarising TGA, PBAC, Department of Health and nine other Australian regulatory sources, refreshed daily.",
        problem:
          "Pharmaceutical teams need to track regulatory and policy changes across nine government and industry sources daily. Reading them all is a full-time job; existing paid services charge $700+ per person per year.",
        howItWorks:
          "Scrapes nine Australian regulatory sources — TGA, PBAC, Department of Health, Medicines Australia, AusBiotech, GBMA, MTAA, PRWire and PBS — then summarises and narrates updates as audio episodes refreshed daily. PBAC decisions are delivered as audio episodes, a category first.",
        revenue:
          "Free in Australia at launch to drive adoption and pull-through to the HCP product. Future revenue: in-feed advertising and per-seat subscription.",
        market:
          "Australian pharmaceutical employees — roughly 25,000+ across affiliates and contract organisations.",
        customers:
          "Live in Australia. Used internally by Medcast sponsors to brief their teams.",
        link: "https://industry.medcast.media",
        status: "Live",
        statusType: "live",
      },
    ],
  },
  {
    id: "medflow",
    name: "Medflow",
    entity: "Medflow Pty Ltd",
    description:
      "PBS authority automation infrastructure for Australian specialist clinics, hospitals and EMR vendors.",
    stats: [
      { num: "6", lbl: "Products" },
      { num: "3", lbl: "Groups" },
    ],
    link: "https://medflow.com.au",
    accent: "#3B82F6",
    products: [
      {
        title: "Medflow Clinic Online",
        shortLabel: "Medflow Clinic",
        audience: "Healthcare professionals",
        purpose:
          "Cloud-based PBS authority automation that completes complex government forms in seconds for specialist physicians.",
        problem:
          "PBS authority forms take a specialist 15–20 minutes each. A busy gastroenterologist or rheumatologist files dozens per week. The work is repetitive, error-prone and uncompensated.",
        howItWorks:
          "1) Select patient — data auto-populates from the practice management system. 2) Review the auto-filled form — only clinical decision fields need attention. 3) Submit and track from a dashboard. Built-in CDAI / Mayo / PCDAI calculators, PBS compliance checking and audit trail.",
        revenue:
          "$xx/clinic/month plus PBS API per-call · pharmaceutical sponsor $xxK/year · $xx per patient per month on the signed xxx contract (Australia).",
        market:
          "~1,500 gastroenterologists and ~500 rheumatologists in Australia. $xx per specialist per year. Expansion: dermatology, immunology, neurology.",
        customers:
          "Live across 200+ Australian specialist clinics. ~800–1,000 Humira patients move through the workflow today; ~30,000 Humira-equivalent patients addressable in the AU market through the signed Pfizer Abrilada contract — first contracted recurring pharmaceutical revenue running on the embedded PBS authority workflow.",
        link: "https://medflow.com.au",
        status: "Live",
        statusType: "live",
      },
      {
        title: "Medflow Clinic Offline for hospitals",
        shortLabel: "Medflow Offline",
        audience: "Healthcare professionals",
        purpose:
          "On-premise PBS authority automation for hospitals and networks where patient data must remain inside the institutional firewall.",
        problem:
          "Hospital networks cannot run the cloud version of Medflow because patient data must stay inside the institutional firewall. PSAF, NSW eHealth and equivalent compliance frameworks block external transmission.",
        howItWorks:
          "A self-contained on-premise deployment of Medflow Clinic that runs entirely inside the hospital network. Same automation, same forms, same calculators — fully air-gapped, with no outbound patient data transmission.",
        revenue: "Enterprise per-site licensing — POA. Annual support contracts.",
        market:
          "Australian public and private hospital networks running specialist outpatient clinics — Westmead, Royal Prince Alfred, Royal Melbourne, Royal Brisbane class.",
        customers:
          "Launching May 2026. Westmead engagement underway; PSAF assessment scoped.",
        link: "https://medflow.com.au",
        status: "May 2026",
        statusType: "soon",
      },
      {
        title: "Medflow PBS API Gateway",
        shortLabel: "Medflow API",
        audience: "Healthcare professionals",
        purpose:
          "Stateless middleware that connects Electronic Medical Records to Services Australia's PBS authority API for real-time pharmaceutical approvals.",
        problem:
          "Smaller EMR vendors (Zedmed, Xestro, Shexie and similar) can't justify the cost of building their own PBS authority gateway. As a result, their specialist users still file authority forms by hand.",
        howItWorks:
          "A stateless middleware layer that sits between any EMR and Services Australia's PBS authority API. EMR vendors integrate once; their users file authority requests in real time. No patient data is retained at the gateway.",
        revenue: "Per-transaction pricing or volume licensing for EMR vendors — POA.",
        market:
          "Approximately 10–20 EMR vendors active in the Australian specialist clinic market, plus large hospital systems.",
        customers:
          "Launching May 2026. Built against Services Australia OPA spec (TECH.SIS.PBSA.02). Targeting Zedmed, Xestro, Shexie.",
        link: "https://medflow.com.au",
        status: "May 2026",
        statusType: "soon",
      },
      {
        title: "Medflow Hub Patient Content Hub",
        shortLabel: "Medflow Hub",
        audience: "Healthcare professionals",
        purpose:
          "Token-based portal letting clinicians push approved educational content to patients with no login required on the patient side.",
        problem:
          "Patients lose printed handouts. Clinicians have no way to know if educational material was viewed. Reputable health content is fragmented across YouTube, PDFs and clinic intranets.",
        howItWorks:
          "Clinicians curate trusted health content into patient-ready packages. Patients receive a token-based SMS or email link to a personalised page — no login required. Engagement is tracked (opens, watches, reads) and timed campaign sequences can be scheduled.",
        revenue:
          "$xx per clinic per month plus $x per patient delivered. Globally applicable — no PBS or Australian regulatory dependency.",
        market:
          "Any specialist or primary care clinic globally. Initial Australian rollout via existing Medflow customer base.",
        customers:
          "Launching May 2026. Production-ready, integrated with Medflow Clinic for clinician workflow.",
        link: "https://hub.medflow.com.au",
        status: "May 2026",
        statusType: "soon",
      },
      {
        title: "Medflow Patient App",
        shortLabel: "Medflow Patient",
        audience: "Patients",
        purpose:
          "Patient companion app for managing specialist appointments, treatment plans and clinic communications.",
        problem:
          "Patients moving between specialist appointments lose track of treatment plans, medications and clinic communications. Each clinic builds its own app or settles for nothing.",
        howItWorks:
          "A preconfigured, white-label patient companion app. Clinics deploy it under their own branding to give patients appointment management, treatment-plan tracking and two-way messaging without commissioning custom development.",
        revenue: "$399 one-off purchase per clinic. Globally applicable — no geographic restrictions.",
        market: "Any clinic worldwide running a specialist or primary care practice.",
        customers:
          "Live and deployable. Australian gastroenterology and rheumatology practices are first targets.",
        link: "https://medflow.com.au",
        status: "Live",
        statusType: "live",
      },
      {
        title: "Medflow Metrics & Analytics Portal",
        shortLabel: "Medflow Metrics",
        audience: "Pharmaceutical employees",
        purpose:
          "Real-world prescribing and authority analytics derived from anonymised Medflow workflow data, sold to pharmaceutical companies.",
        problem:
          "Pharmaceutical companies pay analysts thousands of dollars to manually pull and interpret PBS prescribing data. Existing market research tools are expensive and lag the market.",
        howItWorks:
          "Anonymised data from the Medflow Clinic workflow is aggregated into a per-seat analytics portal. Pharmaceutical sponsors see specialty-specific prescribing patterns, regional and territory-level data, competitor patterns and campaign effectiveness in near real time.",
        revenue: "$xx per seat per month. Pharmaceutical company subscription.",
        market:
          "Australian pharmaceutical analytics and market access budgets — ~25 large pharma affiliates plus contract research organisations.",
        customers:
          "Live. Active sponsor pipeline includes Apellis (ophthalmology), AstraZeneca (respiratory), Takeda, Gilead, CSL, Novo Nordisk and Pfizer.",
        link: "https://metrics.medflow.com.au",
        status: "Live",
        statusType: "live",
      },
    ],
  },
  {
    id: "medware-sol",
    name: "Medware Solutions",
    entity: "Medware Solutions Pty Ltd",
    description:
      "AI infrastructure, training and emerging products spanning healthcare and the broader AI economy.",
    stats: [
      { num: "8", lbl: "Products" },
      { num: "3", lbl: "Markets" },
    ],
    link: "https://medware.com.au",
    accent: "#F97316",
    products: [
      {
        title: "Relay",
        shortLabel: "Relay",
        audience: "Field force",
        purpose:
          "Voice-to-CRM iOS app for pharmaceutical reps — talk after a call and AI converts unstructured speech into a complete Salesforce or Veeva record.",
        problem:
          "Pharmaceutical reps lose 30%+ of call detail by the time they sit down to enter it into Salesforce or Veeva. Voice memos help, but transcription alone doesn't produce a CRM-ready record.",
        howItWorks:
          "A rep speaks naturally on the drive between calls. The iOS app captures audio, AI structures the unstructured speech into Salesforce or Veeva CRM fields, and the rep gets an editable preview before commit. Raw audio is retained for compliance audit.",
        revenue: "Per-seat pharmaceutical subscription — POA.",
        market:
          "Global pharmaceutical sales force — approximately 100,000 reps across major markets. Adjacent: medical devices, specialty biotech, animal health.",
        customers:
          "Launching May 2026. Built on the founder's 17 years of pharmaceutical sales experience.",
        link: "https://medware-antidote-relay.netlify.app",
        status: "May 2026",
        statusType: "soon",
      },
      {
        title: "CellMap",
        shortLabel: "CellMap",
        audience: "HCP and Industry",
        purpose:
          "Interactive 3D cell atlas built from real Protein Data Bank structures, used for medical education and pharmaceutical mechanism-of-action storytelling.",
        problem:
          "Pharmaceutical mechanism-of-action storytelling relies on stylised illustrations or static diagrams. Medical educators teaching cellular biology have nothing interactive to point at.",
        howItWorks:
          "A web-based 3D atlas built in Three.js, populated with real Protein Data Bank atomic structures. Users zoom from organelle level to atomic structure across five Level-of-Detail tiers. Hover any protein for function and copy-number information.",
        revenue:
          "Licensing model under development — direct pharma licensing for MoA assets, plus subscription for medical education.",
        market:
          "Pharmaceutical medical affairs and brand teams, plus medical schools and CME providers globally.",
        customers:
          "Live (April 2026). 1,230 proteins placed across 18 types in the human colonocyte; expandable to other cell types.",
        link: "https://cellmap-tau.vercel.app",
        status: "Live",
        statusType: "live",
      },
      {
        title: "Practice Referral",
        shortLabel: "Practice Referral",
        audience: "Healthcare professionals",
        purpose:
          "US market product that maps a specialist's referral network using CMS Medicare data and generates targeted outreach campaigns to GPs.",
        problem:
          "US specialist physicians don't know who is referring to them, who is referring to their competitors, or which GPs are worth winning. Hidden dependency, invisible leakage and quiet growth opportunities sit in plain sight.",
        howItWorks:
          "Built on CMS Medicare shared-patient data, NPPES physician records and network graph analysis. Maps the specialist's referral network, ranks them in their market by influence score, surfaces competitor referral patterns, and generates dollar-valued outreach campaigns to target GPs.",
        revenue:
          "$299 one-time + $99/year data refresh. Promoted via Google Ads and email campaigns to US specialist clinics.",
        market:
          "Approximately 100,000 US specialist physicians across procedural specialties (gastroenterology, cardiology, orthopaedics, ENT etc.).",
        customers:
          "Launching May 2026. Domain live at practicereferral.net; data pipeline operational.",
        link: "https://practicereferral.net",
        status: "May 2026",
        statusType: "soon",
      },
      {
        title: "AI Training",
        shortLabel: "AI Training",
        audience: "General",
        purpose:
          "Enterprise AI training program teaching sales and operations teams how to use AI tools for measurable productivity gains.",
        problem:
          "Most corporate AI training is generic prompt engineering disconnected from real workflow problems. Companies pay for training, can't prove ROI, and AI adoption stalls.",
        howItWorks:
          "A pre-assessment questionnaire identifies actual time-sinks and tedious tasks per role. Training is then tailored to those specific workflows. Pre/post KPIs measure time-on-task improvement to prove ROI in dollars.",
        revenue: "Project-based engagement. Pricing scales with team size and scope.",
        market:
          "Australian SMB and enterprise sales and operations teams adopting AI tooling. Adjacent: international markets via remote delivery.",
        customers: "Live. Currently delivering to Eutility's national sales team (8 people).",
        link: "https://medware.com.au",
        status: "Live",
        statusType: "live",
      },
      {
        title: "Earpiece",
        shortLabel: "Earpiece",
        audience: "General",
        purpose:
          "Discreet iOS app that listens to a meeting and whispers AI-generated responses through AirPods in real time — invisible to the other party.",
        problem:
          "High-stakes meetings — pharma sales, executive coaching, technical interviews — demand instant recall of facts, talking points and counter-arguments. Glancing at a phone or iPad signals disengagement.",
        howItWorks:
          "iPhone microphone captures the other party's voice. On-device speech-to-text transcribes; Claude generates a brief response based on a pre-loaded meeting context; ElevenLabs whispers the response through AirPods only. Press-and-hold capture, with a Listen / Command mode toggle.",
        revenue:
          "TBD at launch. Per-seat pharmaceutical subscription is the most likely model.",
        market:
          "Pharmaceutical reps, executive coaches and any high-stakes meeting where immediate recall matters.",
        customers:
          "Launching May 2026. iOS app fully scaffolded; pharma-specific meeting presets included.",
        link: "https://earpiece-landing.vercel.app",
        status: "May 2026",
        statusType: "soon",
      },
      {
        title: "Constellation",
        shortLabel: "Constellation",
        audience: "AI startup companies",
        purpose:
          "Persistent project memory and interactive knowledge graph that lets a small team manage dozens of products and repositories alongside AI coding agents.",
        problem:
          "AI coding agents lose context between sessions. Solo founders building many products with AI hit a wall the moment they need to switch projects: agents forget conventions, architecture and prior decisions.",
        howItWorks:
          "A persistent project-memory layer plus an interactive knowledge graph. Project state, files, decisions and architectural conventions are loaded into any context window in seconds. Works alongside Claude Code, Cursor and Copilot.",
        revenue:
          "Internal use only at present. Productisation under consideration as a SaaS product for AI-native solo founders and small teams.",
        market:
          "AI-native solo founders, indie hackers and small product teams — a fast-growing category alongside the rise of AI coding agents.",
        customers:
          "Internal — currently powering Medware's 39 products across 90+ repositories. Source of the productivity that makes the rest of this portfolio possible.",
        link: "https://medware.com.au",
        status: "Live · Internal",
        statusType: "internal",
      },
      {
        title: "MedwareAI",
        shortLabel: "MedwareAI",
        audience: "Healthcare professionals",
        purpose:
          "Fully offline AI assistant for specialist clinics — runs locally on clinic hardware so patient data never leaves the building.",
        problem:
          "Doctors won't paste patient notes into ChatGPT or any cloud LLM — and they're right not to. Every clinic with a privacy-aware partner faces the same wall: powerful AI, but legally and ethically off-limits for actual patient work.",
        howItWorks:
          "A self-contained desktop application running Ollama and Qwen3:8b entirely on the clinic's own hardware. No outbound calls, no telemetry. Includes a local PBS medication database for fast lookup, plus tools for differential diagnosis support, GP letter drafting and PBS authority form drafting.",
        revenue:
          "Per-clinic licensing — TBA. Likely sold as an annual licence with optional support tier.",
        market:
          "Australian specialist clinics with privacy concerns about cloud LLM use, plus international clinics in regulated jurisdictions.",
        customers:
          "TBA. Currently in late-stage development; positioned for Australian specialist clinic market.",
        link: "https://medware.com.au",
        status: "TBA",
        statusType: "tba",
      },
      {
        title: "Australia & US Doctor Database",
        shortLabel: "Doctor Database",
        audience: "Pharmaceutical employees",
        purpose:
          "Verified contact and practice database of Australian and US physicians built for pharmaceutical sales and marketing teams.",
        problem:
          "Pharmaceutical sales and marketing teams need verified, current contact and practice data on physicians. Existing commercial databases are expensive, often stale and country-locked.",
        howItWorks:
          "A verified contact and practice database harvested from public university sources, NPPES, registration boards and equivalent registries. Refreshed periodically. Sold as targeted lists or full database access depending on the buyer.",
        revenue: "Per-list or full-database licensing.",
        market:
          "Pharmaceutical sales and marketing teams across Australia and the US.",
        customers:
          "Live. 20,741+ Australian medical academic records harvested as foundation dataset; US physician records via NPPES.",
        link: "https://medware.com.au",
        status: "Live",
        statusType: "live",
      },
    ],
  },
  {
    id: "medprep",
    name: "Medprep",
    entity: "Bowelprep Pty Ltd",
    description:
      "Patient-facing colonoscopy preparation and clinic monitoring, live with an active gastroenterology partner.",
    stats: [
      { num: "2", lbl: "Products" },
      { num: "Live", lbl: "In-clinic" },
    ],
    link: "https://medprep.app",
    accent: "#10B981",
    products: [
      {
        title: "MedPrep Patient",
        shortLabel: "MedPrep Patient",
        audience: "Patients",
        purpose:
          "Patient app guiding users through bowel preparation with timed reminders, step-by-step instructions and clinic messaging.",
        problem:
          "Poor bowel preparation leads to failed colonoscopies. That means repeat bookings, wasted theatre time, and patient frustration. Patients lose printed instructions; nurse phone calls fielding prep questions consume hours.",
        howItWorks:
          "Patients scan a QR code that takes them to clinic-branded video instructions, a smart step sequence with medication-specific timing, AI-powered Q&A trained on the clinic's own PDF guidelines, diet management with visual aids, and timed SMS reminders.",
        revenue:
          "$2 per patient delivered. Future: pharmaceutical sponsorship layer for prep-product manufacturers.",
        market:
          "~1 million colonoscopies per year in Australia. ~20 million per year in the United States.",
        customers:
          "Live with Dr John Ding, leading gastroenterologist at St Vincent's Hospital Melbourne (Bowelprep Pty Ltd co-founder).",
        link: "https://reminder.medflow.com.au",
        status: "Live",
        statusType: "live",
      },
      {
        title: "MedPrep Clinic",
        shortLabel: "MedPrep Clinic",
        audience: "Healthcare professionals",
        purpose:
          "Clinician dashboard for gastroenterologists to monitor patient bowel-preparation compliance ahead of colonoscopy.",
        problem:
          "Gastroenterologists don't know whether a patient is actually following bowel prep until the patient is in theatre. Inadequate prep at that point = lost theatre slot, uncompensated time, and a frustrated patient who has to do it all again.",
        howItWorks:
          "A clinician dashboard tracks each patient's prep compliance in real time ahead of the colonoscopy. No change to existing clinic protocol — the system wraps the clinic's own guidelines and integrates with existing booking systems.",
        revenue: "$20 per clinic per month. Pairs with the patient app at $2 per delivery.",
        market:
          "~1 million colonoscopies per year in Australia. ~20 million per year in the United States.",
        customers: "Live with Dr John Ding's gastroenterology clinic at St Vincent's Hospital Melbourne.",
        link: "https://medprep.app",
        status: "Live",
        statusType: "live",
      },
    ],
  },
];

function StatusPill({ statusType, label }: { statusType: StatusType; label: string }) {
  const s = STATUS_STYLES[statusType];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${s.bg} ${s.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {label}
    </span>
  );
}

function ProductCard({
  product,
  accent,
  onOpen,
}: {
  product: Product;
  accent: string;
  onOpen: () => void;
}) {
  return (
    <motion.button
      onClick={onOpen}
      whileHover={{ y: -2 }}
      className="text-left bg-[#0f1525] border border-[#1F2937] rounded-xl p-5 hover:border-[#374151] transition-colors duration-200 group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ background: `${accent}20`, color: accent }}
        >
          {product.shortLabel
            .split(" ")
            .map((w) => w[0])
            .slice(0, 2)
            .join("")}
        </div>
        <StatusPill statusType={product.statusType} label={product.status} />
      </div>
      <h4 className="font-semibold text-[#F9FAFB] mb-1 leading-snug">
        {product.title}
      </h4>
      <div className="text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-3">
        {product.audience}
      </div>
      <p className="text-sm text-[#9CA3AF] leading-relaxed line-clamp-3 mb-3">
        {product.purpose}
      </p>
      <span
        className="inline-flex items-center gap-1.5 text-xs font-medium"
        style={{ color: accent }}
      >
        View detail
        <svg
          className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.4}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </span>
    </motion.button>
  );
}

function CompanyColumn({
  company,
  onOpenProduct,
}: {
  company: Company;
  onOpenProduct: (p: Product, accent: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const total = company.products.length;

  return (
    <div className="flex flex-col gap-4">
      {/* Company card */}
      <div className="bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden flex flex-col min-h-[320px]">
        <div className="h-1" style={{ background: company.accent }} />
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center font-bold text-base"
                style={{ background: `${company.accent}25`, color: company.accent }}
              >
                {company.name
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div>
                <div className="font-bold text-[#F9FAFB] leading-tight">
                  {company.name}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[#6B7280] mt-0.5">
                  {company.entity}
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle products"
              className="w-7 h-7 rounded-md border border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#374151] transition-colors flex items-center justify-center flex-shrink-0"
            >
              <svg
                className={`w-3.5 h-3.5 transition-transform ${open ? "" : "-rotate-90"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.4}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-[#9CA3AF] leading-relaxed mb-4">
            {company.description}
          </p>
          <div className="flex gap-4 mb-4">
            {company.stats.map((s) => (
              <div key={s.lbl}>
                <div
                  className="text-xl font-bold"
                  style={{ color: company.accent }}
                >
                  {s.num}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[#6B7280]">
                  {s.lbl}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3 mt-auto">
            <a
              href={company.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors"
            >
              Visit website
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.4}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md border transition-colors"
              style={{
                color: company.accent,
                borderColor: `${company.accent}40`,
                background: `${company.accent}10`,
              }}
            >
              {open ? "Hide" : "View"} {total} products
              <svg
                className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.4}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Products */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-3 px-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#6B7280]">
                Products · {total}
              </span>
              <span className="flex-1 h-px bg-[#1F2937]" />
            </div>
            <div className="flex flex-col gap-3">
              {company.products.map((p) => (
                <ProductCard
                  key={p.title}
                  product={p}
                  accent={company.accent}
                  onOpen={() => onOpenProduct(p, company.accent)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-[#6B7280] mb-1.5">
        {label}
      </div>
      <p className="text-[#D1D5DB] leading-relaxed">{body}</p>
    </div>
  );
}

function ProductModal({
  product,
  accent,
  onClose,
}: {
  product: Product | null;
  accent: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0f1525] border border-[#1F2937] rounded-2xl max-w-2xl w-full my-12 overflow-hidden"
          >
            <div className="h-1" style={{ background: accent }} />
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <StatusPill statusType={product.statusType} label={product.status} />
                  <h3 className="text-2xl font-bold text-[#F9FAFB] mt-3">
                    {product.title}
                  </h3>
                  <div className="text-xs uppercase tracking-wider text-[#9CA3AF] mt-1">
                    {product.audience}
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-md text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937] transition-colors flex items-center justify-center flex-shrink-0"
                  aria-label="Close"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-[#F9FAFB] leading-relaxed mb-6">
                {product.purpose}
              </p>

              <div className="space-y-5 text-sm">
                <Field label="Problem" body={product.problem} />
                <Field label="How it works" body={product.howItWorks} />
                <Field label="Revenue model" body={product.revenue} />
                <Field label="Market" body={product.market} />
                <Field label="Customers" body={product.customers} />
              </div>

              {product.link && (
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-[#0a0a1a] transition-colors"
                  style={{ background: accent }}
                >
                  Visit product
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Work() {
  const [open, setOpen] = useState<{ product: Product; accent: string } | null>(
    null
  );

  const totalProducts = companies.reduce((n, c) => n + c.products.length, 0);

  return (
    <SectionWrapper
      id="work"
      style={{
        background:
          "radial-gradient(ellipse at top right, rgba(99,102,241,0.18), transparent 60%), radial-gradient(ellipse at bottom left, rgba(14,165,233,0.12), transparent 65%)",
      }}
    >
      <div className="text-center mb-12">
        <div className="text-xs uppercase tracking-[0.2em] text-[#9CA3AF] mb-3">
          The portfolio · Click any card for detail
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Four operating companies.{" "}
          <span className="italic text-[#9CA3AF] font-normal">
            {totalProducts} products.
          </span>
        </h2>
        <p className="text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
          Products and platforms built at the intersection of AI and healthcare —
          shipped by a small operator team working alongside AI coding agents
          every day.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 items-start">
        {companies.map((c) => (
          <CompanyColumn
            key={c.id}
            company={c}
            onOpenProduct={(p, accent) => setOpen({ product: p, accent })}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-14 text-center"
      >
        <p className="text-[#6B7280] text-sm max-w-2xl mx-auto leading-relaxed">
          Previously founded MyInteract (medical digital engagement) and built
          digital solutions across 17 years in pharmaceutical sales, management
          and medical digital.
        </p>
      </motion.div>

      <ProductModal
        product={open?.product ?? null}
        accent={open?.accent ?? "#3B82F6"}
        onClose={() => setOpen(null)}
      />
    </SectionWrapper>
  );
}
