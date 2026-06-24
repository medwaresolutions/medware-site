import type { Metadata } from "next";
import IndustryPage from "@/components/industry/IndustryPage";

export const metadata: Metadata = {
  title: "Medware Group — Solutions for Industry",
  description:
    "The Medware Group portfolio for pharmaceutical partners. Reach doctors and patients, understand your market, and equip your team — in one place.",
};

export default function IndustryRoute() {
  return <IndustryPage />;
}
