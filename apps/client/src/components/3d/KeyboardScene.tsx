/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { MeshReflectorMaterial, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import { useTheme } from '@/hooks/use-theme';

const keyboardModelUrl = '/3d/keyboard.glb';

// Preload GLB model at module evaluation time so network fetch starts immediately
useGLTF.preload(keyboardModelUrl);

// Use React.lazy so @react-three/fiber's internal Suspense boundary catches the load
const KeyboardModel = lazy(() => import('./KeyboardModel'));

interface SceneContentProps {
  isDark: boolean;
}

function SceneContent({ isDark }: SceneContentProps) {
  return (
    <Suspense fallback={null}>
      {/* 3D Keyboard Model */}
      <KeyboardModel />
    </Suspense>
  );
}

export function KeyboardScene() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const [key, setKey] = useState(0);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setMounted(true);
    // Short delay after client mount so GLTF preload cache is ready before Canvas mounts
    const timer = setTimeout(() => setCanRender(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => {
      cleanupRef.current?.();
    };
  }, [key]);

  const isDark = mounted && theme === 'dark';

  const handleCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    const canvas = gl.domElement;
    const onContextLost = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
    };
    const onContextRestored = () => setContextLost(false);
    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);
    cleanupRef.current = () => {
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
    };
  }, []);

  const handleRetry = useCallback(() => {
    setContextLost(false);
    setKey((k) => k + 1);
  }, []);

  return (
    <div
      className={[
        'relative h-full w-full overflow-hidden rounded-xs',
        isDark ? 'bg-black' : 'bg-background/20',
      ].join(' ')}
    >
      {/* WebGL Context Lost Overlay */}
      {contextLost && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-black/60 text-white backdrop-blur-xs">
          <span className="text-xl">⚠️</span>
          <span className="text-xs font-medium">3D scene interrupted</span>
          <button
            onClick={handleRetry}
            className="mt-1 rounded-md bg-white/20 px-3 py-1 text-xs hover:bg-white/30 transition-colors cursor-pointer"
          >
            Reload Scene
          </button>
        </div>
      )}

      {(!mounted || !canRender) && (
        <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
          Loading 3D workspace…
        </div>
      )}

      {mounted && canRender && (
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
              Loading model…
            </div>
          }
        >
          <Canvas
            key={key}
            camera={{
              position: [0, 2.5, 14],
              fov: 40,
            }}
            dpr={[1, 2]}
            gl={{
              powerPreference: 'high-performance',
              antialias: false,
              failIfMajorPerformanceCaveat: false,
            }}
            onCreated={handleCreated}
          >
            <color attach="background" args={[isDark ? '#000000' : '#ffffff']} />

            {/* Fog fades the floor edge into the background so plane boundary is invisible */}
            <fog attach="fog" args={[isDark ? '#000000' : '#ffffff', 22, 65]} />

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

            {/* Inner Scene Content (Environment + Model) with internal Suspense */}
            <SceneContent isDark={isDark} />

            {/* Floor plane positioned lower at y = -3.2 so rotation tilt never collides */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, 0]}>
              <planeGeometry args={[2000, 2000]} />
              <MeshReflectorMaterial
                blur={[400, 100]}
                resolution={512}
                mirror={0.35}
                mixBlur={1}
                mixStrength={0.6}
                roughness={0.85}
                depthScale={1}
                minDepthThreshold={0.4}
                maxDepthThreshold={1}
                metalness={0.05}
                color={isDark ? '#080808' : '#ececec'}
              />
            </mesh>
          </Canvas>
        </Suspense>
      )}
    </div>
  );
}
