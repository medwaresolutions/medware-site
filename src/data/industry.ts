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
    key: "medflow-clinic", group: "promote", title: "Medflow Clinic", aud: "Used by doctors", status: "live",
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
    key: "medcast-sponsor", group: "promote", title: "Medcast Sponsored Channel", aud: "Reaches specialists, run by you", status: "live",
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
    key: "medprep", group: "promote", title: "MedPrep", aud: "Patients and gastro clinics", status: "live",
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
  // ---- EDUCATE ----
  {
    key: "medcast-hcp", group: "educate", title: "Medcast HCP App", aud: "Doctors, on iPhone and web", status: "live",
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
    img: null,
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
    key: "medwareai", group: "educate", title: "MedwareAI", aud: "Doctors, in the surgery", status: "dev",
    img: "/1-medflow-offline.jpg",
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
    key: "doctor-db", group: "data", title: "Doctor Database (AU and US)", aud: "Your sales and marketing teams", status: "live",
    img: null,
    price: "Per-list or full-database licensing POA", priceNote: "",
    short: "Target the right clinicians with a current database of doctors across Australia and the United States.",
    impact: "Sharpens your targeting with current AU and US doctor data.",
    how: "License a focused list or the full database to support sales and marketing targeting across Australia and the US.",
    benefits: [
      "Accurate targeting for sales and marketing",
      "Australia and United States coverage",
      "License a single list or the full database",
    ],
    link: "https://medware.com.au",
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
  { key: "brand", label: "Brand / Product Marketing", products: ["medflow-clinic", "medcast-sponsor", "medprep", "medcast-hcp", "medflow-patient"], read: "As a brand or marketing lead, your fastest wins are putting your brand where doctors actually prescribe and owning a channel to the specialists who write your scripts. Medflow Clinic places you at the point of prescribing with notifications and automatic program enrolment, while a Medcast Sponsored Channel gives you a measurable line straight to a specialty." },
  { key: "medical", label: "Medical Affairs / Medical Education", products: ["cellmap", "medcast-hcp", "pbs-script", "medwareai"], read: "For medical affairs, the value is getting accurate education and decision support into clinicians’ hands through tools they already trust. CellMap turns your mechanism of action into precise visuals for training and distribution, and the Medcast HCP app and PBS Script Generator put genuine clinical utility, and your brand, in front of doctors." },
  { key: "access", label: "Market Access", products: ["medflow-clinic", "pbs-script", "medflow-metrix"], read: "For market access, the leverage is in smoothing the PBS authority and scripting pathway for your therapy and then watching uptake. Medflow Clinic streamlines authority applications and the Script Generator removes wording errors for complex biologics, while Metrics shows you the market response in real time." },
  { key: "sales", label: "Sales / Field Force", products: ["relay", "earpiece", "constellation", "doctor-db", "medflow-metrix"], read: "For a field team, the difference is capturing every call and targeting the right doctors. Relay and Earpiece make sure nothing from a meeting is lost, the Doctor Database sharpens your targeting, and Metrics shows you where your activity is landing." },
  { key: "patient", label: "Patient Support / Programs", products: ["medflow-patient", "medprep", "medflow-clinic"], read: "For patient support, the win is enrolling and supporting patients with far less effort from the clinic. Medflow Clinic can enrol patients into your programs automatically, the Medflow patient Hub and App carry your content or run white-labelled as your own, and MedPrep guides patients through procedure prep." },
  { key: "insights", label: "Market Research / Insights", products: ["medflow-metrix", "doctor-db"], read: "For insights, the value is building your own live picture of the PBS market and your place in it. Metrics lets you create a market view on real Medflow and PBS data, and the Doctor Database gives you the underlying targeting layer." },
  { key: "digital", label: "Digital / Innovation / IT", products: ["constellation", "bespoke", "medwareai", "medflow-clinic"], read: "For digital and innovation, the opportunity is embedding efficient tooling and building exactly what you need. Constellation makes a lean team run like a large one, our bespoke build service ships any technology fast and affordably, and MedwareAI brings offline AI into privacy-sensitive clinics." },
  { key: "compliance", label: "Compliance / Regulatory", products: ["adsafe", "bespoke"], read: "For compliance, the timely move is offering your customers free compliance checks while the regulator is cracking down on health advertising. AdSafe lets you sponsor a specialty and hand clinics free checks under your brand." },
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
