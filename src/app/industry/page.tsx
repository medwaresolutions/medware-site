import type { Metadata } from "next";
import IndustryPage from "@/components/industry/IndustryPage";

const DESC =
  "The Medware Group portfolio for pharmaceutical partners. Reach doctors and patients, understand your market, and equip your team — in one place.";

export const metadata: Metadata = {
  title: "Medware Group — Solutions for Industry",
  description: DESC,
  alternates: { canonical: "/industry" },
  openGraph: { title: "Medware Group — Solutions for Industry", description: DESC, url: "/industry" },
};

export default function IndustryRoute() {
  return <IndustryPage />;
}
