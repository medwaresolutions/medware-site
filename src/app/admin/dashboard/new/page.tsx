import { requireAdmin } from "@/lib/auth/admin";
import PostEditor from "@/components/PostEditor";

export default async function NewPostPage() {
  const user = await requireAdmin();

  return <PostEditor userId={user.id} />;
}
