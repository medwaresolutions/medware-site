"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const outcomes = [
  {
    num: "01",
    title: "Lead AI conversations in any room.",
    body: "Boardroom, executive team, doctors, pharmaceutical partners, regulators. Most informed person in any room — without overclaiming.",
  },
  {
    num: "02",
    title: "Produce more, in less time.",
    body: "Less email triage. Less meeting prep. Less rework. The hours AI gives back go to the work only you can do.",
  },
  {
    num: "03",
    title: "Place the right AI bets.",
    body: "Know how to tell a high-leverage application from an expensive demo. A written yes-list and no-list, with reasoning.",
  },
  {
    num: "04",
    title: "Fluent, not technical.",
    body: "Know what a competent person needs to know to make the right decisions and the right hires. That's the line.",
  },
];

const formats = [
  {
    name: "One-to-one mentorship",
    who: "CEO, executive, director",
    desc: "Eight weeks. Six private working sessions plus between-session access. The flagship engagement.",
    price: "From AUD $24,000",
  },
  {
    name: "Team programs",
    who: "Executive & commercial teams",
    desc: "Eight weeks. Workflow discovery, four team sessions, individual check-ins. Pre/post KPI measurement.",
    price: "From AUD $32,000",
  },
  {
    name: "Board & executive sessions",
    who: "Single event",
    desc: "A confidential 60–90 minute session that resets the room's posture on AI for the next twelve months.",
    price: "From AUD $8,500",
  },
];

export default function Training() {
  return (
    <SectionWrapper
      id="training"
      style={{
        background:
          "radial-gradient(ellipse at top right, rgba(245,158,11,0.12), transparent 65%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
            Medware Advisory · By appointment
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
            The AI guide for{" "}
            <span className="italic text-[#F59E0B]">healthcare leadership.</span>
          </h2>
          <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
            An eight-week mentorship engagement for leaders of healthcare and
            pharmaceutical organisations. Plain language. No theatre. Built on
            the operator experience of having shipped nineteen AI products in
            healthcare.
          </p>
        </div>

        {/* Outcomes */}
        <div className="mb-16">
          <div className="text-xs uppercase tracking-[0.2em] text-[#9CA3AF] mb-6 text-center">
            What you walk away with
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {outcomes.map((o, i) => (
              <motion.div
                key={o.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 hover:border-[#F59E0B]/30 transition-colors duration-300"
              >
                <div className="text-[#F59E0B]/60 font-mono text-sm mb-2">
                  {o.num}
                </div>
                <h3 className="font-semibold text-[#F9FAFB] mb-2">{o.title}</h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">
                  {o.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Engagement formats */}
        <div className="mb-12">
          <div className="text-xs uppercase tracking-[0.2em] text-[#9CA3AF] mb-6 text-center">
            How we work together
          </div>
          <div className="space-y-3">
            {formats.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 bg-[#111827] border border-[#1F2937] rounded-xl p-5 hover:border-[#F59E0B]/30 transition-colors duration-300"
              >
                <div className="md:w-1/3">
                  <div className="font-semibold text-[#F9FAFB]">{f.name}</div>
                  <div className="text-xs text-[#9CA3AF] uppercase tracking-wider mt-1">
                    {f.who}
                  </div>
                </div>
                <div className="md:flex-1 text-sm text-[#9CA3AF] leading-relaxed">
                  {f.desc}
                </div>
                <div className="md:w-44 md:text-right">
                  <div className="text-[#F59E0B] font-semibold text-sm">
                    {f.price}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-[#6B7280] text-center mt-4">
            Two further formats — keynote and monthly retainer — available on the
            advisory site. International quoted in local currency at the premium
            tier.
          </p>
        </div>

        <div className="text-center flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://medwareadvisory.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F59E0B] hover:bg-[#D97706] text-[#0a0a1a] font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#F59E0B]/25"
          >
            Visit Medware Advisory
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </a>
          <a
            href="https://cal.com/matt-martin/diagnostic"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#1F2937] hover:border-[#F59E0B]/40 text-[#F9FAFB] font-semibold rounded-lg transition-all duration-200"
          >
            Book a 90-minute diagnostic
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
