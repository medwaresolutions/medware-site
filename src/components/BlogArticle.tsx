"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ds";
import { LegalDialog, type LegalDoc } from "@/components/sections/dialogs";
import { formatPostDateLong } from "@/components/sections/shared";

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

function renderMarkdown(content: string) {
  // Raw HTML passthrough blocks
  let html = content.replace(/:::html\n([\s\S]*?)\n:::/g, (_, inner) => inner);

  // Media shortcodes
  html = html.replace(/^::image\[(.+)\]$/gim, '<img src="$1" alt="" class="mw-prose-media" />');
  html = html.replace(/^::video\[(.+)\]$/gim, '<video src="$1" controls class="mw-prose-media"></video>');
  html = html.replace(/^::audio\[(.+)\]$/gim, '<audio src="$1" controls style="width:100%;margin:24px 0;"></audio>');
  html = html.replace(
    /^::iframe\[(.+)\]$/gim,
    '<div class="mw-embed"><iframe src="$1" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>',
  );

  html = html
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^---$/gim, "<hr />")
    .replace(/^- (.*$)/gim, "<li>$1</li>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  html = html.replace(/((<li.*<\/li>\n?)+)/g, "<ul>$1</ul>");

  const lines = html.split("\n");
  const result: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("<")) {
      result.push(`<p>${trimmed}</p>`);
    } else {
      result.push(line);
    }
  }

  return result.join("\n");
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
            style={{
              width: "100%",
              borderRadius: "var(--md-sys-shape-corner-extra-large)",
              border: "1px solid var(--md-sys-color-outline-variant)",
              marginBottom: 32,
              display: "block",
            }}
          />
        ) : null}

        <div className="mw-prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />

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
