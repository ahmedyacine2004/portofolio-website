/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useGLTF } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
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
const FINAL_POSITION = new THREE.Vector3(0, -0.65, 15.5);
const INTRO_DURATION = 2.5; // seconds

const ZOOM_MIN = 10;
const ZOOM_MAX = 28;
const ZOOM_SPEED = 1;
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
    const radius = THREE.MathUtils.lerp(24, FINAL_POSITION.z, eased);
    const y = THREE.MathUtils.lerp(6.2, FINAL_POSITION.y, eased);

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
    const closestDist = 9;
    const dist = THREE.MathUtils.lerp(magicSignal.startDist, closestDist, zoomBell);
    const y = FINAL_POSITION.y + zoomBell * -0.5;

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
    const parent = canvas.parentElement;

    if (parent) {
      parent.style.position = 'relative';
      parent.style.width = '100%';
      parent.style.height = '100%';
    }

    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.maxWidth = 'none';
    canvas.style.maxHeight = 'none';

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
    <div className="relative h-full min-h-0 w-full min-w-0 flex-1 overflow-hidden">
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
            'group relative isolate overflow-hidden rounded-full px-4 py-2 text-xs font-semibold',
            'bg-white/15 text-white backdrop-blur-md border border-white/25',
            'shadow-lg shadow-black/20 cursor-pointer',
            'transition-all duration-300 select-none',
            isMagicPlaying
              ? 'opacity-60 cursor-not-allowed scale-95'
              : 'hover:bg-white/25 hover:scale-105 hover:shadow-purple-500/30 hover:shadow-xl active:scale-95',
          ].join(' ')}
        >
          <span
            aria-hidden="true"
            className={[
              'absolute inset-0 rounded-full',
              'bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(168,85,247,0.95),rgba(91,33,182,0.96))]',
              isMagicPlaying
                ? 'animate-[magic-liquid_7s_linear_forwards]'
                : 'translate-y-full opacity-0',
            ].join(' ')}
          />

          <span className="absolute inset-x-[-12%] bottom-[-10%] h-16 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.9),rgba(255,255,255,0.18)_30%,rgba(255,255,255,0)_70%)] opacity-90 animate-[magic-wave_1.8s_ease-in-out_infinite]" />

          <span className="relative z-10 flex items-center gap-2">
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
          </span>
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
        @keyframes magic-liquid {
          0% {
            transform: translateY(100%) scaleY(0.7);
            opacity: 0.2;
          }
          18% {
            opacity: 0.75;
          }
          45% {
            transform: translateY(35%) scaleY(1.08);
            opacity: 0.92;
          }
          100% {
            transform: translateY(0%) scaleY(1.12);
            opacity: 1;
          }
        }

        @keyframes magic-wave {
          0% {
            transform: translateX(-22%) scaleX(0.9);
            opacity: 0.3;
          }
          50% {
            transform: translateX(8%) scaleX(1.1);
            opacity: 0.95;
          }
          100% {
            transform: translateX(-22%) scaleX(0.9);
            opacity: 0.3;
          }
        }
      `}</style>

      <Canvas
        key={key}
        className="absolute inset-0"
        style={{ width: '100%', height: '100%', display: 'block' }}
        camera={{ fov: 52, near: 0.1, far: 200 }}
        dpr={[1, 1.5]}
        gl={{
          powerPreference: 'high-performance',
          antialias: false,
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={handleCreated}
      >
        <ResizeCanvasToParent />
        <CameraRig />
        <MagicController onComplete={handleMagicComplete} />
        <ZoomController />

        <color attach="background" args={[isDark ? '#1C1226' : '#BAA3CE']} />

        <hemisphereLight
          args={[
            isDark ? '#DCC7FF' : '#FFFFFF',
            isDark ? '#180D28' : '#6E587D',
            isDark ? 1.1 : 1.5,
          ]}
        />
        <ambientLight intensity={isDark ? 0.85 : 1.1} color="#E8D5FF" />
        <directionalLight position={[4, 6, 5]} intensity={isDark ? 2.2 : 2.6} color="#FFFFFF" />
        <directionalLight position={[-4, 3, 1]} intensity={isDark ? 1 : 1.2} color="#C49BFF" />
        <pointLight position={[0, 1, 3]} intensity={isDark ? 0.8 : 1} color="#DDAAFF" />

        <SceneContent />
      </Canvas>
    </div>
  );
}
