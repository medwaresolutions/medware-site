"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    console.log("[v0] Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("[v0] Attempting login with email:", email);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("[v0] Auth response:", { user: data?.user?.email, session: !!data?.session, error: authError?.message, errorStatus: authError?.status });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    console.log("[v0] Login successful, session token exists:", !!data?.session?.access_token);
    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[var(--md-sys-color-background)] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <a href="/" className="inline-block mb-6">
            <span className="text-2xl font-bold tracking-wider">
              <span className="text-[var(--md-sys-color-primary)]">MED</span>
              <span className="text-[var(--md-sys-color-on-surface)]">WARE</span>
            </span>
          </a>
          <h1 className="text-2xl font-bold text-[var(--md-sys-color-on-surface)] mb-2">Admin Login</h1>
          <p className="text-[var(--md-sys-color-on-surface-variant)] text-sm">Sign in to manage The Signal blog</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--md-sys-color-on-surface-variant)] mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[var(--md-sys-color-surface-container)] border border-[var(--md-sys-color-outline-variant)] rounded-lg px-4 py-3 text-[var(--md-sys-color-on-surface)] placeholder-[var(--md-sys-color-outline)] focus:outline-none focus:ring-2 focus:ring-[var(--md-sys-color-primary)] focus:border-transparent transition-all"
              placeholder="admin@medware.com.au"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[var(--md-sys-color-on-surface-variant)] mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[var(--md-sys-color-surface-container)] border border-[var(--md-sys-color-outline-variant)] rounded-lg px-4 py-3 text-[var(--md-sys-color-on-surface)] placeholder-[var(--md-sys-color-outline)] focus:outline-none focus:ring-2 focus:ring-[var(--md-sys-color-primary)] focus:border-transparent transition-all"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--md-sys-color-primary)] hover:bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-surface)] font-medium py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-on-surface)] transition-colors">
            &larr; Back to site
          </a>
        </div>
      </div>
    </div>
  );
}
