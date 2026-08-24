import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboardPage() {
  const user = await requireAdmin();
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  return <AdminDashboardClient posts={posts ?? []} userEmail={user.email ?? ""} />;
}
