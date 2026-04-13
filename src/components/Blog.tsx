"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "./SectionWrapper";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  published_at: string | null;
  category: string | null;
}

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Blog({ posts }: { posts: Post[] }) {
  return (
    <SectionWrapper
      id="blog"
      style={{ background: "radial-gradient(ellipse at bottom left, rgba(16,185,129,0.12), transparent 65%)" }}
    >
      <div className="text-center mb-12">
        <span className="text-xs text-[#3B82F6] font-semibold uppercase tracking-wider">
          The Signal
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
          Latest from the blog
        </h2>
        <p className="text-[#9CA3AF] max-w-xl mx-auto">
          Practical writing on AI, health tech, and building — straight from the
          trenches.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-[#9CA3AF]">
          New posts coming soon.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden hover:border-[#3B82F6]/50 transition-all duration-300"
              >
                <div className="relative w-full h-48 overflow-hidden bg-[#0a0a1a]">
                  <Image
                    src={post.cover_image || "/1-medware-blog.png"}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/60 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 text-xs text-[#6B7280]">
                    {post.category && (
                      <span className="text-[#3B82F6] font-semibold uppercase tracking-wider">
                        {post.category}
                      </span>
                    )}
                    {post.published_at && <span>{formatDate(post.published_at)}</span>}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-[#3B82F6] transition-colors duration-200">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-sm text-[#9CA3AF] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#3B82F6] hover:bg-[#2563EB] rounded-lg text-sm font-medium text-[#F9FAFB] transition-all duration-200"
        >
          View The Signal
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
        </Link>
      </div>
    </SectionWrapper>
  );
}
