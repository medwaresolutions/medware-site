"use client";

import { Button, Card } from "@/components/ds";
import { mwWrap, formatPostDate } from "./shared";

export interface SignalPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  published_at: string | null;
  category: string | null;
}

export default function SignalTeaser({ posts }: { posts: SignalPost[] }) {
  return (
    <section id="signal" style={{ ...mwWrap, padding: "80px 24px" }}>
      <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 44px" }}>
        <span
          className="md-typescale-title-small"
          style={{ color: "var(--md-sys-color-primary)", textTransform: "uppercase", letterSpacing: 1 }}
        >
          The Signal
        </span>
        <h2 className="md-typescale-headline-large" style={{ margin: "8px 0 12px", color: "var(--md-sys-color-on-surface)" }}>
          Latest from the blog
        </h2>
        <p className="md-typescale-body-large" style={{ margin: 0, color: "var(--md-sys-color-on-surface-variant)" }}>
          Practical writing on AI, health tech, and building — straight from the trenches.
        </p>
      </div>

      {posts.length > 0 ? (
        <div
          className="mw-3grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 36 }}
        >
          {posts.map((p) => (
            <a key={p.id} href={`/blog/${p.slug}`} style={{ textDecoration: "none" }}>
              <Card
                variant="outlined"
                interactive
                style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}
              >
                <div style={{ height: 168, background: "var(--md-sys-color-surface-container)", overflow: "hidden" }}>
                  {p.cover_image ? (
                    <img src={p.cover_image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : null}
                </div>
                <div style={{ padding: 20, display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                    {p.category ? (
                      <span
                        className="md-typescale-label-medium"
                        style={{ color: "var(--md-sys-color-primary)", textTransform: "uppercase", letterSpacing: 0.8 }}
                      >
                        {p.category}
                      </span>
                    ) : null}
                    <span className="md-typescale-label-medium" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
                      {formatPostDate(p.published_at)}
                    </span>
                  </div>
                  <h3
                    className="md-typescale-title-large"
                    style={{ margin: "0 0 8px", color: "var(--md-sys-color-on-surface)" }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="md-typescale-body-medium mw-clamp3"
                    style={{ margin: 0, color: "var(--md-sys-color-on-surface-variant)" }}
                  >
                    {p.excerpt}
                  </p>
                </div>
              </Card>
            </a>
          ))}
        </div>
      ) : null}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="tonal" href="/blog" trailingIcon="arrow_forward">
          Read The Signal
        </Button>
      </div>
    </section>
  );
}
