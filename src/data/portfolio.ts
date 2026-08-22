/* Single source of truth for the Medware product portfolio.
 * Drives the home "Work" section.
 *
 * Products are presented as families of products for healthcare — not as
 * operating companies. Medware Solutions carries enough products to warrant
 * purpose groups within its tab; every other family renders as a flat grid.
 */

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
  group?: string; // optional purpose group key, matched against Family.groups
  purpose: string;
  problem?: string;
  howItWorks?: string;
  revenue?: string;
  market?: string;
  customers?: string;
  link: string;
  image?: string; // header image for the detail dialog
}

export interface Family {
  id: string;
  name: string;
  tagline: string; // one-line positioning, shown under the family name
  img: string; // family image used on the home Work header card
  logo?: string;
  color: string; // brand accent
  description: string;
  stats: { num: string; lbl: string }[];
  link: string;
  /* When present, the product grid renders under these purpose headings, in
     this order. Products carry a matching `group` key. */
  groups?: { key: string; label: string }[];
  products: Product[];
}

export const FAMILIES: Family[] = [
  {
    id: "medflow",
    name: "Medflow",
    tagline: "PBS authority automation for Australian specialist medicine",
    img: "/1-medflow.png",
    logo: "/industry/medflow-logo.png",
    color: "#1E40AF",
    description:
      "PBS authority automation for Australian specialist clinics, hospitals and EMR vendors — plus the patient and analytics layers built on top of it.",
    stats: [
      { num: "3", lbl: "Products" },
      { num: "200+", lbl: "Clinics" },
    ],
    link: "https://medflow.com.au",
    products: [
      {
        title: "Medflow Clinic + PBS API Gateway",
        short: "MC",
        audience: "Healthcare professionals & EMR vendors",
        status: "Live",
        statusType: "live",
        image: "/industry/medflow-hcp-header.png",
        purpose:
          "The clinic software specialists use to complete PBS authority applications in seconds instead of twenty minutes — online, inside the hospital firewall, or through a gateway that plugs into existing clinic systems.",
        problem:
          "PBS authority forms take a specialist 15–20 minutes each. A busy gastroenterologist or rheumatologist files dozens per week. The work is repetitive, error-prone and uncompensated — and hospitals can't use a cloud tool at all, because patient data has to stay inside the firewall.",
        howItWorks:
          "Select a patient and the form auto-populates from the practice management system; only the clinical decision fields need attention. Built-in CDAI / Mayo / PCDAI calculators, PBS compliance checking and a full audit trail. One solution across three deployments: online for clinics, on-premise for hospital networks where data cannot leave the building, and a stateless gateway that connects any EMR to Services Australia's PBS authority API so vendors integrate once and their users file in real time.",
        revenue:
          "$xx/clinic/month plus PBS API per-call · pharmaceutical sponsor $xxK/year · enterprise per-site licensing for hospital deployments · per-transaction or volume licensing for EMR vendors.",
        market:
          "~1,500 gastroenterologists and ~500 rheumatologists in Australia, expanding to dermatology, immunology and neurology; plus Australian hospital networks and the 10–20 EMR vendors serving the specialist market.",
        customers:
          "Live across 200+ Australian specialist clinics. First contracted recurring pharmaceutical revenue running on the embedded PBS authority workflow via the signed Pfizer Abrilada contract. Westmead engagement underway for the on-premise deployment.",
        link: "https://medflow.com.au",
      },
      {
        title: "Medflow Patient",
        short: "PA",
        audience: "Patients",
        status: "Live",
        statusType: "live",
        image: "/industry/medflow-patient-header.png",
        purpose:
          "The patient side of Medflow — a clinic-branded companion app plus token-based content delivery, so clinicians can push approved educational material and patients can manage appointments and treatment plans in one place.",
        problem:
          "Patients lose printed handouts and clinicians have no way to know whether material was read. Meanwhile patients moving between specialist appointments lose track of treatment plans, medications and communications, and each clinic either commissions its own app or settles for nothing.",
        howItWorks:
          "Clinicians curate trusted health content into patient-ready packages; patients receive a token-based SMS or email link to a personalised page with no login required, and engagement is tracked. The same platform ships as a white-label app clinics deploy under their own branding for appointment management, treatment-plan tracking and two-way messaging.",
        revenue:
          "$xx per clinic per month plus $x per patient delivered, or $399 one-off for the white-label app. Globally applicable — no PBS dependency.",
        market:
          "Any specialist or primary care clinic globally. Initial Australian rollout through existing Medflow customers.",
        customers: "Live and deployable, integrated with Medflow Clinic.",
        link: "https://hub.medflow.com.au",
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
    id: "medcast",
    name: "Medcast Media",
    tagline: "AI-curated medical audio for clinicians and their sponsors",
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
    id: "medware",
    name: "Medware Solutions",
    tagline: "Software for clinicians, industry teams and the rooms they meet in",
    img: "/constellation.png",
    logo: "/industry/medware-logo.png",
    color: "#B23B19",
    description:
      "The broad end of the portfolio — clinical AI, commercial tooling for industry teams, and the audience, event and research products that sit around them.",
    stats: [
      { num: "11", lbl: "Products" },
      { num: "4", lbl: "Audiences" },
    ],
    link: "https://medware.com.au",
    groups: [
      { key: "clinical", label: "For clinicians & hospitals" },
      { key: "commercial", label: "For industry field & commercial teams" },
      { key: "audience", label: "Audience, events & research" },
      { key: "content", label: "Content, education & compliance" },
    ],
    products: [
      /* ---- For clinicians & hospitals ---- */
      {
        title: "Medware AI",
        short: "MA",
        audience: "Healthcare professionals & clinics",
        status: "In development",
        statusType: "building",
        group: "clinical",
        purpose:
          "Our own AI platform for healthcare — the retrieval, the region and specialty configuration, the document handling and the guardrails. The language model is a component we choose and can swap; the software around it is the product.",
        problem:
          "Most “AI for healthcare” is a thin wrapper around a general chatbot. It doesn’t know which guidelines apply in this state, what PBS lists this month, or what the last PBAC outcome said — and clinicians won’t put patient or practice questions into it anyway.",
        howItWorks:
          "Every deployment is configured per region and per specialty, so it answers from the sources that apply where the clinician actually practises: treatment guidelines, PBS, TGA, PBAC outcomes and Medicare. Practices load their own documents — protocols, formularies, referral criteria — into the same index. It runs secure, or fully offline where patient data cannot leave the building. Because the platform is ours, the model underneath is a choice rather than a dependency.",
        revenue: "Per-clinic or per-seat licensing — POA. Platform licensing for partners.",
        market:
          "Australian specialist and primary-care clinics, hospital departments, and international clinics in regulated jurisdictions.",
        customers: "In development. The HCP assistant is the first product built on the platform.",
        link: "https://medware.com.au",
      },
      {
        title: "MedWayfinder",
        short: "WF",
        audience: "Hospitals, patients & visitors",
        status: "Live",
        statusType: "live",
        group: "clinical",
        image: "/wayfinder.png",
        purpose:
          "Digital wayfinding for hospital campuses — gets patients, visitors and staff to the right department, clinic or ward without stopping at a desk to ask.",
        problem:
          "Large hospital campuses are genuinely hard to navigate. Patients arrive late or lost to appointments that were booked weeks ago, and reception, volunteers and clinical staff spend hours a day giving directions.",
        howItWorks:
          "Site maps, departments and clinic locations are loaded once, then delivered to patients and visitors on their own phone with no app install. Entry points are placed where people actually get lost — car parks, main entrances, lifts — and on appointment letters, so the route starts from wherever they are. Deployed per hospital under the hospital’s own branding.",
        revenue: "Per-site licensing — POA.",
        market: "Australian public and private hospitals, and large multi-clinic campuses.",
        customers: "Live.",
        link: "https://medware-wayfinder.vercel.app/",
      },

      /* ---- For industry field & commercial teams ---- */
      {
        title: "Medware CRM",
        short: "CR",
        audience: "Pharmaceutical employees",
        status: "Live",
        statusType: "live",
        group: "commercial",
        purpose:
          "CRM for industry that puts the doctor database, email marketing and pipeline in one place — Mailchimp’s and HubSpot’s jobs, sitting on verified physician data, integrated with the software a commercial team already runs.",
        problem:
          "Pharma commercial teams stitch together three systems that don’t talk to each other: a contact database in one place, an email tool in another, pipeline in a third. Verified physician data goes stale in the gaps, and nobody can trace a campaign through to an outcome on the same record.",
        howItWorks:
          "Combines the verified Australian and US physician database with campaign email and CRM pipeline in a single system, and integrates with the other software the team already runs. Segment by specialty, region and practice, run the campaign, and track the result against the same records the segment came from.",
        revenue: "Per-seat subscription, or per-list licensing for database-only access.",
        market: "Pharmaceutical sales and marketing teams across Australia and the US.",
        customers:
          "Live. 20,741+ Australian medical academic records plus US records via NPPES as the foundation dataset.",
        link: "https://medware.com.au",
      },
      {
        title: "Relay",
        short: "RL",
        audience: "Field force",
        status: "May 2026",
        statusType: "soon",
        group: "commercial",
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
        title: "Practice Referral",
        short: "PR",
        audience: "Healthcare professionals",
        status: "May 2026",
        statusType: "soon",
        group: "commercial",
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
        title: "Earpiece",
        short: "EP",
        audience: "Field force & executives",
        status: "May 2026",
        statusType: "soon",
        group: "commercial",
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

      /* ---- Audience, events & research ---- */
      {
        title: "Medware Survey & Research",
        short: "SR",
        audience: "Pharma, hospitals & research teams",
        status: "Live",
        statusType: "live",
        group: "audience",
        purpose:
          "Survey and research platform built for healthcare audiences — design a study, distribute it, and analyse the results, without bending a consumer tool to do it.",
        problem:
          "Healthcare and pharmaceutical teams run surveys and research on generic consumer platforms that were never designed for clinical audiences, verified respondents, or the data-handling standards healthcare expects.",
        howItWorks:
          "Build the instrument with question logic and branching, distribute it to a target audience, and watch results come in live. Responses can be filtered and segmented by specialty, region and respondent type, and exported for analysis or reporting.",
        revenue: "Per-project or annual licence — POA. Sponsorable.",
        market:
          "Pharmaceutical market research, hospital departments, medical colleges and research groups.",
        customers: "Live.",
        link: "https://medware.com.au",
      },
      {
        title: "Medware Audience Participation",
        short: "AP",
        audience: "Conferences, meetings & pharma",
        status: "Live",
        statusType: "live",
        group: "audience",
        purpose:
          "Live polling and audience sentiment for meetings, symposia and conference sessions — the room answers on their phones and the result is on screen in seconds.",
        problem:
          "Sponsored sessions and advisory boards run blind. The presenter has no read on the room while they’re still in it, and the sponsor walks away with an attendance list instead of a record of what the audience actually thought.",
        howItWorks:
          "Attendees join from their own phone with no app install. Polls, ratings and free-text sentiment are pushed live during the session and displayed on screen as they land, then exported as a report once the session ends.",
        revenue: "Per-event or annual licence — POA. Sponsorable.",
        market:
          "Pharmaceutical meetings and advisory boards, medical colleges, conference organisers and hospital education units.",
        customers: "Live.",
        link: "https://medware.com.au",
      },
      {
        title: "Medware Conference App",
        short: "CF",
        audience: "Conference organisers & sponsors",
        status: "Live",
        statusType: "live",
        group: "audience",
        purpose:
          "White-label conference app any group can run under its own branding — and reuse for every conference it holds, instead of commissioning a new one each year.",
        problem:
          "Most conference apps are built per event. A society pays to rebuild essentially the same app every year, loses whatever it built last year, and starts the delegate experience from scratch each time.",
        howItWorks:
          "One app, branded per group and reconfigured per conference. Programme, speakers, abstracts, exhibitor and sponsor listings, notifications and delegate messaging are all content rather than code — so the next conference is a configuration, not a rebuild. Pairs with Audience Participation for live polling inside sessions.",
        revenue: "Per-conference or annual group licence — POA. Sponsorable.",
        market:
          "Medical colleges and societies, pharmaceutical meetings and conference organisers in Australia and internationally.",
        customers: "Live.",
        link: "https://medware.com.au",
      },

      /* ---- Content, education & compliance ---- */
      {
        title: "CellMap",
        short: "CM",
        audience: "HCP & industry",
        status: "Live",
        statusType: "live",
        group: "content",
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
        title: "AdSafe",
        short: "AD",
        audience: "Healthcare professionals",
        status: "Live",
        statusType: "live",
        group: "content",
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
    ],
  },
  {
    id: "medprep",
    name: "MedPrep",
    tagline: "Colonoscopy preparation, from the patient's phone to the clinic dashboard",
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
  {
    id: "advisory",
    name: "Medware Advisory",
    tagline: "AI mentorship, training, and the tooling behind the portfolio",
    img: "/1-medware-training.jpg",
    logo: "/industry/medware-logo.png",
    color: "#0E7490",
    description:
      "The advisory side: AI mentorship and training for healthcare leadership and commercial teams — plus the internal tooling that makes a portfolio this size possible for a small team.",
    stats: [
      { num: "8 wk", lbl: "Mentorship" },
      { num: "2", lbl: "Products" },
    ],
    link: "https://medwareadvisory.com",
    products: [
      {
        title: "AI Training",
        short: "AT",
        audience: "Executive & commercial teams",
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
        link: "https://medwareadvisory.com",
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
    ],
  },
];

export const TOTAL_PRODUCTS = FAMILIES.reduce((n, f) => n + f.products.length, 0);

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
