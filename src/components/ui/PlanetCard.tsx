"use client";

import { motion } from "framer-motion";
import { PlanetData } from "@/lib/data";
import { Thermometer, Wind, RotateCw, Calendar, Ruler, Globe } from "lucide-react";

import { useAudioEffects } from "@/hooks/useAudioEffects";

interface PlanetCardProps {
  planet: PlanetData;
}

export default function PlanetCard({ planet }: PlanetCardProps) {
  const { playClick, announcePlanet } = useAudioEffects();

  return (
    <section className="relative min-h-screen flex items-center justify-center py-32 px-4 md:px-20 overflow-hidden">
      {/* Background Decor - Unique per planet */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${planet.color} 0%, transparent 70%)`
        }}
      />

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        {/* Visual Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: -50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, margin: "-100px" }}
          className="relative flex justify-center order-2 lg:order-1"
        >
          {/* Orbital Rings Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[120%] h-[120%] rounded-full border border-white/5 animate-spin-slow opacity-50" />
            <div className="w-[140%] h-[140%] rounded-full border border-white/5 animate-spin-slow opacity-30 direction-reverse" style={{ animationDuration: '45s' }} />
          </div>

          <div 
            className="w-72 h-72 md:w-[28rem] md:h-[28rem] rounded-full blur-[100px] absolute"
            style={{ backgroundColor: planet.color, opacity: 0.2 }}
          />
          
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playClick();
              announcePlanet(planet.name);
            }}
            className="relative w-64 h-64 md:w-96 md:h-96 rounded-full glass-premium flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)] cursor-pointer z-20 group"
          >
             <span className="text-white/5 text-[12rem] font-black group-hover:text-white/10 transition-colors duration-700 select-none">
               {planet.name[0]}
             </span>
             
             {/* Subtle inner glow */}
             <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
             
             {/* Floating label */}
             <div className="absolute -bottom-8 bg-white/5 backdrop-blur-md px-4 py-1 rounded-full border border-white/10 text-[10px] uppercase tracking-[0.3em] text-white/50">
                Interactive Probe
             </div>
          </motion.div>
        </motion.div>

        {/* Content Side */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: false, margin: "-100px" }}
          className="space-y-10 order-1 lg:order-2"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="w-12 h-[1px] bg-cyan-500/50" />
              <h4 className="text-cyan-400 font-bold tracking-[0.5em] uppercase text-xs">{planet.nickname}</h4>
            </div>
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter text-white leading-none gradient-text">
              {planet.name}
            </h2>
          </div>

          <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-xl">
            {planet.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <StatItem icon={<Ruler size={16} />} label="Diameter" value={planet.diameter} />
            <StatItem icon={<Thermometer size={16} />} label="Avg Temp" value={planet.temperature} />
            <StatItem icon={<Wind size={16} />} label="Atmosphere" value={planet.atmosphere} />
            <StatItem icon={<RotateCw size={16} />} label="Day Length" value={planet.dayLength} />
            <StatItem icon={<Calendar size={16} />} label="Year Length" value={planet.yearLength} />
            <StatItem icon={<Globe size={16} />} label="Gravity" value={planet.gravity} />
          </div>

          <div className="p-8 glass rounded-3xl border-white/5 bg-white/[0.01] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50" />
            <h5 className="text-cyan-500/70 font-bold uppercase text-[10px] tracking-[0.3em] mb-3">Discovery Note</h5>
            <p className="text-white text-lg md:text-xl font-light italic leading-snug">"{planet.funFact}"</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">Habitability Index</span>
              <span className="text-xl font-mono text-cyan-400">{planet.habitability}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${planet.habitability}%` }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
               />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2 group">
      <div className="flex items-center gap-2 text-slate-500 uppercase text-[9px] font-bold tracking-[0.2em] group-hover:text-cyan-400/70 transition-colors">
        {icon}
        {label}
      </div>
      <div className="text-white font-mono text-sm md:text-base tracking-tight">{value}</div>
    </div>
  );
}
