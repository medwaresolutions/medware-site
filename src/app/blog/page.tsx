import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import BlogFeed from "@/components/BlogFeed";

export const metadata: Metadata = {
  title: "The Signal — Marketing + Code | Medware Solutions",
  description:
    "Insights on AI, health tech, marketing, and engineering from the team at Medware Solutions.",
};

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  return <BlogFeed posts={posts ?? []} />;
}
