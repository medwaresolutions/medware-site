/* Client-facing Medware Group catalogue for the /industry page.
 * The companies are deliberately hidden; everything is grouped by what a
 * pharmaceutical sponsor wants to achieve. Ported from the canonical
 * medware_products_industry/public/index.html. */

export type IndustryStatus = "live" | "soon" | "dev" | "free";

export const STATUS: Record<IndustryStatus, { label: string; color: string }> = {
  live: { label: "Live", color: "#16A34A" },
  soon: { label: "Coming soon", color: "#0EA5A2" },
  dev: { label: "In development", color: "#B23B19" },
  free: { label: "Free", color: "#7C3AED" },
};

export type GroupKey = "promote" | "educate" | "patients" | "data" | "team";

export const GROUPS: { key: GroupKey; name: string; sub: string; chip: string }[] = [
  { key: "promote", name: "Promote and place your brand", sub: "Put your product in front of the doctors and patients who matter, inside tools they already use.", chip: "Promote your brand" },
  { key: "educate", name: "Educate and engage HCPs", sub: "Reach clinicians through software and content they genuinely value.", chip: "Educate HCPs" },
  { key: "patients", name: "Support patients and adherence", sub: "Help patients through their journey, with less effort from the clinic.", chip: "Patient support & adherence" },
  { key: "data", name: "Market intelligence and data", sub: "See your market clearly and track your own activity, live.", chip: "Market intelligence & data" },
  { key: "team", name: "Equip your team", sub: "Tools and services that make your people faster, sharper and safer.", chip: "Equip your team" },
];

export interface IndustryProduct {
  key: string;
  group: GroupKey;
  title: string;
  aud: string;
  status: IndustryStatus;
  img: string | null;
  price: string;
  priceNote: string;
  short: string;
  impact: string;
  how: string;
  benefits: string[];
  link: string;
}

export const PRODUCTS: IndustryProduct[] = [
  // ---- PROMOTE ----
  {
    key: "medflow-clinic", group: "promote", title: "Medflow Clinic + PBS API Gateway", aud: "Used by doctors", status: "live",
    img: "/industry/medflow-hcp-header.png",
    price: "Sponsorship from $40k/year", priceNote: "product placement, notifications and program enrolment",
    short: "The clinic software specialists use to streamline PBS authority applications. Doctors rely on it daily, which makes it one of the most valuable places for your brand to be.",
    impact: "Puts your brand at the exact moment a doctor prescribes.",
    how: "Doctors use Medflow to complete and lodge authority applications quickly. It runs online, inside hospitals, and through a gateway that plugs into existing clinic systems, so it is one solution that reaches doctors wherever they work.",
    benefits: [
      "Product placement at the point of prescribing",
      "Targeted notifications sent to prescribing doctors",
      "Automatic enrolment of patients into your company programs",
      "One solution across online, hospital and system-integrated settings",
    ],
    link: "https://medflow.com.au",
  },
  {
    key: "medcast-sponsor", group: "promote", title: "Medcast Sponsor Portal", aud: "Reaches specialists, run by you", status: "live",
    img: "/industry/medcastmedia-industry-header.png",
    price: "From $3,500/month", priceNote: "12-month sponsorship. Limited specialties remaining, enquire.",
    short: "Own a branded channel inside the Medcast specialist app. Post your own articles and updates straight to the specialists who matter, and see exactly who engages.",
    impact: "Gives you your own channel to a specialty, with full tracking.",
    how: "Take a sponsorship in the specialist app and you own a channel. You publish your own articles and content, and you get a tracking mechanism that shows engagement. Sponsorships are taken for a year and only some specialties remain.",
    benefits: [
      "Your own branded channel in the specialist app",
      "Publish and update your own articles and content",
      "Full engagement tracking",
      "Only a limited number of specialty slots remain",
    ],
    link: "https://medcast.media",
  },
  {
    key: "medprep", group: "promote", title: "MedPrep Patient", aud: "Patients and gastro clinics", status: "live",
    img: "/industry/medprep-header.png",
    price: "Sponsorship POA", priceNote: "clinic from $20/month, $2 per patient delivered",
    short: "A simple QR-code tool that delivers a clinic’s colonoscopy prep instructions to patients. Used by Bowel Cancer Australia. White-label it for your prep product.",
    impact: "Lets a clinic switch to your prep product with almost no effort.",
    how: "Built for the gastroenterology space. A clinic duplicates its prep instructions and shares them with patients through a simple QR code. The clinic benefit is obvious, and for you it is a clean way to place your product and make switching to a new medication effortless on our side.",
    benefits: [
      "Product placement in front of patients preparing for a procedure",
      "A clinic can switch to your prep product with very little effort",
      "White-label option for your own brand",
      "Built specifically for gastroenterology",
    ],
    link: "https://medprep.app",
  },
  {
    key: "medwayfinder", group: "promote", title: "MedWayfinder", aud: "Patients and visitors on hospital campuses", status: "live",
    img: "/wayfinder.png",
    price: "Sponsorship POA", priceNote: "per-site licensing, deployed hospital by hospital",
    short: "Digital wayfinding that gets patients and visitors across a hospital campus without stopping at a desk to ask. Runs under the hospital’s branding, with room for a sponsor alongside it.",
    impact: "Puts your brand in a patient’s hand on the way to their appointment.",
    how: "Site maps, departments and clinic locations are loaded once, then delivered to patients and visitors on their own phone with no app install. Entry points sit where people actually get lost — car parks, main entrances, lifts — and on appointment letters, so the route starts wherever they are. Because it deploys per hospital, you can sponsor the campuses that matter to your therapy.",
    benefits: [
      "Reaches patients and visitors on their own phone, no app install",
      "Deployed per hospital, so you sponsor the campuses that matter",
      "Entry points at car parks, entrances and on appointment letters",
      "Runs under the hospital’s own branding",
    ],
    link: "https://medware-wayfinder.vercel.app/",
  },
  {
    key: "conference-app", group: "promote", title: "Medware Conference App", aud: "Conference delegates and sponsors", status: "live",
    img: null,
    price: "Sponsorship POA", priceNote: "per-conference or annual group licence",
    short: "A white-label conference app a college or society runs under its own branding and reuses for every meeting it holds. Exhibitor and sponsor listings are built in.",
    impact: "Gets your brand into the app delegates have open all conference.",
    how: "One app, branded per group and reconfigured per conference. Programme, speakers, abstracts, exhibitor and sponsor listings, notifications and delegate messaging are content rather than code, so the next conference is a configuration rather than a rebuild. Sponsors sit inside the app delegates use across the whole meeting, and can push notifications during it.",
    benefits: [
      "Sponsor and exhibitor listings inside the delegate app",
      "Notifications to delegates during the meeting",
      "Runs under the college or society’s own branding",
      "Pairs with Audience Participation for live polling in sessions",
    ],
    link: "https://medware.com.au",
  },
  // ---- EDUCATE ----
  {
    key: "medcast-hcp", group: "educate", title: "Medcast Specialist App", aud: "Doctors, on iPhone and web", status: "live",
    img: "/industry/medcastmedia-hcp-header.png",
    price: "$5/month per HCP", priceNote: "or free to doctors where you sponsor their specialty",
    short: "The specialist app doctors actually use, on iPhone or in the browser. Sponsor a specialty and the doctors in it get it free, with your brand alongside the value they receive.",
    impact: "Reaches specialists inside a tool they value, paid for by you.",
    how: "Doctors get a genuinely useful specialist app. When you sponsor their specialty, they use it free. Your presence is tied to real clinical utility rather than interruption, which is why doctors engage with it.",
    benefits: [
      "Reach specialists in a tool they choose to use",
      "Sponsor a specialty so its doctors get it free",
      "Your brand tied to genuine clinical value",
      "Engagement you can measure",
    ],
    link: "https://medcast.media",
  },
  {
    key: "pbs-script", group: "educate", title: "PBS Script Generator", aud: "Doctors", status: "live",
    img: "/industry/medflow-hcp-header.png",
    price: "Free clinician tool", priceNote: "sponsorship under exploration for advanced therapies",
    short: "A smarter lookup that shows doctors exactly what to write on a script. Particularly valuable for biologics and other drugs where the wording is easy to get wrong.",
    impact: "Removes prescribing friction for complex therapies like biologics.",
    how: "Scripts for biologics and some other drugs can be confusing. The generator shows the doctor precisely what to write, reducing errors and rejected scripts for advanced therapies.",
    benefits: [
      "Reduces prescribing errors and friction for your therapy",
      "Supports correct scripts for complex biologics",
      "Sponsorship opportunities for advanced-therapy manufacturers",
    ],
    link: "https://medflow.com.au",
  },
  {
    key: "cellmap", group: "educate", title: "CellMap", aud: "HCPs and your medical teams", status: "live",
    img: "/industry/cellpath-header.png",
    price: "Licensing POA", priceNote: "consulting from project-based",
    short: "We produce any cell, at scale and in detail, for training and for distribution to your clients. Bring your mechanism of action to life.",
    impact: "Turns your mechanism of action into accurate, sharable visuals.",
    how: "We build detailed cell and mechanism-of-action assets for you. Use them for internal training and to distribute to clients. Consulting can be one-on-one, with a team, or a full review of how these visuals are used across your products and your company.",
    benefits: [
      "Accurate, detailed cell and mechanism-of-action visuals",
      "For internal training and client distribution",
      "Consulting one-on-one, for a team, or company-wide",
      "A review of how visuals are used across your products",
    ],
    link: "https://cellmap-colonocyte.vercel.app",
  },
  {
    key: "medwareai", group: "educate", title: "Medware AI", aud: "Doctors, in the surgery", status: "dev",
    img: "/Medwareai.png",
    price: "Per-clinic licensing POA", priceNote: "",
    short: "Our offline medical companion for doctor surgeries. AI assistance that stays inside the practice, for clinics with privacy concerns about cloud tools.",
    impact: "Gives you a presence in clinics that will not touch cloud AI.",
    how: "A medical AI companion that runs offline inside the surgery, so patient data never leaves the practice. Built for privacy-sensitive and regulated settings where cloud LLM tools are a non-starter.",
    benefits: [
      "A presence in clinics that avoid cloud AI",
      "Data stays on-site",
      "Built for regulated, privacy-sensitive settings",
    ],
    link: "https://medware.com.au",
  },
  {
    key: "audience-participation", group: "educate", title: "Medware Audience Participation", aud: "Your symposia, advisory boards and meetings", status: "live",
    img: "/audience.jpg",
    price: "Sponsorship POA", priceNote: "per-event or annual licence",
    short: "Live polling and audience sentiment for symposia, advisory boards and conference sessions. The room answers on their phones and the result is on screen in seconds.",
    impact: "Tells you what the room actually thought, while you are still in it.",
    how: "Attendees join from their own phone with no app install. Polls, ratings and free-text sentiment are pushed live during the session and displayed on screen as they land, then exported as a report once the session ends. Your sponsored session stops producing an attendance list and starts producing a record of what the audience thought.",
    benefits: [
      "A live read on the room during your sponsored session",
      "No app install for attendees",
      "Sentiment and polling exported as a post-session report",
      "Built for symposia, advisory boards and conference sessions",
    ],
    link: "https://medware.com.au",
  },
  // ---- PATIENTS ----
  {
    key: "medflow-patient", group: "patients", title: "Medflow Patient", aud: "Patients", status: "live",
    img: "/industry/medflow-patient-header.png",
    price: "From $20/clinic/month + $2/patient", priceNote: "white-label POA, app $399 one-off per clinic",
    short: "The Medflow patient offering, in two flavours. Drop your company information into the Hub that clinics send out, or, if you have no app of your own, we white-label the whole thing for you.",
    impact: "Gets your content into what clinics already send patients.",
    how: "The Hub holds the content clinics send to patients, and the Patient App is what patients use. You can simply place your company information inside the Hub as part of what clinics send out, or have us white-label the entire offering so it becomes your own patient app and system.",
    benefits: [
      "Your content inside what clinics already send patients",
      "Full white-label option if you have no app of your own",
      "The Hub for clinic-delivered content, the App for patients",
      "Globally applicable, no PBS dependency",
    ],
    link: "https://hub.medflow.com.au",
  },
  {
    key: "medprep-clinic", group: "patients", title: "MedPrep Clinic", aud: "Gastroenterology clinics", status: "live",
    img: "/1-medprep-clinic.jpg",
    price: "$20 per clinic per month", priceNote: "pairs with MedPrep Patient at $2 per delivery",
    short: "The clinician dashboard behind MedPrep. Gastroenterologists can see who is actually following their prep instructions, before the patient is in theatre.",
    impact: "Turns prep adherence into something you can see rather than assume.",
    how: "The dashboard tracks each patient’s prep compliance in real time, with no change to the clinic’s existing protocol — it wraps the clinic’s own guidelines and integrates with booking systems. Paired with MedPrep Patient, a sponsor placing a prep product gets adherence evidence rather than an assumption.",
    benefits: [
      "Real-time view of patient prep compliance",
      "Fewer failed colonoscopies and repeat bookings",
      "No change to the clinic’s existing protocol",
      "Adherence evidence for a sponsored prep product",
    ],
    link: "https://medprep.app",
  },
  // ---- DATA ----
  {
    key: "medflow-metrix", group: "data", title: "Medflow Metrics", aud: "Built for industry", status: "live",
    img: "/1-medflow-metrics.jpg",
    price: "$20 per seat per month", priceNote: "",
    short: "Build your own live view of the PBS market. Real Medflow data plus market intelligence, ideal for entering a market or tracking your own activity and marketing in detail.",
    impact: "Gives you a live, detailed picture of your market and your activity.",
    how: "Metrics lets you create your own view of PBS data. It includes Medflow data and information about your market. Use it when walking into a market, to track your activity in Medflow, or to watch your marketing activity in a more detailed, live setting.",
    benefits: [
      "Your own market view built on PBS data",
      "Includes Medflow data and market context",
      "Track your activity and marketing live",
      "Ideal for market entry or ongoing monitoring",
    ],
    link: "https://metrics.medflow.com.au",
  },
  {
    key: "doctor-db", group: "data", title: "Medware CRM", aud: "Your sales and marketing teams", status: "live",
    img: "/Medware-CRM.jpg",
    price: "Per-seat subscription", priceNote: "or per-list licensing for database-only access",
    short: "The doctor database, campaign email and pipeline in one system. Mailchimp’s and HubSpot’s jobs, sitting on verified Australian and US physician data.",
    impact: "Puts targeting, campaigns and pipeline on the same records.",
    how: "Combines the verified Australian and US physician database with campaign email and CRM pipeline in a single system, and integrates with the software your commercial team already runs. Segment by specialty, region and practice, run the campaign, then track the result against the same records the segment came from.",
    benefits: [
      "Verified Australian and US physician data as the foundation",
      "Campaign email and pipeline on the same records",
      "Segment by specialty, region and practice",
      "License the full CRM, or just the list",
    ],
    link: "https://medware.com.au",
  },
  {
    key: "survey-research", group: "data", title: "Medware Survey & Research", aud: "Your market research and medical teams", status: "live",
    img: "/Medware-surevy.jpg",
    price: "Per-project or annual licence POA", priceNote: "sponsorable",
    short: "A survey and research platform built for healthcare audiences, rather than a consumer tool bent to fit. Design the study, distribute it, and analyse the results.",
    impact: "Runs your healthcare research on a platform actually built for it.",
    how: "Build the instrument with question logic and branching, distribute it to a target audience, and watch the results arrive live. Responses filter and segment by specialty, region and respondent type, and export for analysis or reporting. Built for clinical audiences, verified respondents and the data-handling standards healthcare expects.",
    benefits: [
      "Question logic and branching built for clinical instruments",
      "Segment responses by specialty, region and respondent type",
      "Live results, with export for analysis and reporting",
      "Distribution to a verified healthcare audience",
    ],
    link: "https://medware.com.au",
  },
  {
    key: "practice-referral", group: "data", title: "Practice Referral", aud: "Your US specialty teams", status: "soon",
    img: "/1-medware-referral.jpg",
    price: "$299 one-time + $99/year", priceNote: "data refresh; team licensing POA",
    short: "Maps a US specialist’s referral network from CMS Medicare data, then generates targeted outreach campaigns to the GPs worth winning.",
    impact: "Shows who refers to your specialists, and who refers elsewhere.",
    how: "Built on CMS Medicare shared-patient data, NPPES records and network graph analysis. It maps the referral network around a specialist, ranks referrer influence, surfaces competitor patterns, and generates dollar-valued outreach campaigns to the referrers worth pursuing.",
    benefits: [
      "Referral network mapping from real CMS Medicare data",
      "Ranks referrer influence and surfaces competitor patterns",
      "Generates dollar-valued outreach campaigns",
      "Covers roughly 100,000 US specialist physicians",
    ],
    link: "https://practicereferral.net",
  },
  // ---- TEAM ----
  {
    key: "relay", group: "team", title: "Relay", aud: "Your field team", status: "soon",
    img: "/industry/relay-header.png",
    price: "Per-seat subscription POA", priceNote: "",
    short: "For teams who want to record their calls right after a meeting, while it is all still fresh.",
    impact: "Captures every field call the moment your reps leave the room.",
    how: "After a rep has been to a meeting, Relay lets them record the call quickly so nothing is lost. Built for a whole field team.",
    benefits: ["Quick call capture straight after meetings", "Built for field teams", "Per-seat across your whole force"],
    link: "https://medware-antidote-relay.netlify.app",
  },
  {
    key: "earpiece", group: "team", title: "Earpiece", aud: "Individuals and teams", status: "soon",
    img: "/industry/EarPiece-header.png",
    price: "Per-seat subscription POA", priceNote: "",
    short: "A personal recall tool for high-stakes meetings, so nothing important slips through.",
    impact: "Keeps total recall of the meetings that matter most.",
    how: "A personal device and tool for moments where immediate recall matters. Useful for reps and anyone in high-stakes conversations.",
    benefits: ["Personal recall for high-stakes meetings", "Works for individuals or a whole team"],
    link: "https://earpiece-landing.vercel.app",
  },
  {
    key: "constellation", group: "team", title: "Constellation", aud: "Any team or solo operator", status: "live",
    img: "/industry/constellation-header.png",
    price: "POA", priceNote: "",
    short: "Embed Constellation to run an incredibly efficient operation. Brilliant for a one-person business, and it slots into any IT setup.",
    impact: "Makes a lean team run like a much larger one.",
    how: "Constellation is built for companies that want to be highly efficient. It is especially powerful for a one-person operation, but it embeds into any IT setup.",
    benefits: ["Run a far more efficient operation", "Ideal for one-person and small teams", "Embeds into any existing IT setup"],
    link: "https://medware.com.au",
  },
  {
    key: "adsafe", group: "team", title: "AdSafe", aud: "A free service for your customers", status: "live",
    img: "/1-medware-adsafe.jpg",
    price: "Sponsor a specialty POA", priceNote: "clinic plans from $79/month",
    short: "Free compliance checks you can offer your customers. AdSafe checks website and advertising compliance, which matters right now with the regulator cracking down.",
    impact: "Lets you hand clinics a timely free service, with your brand on it.",
    how: "AdSafe checks compliance for clinic websites and advertising. You can sponsor it for a specialty or sub-specialty and hand out codes in specialist clinics, so those clinics get free compliance checks courtesy of your brand. Timely given the current crackdown on health advertising.",
    benefits: [
      "Offer your customers free compliance checks",
      "Sponsor a specialty or sub-specialty",
      "Hand out codes in specialist clinics",
      "Timely with the current advertising crackdown",
    ],
    link: "https://medware.com.au",
  },
  {
    key: "medcast-industry", group: "team", title: "Medcast Industry App", aud: "Your people", status: "free",
    img: "/medcast-industry.jpg",
    price: "Free", priceNote: "no charge to use",
    short: "A free app for industry. Keep your people across what is happening, at no charge. Just use it.",
    impact: "A no-cost way to keep your team across the industry.",
    how: "The industry portal carries no charge. Your people can simply use it to stay across what is happening.",
    benefits: ["Completely free to use", "Keeps your team across the industry", "No commitment"],
    link: "https://industry.medcast.media",
  },
  {
    key: "ai-training", group: "team", title: "AI Training", aud: "Your commercial and operations teams", status: "live",
    img: "/1-medware-training.jpg",
    price: "Project-based", priceNote: "scales with team size and scope",
    short: "Enterprise AI training built around your team’s actual workflows, with pre and post KPIs so you can prove the productivity gain in dollars.",
    impact: "Makes AI adoption stick, and proves the return on it.",
    how: "A pre-assessment identifies the real time-sinks per role, then training is tailored to those workflows rather than generic prompt engineering. Pre and post KPIs measure time-on-task improvement, so the ROI is a number rather than a claim. Delivered to sales, medical and operations teams.",
    benefits: [
      "Tailored to your team’s real workflows, not generic prompting",
      "Pre-assessment identifies the actual time-sinks per role",
      "Pre/post KPIs prove ROI in dollars",
      "Delivered to sales, medical and operations teams",
    ],
    link: "https://medwareadvisory.com",
  },
  {
    key: "bespoke", group: "team", title: "Bespoke builds and AI", aud: "Any team, any idea", status: "live",
    img: "/industry/ma-header.png",
    price: "Project-based", priceNote: "the most affordable healthcare software agency, by a considerable margin",
    short: "Need something that does not exist yet? We build any technology for anything, with an incredibly quick turnaround and high quality, and we can advise and embed AI across your team.",
    impact: "Builds whatever you need, fast, and cheaper than anyone in health.",
    how: "Tell us the problem and we will build the technology for it, whatever it is. Our turnaround is incredibly quick and the quality is high. We are, by a considerable margin, the most affordable software technology agency in the healthcare space, and we also advise on and embed AI.",
    benefits: [
      "Any technology, for any use case",
      "Incredibly quick turnaround",
      "High quality builds",
      "The cheapest healthcare software agency by a considerable margin",
      "AI advisory and embedding",
    ],
    link: "https://medware.com.au",
  },
];

export interface Department {
  key: string;
  label: string;
  products: string[];
  read: string;
}

export const DEPARTMENTS: Department[] = [
  { key: "brand", label: "Brand / Product Marketing", products: ["medflow-clinic", "medcast-sponsor", "medprep", "medcast-hcp", "medflow-patient", "conference-app", "medwayfinder"], read: "As a brand or marketing lead, your fastest wins are putting your brand where doctors actually prescribe and owning a channel to the specialists who write your scripts. Medflow Clinic places you at the point of prescribing with notifications and automatic program enrolment, while the Medcast Sponsor Portal gives you a measurable line straight to a specialty." },
  { key: "medical", label: "Medical Affairs / Medical Education", products: ["cellmap", "medcast-hcp", "pbs-script", "medwareai", "audience-participation", "conference-app"], read: "For medical affairs, the value is getting accurate education and decision support into clinicians’ hands through tools they already trust. CellMap turns your mechanism of action into precise visuals for training and distribution, and the Medcast Specialist App and PBS Script Generator put genuine clinical utility, and your brand, in front of doctors." },
  { key: "access", label: "Market Access", products: ["medflow-clinic", "pbs-script", "medflow-metrix"], read: "For market access, the leverage is in smoothing the PBS authority and scripting pathway for your therapy and then watching uptake. Medflow Clinic streamlines authority applications and the Script Generator removes wording errors for complex biologics, while Metrics shows you the market response in real time." },
  { key: "sales", label: "Sales / Field Force", products: ["relay", "earpiece", "constellation", "doctor-db", "medflow-metrix", "practice-referral"], read: "For a field team, the difference is capturing every call and targeting the right doctors. Relay and Earpiece make sure nothing from a meeting is lost, Medware CRM sharpens your targeting, and Metrics shows you where your activity is landing." },
  { key: "patient", label: "Patient Support / Programs", products: ["medflow-patient", "medprep", "medprep-clinic", "medflow-clinic", "medwayfinder"], read: "For patient support, the win is enrolling and supporting patients with far less effort from the clinic. Medflow Clinic can enrol patients into your programs automatically, the Medflow patient Hub and App carry your content or run white-labelled as your own, and MedPrep guides patients through procedure prep." },
  { key: "insights", label: "Market Research / Insights", products: ["medflow-metrix", "doctor-db", "survey-research", "audience-participation", "practice-referral"], read: "For insights, the value is building your own live picture of the PBS market and your place in it. Metrics lets you create a market view on real Medflow and PBS data, and Medware CRM gives you the underlying targeting layer." },
  { key: "digital", label: "Digital / Innovation / IT", products: ["constellation", "bespoke", "medwareai", "medflow-clinic", "ai-training"], read: "For digital and innovation, the opportunity is embedding efficient tooling and building exactly what you need. Constellation makes a lean team run like a large one, our bespoke build service ships any technology fast and affordably, and Medware AI brings offline AI into privacy-sensitive clinics." },
  { key: "compliance", label: "Compliance / Regulatory", products: ["adsafe", "bespoke", "ai-training"], read: "For compliance, the timely move is offering your customers free compliance checks while the regulator is cracking down on health advertising. AdSafe lets you sponsor a specialty and hand clinics free checks under your brand." },
  { key: "commercial", label: "Commercial / General", products: ["medflow-clinic", "medcast-sponsor", "medflow-metrix", "bespoke"], read: "Across a commercial remit, the strongest combination is reaching prescribers, owning a channel to your specialty, and tracking the market live, with a build partner on hand for anything custom." },
];

export const BY_KEY: Record<string, IndustryProduct> = Object.fromEntries(PRODUCTS.map((p) => [p.key, p]));

export function initials(t: string): string {
  return t
    .replace(/[^A-Za-z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
