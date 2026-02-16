"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";

const stats = [
  { value: "17+", label: "Years in pharma & health tech" },
  { value: "12,000+", label: "Hours with AI" },
  { value: "4", label: "Products shipped" },
  { value: "50s", label: "Started coding" },
];

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="flex items-center gap-5 mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-20 h-20 shrink-0 rounded-full overflow-hidden border border-[#1F2937]"
            >
              <Image
                src="/matt.png"
                alt="Matt Martin"
                fill
                className="object-cover"
              />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold">About Matt</h2>
          </div>
          <div className="space-y-4 text-[#9CA3AF] leading-relaxed text-lg">
            <p>
              17 years in pharmaceutical sales and management. Founded multiple
              medical software companies. Started coding in his 50s with AI.
            </p>
            <p>
              Now builds production software used by medical specialists across
              Australia.{" "}
              <span className="text-[#F9FAFB] font-medium">
                12,000+ hours with AI and counting.
              </span>
            </p>
            <p>
              Not a developer by training. Not a computer scientist. Just
              someone who saw what AI could do, picked up the tools, and started
              building things that solve real problems in healthcare.
            </p>
            <p>
              The gap between &ldquo;I have an idea&rdquo; and &ldquo;I shipped it&rdquo; has
              never been smaller. That&apos;s what keeps me going.
            </p>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-[#9CA3AF]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
