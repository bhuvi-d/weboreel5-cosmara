"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { PLANETS, PlanetData } from "@/lib/data";
import { useAppContext } from "@/lib/store";
import { useAudioEffects } from "@/hooks/useAudioEffects";

function Planet({ data, index }: { data: PlanetData; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const { setActivePlanet } = useAppContext();
  const { playClick, announcePlanet } = useAudioEffects();

  // Orbital mechanics
  const distance = (index + 1) * 10 + 5;
  const speed = 1 / (data.distanceFromSun * 10 + 5);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed * 0.5;
    groupRef.current.position.x = Math.cos(t) * distance;
    groupRef.current.position.z = Math.sin(t) * distance;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <group>
      {/* Orbit path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[distance - 0.05, distance + 0.05, 128]} />
        <meshBasicMaterial color="#ffffff" opacity={0.1} transparent />
      </mesh>

      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh
            ref={meshRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={() => {
              playClick();
              announcePlanet(data.name);
              setActivePlanet(data.id);
            }}
          >
            <sphereGeometry args={[data.size * 1.5, 32, 32]} />
            <meshStandardMaterial
              color={data.color}
              emissive={data.color}
              emissiveIntensity={hovered ? 0.5 : 0.2}
              roughness={0.7}
              metalness={0.3}
            />
            {data.id === "saturn" && (
              <mesh rotation={[-Math.PI / 2.5, 0, 0]}>
                <ringGeometry args={[data.size * 2, data.size * 3.5, 64]} />
                <meshStandardMaterial
                  color="#C5AB6E"
                  transparent
                  opacity={0.6}
                  side={THREE.DoubleSide}
                />
              </mesh>
            )}
          </mesh>
        </Float>

        {hovered && (
          <Html distanceFactor={15}>
            <div className="pointer-events-none select-none glass px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold border-cyan-500/50">
              {data.name}
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}

export default function SolarSystem() {
  return (
    <group>
      {/* Sun */}
      <mesh>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial
          color="#FDB813"
          emissive="#FDB813"
          emissiveIntensity={2}
        />
        <pointLight intensity={2000} distance={200} decay={2} color="#FDB813" />
      </mesh>

      {PLANETS.map((planet, i) => (
        <Planet key={planet.id} data={planet} index={i} />
      ))}
    </group>
  );
}
