// ==========================================
// FILE 2: src/components/3d/ContactModel.tsx
// ==========================================
'use client';

import { Float, useAnimations, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const contactModelUrl = '/3d/contact.glb';

export default function ContactModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(contactModelUrl);
  const { actions, mixer } = useAnimations(animations, groupRef);
  const { pointer, gl } = useThree();

  const dragStateRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    startRotationX: 0,
    startRotationY: 0,
    targetRotationX: 0,
    targetRotationY: 0,
  });

  // Play all animations embedded in the GLB (includes camera animations from Blender)
  useEffect(() => {
    if (!actions) return;

    const actionNames = Object.keys(actions);
    if (actionNames.length === 0) return;

    actionNames.forEach((name) => {
      const action = actions[name];
      if (!action) return;
      action.reset();
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.clampWhenFinished = false;
      action.play();
    });

    return () => {
      actionNames.forEach((name) => {
        actions[name]?.stop();
      });
    };
  }, [actions]);

  // Advance the animation mixer each frame
  useFrame((_state, delta) => {
    mixer.update(delta);

    if (!groupRef.current) return;

    // Subtle pointer parallax on top of the running animation
    const idleRotationY = pointer.x * 0.08;
    const idleRotationX = -pointer.y * 0.05;

    const baseRotationX = 0.05;
    const baseRotationY = -0.25;

    const targetRotX = baseRotationX + idleRotationX + dragStateRef.current.targetRotationX;
    const targetRotY = baseRotationY + idleRotationY + dragStateRef.current.targetRotationY;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.06,
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      0.06,
    );
  });

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      dragStateRef.current.active = true;
      dragStateRef.current.startX = e.clientX;
      dragStateRef.current.startY = e.clientY;
      dragStateRef.current.startRotationX = dragStateRef.current.targetRotationX;
      dragStateRef.current.startRotationY = dragStateRef.current.targetRotationY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!dragStateRef.current.active) return;
      const deltaX = e.clientX - dragStateRef.current.startX;
      const deltaY = e.clientY - dragStateRef.current.startY;

      dragStateRef.current.targetRotationY = dragStateRef.current.startRotationY + deltaX * 0.006;
      dragStateRef.current.targetRotationX = Math.max(
        -Math.PI / 6,
        Math.min(Math.PI / 6, dragStateRef.current.startRotationX + deltaY * 0.006),
      );
    };

    const handlePointerUp = () => {
      dragStateRef.current.active = false;
    };

    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [gl]);

  return (
    <group ref={groupRef} position={[0, -2.2, 0]}>
      <Float speed={0.8} rotationIntensity={0.04} floatIntensity={0.05}>
        <primitive object={scene} scale={1.5} />
      </Float>
    </group>
  );
}

useGLTF.preload(contactModelUrl);
