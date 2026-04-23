"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[1000] pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 origin-left"
        style={{ scaleX }}
      />
      
      {/* Decorative glow */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-cyan-500/10 blur-xl pointer-events-none" />
    </div>
  );
}
