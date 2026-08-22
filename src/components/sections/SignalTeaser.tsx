"use client";

import { Button, Card } from "@/components/ds";
import { useInView } from "@/lib/useInView";
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
  const { ref: gridRef, shown } = useInView<HTMLDivElement>(0.15);

  /* Dark band on the brand gradient — the same ground as the header and hero,
     so the blog reads as its own zone between the products grid and About.
     `.dark` is scoped to the copy blocks rather than the whole section: the
     headings need light-on-dark roles, but the post cards should keep their
     light bodies against the band. */
  return (
    <section id="signal" className="mw-hero-bg" style={{ position: "relative" }}>
      <div style={{ ...mwWrap, position: "relative", zIndex: 1, padding: "80px 24px" }}>
      <div className="dark" style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 44px" }}>
        <span
          className="md-typescale-title-small"
          style={{ color: "var(--md-sys-color-primary)", textTransform: "uppercase", letterSpacing: 1 }}
        >
          The Signal
        </span>
        <h2
          className="md-typescale-headline-large"
          style={{ margin: "8px 0 12px", color: "var(--md-sys-color-on-surface)", fontWeight: 700 }}
        >
          Latest from the blog
        </h2>
        <p
          className="md-typescale-body-large"
          style={{ margin: 0, color: "var(--md-sys-color-on-surface-variant)" }}
        >
          Practical writing on AI, health tech, and building — straight from the trenches.
        </p>
      </div>

      {posts.length > 0 ? (
        <div
          ref={gridRef}
          className={`mw-3grid mw-rise${shown ? " is-in" : ""}`}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 36 }}
        >
          {posts.map((p) => (
            <a key={p.id} href={`/blog/${p.slug}`} style={{ textDecoration: "none" }}>
              {/* Elevated, not outlined: outline-variant is a light grey, which
                  reads as a white keyline against the dark band. */}
              <Card
                variant="elevated"
                interactive
                style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}
              >
                <div style={{ height: 168, background: "var(--md-sys-color-surface-container)", overflow: "hidden" }}>
                  {p.cover_image ? (
                    <img
                      src={p.cover_image}
                      alt={p.title}
                      loading="lazy"
                      decoding="async"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
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

      <div className="dark" style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="filled" href="/blog" trailingIcon="arrow_forward">
          Read The Signal
        </Button>
      </div>
      </div>
    </section>
  );
}
