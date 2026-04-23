"use client";

import dynamic from "next/dynamic";
import { AppProvider } from "@/lib/store";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/ui/Hero";
import PlanetCard from "@/components/ui/PlanetCard";
import SpaceWonders from "@/components/ui/SpaceWonders";
import AudioToggle from "@/components/ui/AudioToggle";
import PlanetInfoOverlay from "@/components/ui/PlanetInfoOverlay";
import LoadingScreen from "@/components/ui/LoadingScreen";
import FloatingParticles from "@/components/ui/FloatingParticles";
import ProgressBar from "@/components/ui/ProgressBar";
import { PLANETS } from "@/lib/data";
import { motion, useScroll, useSpring } from "framer-motion";

// Dynamically import Scene to avoid SSR issues with Three.js
const Scene = dynamic(() => import("@/components/canvas/Scene"), { ssr: false });

export default function Home() {
  return (
    <AppProvider>
      <SmoothScroll>
        <main className="relative min-h-screen bg-[#020617] text-white">
          <ProgressBar />

          {/* 3D Background Scene */}
          <Scene />

          {/* UI Content */}
          <div className="relative z-10">
            <FloatingParticles />
            <Hero />
            
            <div id="journey-start" className="pt-40">
              {PLANETS.map((planet) => (
                <div key={planet.id} id={`planet-${planet.id}`}>
                  <PlanetCard planet={planet} />
                </div>
              ))}
            </div>

            <ScaleSection />
            <SpaceWonders />
            
            <footer className="py-20 text-center border-t border-white/5 bg-black/50 backdrop-blur-md">
              <h2 className="text-4xl font-black gradient-text mb-6">COSMARA</h2>
              <p className="text-slate-500 max-w-md mx-auto mb-10 px-4">
                An immersive educational journey through the final frontier. 
                Built for those who look up and wonder.
              </p>
              <div className="flex justify-center gap-8 mb-12">
                <FooterLink label="Explore" />
                <FooterLink label="Data" />
                <FooterLink label="Missions" />
              </div>
              <p className="text-[10px] text-slate-700 uppercase tracking-[0.4em]">
                &copy; 2026 Cosmara Experience &bull; Milky Way Sector
              </p>
            </footer>
          </div>

          {/* Persistent UI */}
          <AudioToggle />
          <PlanetInfoOverlay />
          <LoadingScreen />
        </main>
      </SmoothScroll>
    </AppProvider>
  );
}

function ScaleSection() {
  return (
    <section className="py-32 px-4 border-y border-white/5 bg-black/20">
      <div className="container mx-auto max-w-4xl text-center">
        <h4 className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-sm mb-4">Perspective</h4>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-12">Cosmic Scale</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 py-12">
           <div className="flex flex-col items-center">
              <div className="w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6] mb-4" />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Earth</p>
           </div>
           
           <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-400 rounded-full shadow-[0_0_20px_#fb923c] mb-4" />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Jupiter</p>
              <p className="text-[10px] text-slate-600 mt-2">11x wider than Earth</p>
           </div>

           <div className="flex flex-col items-center">
              <div className="w-48 h-48 bg-yellow-500 rounded-full shadow-[0_0_40px_#eab308] mb-4 flex items-center justify-center overflow-hidden">
                 <div className="w-full h-full bg-gradient-to-br from-yellow-300 via-orange-500 to-red-600 opacity-80" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">The Sun</p>
              <p className="text-[10px] text-slate-600 mt-2">109x wider than Earth</p>
           </div>
        </div>
        
        <p className="text-slate-400 max-w-xl mx-auto mt-12 italic">
          "The cosmos is within us. We are made of star-stuff. We are a way for the cosmos to know itself."
          <span className="block mt-2 not-italic font-bold text-cyan-400">— Carl Sagan</span>
        </p>
      </div>
    </section>
  );
}

function FooterLink({ label }: { label: string }) {
  return (
    <a href="#" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
      {label}
    </a>
  );
}
