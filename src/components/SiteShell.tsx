"use client";

import { useRef, useState } from "react";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import SignalTeaser, { type SignalPost } from "./sections/SignalTeaser";
import WhatWeDo from "./sections/WhatWeDo";
import Work from "./sections/Work";
import About from "./sections/About";
import Advisory from "./sections/Advisory";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import { CookieBanner, LegalDialog, ProductDialog, type LegalDoc } from "./sections/dialogs";
import { Snackbar } from "./ds";
import type { Product } from "@/data/portfolio";

export default function SiteShell({ posts }: { posts: SignalPost[] }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [legal, setLegal] = useState<LegalDoc | null>(null);
  const [snack, setSnack] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toast = (msg: string) => {
    setSnack(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setSnack(null), 3400);
  };

  return (
    <>
      <Header />
      <main>
        <Hero />
        <SignalTeaser posts={posts} />
        <WhatWeDo />
        <Work onOpenProduct={setProduct} />
        <About />
        <Advisory />
        <Contact onSend={(email) => toast(email ? "Thanks — we'll be in touch" : "Enter your email so we can reply")} />
      </main>
      <Footer onOpenLegal={setLegal} />

      <ProductDialog product={product} onClose={() => setProduct(null)} />
      <LegalDialog doc={legal} onClose={() => setLegal(null)} />
      <CookieBanner onPolicy={() => setLegal("cookies")} />
      {snack ? <Snackbar message={snack} showClose onClose={() => setSnack(null)} /> : null}
    </>
  );
}
