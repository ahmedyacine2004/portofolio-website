/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { MeshReflectorMaterial, Stars, useGLTF } from '@react-three/drei';
import { Canvas, type RootState, useThree } from '@react-three/fiber';
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';

import { useTheme } from '@/hooks/use-theme';

const keyboardModelUrl = '/3d/keyboard.glb';

// Preload GLB model at module evaluation time so network fetch starts immediately
useGLTF.preload(keyboardModelUrl);

// Use React.lazy so @react-three/fiber's internal Suspense boundary catches the load
const KeyboardModel = lazy(() => import('./KeyboardModel'));

interface SceneContentProps {
  isDark: boolean;
  mobile?: boolean;
}

function SceneContent({ isDark, mobile = false }: SceneContentProps) {
  return (
    <Suspense fallback={null}>
      {/* 3D Keyboard Model */}
      <KeyboardModel scaleMultiplier={mobile ? 1.275 : 1} />
    </Suspense>
  );
}

function ResizeCanvasToParent() {
  const { camera, gl } = useThree();

  useEffect(() => {
    const parent = gl.domElement.parentElement;
    if (!parent) return;

    const syncSize = () => {
      const rect = parent.getBoundingClientRect();
      const width = Math.max(rect.width, 1);
      const height = Math.max(rect.height, 1);

      if ('aspect' in camera) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }

      gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      gl.setSize(width, height, false);
    };

    const refresh = () => {
      requestAnimationFrame(syncSize);
    };

    refresh();

    const observer = new ResizeObserver(refresh);
    observer.observe(parent);

    const scrollContainer = parent.closest('main');
    if (scrollContainer instanceof HTMLElement) {
      scrollContainer.addEventListener('scroll', refresh, { passive: true });
    }
    window.addEventListener('resize', refresh);

    return () => {
      observer.disconnect();
      if (scrollContainer instanceof HTMLElement) {
        scrollContainer.removeEventListener('scroll', refresh);
      }
      window.removeEventListener('resize', refresh);
    };
  }, [camera, gl]);

  return null;
}

export function KeyboardScene({ mobile = false }: { mobile?: boolean }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const [key, setKey] = useState(0);
  const cleanupRef = useRef<(() => void) | null>(null);
  const isHeroEnabled =
    typeof document !== 'undefined' ? document.documentElement.dataset.hero3d !== 'false' : true;

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setCanRender(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => {
      cleanupRef.current?.();
    };
  }, [key]);

  const isDark = mounted && theme === 'dark';

  const handleCreated = useCallback(({ gl, camera, size }: RootState) => {
    const canvas = gl.domElement;
    const parent = canvas.parentElement;
    const width = parent ? parent.clientWidth || size.width : size.width;
    const height = parent ? parent.clientHeight || size.height : size.height;

    if (width > 0 && height > 0) {
      if ('aspect' in camera) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
      gl.setSize(width, height, false);
    }

    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.maxWidth = 'none';
    canvas.style.maxHeight = 'none';
    canvas.style.objectFit = 'fill';
    canvas.style.aspectRatio = 'auto';

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

  if (!isHeroEnabled) {
    return (
      <div
        data-hero-fallback="true"
        className={[
          'relative hidden h-full w-full min-h-0 min-w-0 items-center justify-center overflow-hidden rounded-xs border border-border/30 bg-muted/20',
          isDark ? 'bg-black text-white' : 'bg-white text-slate-900',
        ].join(' ')}
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            3D Disabled
          </span>
          <span className="text-[10px] text-foreground">Enable 3D hero in settings.</span>
        </div>
      </div>
    );
  }

  return (
    <div
      data-hero-3d-scene="true"
      className={[
        'relative h-full w-full min-h-0 min-w-0 overflow-hidden rounded-xs',
        isDark ? 'bg-black' : 'bg-white',
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
            className="absolute inset-0 h-full w-full"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              display: 'block',
            }}
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
            <ResizeCanvasToParent />
            <color attach="background" args={[isDark ? '#000000' : '#ffffff']} />

            {/* Fog fades the floor edge into the background so plane boundary is invisible */}
            <fog attach="fog" args={[isDark ? '#000000' : '#ffffff', 22, 65]} />

            <ambientLight intensity={isDark ? 0.45 : 0.65} />

            <directionalLight position={[4, 4, 4]} intensity={isDark ? 1.5 : 1.4} castShadow />

            <directionalLight position={[-3, 2, 2]} intensity={isDark ? 0.6 : 0.7} />

            <pointLight position={[0, 1.5, 2]} intensity={isDark ? 0.8 : 0.6} />

            {isDark && (
              <Stars
                radius={100}
                depth={50}
                count={4000}
                factor={5.5}
                saturation={0}
                fade
                speed={1.8}
              />
            )}

            {/* Ground light under the keyboard — dark mode only */}
            {isDark && (
              <pointLight
                position={[0, -0.6, 0.35]}
                color="#7bb8ff"
                intensity={35}
                distance={24}
                decay={2}
              />
            )}

            {/* Inner Scene Content (Environment + Model) with internal Suspense */}
            <SceneContent isDark={isDark} mobile={mobile} />

            {/* Keep the old camera framing and make the floor fill the full viewport corners */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, 0]}>
              <planeGeometry args={[5000, 5000]} />
              <MeshReflectorMaterial
                blur={[400, 100]}
                resolution={512}
                mirror={0.35}
                mixBlur={1}
                mixStrength={0.6}
                roughness={0}
                depthScale={1}
                minDepthThreshold={0.4}
                maxDepthThreshold={1}
                metalness={0.05}
                color={isDark ? '#080808' : '#6ea8ff'}
              />
            </mesh>
          </Canvas>
        </Suspense>
      )}
    </div>
  );
}
