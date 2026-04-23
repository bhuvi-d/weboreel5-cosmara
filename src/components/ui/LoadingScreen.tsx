"use client";

import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const { progress, active } = useProgress();
  const [isFinished, setIsFinished] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Auto-finish if nothing is loading or if we reach 100%
    if (progress === 100 || !active) {
      const timer = setTimeout(() => setIsFinished(true), 1000);
      return () => clearTimeout(timer);
    }

    // Safety timeout: 5 seconds max
    const fallback = setTimeout(() => setIsFinished(true), 5000);
    return () => clearTimeout(fallback);
  }, [progress, active]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[1000] bg-[#020617] flex flex-col items-center justify-center p-4"
        >
          <div className="relative mb-8">
             <div className="w-24 h-24 rounded-full border-t-2 border-cyan-500 animate-spin" />
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-cyan-400 font-bold text-xs">{Math.round(progress)}%</span>
             </div>
          </div>
          
          <h2 className="text-2xl font-black tracking-[0.3em] text-white uppercase mb-2">Initializing Cosmara</h2>
          <p className="text-slate-500 text-xs uppercase tracking-widest animate-pulse">Syncing with orbital data...</p>
          
          <div className="absolute bottom-12 w-full max-w-xs h-[1px] bg-white/10 overflow-hidden">
             <motion.div 
               className="h-full bg-cyan-500"
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
             />
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            onClick={() => setIsFinished(true)}
            className="mt-12 text-[10px] text-cyan-400/50 uppercase tracking-[0.3em] hover:text-cyan-400 transition-colors pointer-events-auto"
          >
            Skip Journey
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
