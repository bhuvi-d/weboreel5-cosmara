"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useAppContext } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { Howl } from "howler";

export default function AudioToggle() {
  const { isMuted, setIsMuted } = useAppContext();
  const soundRef = useRef<Howl | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // High quality space ambient sound (New Track)
    soundRef.current = new Howl({
      src: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"],
      loop: true,
      volume: 0.3,
      html5: true,
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current.unload();
      }
    };
  }, []);

  useEffect(() => {
    if (soundRef.current) {
      if (isMuted) {
        soundRef.current.pause();
      } else {
        if (!soundRef.current.playing()) {
          soundRef.current.play();
        }
      }
    }
  }, [isMuted]);

  const handleToggle = () => {
    setHasInteracted(true);
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4">
      {!hasInteracted && isMuted && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass px-4 py-2 rounded-full text-[10px] text-cyan-400 font-bold uppercase tracking-widest whitespace-nowrap"
        >
          Tap for sound
        </motion.div>
      )}
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleToggle}
        className="w-12 h-12 rounded-full glass border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors shadow-lg"
      >
        <AnimatePresence mode="wait">
          {isMuted ? (
            <motion.div
              key="muted"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <VolumeX size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="unmuted"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Volume2 size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
