"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (!data.session) {
        setError("Login succeeded but no session was created. Please try again.");
        setLoading(false);
        return;
      }

      // Small delay to ensure auth cookies are fully written
      await new Promise((resolve) => setTimeout(resolve, 200));
      window.location.href = "/admin/dashboard";
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <a href="/" className="inline-block mb-6">
            <span className="text-2xl font-bold tracking-wider">
              <span className="text-[#3B82F6]">MED</span>
              <span className="text-[#F9FAFB]">WARE</span>
            </span>
          </a>
          <h1 className="text-2xl font-bold text-[#F9FAFB] mb-2">Admin Login</h1>
          <p className="text-[#9CA3AF] text-sm">Sign in to manage The Signal blog</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#9CA3AF] mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#111827] border border-[#1F2937] rounded-lg px-4 py-3 text-[#F9FAFB] placeholder-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
              placeholder="admin@medware.com.au"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#9CA3AF] mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#111827] border border-[#1F2937] rounded-lg px-4 py-3 text-[#F9FAFB] placeholder-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-[#F9FAFB] font-medium py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">
            &larr; Back to site
          </a>
        </div>
      </div>
    </div>
  );
}
