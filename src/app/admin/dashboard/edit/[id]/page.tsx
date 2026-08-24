import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import PostEditor from "@/components/PostEditor";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireAdmin();
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <PostEditor
      userId={user.id}
      initialData={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt ?? "",
        category: post.category ?? "",
        cover_image: post.cover_image ?? "",
        author_name: post.author_name ?? "Matt Martin",
        published: post.published,
      }}
    />
  );
}
