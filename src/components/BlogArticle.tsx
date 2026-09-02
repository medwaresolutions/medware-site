"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ds";
import { LegalDialog, type LegalDoc } from "@/components/sections/dialogs";
import { formatPostDateLong } from "@/components/sections/shared";
import ProseContent from "@/components/prose/ProseContent";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  category: string | null;
  cover_image: string | null;
  author_name: string | null;
  published_at: string | null;
  created_at: string;
}

function estimateReadTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogArticle({ post }: { post: Post }) {
  const [legal, setLegal] = useState<LegalDoc | null>(null);
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    `https://medware.com.au/blog/${post.slug}`,
  )}`;
  const dateStr = formatPostDateLong(post.published_at ?? post.created_at);

  return (
    <>
      <Header />
      <article style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px 64px" }}>
        <header style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
            {post.category ? (
              <span
                className="md-typescale-label-medium"
                style={{ color: "var(--md-sys-color-primary)", textTransform: "uppercase", letterSpacing: 0.8 }}
              >
                {post.category}
              </span>
            ) : null}
            <span className="md-typescale-label-medium" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
              {dateStr}
            </span>
          </div>
          <h1 className="md-typescale-display-small" style={{ margin: "0 0 16px", color: "var(--md-sys-color-on-surface)" }}>
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="md-typescale-body-large" style={{ margin: "0 0 16px", color: "var(--md-sys-color-on-surface-variant)" }}>
              {post.excerpt}
            </p>
          ) : null}
          <div className="md-typescale-label-large" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
            By {post.author_name ?? "Matt Martin"} · {estimateReadTime(post.content)} min read
          </div>
        </header>

        {post.cover_image ? (
          <img
            src={post.cover_image}
            alt={post.title}
            fetchPriority="high"
            decoding="async"
            style={{
              width: "100%",
              borderRadius: "var(--md-sys-shape-corner-extra-large)",
              border: "1px solid var(--md-sys-color-outline-variant)",
              marginBottom: 32,
              display: "block",
            }}
          />
        ) : null}

        <ProseContent content={post.content} />

        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: "1px solid var(--md-sys-color-outline-variant)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/blog"
            className="md-typescale-label-large mw-contact-link"
            style={{ color: "var(--md-sys-color-on-surface-variant)", textDecoration: "none" }}
          >
            ← Back to The Signal
          </Link>
          <Button variant="outlined" href={linkedInShareUrl} target="_blank" rel="noopener noreferrer" icon="share">
            Share on LinkedIn
          </Button>
        </div>
      </article>
      <Footer onOpenLegal={setLegal} />
      <LegalDialog doc={legal} onClose={() => setLegal(null)} />
    </>
  );
}
