"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

export default function Contact() {
  return (
    <SectionWrapper id="contact">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
        <p className="text-[#9CA3AF] mb-10">
          Have a project in mind? Want to learn AI? Just want to chat about
          what&apos;s possible? Reach out.
        </p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-left mb-10"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 bg-[#111827] border border-[#1F2937] rounded-lg text-[#F9FAFB] placeholder-[#9CA3AF] focus:outline-none focus:border-[#3B82F6] transition-colors duration-200"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 bg-[#111827] border border-[#1F2937] rounded-lg text-[#F9FAFB] placeholder-[#9CA3AF] focus:outline-none focus:border-[#3B82F6] transition-colors duration-200"
            />
          </div>
          <textarea
            rows={5}
            placeholder="Tell me about your project or what you'd like to learn..."
            className="w-full px-4 py-3 bg-[#111827] border border-[#1F2937] rounded-lg text-[#F9FAFB] placeholder-[#9CA3AF] focus:outline-none focus:border-[#3B82F6] transition-colors duration-200 resize-none"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#3B82F6]/25"
          >
            Send Message
          </button>
        </motion.form>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-[#9CA3AF]">
          <a
            href="mailto:matt@medware.com.au"
            className="flex items-center gap-2 hover:text-[#3B82F6] transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            matt@medware.com.au
          </a>
          <a
            href="https://linkedin.com/in/mattmartin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#3B82F6] transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
