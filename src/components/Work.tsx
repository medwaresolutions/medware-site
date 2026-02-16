"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import Image from "next/image";

const products = [
  {
    name: "Medflow",
    tag: "Clinical Workflow",
    description:
      "PBS authority form automation for Australian specialists. Streamlines prescribing workflows and reduces admin burden. Used by gastroenterologists, rheumatologists, and respiratory physicians across Australia.",
    link: "https://www.medflow.com.au",
    color: "#3B82F6",
    image: "/1-medflow.png",
  },
  {
    name: "Medcast Media",
    tag: "Medical Education",
    description:
      "Audio content platform for healthcare professionals. Sponsored medical education that connects pharmaceutical companies with HCPs through quality content.",
    link: "https://medcast.media",
    color: "#06B6D4",
    image: "/1-medcast-media.png",
  },
  {
    name: "Medprep",
    tag: "Education Platform",
    description:
      "Medical education and preparation tools. Helping the next generation of healthcare professionals learn smarter with AI-assisted study workflows.",
    link: "https://www.medprep.app/home",
    color: "#8B5CF6",
    image: "/1-medprep.png",
  },
  {
    name: "Framewright",
    tag: "Open Source",
    description:
      "AI development framework builder. Helps developers structure projects for AI-assisted development. Used by developers worldwide.",
    link: "https://framewright.site",
    color: "#10B981",
    image: "/1-framewright.png",
  },
];

export default function Work() {
  return (
    <SectionWrapper id="work">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Work</h2>
        <p className="text-[#9CA3AF] max-w-xl mx-auto">
          Products and platforms built at the intersection of AI and healthcare.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {products.map((product, i) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="group relative bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden hover:border-[#1F2937] transition-all duration-300"
          >
            <div
              className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: product.color }}
            />
            {/* Product screenshot */}
            <div className="relative w-full h-48 overflow-hidden bg-[#0a0a1a]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
            </div>
            <div className="p-8 pt-4">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
                  style={{
                    color: product.color,
                    background: `${product.color}15`,
                  }}
                >
                  {product.tag}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
              <p className="text-[#9CA3AF] leading-relaxed mb-4">
                {product.description}
              </p>
              {product.link && (
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                  style={{ color: product.color }}
                >
                  Visit site
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legacy */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 text-center"
      >
        <p className="text-[#9CA3AF] text-sm max-w-2xl mx-auto leading-relaxed">
          Previously founded MyInteract (medical digital engagement) and built
          digital solutions across 17 years in pharmaceutical sales, management,
          and medical digital.
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
