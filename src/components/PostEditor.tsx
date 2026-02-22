"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface PostData {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  cover_image: string;
  author_name: string;
  published: boolean;
}

const CATEGORIES = [
  "AI & Automation",
  "Engineering",
  "Data & Privacy",
  "Email Marketing",
  "Web Performance",
  "Analytics",
  "Health Tech",
  "Business",
];

export default function PostEditor({
  initialData,
  userId,
}: {
  initialData?: PostData;
  userId: string;
}) {
  const isEditing = !!initialData?.id;
  const [form, setForm] = useState<PostData>({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    content: initialData?.content ?? "",
    excerpt: initialData?.excerpt ?? "",
    category: initialData?.category ?? "",
    cover_image: initialData?.cover_image ?? "",
    author_name: initialData?.author_name ?? "Matt Martin",
    published: initialData?.published ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();
  const router = useRouter();

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function handleTitleChange(title: string) {
    setForm((prev) => ({
      ...prev,
      title,
      slug: isEditing ? prev.slug : generateSlug(title),
    }));
  }

  async function handleSave(publish?: boolean) {
    setError("");
    setSaving(true);

    const postData = {
      title: form.title,
      slug: form.slug,
      content: form.content,
      excerpt: form.excerpt || null,
      category: form.category || null,
      cover_image: form.cover_image || null,
      author_name: form.author_name || "Matt Martin",
      published: publish ?? form.published,
      published_at:
        (publish ?? form.published) ? new Date().toISOString() : null,
      user_id: userId,
    };

    let result;
    if (isEditing && initialData?.id) {
      result = await supabase
        .from("posts")
        .update(postData)
        .eq("id", initialData.id);
    } else {
      result = await supabase.from("posts").insert(postData);
    }

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  function insertBlock(template: string) {
    const el = contentRef.current;
    if (!el) {
      setForm((prev) => ({ ...prev, content: prev.content + "\n\n" + template }));
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const current = form.content;
    const newContent =
      current.slice(0, start) + "\n\n" + template + "\n\n" + current.slice(end);
    setForm((prev) => ({ ...prev, content: newContent }));
    setTimeout(() => {
      el.focus();
      const pos = start + template.length + 4;
      el.selectionStart = pos;
      el.selectionEnd = pos;
    }, 0);
  }

  async function uploadAndInsert(file: File, type: "image" | "video" | "audio") {
    setUploading(type);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      insertBlock(`::${type}[${data.url}]`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(null);
    }
  }

  function renderMarkdown(content: string) {
    // Raw HTML passthrough blocks
    let html = content.replace(/:::html\n([\s\S]*?)\n:::/g, (_, inner) => inner);

    // Media shortcodes
    html = html.replace(/^::image\[(.+)\]$/gim, '<img src="$1" alt="" class="w-full rounded-xl my-8 border border-[#1F2937]" />');
    html = html.replace(/^::video\[(.+)\]$/gim, '<video src="$1" controls class="w-full rounded-xl my-8 border border-[#1F2937]"></video>');
    html = html.replace(/^::audio\[(.+)\]$/gim, '<audio src="$1" controls class="w-full my-8"></audio>');
    html = html.replace(/^::iframe\[(.+)\]$/gim, '<div class="relative w-full aspect-video my-8 rounded-xl overflow-hidden border border-[#1F2937]"><iframe src="$1" frameborder="0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" class="w-full h-full"></iframe></div>');

    html = html
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-[#F9FAFB] mt-8 mb-3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-[#F9FAFB] mt-12 mb-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-[#F9FAFB] mt-12 mb-4">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#F9FAFB]">$1</strong>')
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/^---$/gim, '<hr class="border-[#1F2937] my-10" />')
      .replace(/^\- (.*$)/gim, '<li class="text-[#9CA3AF] leading-relaxed">$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#3B82F6] underline">$1</a>');

    html = html.replace(/((<li.*<\/li>\n?)+)/g, '<ul class="list-disc list-inside space-y-2 mb-6">$1</ul>');

    const lines = html.split("\n");
    const result: string[] = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("<")) {
        result.push(`<p class="text-[#9CA3AF] leading-relaxed mb-6">${trimmed}</p>`);
      } else {
        result.push(line);
      }
    }

    return result.join("\n");
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      {/* Header */}
      <header className="border-b border-[#1F2937] bg-[#0a0a1a]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="text-sm text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors"
            >
              &larr; Back
            </Link>
            <span className="text-[#1F2937]">|</span>
            <span className="text-sm text-[#9CA3AF]">
              {isEditing ? "Edit Post" : "New Post"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPreview(!preview)}
              className="text-sm px-4 py-2 rounded-lg border border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#3B82F6]/50 transition-all"
            >
              {preview ? "Edit" : "Preview"}
            </button>
            <button
              onClick={() => handleSave(false)}
              disabled={saving || !form.title || !form.slug}
              className="text-sm px-4 py-2 rounded-lg border border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#3B82F6]/50 transition-all disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving || !form.title || !form.slug || !form.content}
              className="text-sm px-4 py-2 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-[#F9FAFB] transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Publish"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400 mb-6">
            {error}
          </div>
        )}

        {preview ? (
          /* Preview Mode */
          <div className="max-w-3xl mx-auto">
            {form.cover_image && (
              <div className="aspect-video relative rounded-xl overflow-hidden mb-8">
                <img
                  src={form.cover_image}
                  alt={form.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {form.category && (
              <span className="inline-block text-xs font-medium uppercase tracking-wider text-[#3B82F6] bg-[#3B82F6]/10 px-3 py-1 rounded-full mb-4">
                {form.category}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] leading-tight mb-4 text-balance">
              {form.title || "Untitled Post"}
            </h1>
            {form.excerpt && (
              <p className="text-lg text-[#9CA3AF] mb-8">{form.excerpt}</p>
            )}
            <p className="text-sm text-[#9CA3AF] mb-12">
              By {form.author_name || "Matt Martin"}
            </p>
            <div
              dangerouslySetInnerHTML={{ __html: renderMarkdown(form.content) }}
            />
          </div>
        ) : (
          /* Edit Mode */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full bg-[#111827] border border-[#1F2937] rounded-lg px-4 py-3 text-[#F9FAFB] text-xl font-semibold placeholder-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                  placeholder="Post title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Excerpt
                </label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, excerpt: e.target.value }))
                  }
                  rows={2}
                  className="w-full bg-[#111827] border border-[#1F2937] rounded-lg px-4 py-3 text-[#9CA3AF] placeholder-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all resize-none"
                  placeholder="Brief description for the blog feed..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-[#9CA3AF]">
                    Content (Markdown)
                  </label>
                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    <button
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      disabled={!!uploading}
                      className="text-xs px-2.5 py-1.5 rounded-md border border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#3B82F6]/50 transition-all disabled:opacity-50"
                    >
                      {uploading === "image" ? "Uploading..." : "📷 Image"}
                    </button>
                    <button
                      type="button"
                      onClick={() => videoInputRef.current?.click()}
                      disabled={!!uploading}
                      className="text-xs px-2.5 py-1.5 rounded-md border border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#3B82F6]/50 transition-all disabled:opacity-50"
                    >
                      {uploading === "video" ? "Uploading..." : "🎬 Video"}
                    </button>
                    <button
                      type="button"
                      onClick={() => audioInputRef.current?.click()}
                      disabled={!!uploading}
                      className="text-xs px-2.5 py-1.5 rounded-md border border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#3B82F6]/50 transition-all disabled:opacity-50"
                    >
                      {uploading === "audio" ? "Uploading..." : "🎵 Audio"}
                    </button>
                    <button
                      type="button"
                      onClick={() => insertBlock("::iframe[https://www.youtube.com/embed/VIDEO_ID]")}
                      className="text-xs px-2.5 py-1.5 rounded-md border border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#3B82F6]/50 transition-all"
                    >
                      {"</>"} iFrame
                    </button>
                    <button
                      type="button"
                      onClick={() => insertBlock(":::html\n<div>\n\n</div>\n:::")}
                      className="text-xs px-2.5 py-1.5 rounded-md border border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#3B82F6]/50 transition-all"
                    >
                      {"{ }"} HTML
                    </button>
                  </div>
                </div>
                <textarea
                  ref={contentRef}
                  value={form.content}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, content: e.target.value }))
                  }
                  rows={28}
                  className="w-full bg-[#111827] border border-[#1F2937] rounded-lg px-4 py-3 text-[#9CA3AF] placeholder-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all resize-y font-mono text-sm leading-relaxed"
                  placeholder={"Write your post in markdown...\n\n## Section Heading\n\nParagraph text here.\n\n- Bullet point\n- Another point\n\n**Bold text** and *italic text*"}
                />
                {/* Hidden file inputs */}
                <input ref={imageInputRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadAndInsert(f, "image"); e.target.value = ""; }} />
                <input ref={videoInputRef} type="file" accept="video/*" className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadAndInsert(f, "video"); e.target.value = ""; }} />
                <input ref={audioInputRef} type="file" accept="audio/*" className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadAndInsert(f, "audio"); e.target.value = ""; }} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Slug
                </label>
                <div className="flex items-center gap-0">
                  <span className="text-sm text-[#4B5563] bg-[#0a0a1a] border border-[#1F2937] border-r-0 rounded-l-lg px-3 py-3">
                    /blog/
                  </span>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    className="flex-1 bg-[#111827] border border-[#1F2937] rounded-r-lg px-3 py-3 text-[#F9FAFB] text-sm placeholder-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                    placeholder="post-slug"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, category: e.target.value }))
                  }
                  className="w-full bg-[#111827] border border-[#1F2937] rounded-lg px-4 py-3 text-[#F9FAFB] text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                >
                  <option value="">Select category...</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={form.cover_image}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, cover_image: e.target.value }))
                  }
                  className="w-full bg-[#111827] border border-[#1F2937] rounded-lg px-4 py-3 text-[#F9FAFB] text-sm placeholder-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                  placeholder="https://..."
                />
                {form.cover_image && (
                  <div className="mt-3 aspect-video rounded-lg overflow-hidden border border-[#1F2937]">
                    <img
                      src={form.cover_image}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Author Name
                </label>
                <input
                  type="text"
                  value={form.author_name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, author_name: e.target.value }))
                  }
                  className="w-full bg-[#111827] border border-[#1F2937] rounded-lg px-4 py-3 text-[#F9FAFB] text-sm placeholder-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                  placeholder="Matt Martin"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
