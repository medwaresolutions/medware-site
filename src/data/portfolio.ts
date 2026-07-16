/* Single source of truth for the Medware product portfolio.
 * Drives both the home "Work" section and the /industry page.
 * Ported from the redesign's COMPANIES data (4 companies, 19 products). */

export type StatusType =
  | "live"
  | "rollout"
  | "final"
  | "building"
  | "soon"
  | "projected"
  | "internal"
  | "tba";

export interface Product {
  title: string;
  short: string;
  audience: string;
  status: string; // display label, e.g. "Live" or "May 2026"
  statusType: StatusType;
  purpose: string;
  problem?: string;
  howItWorks?: string;
  revenue?: string;
  market?: string;
  customers?: string;
  link: string;
  image?: string; // header image for the detail dialog
}

export interface Company {
  id: string;
  name: string;
  entity: string;
  img: string; // company image used on the home Work header card
  logo?: string; // company logo used in the /industry sidebar + header
  color: string; // brand accent
  description: string;
  stats: { num: string; lbl: string }[];
  link: string;
  products: Product[];
}

export const COMPANIES: Company[] = [
  {
    id: "medcast",
    name: "Medcast Media",
    entity: "Medcast Media Pty Ltd",
    img: "/1-medcast-media.png",
    logo: "/industry/medware-logo.png",
    color: "#0F766E",
    description:
      "AI-curated medical audio platform for healthcare professionals and pharmaceutical sponsors.",
    stats: [
      { num: "17", lbl: "Specialties" },
      { num: "3", lbl: "Products" },
    ],
    link: "https://medcast.media",
    products: [
      {
        title: "Medcast Specialist App",
        short: "MS",
        audience: "Healthcare professionals",
        status: "Live",
        statusType: "live",
        image: "/industry/medcastmedia-hcp-header.png",
        purpose:
          "AI-curated medical audio that turns the 135 specialist articles published daily into personalised audio briefings for time-poor specialists.",
        problem:
          "Specialist journals publish around 135 articles per day per specialty. Keeping current is no longer optional, and reading at that pace is no longer possible.",
        howItWorks:
          "AI scans thousands of journals daily and matches articles to each specialist’s registered specialty and interests. Selected articles are summarised and narrated using ElevenLabs voices, then surfaced in a personalised audio feed via PWA or native iOS app.",
        revenue:
          "$5 USD/month per HCP, or free where a country+specialty sponsor is in place under the Sponsor Portal model.",
        market:
          "Specialist physicians globally — initial focus on Australia, UK, US and Asian markets.",
        customers:
          "Live in Australia. Active HCP user base across multiple specialties via web and iOS App Store.",
        link: "https://medcast.media",
      },
      {
        title: "Medcast Sponsor Portal",
        short: "SP",
        audience: "Pharmaceutical employees",
        status: "Live",
        statusType: "live",
        image: "/industry/medcastmedia-industry-header.png",
        purpose:
          "Self-serve portal where pharmaceutical sponsors commission, manage and measure audio campaigns — one sponsor per specialty per country.",
        problem:
          "Pharma companies struggle to reach engaged, verified HCPs in their exact specialty after the field-force visit ends. Generic medical media inventory is expensive and undifferentiated.",
        howItWorks:
          "Sponsors commission a country+specialty package, upload branded articles through a self-serve portal, and watch real-time engagement metrics by specialty. One sponsor per specialty per country creates exclusive category ownership.",
        revenue:
          "Single specialty, single country: $xx/year. Multi-specialty or large market: $xx/year. Right of first refusal in year two.",
        market: "Global pharmaceutical marketing budgets — ANZ activated; UK, US and Asia to follow.",
        customers:
          "Inservio, Apellis, AstraZeneca. Active outreach: Takeda, Gilead, CSL, Novo Nordisk, Pfizer.",
        link: "https://sponsor.medcast.media",
      },
      {
        title: "Medcast Industry App",
        short: "IN",
        audience: "Pharmaceutical employees",
        status: "Live",
        statusType: "live",
        image: "/medcast-industry.jpg",
        purpose:
          "Audio briefings for pharma teams summarising TGA, PBAC, Department of Health and nine other Australian regulatory sources, refreshed daily.",
        problem:
          "Pharma teams need to track regulatory and policy changes across nine government and industry sources daily. Reading them all is a full-time job; existing paid services charge $700+ per person per year.",
        howItWorks:
          "Scrapes nine Australian regulatory sources — TGA, PBAC, Department of Health, Medicines Australia, AusBiotech, GBMA, MTAA, PRWire and PBS — then summarises and narrates updates as audio episodes refreshed daily. PBAC decisions delivered as audio, a category first.",
        revenue:
          "Free in Australia at launch to drive adoption and pull-through to the HCP product. Future: in-feed advertising and per-seat subscription.",
        market:
          "Australian pharmaceutical employees — roughly 25,000+ across affiliates and contract organisations.",
        customers: "Live in Australia. Used internally by Medcast sponsors to brief their teams.",
        link: "https://industry.medcast.media",
      },
    ],
  },
  {
    id: "medflow",
    name: "Medflow",
    entity: "Medflow Pty Ltd",
    img: "/1-medflow.png",
    logo: "/industry/medflow-logo.png",
    color: "#1E40AF",
    description:
      "PBS authority automation infrastructure for Australian specialist clinics, hospitals and EMR vendors.",
    stats: [
      { num: "6", lbl: "Products" },
      { num: "200+", lbl: "Clinics" },
    ],
    link: "https://medflow.com.au",
    products: [
      {
        title: "Medflow Clinic Online",
        short: "MC",
        audience: "Healthcare professionals",
        status: "Live",
        statusType: "live",
        image: "/industry/medflow-hcp-header.png",
        purpose:
          "Cloud-based PBS authority automation that completes complex government forms in seconds for specialist physicians.",
        problem:
          "PBS authority forms take a specialist 15–20 minutes each. A busy gastroenterologist or rheumatologist files dozens per week. The work is repetitive, error-prone and uncompensated.",
        howItWorks:
          "Select patient — data auto-populates from the practice management system. Review the auto-filled form — only clinical decision fields need attention. Submit and track from a dashboard. Built-in CDAI / Mayo / PCDAI calculators, PBS compliance checking and audit trail.",
        revenue:
          "$xx/clinic/month plus PBS API per-call · pharmaceutical sponsor $xxK/year · $xx per patient per month on the signed contract (Australia).",
        market:
          "~1,500 gastroenterologists and ~500 rheumatologists in Australia. Expansion: dermatology, immunology, neurology.",
        customers:
          "Live across 200+ Australian specialist clinics. First contracted recurring pharmaceutical revenue running on the embedded PBS authority workflow via the signed Pfizer Abrilada contract.",
        link: "https://medflow.com.au",
      },
      {
        title: "Medflow Clinic Offline",
        short: "MO",
        audience: "Healthcare professionals",
        status: "May 2026",
        statusType: "soon",
        image: "/1-medflow-offline.jpg",
        purpose:
          "On-premise PBS authority automation for hospitals and networks where patient data must remain inside the institutional firewall.",
        problem:
          "Hospital networks cannot run the cloud version because patient data must stay inside the firewall. PSAF, NSW eHealth and equivalent frameworks block external transmission.",
        howItWorks:
          "A self-contained on-premise deployment that runs entirely inside the hospital network. Same automation, same forms, same calculators — fully air-gapped, with no outbound patient data transmission.",
        revenue: "Enterprise per-site licensing — POA. Annual support contracts.",
        market: "Australian public and private hospital networks running specialist outpatient clinics.",
        customers: "Launching May 2026. Westmead engagement underway; PSAF assessment scoped.",
        link: "https://medflow.com.au",
      },
      {
        title: "Medflow PBS API Gateway",
        short: "AG",
        audience: "EMR vendors",
        status: "May 2026",
        statusType: "soon",
        image: "/1-medflow-pbs-api.jpg",
        purpose:
          "Stateless middleware that connects Electronic Medical Records to Services Australia’s PBS authority API for real-time pharmaceutical approvals.",
        problem:
          "Smaller EMR vendors can’t justify the cost of building their own PBS authority gateway. As a result, their specialist users still file authority forms by hand.",
        howItWorks:
          "A stateless middleware layer between any EMR and Services Australia’s PBS authority API. EMR vendors integrate once; their users file authority requests in real time. No patient data is retained at the gateway.",
        revenue: "Per-transaction pricing or volume licensing for EMR vendors — POA.",
        market:
          "Approximately 10–20 EMR vendors active in the Australian specialist clinic market, plus large hospital systems.",
        customers: "Launching May 2026. Built against Services Australia OPA spec. Targeting Zedmed, Xestro, Shexie.",
        link: "https://medflow.com.au",
      },
      {
        title: "Medflow Hub",
        short: "HB",
        audience: "Healthcare professionals",
        status: "May 2026",
        statusType: "soon",
        image: "/1-thehub.png",
        purpose:
          "Token-based portal letting clinicians push approved educational content to patients with no login required on the patient side.",
        problem:
          "Patients lose printed handouts. Clinicians have no way to know if material was viewed. Reputable health content is fragmented across YouTube, PDFs and clinic intranets.",
        howItWorks:
          "Clinicians curate trusted health content into patient-ready packages. Patients receive a token-based SMS or email link to a personalised page — no login required. Engagement is tracked and timed campaign sequences can be scheduled.",
        revenue: "$xx per clinic per month plus $x per patient delivered. Globally applicable — no PBS dependency.",
        market: "Any specialist or primary care clinic globally. Initial Australian rollout via existing Medflow customers.",
        customers: "Launching May 2026. Production-ready, integrated with Medflow Clinic.",
        link: "https://hub.medflow.com.au",
      },
      {
        title: "Medflow Patient App",
        short: "PA",
        audience: "Patients",
        status: "Live",
        statusType: "live",
        image: "/industry/medflow-patient-header.png",
        purpose:
          "White-label patient companion app for managing specialist appointments, treatment plans and clinic communications.",
        problem:
          "Patients moving between specialist appointments lose track of treatment plans, medications and communications. Each clinic builds its own app or settles for nothing.",
        howItWorks:
          "A preconfigured, white-label app clinics deploy under their own branding — appointment management, treatment-plan tracking and two-way messaging without commissioning custom development.",
        revenue: "$399 one-off purchase per clinic. Globally applicable.",
        market: "Any clinic worldwide running a specialist or primary care practice.",
        customers: "Live and deployable. Australian gastroenterology and rheumatology practices are first targets.",
        link: "https://medflow.com.au",
      },
      {
        title: "Medflow Metrics",
        short: "MT",
        audience: "Pharmaceutical employees",
        status: "Live",
        statusType: "live",
        image: "/1-medflow-metrics.jpg",
        purpose:
          "Real-world prescribing and authority analytics derived from anonymised Medflow workflow data, sold to pharmaceutical companies.",
        problem:
          "Pharma companies pay analysts thousands to manually pull and interpret PBS prescribing data. Existing market research tools are expensive and lag the market.",
        howItWorks:
          "Anonymised Medflow Clinic data is aggregated into a per-seat analytics portal — specialty-specific prescribing patterns, regional data, competitor patterns and campaign effectiveness in near real time.",
        revenue: "$xx per seat per month. Pharmaceutical company subscription.",
        market:
          "Australian pharmaceutical analytics and market access budgets — ~25 large pharma affiliates plus CROs.",
        customers:
          "Live. Active sponsor pipeline includes Apellis, AstraZeneca, Takeda, Gilead, CSL, Novo Nordisk and Pfizer.",
        link: "https://metrics.medflow.com.au",
      },
    ],
  },
  {
    id: "medware",
    name: "Medware Solutions",
    entity: "Medware Solutions Pty Ltd",
    img: "/constellation.png",
    logo: "/industry/medware-logo.png",
    color: "#B23B19",
    description:
      "AI infrastructure, training and emerging products spanning healthcare and the broader AI economy.",
    stats: [
      { num: "9", lbl: "Products" },
      { num: "3", lbl: "Markets" },
    ],
    link: "https://medware.com.au",
    products: [
      {
        title: "Relay",
        short: "RL",
        audience: "Field force",
        status: "May 2026",
        statusType: "soon",
        image: "/industry/relay-header.png",
        purpose:
          "Voice-to-CRM iOS app for pharmaceutical reps — talk after a call and AI converts unstructured speech into a complete Salesforce or Veeva record.",
        problem:
          "Pharma reps lose 30%+ of call detail by the time they enter it into CRM. Voice memos help, but transcription alone doesn’t produce a CRM-ready record.",
        howItWorks:
          "A rep speaks naturally between calls. The iOS app captures audio, AI structures the speech into Salesforce or Veeva fields, and the rep gets an editable preview before commit. Raw audio retained for compliance.",
        revenue: "Per-seat pharmaceutical subscription — POA.",
        market:
          "Global pharmaceutical sales force — ~100,000 reps. Adjacent: medical devices, specialty biotech, animal health.",
        customers: "Launching May 2026. Built on 17 years of pharmaceutical sales experience.",
        link: "https://medware.com.au",
      },
      {
        title: "CellMap",
        short: "CM",
        audience: "HCP & industry",
        status: "Live",
        statusType: "live",
        image: "/industry/cellpath-header.png",
        purpose:
          "Interactive 3D cell atlas built from real Protein Data Bank structures, for medical education and pharma mechanism-of-action storytelling.",
        problem:
          "Pharma MoA storytelling relies on stylised illustrations or static diagrams. Medical educators teaching cellular biology have nothing interactive to point at.",
        howItWorks:
          "A web-based 3D atlas in Three.js, populated with real PDB atomic structures. Users zoom from organelle to atomic structure across five LOD tiers. Hover any protein for function and copy-number.",
        revenue:
          "Licensing under development — direct pharma licensing for MoA assets, plus subscription for medical education.",
        market: "Pharma medical affairs and brand teams, plus medical schools and CME providers globally.",
        customers:
          "Live. 1,230 proteins placed across 18 types in the human colonocyte; expandable to other cell types.",
        link: "https://cellmap-colonocyte.vercel.app",
      },
      {
        title: "Practice Referral",
        short: "PR",
        audience: "Healthcare professionals",
        status: "May 2026",
        statusType: "soon",
        image: "/1-medware-referral.jpg",
        purpose:
          "US-market product mapping a specialist’s referral network using CMS Medicare data and generating targeted outreach campaigns to GPs.",
        problem:
          "US specialists don’t know who refers to them, who refers to competitors, or which GPs are worth winning. Hidden dependency and quiet growth opportunities sit in plain sight.",
        howItWorks:
          "Built on CMS Medicare shared-patient data, NPPES records and network graph analysis. Maps the referral network, ranks influence, surfaces competitor patterns and generates dollar-valued outreach campaigns.",
        revenue: "$299 one-time + $99/year data refresh. Promoted via Google Ads and email to US specialist clinics.",
        market: "~100,000 US specialist physicians across procedural specialties.",
        customers: "Launching May 2026. Domain live at practicereferral.net; data pipeline operational.",
        link: "https://practicereferral.net",
      },
      {
        title: "AI Training",
        short: "AT",
        audience: "General",
        status: "Live",
        statusType: "live",
        image: "/1-medware-training.jpg",
        purpose:
          "Enterprise AI training teaching sales and operations teams to use AI tools for measurable productivity gains.",
        problem:
          "Most corporate AI training is generic prompt engineering disconnected from real workflows. Companies can’t prove ROI, and adoption stalls.",
        howItWorks:
          "A pre-assessment identifies actual time-sinks per role. Training is tailored to those workflows. Pre/post KPIs measure time-on-task improvement to prove ROI in dollars.",
        revenue: "Project-based engagement. Pricing scales with team size and scope.",
        market: "Australian SMB and enterprise sales and operations teams. Adjacent: international via remote delivery.",
        customers: "Live. Currently delivering to Eutility’s national sales team.",
        link: "https://medware.com.au",
      },
      {
        title: "Earpiece",
        short: "EP",
        audience: "General",
        status: "May 2026",
        statusType: "soon",
        image: "/industry/EarPiece-header.png",
        purpose:
          "Discreet iOS app that listens to a meeting and whispers AI-generated responses through AirPods in real time.",
        problem:
          "High-stakes meetings demand instant recall of facts and counter-arguments. Glancing at a phone signals disengagement.",
        howItWorks:
          "iPhone mic captures the other party’s voice. On-device speech-to-text transcribes; Claude generates a brief response from pre-loaded context; ElevenLabs whispers it through AirPods. Listen / Command mode toggle.",
        revenue: "TBD at launch. Per-seat pharmaceutical subscription most likely.",
        market: "Pharma reps, executive coaches and any high-stakes meeting where immediate recall matters.",
        customers: "Launching May 2026. iOS app fully scaffolded; pharma-specific presets included.",
        link: "https://medware.com.au",
      },
      {
        title: "Constellation",
        short: "CN",
        audience: "AI teams",
        status: "Internal",
        statusType: "internal",
        image: "/industry/constellation-header.png",
        purpose:
          "Persistent project memory and interactive knowledge graph that lets a small team manage dozens of products and repos alongside AI coding agents.",
        problem:
          "AI coding agents lose context between sessions. Solo founders building many products hit a wall switching projects: agents forget conventions, architecture and prior decisions.",
        howItWorks:
          "A persistent project-memory layer plus an interactive knowledge graph. Project state, files, decisions and conventions load into any context window in seconds. Works alongside Claude Code, Cursor and Copilot.",
        revenue: "Internal use only at present. Productisation under consideration as SaaS for AI-native solo founders.",
        market: "AI-native solo founders, indie hackers and small product teams.",
        customers:
          "Internal — powering Medware’s products across 90+ repositories. The source of the productivity behind the portfolio.",
        link: "https://medware.com.au",
      },
      {
        title: "MedwareAI",
        short: "AI",
        audience: "Healthcare professionals",
        status: "TBA",
        statusType: "tba",
        purpose:
          "Fully offline AI assistant for specialist clinics — runs locally on clinic hardware so patient data never leaves the building.",
        problem:
          "Doctors won’t paste patient notes into ChatGPT or any cloud LLM — and they’re right not to. Powerful AI, but legally and ethically off-limits for patient work.",
        howItWorks:
          "A self-contained desktop app running Ollama and Qwen3 entirely on the clinic’s own hardware. No outbound calls, no telemetry. Local PBS medication database, differential diagnosis support, GP letter and PBS authority drafting.",
        revenue: "Per-clinic licensing — TBA. Likely annual licence with optional support tier.",
        market:
          "Australian specialist clinics with cloud-LLM privacy concerns, plus international clinics in regulated jurisdictions.",
        customers: "TBA. Currently in late-stage development.",
        link: "https://medware.com.au",
      },
      {
        title: "AdSafe",
        short: "AD",
        audience: "Healthcare professionals",
        status: "Live",
        statusType: "live",
        image: "/1-medware-adsafe.jpg",
        purpose:
          "Automated compliance checking of clinic websites and advertising against AHPRA and TGA health-advertising rules.",
        problem:
          "The regulator is cracking down on health advertising. Most clinics have no idea whether their website and marketing comply, and legal reviews are slow and expensive.",
        howItWorks:
          "AdSafe scans a clinic’s website and advertising copy against AHPRA and TGA advertising requirements, flags breaches and produces a plain-language compliance report. Pharmaceutical sponsors can sponsor a specialty and hand out codes so clinics receive checks free under their brand.",
        revenue: "Clinic plans from $79/month. Specialty sponsorship for pharmaceutical companies — POA.",
        market: "Australian specialist and GP clinics, with pharmaceutical sponsors as a distribution channel.",
        customers: "Live. Timely with the current regulatory crackdown on health advertising.",
        link: "https://medware.com.au",
      },
      {
        title: "Doctor Database",
        short: "DB",
        audience: "Pharmaceutical employees",
        status: "Live",
        statusType: "live",
        purpose:
          "Verified contact and practice database of Australian and US physicians built for pharmaceutical sales and marketing teams.",
        problem:
          "Pharma teams need verified, current contact and practice data on physicians. Existing commercial databases are expensive, often stale and country-locked.",
        howItWorks:
          "A verified database harvested from public university sources, NPPES, registration boards and equivalent registries. Refreshed periodically. Sold as targeted lists or full database access.",
        revenue: "Per-list or full-database licensing.",
        market: "Pharmaceutical sales and marketing teams across Australia and the US.",
        customers: "Live. 20,741+ Australian medical academic records as foundation dataset; US records via NPPES.",
        link: "https://medware.com.au",
      },
    ],
  },
  {
    id: "medprep",
    name: "Medprep",
    entity: "Bowelprep Pty Ltd",
    img: "/1-medprep.png",
    logo: "/industry/medprep-logo.png",
    color: "#166534",
    description:
      "Patient-facing colonoscopy preparation and clinic monitoring, live with an active gastroenterology partner.",
    stats: [
      { num: "2", lbl: "Products" },
      { num: "Live", lbl: "In-clinic" },
    ],
    link: "https://medprep.app",
    products: [
      {
        title: "MedPrep Patient",
        short: "MP",
        audience: "Patients",
        status: "Live",
        statusType: "live",
        image: "/industry/medprep-header.png",
        purpose:
          "Patient app guiding users through bowel preparation with timed reminders, step-by-step instructions and clinic messaging.",
        problem:
          "Poor bowel preparation leads to failed colonoscopies — repeat bookings, wasted theatre time, patient frustration. Patients lose printed instructions; nurse phone calls consume hours.",
        howItWorks:
          "Patients scan a QR code to clinic-branded video instructions, a smart step sequence with medication-specific timing, AI-powered Q&A trained on the clinic’s own guidelines, diet management with visual aids, and timed SMS reminders.",
        revenue: "$2 per patient delivered. Future: pharmaceutical sponsorship layer for prep-product manufacturers.",
        market: "~1 million colonoscopies per year in Australia. ~20 million per year in the United States.",
        customers: "Live with Dr John Ding, leading gastroenterologist at St Vincent’s Hospital Melbourne.",
        link: "https://medprep.app",
      },
      {
        title: "MedPrep Clinic",
        short: "PC",
        audience: "Healthcare professionals",
        status: "Live",
        statusType: "live",
        image: "/1-medprep-clinic.jpg",
        purpose:
          "Clinician dashboard for gastroenterologists to monitor patient bowel-preparation compliance ahead of colonoscopy.",
        problem:
          "Gastroenterologists don’t know whether a patient is following prep until they’re in theatre. Inadequate prep then means a lost slot, uncompensated time, and a repeat procedure.",
        howItWorks:
          "A clinician dashboard tracks each patient’s prep compliance in real time. No change to existing protocol — the system wraps the clinic’s own guidelines and integrates with booking systems.",
        revenue: "$20 per clinic per month. Pairs with the patient app at $2 per delivery.",
        market: "~1 million colonoscopies per year in Australia. ~20 million per year in the United States.",
        customers: "Live with Dr John Ding’s gastroenterology clinic at St Vincent’s Hospital Melbourne.",
        link: "https://medprep.app",
      },
    ],
  },
];

export const TOTAL_PRODUCTS = COMPANIES.reduce((n, c) => n + c.products.length, 0);

/* Roadmap phase → fill fraction + label, used by the /industry dashboard bars. */
export const PHASE_META: Record<StatusType, { pct: number; label: string }> = {
  live: { pct: 100, label: "Live" },
  rollout: { pct: 85, label: "Rolling out" },
  final: { pct: 70, label: "Final build" },
  building: { pct: 50, label: "Building" },
  soon: { pct: 60, label: "Soon" },
  projected: { pct: 25, label: "Projected" },
  internal: { pct: 100, label: "Internal" },
  tba: { pct: 15, label: "TBA" },
};
