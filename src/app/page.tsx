"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import Work from "@/components/Work";
import About from "@/components/About";
import Blog from "@/components/Blog";
import Training from "@/components/Training";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <WhatWeDo />
      <Work />
      <About />
      <Blog />
      <Training />
      <Contact />
      <Footer />
    </main>
  );
}
