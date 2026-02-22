import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - The Signal | Medware Solutions",
  description: "Manage blog posts for The Signal",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
