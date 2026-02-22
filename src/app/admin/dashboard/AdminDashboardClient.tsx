"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function AdminDashboardClient({
  posts,
  userEmail,
}: {
  posts: Post[];
  userEmail: string;
}) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this post?")) return;
    setDeleting(id);
    await supabase.from("posts").delete().eq("id", id);
    window.location.reload();
  }

  async function togglePublish(id: string, currentlyPublished: boolean) {
    await supabase
      .from("posts")
      .update({
        published: !currentlyPublished,
        published_at: !currentlyPublished ? new Date().toISOString() : null,
      })
      .eq("id", id);
    window.location.reload();
  }

  function getLinkedInShareUrl(post: Post) {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://medware.com.au";
    const articleUrl = `${baseUrl}/blog/${post.slug}`;
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      {/* Header */}
      <header className="border-b border-[#1F2937] bg-[#0a0a1a]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-xl font-bold tracking-wider">
              <span className="text-[#3B82F6]">MED</span>
              <span className="text-[#F9FAFB]">WARE</span>
            </a>
            <span className="text-[#1F2937]">|</span>
            <span className="text-sm text-[#9CA3AF]">The Signal Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#9CA3AF] hidden sm:inline">{userEmail}</span>
            <button
              onClick={handleSignOut}
              className="text-sm text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Title + Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-[#F9FAFB] mb-1">Posts</h1>
            <p className="text-[#9CA3AF] text-sm">
              {posts.length} {posts.length === 1 ? "post" : "posts"} total
            </p>
          </div>
          <a
            href="/admin/dashboard/new"
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-[#F9FAFB] font-medium px-5 py-2.5 rounded-lg transition-colors text-sm"
          >
            New Post
          </a>
        </div>

        {/* Posts Table */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#9CA3AF] text-lg mb-4">No posts yet</p>
            <a
              href="/admin/dashboard/new"
              className="text-[#3B82F6] hover:text-[#60A5FA] transition-colors"
            >
              Create your first post
            </a>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#3B82F6]/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="text-[#F9FAFB] font-semibold truncate">{post.title}</h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        post.published
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                    {post.category && (
                      <span className="text-xs text-[#9CA3AF] bg-[#1F2937] px-2 py-0.5 rounded">
                        {post.category}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#9CA3AF]">
                    /blog/{post.slug} &middot;{" "}
                    {new Date(post.created_at).toLocaleDateString("en-AU", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => togglePublish(post.id, post.published)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#3B82F6]/50 transition-all"
                  >
                    {post.published ? "Unpublish" : "Publish"}
                  </button>
                  <a
                    href={getLinkedInShareUrl(post)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1.5 rounded-lg border border-[#1F2937] text-[#9CA3AF] hover:text-[#0A66C2] hover:border-[#0A66C2]/50 transition-all"
                    title="Share on LinkedIn"
                  >
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      Share
                    </span>
                  </a>
                  <a
                    href={`/admin/dashboard/edit/${post.id}`}
                    className="text-xs px-3 py-1.5 rounded-lg border border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#3B82F6]/50 transition-all"
                  >
                    Edit
                  </a>
                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={deleting === post.id}
                    className="text-xs px-3 py-1.5 rounded-lg border border-[#1F2937] text-[#9CA3AF] hover:text-red-400 hover:border-red-500/50 transition-all disabled:opacity-50"
                  >
                    {deleting === post.id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
