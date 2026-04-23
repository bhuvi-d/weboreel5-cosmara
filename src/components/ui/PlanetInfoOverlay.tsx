"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/lib/store";
import { PLANETS } from "@/lib/data";
import { X } from "lucide-react";

export default function PlanetInfoOverlay() {
  const { activePlanet, setActivePlanet } = useAppContext();
  const planet = PLANETS.find(p => p.id === activePlanet);

  if (!activePlanet) return null;

  return (
    <AnimatePresence>
      {planet && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-end p-4 md:p-12 pointer-events-none"
        >
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="w-full max-w-md h-full max-h-[80vh] glass rounded-[2rem] border-white/10 p-8 flex flex-col pointer-events-auto relative overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setActivePlanet(null)}
              className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
            >
              <X size={24} />
            </button>

            <div 
              className="absolute -top-20 -right-20 w-64 h-64 blur-[100px] opacity-20 pointer-events-none"
              style={{ backgroundColor: planet.color }}
            />

            <div className="mb-8">
              <h4 className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-2">{planet.nickname}</h4>
              <h2 className="text-5xl font-black tracking-tighter text-white">{planet.name}</h2>
            </div>

            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
              <p className="text-slate-300 leading-relaxed mb-8">
                {planet.description}
              </p>

              <div className="space-y-6 mb-8">
                <h5 className="text-white font-bold text-sm uppercase tracking-widest border-b border-white/5 pb-2">Technical Stats</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Gravity</p>
                    <p className="text-white text-sm">{planet.gravity}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Temperature</p>
                    <p className="text-white text-sm">{planet.temperature}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Day Length</p>
                    <p className="text-white text-sm">{planet.dayLength}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Moons</p>
                    <p className="text-white text-sm">{planet.moons}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h5 className="text-white font-bold text-sm uppercase tracking-widest border-b border-white/5 pb-2">Notable Missions</h5>
                <div className="flex flex-wrap gap-2">
                  {planet.missions.map(m => (
                    <span key={m} className="px-3 py-1 bg-white/5 rounded-full text-xs text-cyan-400 border border-cyan-500/20">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
                 <p className="text-cyan-200 text-sm leading-relaxed italic">
                   "{planet.funFact}"
                 </p>
              </div>
            </div>

            <button
              onClick={() => {
                setActivePlanet(null);
                const el = document.getElementById(`planet-${planet.id}`);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-8 w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-cyan-400 transition-colors"
            >
              Explore Section
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
