/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { Environment } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import { useTheme } from '@/hooks/use-theme';

// Preload the GLB immediately when this module loads (before ContactModel is
// even imported), so the network request is already in-flight or cached by
// the time the Canvas + Suspense resolves the component.
useGLTF.preload('/3d/contact.glb');

// Use React.lazy instead of next/dynamic so Suspense inside <Canvas> works
// correctly with @react-three/fiber's own suspense handling.
const ContactModel = lazy(() => import('./ContactModel'));

// ─── Constants ────────────────────────────────────────────────────────────────
const FINAL_POSITION = new THREE.Vector3(0, 1.2, 14);
const INTRO_DURATION = 2.5; // seconds

const ZOOM_MIN = 4;
const ZOOM_MAX = 28;
const ZOOM_SPEED = 1.5;
const ZOOM_LERP = 0.1;

const MAGIC_DURATION = 7; // full orbit + zoom-in + return

// ─── Module-level shared signals (React ↔ R3F bridge) ────────────────────────
const introCompleteFlag = { value: false };
const magicSignal = {
  active: false,
  elapsed: 0,
  startDist: FINAL_POSITION.z,
};

// ─── Cinematic intro camera rig ───────────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree();
  const elapsed = useRef(0);
  const introComplete = useRef(false);

  useEffect(() => {
    introCompleteFlag.value = false;
    camera.position.set(12, 5, 18);
    camera.lookAt(0, -0.2, 0);
  }, [camera]);

  useFrame((_state, delta) => {
    if (introComplete.current) return;

    elapsed.current += delta;
    const t = Math.min(elapsed.current / INTRO_DURATION, 1);
    const eased = 1 - Math.pow(1 - t, 3);

    const startAngle = Math.PI / 3;
    const angle = startAngle * (1 - eased);
    const radius = THREE.MathUtils.lerp(20, FINAL_POSITION.z, eased);
    const y = THREE.MathUtils.lerp(5, FINAL_POSITION.y, eased);

    camera.position.set(Math.sin(angle) * radius, y, Math.cos(angle) * radius);
    camera.lookAt(0, -0.2, 0);

    if (t >= 1) {
      camera.position.copy(FINAL_POSITION);
      camera.lookAt(0, -0.2, 0);
      introComplete.current = true;
      introCompleteFlag.value = true;
    }
  });

  return null;
}

// ─── "See Magic" orbit + zoom controller ─────────────────────────────────────
function MagicController({ onComplete }: { onComplete: () => void }) {
  const { camera } = useThree();
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useFrame((_state, delta) => {
    if (!magicSignal.active) return;

    magicSignal.elapsed += delta;
    const t = Math.min(magicSignal.elapsed / MAGIC_DURATION, 1);

    const angle = t * Math.PI * 2;
    const zoomBell = Math.sin(t * Math.PI);
    const closestDist = 6;
    const dist = THREE.MathUtils.lerp(magicSignal.startDist, closestDist, zoomBell);
    const y = FINAL_POSITION.y + zoomBell * -1.2;

    camera.position.set(Math.sin(angle) * dist, y, Math.cos(angle) * dist);
    camera.lookAt(0, -0.2, 0);

    if (t >= 1) {
      camera.position.copy(FINAL_POSITION);
      camera.lookAt(0, -0.2, 0);
      magicSignal.active = false;
      magicSignal.elapsed = 0;
      onCompleteRef.current();
    }
  });

  return null;
}

// ─── Scroll-to-zoom controller ────────────────────────────────────────────────
function ZoomController() {
  const { camera, gl } = useThree();
  const targetDistanceRef = useRef(FINAL_POSITION.z);

  useEffect(() => {
    const canvas = gl.domElement;

    const onWheel = (e: WheelEvent) => {
      if (!introCompleteFlag.value || magicSignal.active) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? ZOOM_SPEED : -ZOOM_SPEED;
      targetDistanceRef.current = THREE.MathUtils.clamp(
        targetDistanceRef.current + delta,
        ZOOM_MIN,
        ZOOM_MAX,
      );
    };

    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', onWheel);
  }, [gl]);

  useFrame(() => {
    if (!introCompleteFlag.value || magicSignal.active) return;

    const currentDist = camera.position.length();

    if (Math.abs(currentDist - targetDistanceRef.current) > 3) {
      targetDistanceRef.current = currentDist;
    }

    if (Math.abs(currentDist - targetDistanceRef.current) < 0.001) return;
    const dir = camera.position.clone().normalize();
    const newDist = THREE.MathUtils.lerp(currentDist, targetDistanceRef.current, ZOOM_LERP);
    camera.position.copy(dir.multiplyScalar(newDist));
  });

  return null;
}

// ─── Inner canvas content (separate component so Suspense is inside R3F) ─────
function SceneContent() {
  return (
    <Suspense fallback={null}>
      <ContactModel />
    </Suspense>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────
export function ContactScene() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const [key, setKey] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [isMagicPlaying, setIsMagicPlaying] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(
      () => {
        setShowScrollHint(true);
        setIntroReady(true);
      },
      INTRO_DURATION * 1000 + 200,
    );
    const hideTimer = setTimeout(() => setShowScrollHint(false), INTRO_DURATION * 1000 + 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
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

  const handleSeeMagic = useCallback(() => {
    if (!introCompleteFlag.value || magicSignal.active) return;
    magicSignal.active = true;
    magicSignal.elapsed = 0;
    magicSignal.startDist = FINAL_POSITION.z;
    setIsMagicPlaying(true);
  }, []);

  const handleMagicComplete = useCallback(() => {
    setIsMagicPlaying(false);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* WebGL context lost overlay */}
      {contextLost && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-black/50 text-white">
          <span className="text-2xl">⚠️</span>
          <span className="text-xs font-semibold">3D scene unavailable</span>
          <button
            onClick={handleRetry}
            className="mt-1 rounded-md bg-white/20 px-3 py-1 text-xs hover:bg-white/30 transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* ── "See Magic" button ── */}
      <div
        className={[
          'absolute top-4 left-1/2 z-10 -translate-x-1/2 transition-all duration-700',
          introReady ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none',
        ].join(' ')}
      >
        <button
          id="see-magic-btn"
          onClick={handleSeeMagic}
          disabled={isMagicPlaying}
          aria-label="Trigger magic camera animation"
          className={[
            'group relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold',
            'bg-white/15 text-white backdrop-blur-md border border-white/25',
            'shadow-lg shadow-black/20 cursor-pointer',
            'transition-all duration-300 select-none',
            isMagicPlaying
              ? 'opacity-60 cursor-not-allowed scale-95'
              : 'hover:bg-white/25 hover:scale-105 hover:shadow-purple-500/30 hover:shadow-xl active:scale-95',
          ].join(' ')}
        >
          <span
            className={[
              'text-sm transition-transform duration-300',
              isMagicPlaying ? 'animate-spin' : 'group-hover:rotate-12',
            ].join(' ')}
            aria-hidden="true"
          >
            ✨
          </span>

          <span>{isMagicPlaying ? 'Playing…' : 'See Magic'}</span>

          {isMagicPlaying && (
            <span className="absolute bottom-0 left-0 h-[2px] rounded-full bg-purple-400/80 animate-[magic-progress_7s_linear_forwards]" />
          )}
        </button>
      </div>

      {/* Scroll-to-zoom hint */}
      <div
        aria-hidden="true"
        className={[
          'pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2',
          'flex items-center gap-1.5 rounded-full px-3 py-1.5',
          'bg-black/30 text-white backdrop-blur-sm',
          'text-[10px] font-medium tracking-wide',
          'transition-opacity duration-700',
          showScrollHint && !isMagicPlaying ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      >
        <svg width="10" height="14" viewBox="0 0 10 14" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="8" height="12" rx="4" stroke="white" strokeWidth="1.2" />
          <rect x="4" y="3.5" width="2" height="3" rx="1" fill="white" />
        </svg>
        Scroll to zoom
      </div>

      <style>{`
        @keyframes magic-progress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>

      <Canvas
        key={key}
        camera={{ fov: 52, near: 0.1, far: 200 }}
        dpr={[1, 1.5]}
        gl={{
          powerPreference: 'high-performance',
          antialias: false,
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={handleCreated}
      >
        <CameraRig />
        <MagicController onComplete={handleMagicComplete} />
        <ZoomController />

        <color attach="background" args={[isDark ? '#1C1226' : '#BAA3CE']} />

        <Environment preset="studio" environmentIntensity={isDark ? 0.7 : 1.1} />
        <ambientLight intensity={isDark ? 0.6 : 0.85} color="#E8D5FF" />
        <directionalLight position={[4, 5, 3]} intensity={isDark ? 1.4 : 1.8} color="#FFFFFF" />
        <directionalLight position={[-4, 2, -2]} intensity={isDark ? 0.5 : 0.7} color="#C49BFF" />
        <pointLight position={[0, -1, 2]} intensity={isDark ? 0.4 : 0.6} color="#DDAAFF" />

        <SceneContent />
      </Canvas>
    </div>
  );
}
