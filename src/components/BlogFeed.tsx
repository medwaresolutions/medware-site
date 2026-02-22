"use client";

import { motion } from "framer-motion";
import Link from "next/link";

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

function getLinkedInShareUrl(slug: string) {
  const articleUrl = `https://medware.com.au/blog/${slug}`;
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
}

export default function BlogFeed({ posts }: { posts: Post[] }) {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      {/* Header */}
      <header className="border-b border-[#1F2937] bg-[#0a0a1a]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold tracking-wider">
              <span className="text-[#3B82F6]">MED</span>
              <span className="text-[#F9FAFB]">WARE</span>
            </Link>
            <span className="text-[#1F2937]">|</span>
            <div>
              <span className="text-sm font-semibold text-[#F9FAFB]">The Signal</span>
              <span className="text-xs text-[#9CA3AF] ml-2 hidden sm:inline">Marketing + Code</span>
            </div>
          </div>
          <Link
            href="/"
            className="text-sm text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors"
          >
            &larr; Home
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#9CA3AF] text-lg">No posts published yet. Check back soon.</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featured && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                <Link href={`/blog/${featured.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl bg-[#111827] border border-[#1F2937] hover:border-[#3B82F6]/30 transition-all duration-300">
                    {featured.cover_image ? (
                      <div className="aspect-[21/9] relative">
                        <img
                          src={featured.cover_image}
                          alt={featured.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          {featured.category && (
                            <span className="inline-block text-xs font-medium uppercase tracking-wider text-[#3B82F6] bg-[#3B82F6]/10 backdrop-blur-sm px-3 py-1 rounded-full mb-3">
                              {featured.category}
                            </span>
                          )}
                          <h2 className="text-3xl md:text-4xl font-bold text-[#F9FAFB] leading-tight mb-3 group-hover:text-[#3B82F6] transition-colors text-balance">
                            {featured.title}
                          </h2>
                          {featured.excerpt && (
                            <p className="text-[#9CA3AF] text-lg max-w-2xl leading-relaxed">
                              {featured.excerpt}
                            </p>
                          )}
                          <div className="flex items-center gap-4 mt-4 text-sm text-[#9CA3AF]">
                            <span>{featured.author_name ?? "Matt Martin"}</span>
                            <span className="text-[#1F2937]">&middot;</span>
                            <span>
                              {new Date(
                                featured.published_at ?? featured.created_at
                              ).toLocaleDateString("en-AU", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                            <span className="text-[#1F2937]">&middot;</span>
                            <span>{estimateReadTime(featured.content)} min read</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 md:p-12">
                        {featured.category && (
                          <span className="inline-block text-xs font-medium uppercase tracking-wider text-[#3B82F6] bg-[#3B82F6]/10 px-3 py-1 rounded-full mb-4">
                            {featured.category}
                          </span>
                        )}
                        <h2 className="text-3xl md:text-4xl font-bold text-[#F9FAFB] leading-tight mb-3 group-hover:text-[#3B82F6] transition-colors text-balance">
                          {featured.title}
                        </h2>
                        {featured.excerpt && (
                          <p className="text-[#9CA3AF] text-lg max-w-2xl leading-relaxed mb-4">
                            {featured.excerpt}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-[#9CA3AF]">
                          <span>{featured.author_name ?? "Matt Martin"}</span>
                          <span className="text-[#1F2937]">&middot;</span>
                          <span>
                            {new Date(
                              featured.published_at ?? featured.created_at
                            ).toLocaleDateString("en-AU", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                          <span className="text-[#1F2937]">&middot;</span>
                          <span>{estimateReadTime(featured.content)} min read</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Grid of remaining posts */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                  >
                    <Link href={`/blog/${post.slug}`} className="group block h-full">
                      <div className="bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden hover:border-[#3B82F6]/30 transition-all duration-300 h-full flex flex-col">
                        {post.cover_image && (
                          <div className="aspect-video relative overflow-hidden">
                            <img
                              src={post.cover_image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {post.category && (
                              <span className="absolute top-3 left-3 text-xs font-medium uppercase tracking-wider text-[#3B82F6] bg-[#0a0a1a]/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
                                {post.category}
                              </span>
                            )}
                          </div>
                        )}
                        <div className="p-5 flex flex-col flex-1">
                          {!post.cover_image && post.category && (
                            <span className="inline-block text-xs font-medium uppercase tracking-wider text-[#3B82F6] mb-3">
                              {post.category}
                            </span>
                          )}
                          <h3 className="text-lg font-semibold text-[#F9FAFB] leading-snug mb-2 group-hover:text-[#3B82F6] transition-colors text-pretty">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="text-sm text-[#9CA3AF] leading-relaxed mb-4 line-clamp-2 flex-1">
                              {post.excerpt}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#1F2937]">
                            <span className="text-xs text-[#9CA3AF]">
                              {post.author_name ?? "Matt Martin"}
                            </span>
                            <span className="text-xs text-[#9CA3AF]">
                              {estimateReadTime(post.content)} min read
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1F2937] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#9CA3AF]">
            &copy; 2026 Medware Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-[#9CA3AF]">
            <Link href="/" className="hover:text-[#F9FAFB] transition-colors">
              Home
            </Link>
            <a
              href="https://framewright.site"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F9FAFB] transition-colors"
            >
              Framewright
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
