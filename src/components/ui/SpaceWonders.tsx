"use client";

import { motion } from "framer-motion";
import { SPACE_WONDERS } from "@/lib/data";
import { Sparkles, Zap, Radio, Target, Search } from "lucide-react";

const iconMap: Record<string, any> = {
  Asteroids: <Zap size={24} />,
  DwarfPlanet: <Target size={24} />,
  Vortex: <Radio size={24} />,
  Comet: <Sparkles size={24} />,
  Exoplanet: <Search size={24} />,
};

export default function SpaceWonders() {
  return (
    <section className="py-32 px-4 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h4 className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-sm mb-4">Beyond the Planets</h4>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">Space Wonders</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {SPACE_WONDERS.map((wonder, i) => (
            <motion.div
              key={wonder.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="p-8 glass rounded-3xl border-white/5 bg-white/[0.01] hover:bg-white/[0.05] transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                {iconMap[wonder.icon]}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{wonder.name}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{wonder.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
