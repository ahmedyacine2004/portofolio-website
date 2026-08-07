'use client';

import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const KeyboardModel = dynamic(() => import('./KeyboardModel'), { ssr: false });

export function KeyboardScene() {
  return (
    <div className="relative h-[70%] min-h-[320px] w-full overflow-hidden rounded-2xl border border-border/40 bg-background/20 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] md:h-[420px] md:w-full">
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Loading model…
          </div>
        }
      >
        <Canvas camera={{ position: [0, 0.7, 1.25], fov: 20 }} dpr={[1, 2]}>
          <color attach="background" args={['transparent']} />
          <ambientLight intensity={0.65} />
          <directionalLight position={[4, 4, 4]} intensity={1.4} />
          <directionalLight position={[-3, 2, 2]} intensity={0.7} />
          <pointLight position={[0, 1.5, 2]} intensity={0.6} />
          <KeyboardModel />
        </Canvas>
      </Suspense>
    </div>
  );
}
