import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PostEditor from "@/components/PostEditor";

export default async function NewPostPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return <PostEditor userId={user.id} />;
}
