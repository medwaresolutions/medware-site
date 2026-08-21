import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const SITE_URL = "https://www.medware.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Medware — healthcare digital production",
  description:
    "Healthcare digital production at half the cost and half the timeline. Bespoke digital and AI for pharma and specialist medicine, plus products already built for healthcare — ready to use and ready to sponsor.",
  applicationName: "Medware",
  keywords: [
    "healthcare digital production",
    "AI healthcare",
    "medical software",
    "PBS authority automation",
    "AI consulting",
    "AI training",
    "Medflow",
    "Medcast",
    "pharmaceutical software",
    "Australia",
  ],
  authors: [{ name: "Matt Martin" }],
  creator: "Medware Solutions",
  publisher: "Medware Solutions",
  openGraph: {
    type: "website",
    siteName: "Medware",
    title: "Medware — healthcare digital production",
    description:
      "Bespoke digital and AI for pharma and specialist medicine, at half the cost and half the timeline — plus products already built for healthcare.",
    url: SITE_URL,
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medware — healthcare digital production",
    description:
      "Bespoke digital and AI for pharma and specialist medicine, at half the cost and half the timeline — plus products already built for healthcare.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Medware Solutions",
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  description:
    "Medware Solutions produces bespoke digital and AI for pharma and specialist medicine, and builds products for healthcare — from clinical software to patient, audience and industry tools.",
  email: "matt@medware.com.au",
  sameAs: [
    "https://github.com/medwaresolutions",
    "https://www.linkedin.com/in/matt-martin-34345914",
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F9FDFF" },
    { media: "(prefers-color-scheme: dark)", color: "#15181A" },
  ],
};

// Set the saved theme on <html> before first paint to avoid a flash of the
// wrong theme. Runs before React hydrates; <html suppressHydrationWarning>
// covers the attribute the server didn't render.
const themeInit = `(function(){try{var t=localStorage.getItem('mw-theme');if(t!=='dark'&&t!=='light')t='light';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Roboto+Mono:wght@400;500&family=Manrope:wght@800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
