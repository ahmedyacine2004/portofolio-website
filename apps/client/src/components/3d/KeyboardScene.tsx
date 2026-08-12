/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { Environment, MeshReflectorMaterial } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';

import { useTheme } from '@/hooks/use-theme';

const KeyboardModel = dynamic(() => import('./KeyboardModel'), {
  ssr: false,
});

export function KeyboardScene() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === 'dark';

  return (
    <div
      className={[
        'relative h-full w-full overflow-hidden rounded-xs',
        isDark ? 'bg-black' : 'bg-background/20',
      ].join(' ')}
    >
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            Loading model…
          </div>
        }
      >
        <Canvas
          camera={{
            position: [0, 2.5, 14],
            fov: 40,
          }}
          dpr={[1, 2]}
        >
          <color attach="background" args={[isDark ? '#000000' : '#ffffff']} />

          {/* Environment map provides light reflections for glossy materials */}
          <Environment
            preset={isDark ? 'night' : 'city'}
            environmentIntensity={isDark ? 0.8 : 1.2}
          />

          <ambientLight intensity={isDark ? 0.45 : 0.65} />

          <directionalLight position={[4, 4, 4]} intensity={isDark ? 1.5 : 1.4} castShadow />

          <directionalLight position={[-3, 2, 2]} intensity={isDark ? 0.6 : 0.7} />

          <pointLight position={[0, 1.5, 2]} intensity={isDark ? 0.8 : 0.6} />

          {/* Blue glow underneath the keyboard — dark mode only */}
          {isDark && (
            <pointLight
              position={[0, -2, 0.35]}
              color="#1687ff"
              intensity={20}
              distance={3}
              decay={2}
            />
          )}

          {/* 3D Keyboard Model */}
          <KeyboardModel />

          {/* Glassy Reflective Floor beneath the keyboard */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[0, 0]}
              resolution={1024}
              mirror={0.8}
              mixBlur={0}
              mixStrength={2}
              roughness={0}
              metalness={0.1}
              color={isDark ? '#050505' : '#f0f0f0'}
            />
          </mesh>
        </Canvas>
      </Suspense>
    </div>
  );
}
