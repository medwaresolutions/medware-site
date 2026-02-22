"use client";

import { motion } from "framer-motion";
import Link from "next/link";

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
  let html = content
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-[#F9FAFB] mt-8 mb-3">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl md:text-3xl font-bold text-[#F9FAFB] mt-16 mb-6">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl md:text-4xl font-bold text-[#F9FAFB] mt-16 mb-6">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#F9FAFB]">$1</strong>')
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^---$/gim, '<hr class="border-[#1F2937] my-12" />')
    .replace(/^\- (.*$)/gim, '<li class="text-[#9CA3AF] leading-relaxed">$1</li>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#3B82F6] underline hover:text-[#60A5FA] transition-colors" target="_blank" rel="noopener noreferrer">$1</a>');

  html = html.replace(/((<li.*<\/li>\n?)+)/g, '<ul class="list-disc list-inside space-y-2 mb-6">$1</ul>');

  const lines = html.split("\n");
  const result: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (
      trimmed &&
      !trimmed.startsWith("<h") &&
      !trimmed.startsWith("<hr") &&
      !trimmed.startsWith("<ul") &&
      !trimmed.startsWith("<li") &&
      !trimmed.startsWith("</")
    ) {
      result.push(`<p class="text-[#9CA3AF] leading-relaxed mb-6">${trimmed}</p>`);
    } else {
      result.push(line);
    }
  }

  return result.join("\n");
}

export default function BlogArticle({ post }: { post: Post }) {
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    `https://medware.com.au/blog/${post.slug}`
  )}`;

  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/90 backdrop-blur-md border-b border-[#1F2937]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold tracking-wider">
              <span className="text-[#3B82F6]">MED</span>
              <span className="text-[#F9FAFB]">WARE</span>
            </Link>
            <span className="text-[#1F2937]">|</span>
            <Link
              href="/blog"
              className="text-sm text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors"
            >
              The Signal
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={linkedInShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-[#9CA3AF] hover:text-[#0A66C2] transition-colors"
              title="Share on LinkedIn"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="hidden sm:inline">Share</span>
            </a>
            <Link
              href="/blog"
              className="text-sm text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors"
            >
              &larr; Feed
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero / Cover Image */}
      {post.cover_image && (
        <div className="relative w-full aspect-[21/9] mt-[61px]">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/50 to-transparent" />
        </div>
      )}

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`max-w-3xl mx-auto px-6 pb-24 ${post.cover_image ? "-mt-32 relative z-10" : "pt-32"}`}
      >
        <header className="mb-12">
          {post.category && (
            <span className="inline-block text-xs font-medium uppercase tracking-wider text-[#3B82F6] bg-[#3B82F6]/10 px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F9FAFB] leading-tight mb-4 text-balance">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-lg text-[#9CA3AF] mb-6 leading-relaxed">{post.excerpt}</p>
          )}
          <div className="flex items-center gap-4 text-sm text-[#9CA3AF]">
            <span>By {post.author_name ?? "Matt Martin"}</span>
            <span className="text-[#1F2937]">&middot;</span>
            <span>
              {new Date(post.published_at ?? post.created_at).toLocaleDateString(
                "en-AU",
                { day: "numeric", month: "long", year: "numeric" }
              )}
            </span>
            <span className="text-[#1F2937]">&middot;</span>
            <span>{estimateReadTime(post.content)} min read</span>
          </div>
        </header>

        <div dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />

        {/* Bottom share */}
        <div className="mt-16 pt-8 border-t border-[#1F2937] flex items-center justify-between">
          <Link
            href="/blog"
            className="text-sm text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors"
          >
            &larr; Back to The Signal
          </Link>
          <a
            href={linkedInShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#0A66C2] transition-colors border border-[#1F2937] hover:border-[#0A66C2]/50 rounded-lg px-4 py-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Share on LinkedIn
          </a>
        </div>
      </motion.article>
    </div>
  );
}
