'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { OrbitControls } from '@react-three/drei';
import { BusinessCard } from '../types/businessCard';
import * as THREE from 'three';

function Card({ card }: { card: BusinessCard }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [spring, api] = useSpring(() => ({
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    config: { mass: 1, tension: 180, friction: 12 }
  }));

  // Create a simple gradient texture
  const gradientTexture = new THREE.CanvasTexture(
    (() => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 256, 256);
        gradient.addColorStop(0, '#1a1a1a');
        gradient.addColorStop(1, '#4a4a4a');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);
      }
      return canvas;
    })()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      api.start({
        rotation: [
          Math.random() * 0.2 - 0.1,
          Math.random() * 0.2 - 0.1,
          Math.random() * 0.2 - 0.1
        ],
        position: [
          Math.random() * 0.2 - 0.1,
          Math.random() * 0.2 - 0.1,
          0
        ]
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [api]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.03;
      meshRef.current.rotation.y = Math.cos(state.clock.getElapsedTime()) * 0.03;
    }
  });

  return (
    <animated.mesh
      ref={meshRef}
      rotation={spring.rotation as any}
      position={spring.position as any}
    >
      <planeGeometry args={[3.5, 2]} />
      <meshStandardMaterial
        map={gradientTexture}
        metalness={0.5}
        roughness={0.3}
        envMapIntensity={2}
      />
    </animated.mesh>
  );
}

export default function BusinessCard3D({ card }: { card: BusinessCard }) {
  return (
    <div className="w-full h-[400px] relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'linear-gradient(to bottom right, #1a1a1a, #4a4a4a)' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Card card={card} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}
