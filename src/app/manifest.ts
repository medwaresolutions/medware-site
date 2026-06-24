import type { MetadataRoute } from "next";

// Web-app manifest — makes the site installable ("Add to home screen") with the
// Medware m.A logo as the app icon. Next.js serves this at /manifest.webmanifest
// and links it automatically.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Medware — AI for healthcare",
    short_name: "Medware",
    description:
      "Medical software, AI consulting, and training — built by people who understand healthcare.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#F9FDFF",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
