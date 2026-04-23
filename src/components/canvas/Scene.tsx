"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { Suspense } from "react";
import Starfield from "./Starfield";
import Galaxy from "./Galaxy";
import SolarSystem from "./SolarSystem";
import { useAppContext } from "@/lib/store";

export default function Scene() {
  const { viewMode } = useAppContext();

  return (
    <div className="fixed inset-0 z-0">
      <Canvas shadows gl={{ antialias: true, toneMapping: THREE.ReinhardToneMapping }}>
        <PerspectiveCamera makeDefault position={[0, 40, 120]} fov={45} />
        <OrbitControls 
          enablePan={false} 
          maxDistance={400} 
          minDistance={20}
          autoRotate={viewMode === "galaxy"}
          autoRotateSpeed={0.5}
          enableDamping={true}
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 1.8}
        />
        
        <Suspense fallback={null}>
          <Starfield />
          <ambientLight intensity={0.2} />
          
          <group scale={viewMode === "galaxy" ? 1 : 0.05} visible={viewMode === "galaxy"}>
             <Galaxy />
          </group>

          <group scale={viewMode === "solar" ? 1 : 0.001} visible={viewMode === "solar"}>
            <SolarSystem />
          </group>

          <pointLight position={[100, 100, 100]} intensity={2} />
          <pointLight position={[-100, -100, -100]} intensity={1} color="#1b3984" />

          <EffectComposer>
            <Bloom 
              intensity={1.5} 
              luminanceThreshold={0.1} 
              luminanceSmoothing={0.9} 
              mipmapBlur 
            />
            <Noise opacity={0.05} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
