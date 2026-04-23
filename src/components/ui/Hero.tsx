"use client";

import { motion } from "framer-motion";
import { useAppContext } from "@/lib/store";
import { ChevronDown } from "lucide-react";
import { useAudioEffects } from "@/hooks/useAudioEffects";

export default function Hero() {
  const { setViewMode } = useAppContext();
  const { playWhoosh } = useAudioEffects();

  const handleBegin = () => {
    playWhoosh();
    setViewMode("solar");
    const solarSection = document.getElementById("journey-start");
    if (solarSection) {
      solarSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="z-10"
      >
        <h1 className="text-8xl md:text-[14rem] font-black tracking-tighter gradient-text mb-6 leading-none">
          COSMARA
        </h1>
        <p className="text-lg md:text-2xl font-light tracking-[0.3em] text-cyan-400 uppercase mb-12">
          Touch the stars. Explore the worlds around us.
        </p>
        
        <button
          onClick={handleBegin}
          className="btn-premium group relative px-12 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all duration-500 overflow-hidden"
        >
          <span className="relative z-10 text-white font-medium tracking-widest uppercase">
            Begin Journey
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <p className="text-xs uppercase tracking-widest mb-4">Scroll to dive deeper</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
