"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";

const posts = [
  { title: "The Basics Nobody Explains Well", slug: "12000-hours" },
  { title: "What Is an Agent and Why It Matters", slug: "12000-hours" },
  { title: "The Right AI for the Right Job", slug: "12000-hours" },
  { title: "What Nobody Tells You About Using AI Well", slug: "12000-hours" },
  { title: "Measure Twice, Cut Once", slug: "12000-hours" },
  { title: "What's Possible Now and What's Coming", slug: "12000-hours" },
];

export default function Blog() {
  return (
    <SectionWrapper id="blog">
      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-center mb-12">
        {/* Blog hero image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#1F2937]"
        >
          <Image
            src="/1-medware-blog.png"
            alt="12,000 Hours with AI"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-xs text-[#3B82F6] font-semibold uppercase tracking-wider">
              Featured Series
            </span>
          </div>
        </motion.div>

        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What I Learned After 12,000 Hours with AI
          </h2>
          <p className="text-[#9CA3AF] max-w-xl mb-8">
            Practical lessons from the trenches — no hype, no jargon.
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {posts.map((post, i) => (
              <motion.a
                key={i}
                href="/blog/12000-hours"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                className="group bg-[#111827] border border-[#1F2937] rounded-xl p-4 hover:border-[#3B82F6]/50 transition-all duration-300"
              >
                <span className="text-xs text-[#3B82F6] font-medium uppercase tracking-wider">
                  Part {i + 1}
                </span>
                <h3 className="text-sm font-semibold mt-1 group-hover:text-[#3B82F6] transition-colors duration-200">
                  {post.title}
                </h3>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 flex-wrap">
        <a
          href="/blog/12000-hours"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#111827] border border-[#1F2937] hover:border-[#3B82F6]/50 rounded-lg text-sm font-medium text-[#F9FAFB] transition-all duration-200"
        >
          Read the full article
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg>
        </a>
        <a
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#3B82F6] hover:bg-[#2563EB] rounded-lg text-sm font-medium text-[#F9FAFB] transition-all duration-200"
        >
          View The Signal
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg>
        </a>
      </div>
    </SectionWrapper>
  );
}
