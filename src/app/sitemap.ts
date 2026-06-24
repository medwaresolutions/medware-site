import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const SITE_URL = "https://medware.com.au";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/industry`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
  ];

  // Add each published blog post. Falls back to the static routes if Supabase
  // is unreachable at build/runtime.
  try {
    const supabase = await createClient();
    const { data: posts } = await supabase
      .from("posts")
      .select("slug, updated_at, published_at")
      .eq("published", true)
      .order("published_at", { ascending: false });

    for (const p of posts ?? []) {
      routes.push({
        url: `${SITE_URL}/blog/${p.slug}`,
        lastModified: p.updated_at ?? p.published_at ?? undefined,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  } catch {
    /* Supabase unavailable — return static routes only. */
  }

  return routes;
}
