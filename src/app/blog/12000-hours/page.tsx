import type { Metadata } from "next";
import ArticleContent from "./ArticleContent";

export const metadata: Metadata = {
  title: "What I Learned After 12,000 Hours with AI — Medware Solutions",
  description: "Practical lessons from 12,000+ hours of daily AI use. No hype, no jargon — just what works.",
};

export default function BlogPost() {
  return <ArticleContent />;
}
