"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { Card } from "@/components/ds";
import { LegalDialog, type LegalDoc } from "@/components/sections/dialogs";
import { mwWrap, formatPostDateLong } from "@/components/sections/shared";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
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

function fmtDate(value: string): string {
  return formatPostDateLong(value);
}

function CategoryDate({ category, date }: { category: string | null; date: string }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
      {category ? (
        <span
          className="md-typescale-label-medium"
          style={{ color: "var(--md-sys-color-primary)", textTransform: "uppercase", letterSpacing: 0.8 }}
        >
          {category}
        </span>
      ) : null}
      <span className="md-typescale-label-medium" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
        {date}
      </span>
    </div>
  );
}

export default function BlogFeed({ posts }: { posts: Post[] }) {
  const [legal, setLegal] = useState<LegalDoc | null>(null);
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <Header />
      <main style={{ ...mwWrap, padding: "56px 24px 80px" }}>
        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 48px" }}>
          <span
            className="md-typescale-title-small"
            style={{ color: "var(--md-sys-color-primary)", textTransform: "uppercase", letterSpacing: 1 }}
          >
            The Signal
          </span>
          <h1 className="md-typescale-display-small" style={{ margin: "8px 0 12px", color: "var(--md-sys-color-on-surface)" }}>
            Marketing + Code
          </h1>
          <p className="md-typescale-body-large" style={{ margin: 0, color: "var(--md-sys-color-on-surface-variant)" }}>
            Practical writing on AI, health tech, and building — straight from the trenches.
          </p>
        </div>

        {posts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p className="md-typescale-body-large" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
              No posts published yet. Check back soon.
            </p>
          </div>
        ) : (
          <>
            {featured ? (
              <Link href={`/blog/${featured.slug}`} style={{ textDecoration: "none", display: "block", marginBottom: 32 }}>
                <Card variant="outlined" interactive style={{ overflow: "hidden" }}>
                  <div className="mw-co-head" style={{ display: "grid", gridTemplateColumns: featured.cover_image ? "1.2fr 1fr" : "1fr" }}>
                    {featured.cover_image ? (
                      <div style={{ position: "relative", minHeight: 280, background: "var(--md-sys-color-surface-container)" }} className="mw-co-img">
                        <img
                          src={featured.cover_image}
                          alt={featured.title}
                          fetchPriority="high"
                          decoding="async"
                          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                    ) : null}
                    <div style={{ padding: 32, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <CategoryDate category={featured.category} date={fmtDate(featured.published_at ?? featured.created_at)} />
                      <h2
                        className="md-typescale-headline-medium"
                        style={{ margin: "0 0 12px", color: "var(--md-sys-color-on-surface)" }}
                      >
                        {featured.title}
                      </h2>
                      {featured.excerpt ? (
                        <p
                          className="md-typescale-body-large"
                          style={{ margin: "0 0 16px", color: "var(--md-sys-color-on-surface-variant)" }}
                        >
                          {featured.excerpt}
                        </p>
                      ) : null}
                      <div className="md-typescale-label-medium" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
                        {featured.author_name ?? "Matt Martin"} · {estimateReadTime(featured.content)} min read
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ) : null}

            {rest.length > 0 ? (
              <div className="mw-3grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                {rest.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                    <Card
                      variant="outlined"
                      interactive
                      style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}
                    >
                      {post.cover_image ? (
                        <div style={{ height: 168, background: "var(--md-sys-color-surface-container)", overflow: "hidden" }}>
                          <img
                            src={post.cover_image}
                            alt={post.title}
                            loading="lazy"
                            decoding="async"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                      ) : null}
                      <div style={{ padding: 20, display: "flex", flexDirection: "column", flex: 1 }}>
                        <CategoryDate category={post.category} date={fmtDate(post.published_at ?? post.created_at)} />
                        <h3
                          className="md-typescale-title-large"
                          style={{ margin: "0 0 8px", color: "var(--md-sys-color-on-surface)" }}
                        >
                          {post.title}
                        </h3>
                        {post.excerpt ? (
                          <p
                            className="md-typescale-body-medium mw-clamp3"
                            style={{ margin: "0 0 16px", color: "var(--md-sys-color-on-surface-variant)" }}
                          >
                            {post.excerpt}
                          </p>
                        ) : null}
                        <div
                          className="md-typescale-label-medium"
                          style={{
                            marginTop: "auto",
                            paddingTop: 12,
                            borderTop: "1px solid var(--md-sys-color-outline-variant)",
                            color: "var(--md-sys-color-on-surface-variant)",
                          }}
                        >
                          {post.author_name ?? "Matt Martin"} · {estimateReadTime(post.content)} min read
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : null}
          </>
        )}
      </main>
      <Footer onOpenLegal={setLegal} />
      <LegalDialog doc={legal} onClose={() => setLegal(null)} />
    </>
  );
}
