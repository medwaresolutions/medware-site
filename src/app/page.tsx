import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import Work from "@/components/Work";
import About from "@/components/About";
import Blog from "@/components/Blog";
import Training from "@/components/Training";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, cover_image, published_at, category")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(3);

  return (
    <main>
      <Navigation />
      <Hero />
      <WhatWeDo />
      <Work />
      <About />
      <Blog posts={posts ?? []} />
      <Training />
      <Contact />
      <Footer />
    </main>
  );
}
