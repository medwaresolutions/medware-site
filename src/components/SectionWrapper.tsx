"use client";

import { motion } from "framer-motion";
import { CSSProperties, ReactNode } from "react";

export default function SectionWrapper({
  id,
  children,
  className = "",
  style,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <section
      id={id}
      className={`relative py-24 md:py-32 ${className}`}
      style={style}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6"
      >
        {children}
      </motion.div>
    </section>
  );
}
