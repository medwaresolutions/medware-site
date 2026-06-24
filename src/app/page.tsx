import SiteShell from "@/components/SiteShell";
import type { SignalPost } from "@/components/sections/SignalTeaser";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, cover_image, published_at, category")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(3);

  return <SiteShell posts={(posts ?? []) as SignalPost[]} />;
}
