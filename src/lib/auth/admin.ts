import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

/**
 * Signup is open on the Supabase project, so "has a session" is not the same
 * as "is allowed in here". Every admin entry point checks this allowlist.
 *
 * Override with ADMIN_EMAILS (comma-separated) rather than editing this file.
 */
const ALLOWED_EMAILS = (process.env.ADMIN_EMAILS ?? "matt@medware.com.au")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export function isAdmin(user: User | null): boolean {
  const email = user?.email?.toLowerCase();
  return Boolean(email && ALLOWED_EMAILS.includes(email));
}

/** The signed-in admin, or null for anyone else. */
export async function getAdminUser(): Promise<User | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return isAdmin(user) ? user : null;
}

/**
 * The signed-in admin, or a redirect away from the page.
 *
 * Signed-out visitors go to the login form. Signed-in non-admins go home —
 * bouncing them back to the login form would just loop, since they already
 * hold a valid session.
 */
export async function requireAdmin(): Promise<User> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }
  if (!isAdmin(user)) {
    redirect("/");
  }

  return user;
}
