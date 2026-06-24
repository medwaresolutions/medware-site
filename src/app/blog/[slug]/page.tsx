import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/BlogArticle";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Preserve the old static route
  if (slug === "12000-hours") {
    return {
      title: "What I Learned After 12,000 Hours with AI — Medware Solutions",
      description:
        "Practical lessons from 12,000+ hours of daily AI use. No hype, no jargon — just what works.",
    };
  }

  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("title, excerpt, cover_image, published_at")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) {
    return { title: "Post Not Found — The Signal" };
  }

  const description = post.excerpt ?? `Read "${post.title}" on The Signal.`;
  return {
    title: `${post.title} — The Signal | Medware Solutions`,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: `/blog/${slug}`,
      ...(post.published_at ? { publishedTime: post.published_at } : {}),
      ...(post.cover_image ? { images: [{ url: post.cover_image }] } : {}),
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Keep the existing 12000-hours article working as a static page
  if (slug === "12000-hours") {
    const { default: ArticleContent } = await import(
      "@/components/ArticleContent12000Hours"
    );
    return <ArticleContent />;
  }

  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) {
    notFound();
  }

  return <BlogArticle post={post} />;
}
