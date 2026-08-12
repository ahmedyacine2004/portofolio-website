/* eslint-disable react-hooks/set-state-in-effect */
// ==========================================
// FILE 3: src/components/3d/ContactScene.tsx
// ==========================================
'use client';

import { Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';

import { useTheme } from '@/hooks/use-theme';

const ContactModel = dynamic(() => import('./ContactModel'), {
  ssr: false,
});

export function ContactScene() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === 'dark';

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center text-xs font-semibold text-purple-900 dark:text-purple-200">
            Loading scene…
          </div>
        }
      >
        <Canvas
          camera={{
            position: [0, 1.2, 4.2],
            fov: 38,
          }}
          dpr={[1, 2]}
        >
          {/* Background matching studio purple aesthetic */}
          <color attach="background" args={[isDark ? '#1C1226' : '#BAA3CE']} />

          {/* Soft Studio Lighting */}
          <Environment preset="studio" environmentIntensity={isDark ? 0.7 : 1.1} />

          <ambientLight intensity={isDark ? 0.6 : 0.85} color="#E8D5FF" />

          <directionalLight
            position={[4, 5, 3]}
            intensity={isDark ? 1.4 : 1.8}
            color="#FFFFFF"
            castShadow
          />

          <directionalLight position={[-4, 2, -2]} intensity={isDark ? 0.5 : 0.7} color="#C49BFF" />

          <pointLight position={[0, -1, 2]} intensity={isDark ? 0.4 : 0.6} color="#DDAAFF" />

          {/* 3D Model */}
          <ContactModel />
        </Canvas>
      </Suspense>
    </div>
  );
}
