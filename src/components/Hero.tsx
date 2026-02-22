"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  "transforms medicine",
  "learns from data",
  "scales with you",
  "empowers clinicians",
];

function generateParticles() {
  const colors = [
    { color: "rgba(59,130,246,0.7)", glow: "rgba(59,130,246,0.3)" },
    { color: "rgba(6,182,212,0.6)", glow: "rgba(6,182,212,0.25)" },
    { color: "rgba(139,92,246,0.5)", glow: "rgba(139,92,246,0.2)" },
    { color: "rgba(99,160,240,0.6)", glow: "rgba(99,160,240,0.25)" },
  ];
  return Array.from({ length: 100 }, (_, i) => {
    const c = colors[i % colors.length];
    return {
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1.5, // 1.5-4.5px — tiny crystals
      duration: Math.random() * 20 + 18, // 18-38s — much longer cycles
      delay: Math.random() * 15, // stagger up to 15s
      rotation: Math.random() * 360,
      driftX: (Math.random() - 0.5) * 50,
      driftY: -40 - Math.random() * 60,
      color: c.color,
      glow: c.glow,
    };
  });
}

type Particle = ReturnType<typeof generateParticles>[number];

function ParticleField() {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate on client only — Math.random() causes hydration mismatch during SSR
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setParticles(generateParticles());
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#3B82F6]/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#06B6D4]/15 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-2/3 left-1/2 w-80 h-80 bg-[#8B5CF6]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "4s" }}
      />

      {/* Crystal particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.size}px ${p.glow}`,
          }}
          animate={{
            y: [
              0,
              p.driftY * 0.3,
              p.driftY * 0.7,
              p.driftY,
              p.driftY * 0.7,
              p.driftY * 0.3,
              0,
            ],
            x: [
              0,
              p.driftX * 0.3,
              p.driftX * 0.6,
              p.driftX,
              p.driftX * 0.6,
              p.driftX * 0.3,
              0,
            ],
            opacity: [0, 0, 0.5, 0.8, 0.5, 0, 0],
            scale: [0.6, 0.8, 1, 1.15, 1, 0.8, 0.6],
            rotate: [
              p.rotation,
              p.rotation + 60,
              p.rotation + 120,
              p.rotation + 180,
              p.rotation + 240,
              p.rotation + 300,
              p.rotation + 360,
            ],
            filter: [
              "blur(3px)",
              "blur(1px)",
              "blur(0px)",
              "blur(0px)",
              "blur(0px)",
              "blur(1px)",
              "blur(3px)",
            ],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
            times: [0, 0.08, 0.25, 0.5, 0.75, 0.92, 1],
          }}
        />
      ))}

      {/* Floating connection lines (subtle) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
        <line
          x1="10%"
          y1="20%"
          x2="40%"
          y2="60%"
          stroke="#3B82F6"
          strokeWidth="1"
        />
        <line
          x1="60%"
          y1="10%"
          x2="80%"
          y2="50%"
          stroke="#06B6D4"
          strokeWidth="1"
        />
        <line
          x1="30%"
          y1="70%"
          x2="70%"
          y2="30%"
          stroke="#3B82F6"
          strokeWidth="1"
        />
        <line
          x1="85%"
          y1="20%"
          x2="50%"
          y2="80%"
          stroke="#06B6D4"
          strokeWidth="1"
        />
      </svg>

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleField />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
            We build AI that
            <br />
            <span className="relative inline-block h-[1.2em] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="inline-block bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent"
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-[#9CA3AF] max-w-2xl mx-auto mb-10"
          >
            Medical software, AI consulting, and training. Built by people who
            understand healthcare.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#work"
              className="px-8 py-4 border border-[#1F2937] hover:border-[#3B82F6] text-[#F9FAFB] font-semibold rounded-lg transition-all duration-200 hover:bg-[#3B82F6]/10"
            >
              Our Work
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-[#1F2937] hover:border-[#3B82F6] text-[#F9FAFB] font-semibold rounded-lg transition-all duration-200 hover:bg-[#3B82F6]/10"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-[#1F2937] rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-[#3B82F6] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
