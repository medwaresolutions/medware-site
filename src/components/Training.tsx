"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const offerings = [
  {
    title: "1-on-1 AI Training",
    description: "Personalised sessions tailored to your role, your industry, your goals. Learn by doing, not by watching.",
    icon: "👤",
  },
  {
    title: "Team Workshops",
    description: "Get your entire team up to speed. Half-day or full-day sessions covering practical AI workflows.",
    icon: "👥",
  },
  {
    title: "Build With Us",
    description: "Rapid prototyping partnerships. Bring your idea, we'll build it together — and teach you the process along the way.",
    icon: "🚀",
  },
];

export default function Training() {
  return (
    <SectionWrapper id="training">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Training</h2>
          <p className="text-xl text-[#9CA3AF] max-w-2xl mx-auto">
            I promised a training course. Here&apos;s something better —{" "}
            <span className="text-[#F9FAFB]">personalised help.</span>
          </p>
        </div>

        <div className="space-y-4 mb-12">
          {offerings.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex gap-5 bg-[#111827] border border-[#1F2937] rounded-xl p-6 hover:border-[#3B82F6]/30 transition-colors duration-300"
            >
              <span className="text-3xl flex-shrink-0">{item.icon}</span>
              <div>
                <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                <p className="text-[#9CA3AF] leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#3B82F6]/25"
          >
            Let&apos;s talk
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
