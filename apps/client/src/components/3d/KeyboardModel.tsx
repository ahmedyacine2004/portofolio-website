'use client';

import { Float, useGLTF } from '@react-three/drei';
import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const keyboardModelUrl = '/3d/keyboard.glb';

export default function KeyboardModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(keyboardModelUrl);
  const { camera, pointer, gl } = useThree();
  const [isHovered, setIsHovered] = useState(false);
  const dragStateRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    startRotationX: 0,
    startRotationY: 0,
    targetRotationX: 0,
    targetRotationY: 0,
  });

  const clonedScene = useMemo(() => scene.clone(), [scene]);

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

      dragStateRef.current.targetRotationY = dragStateRef.current.startRotationY + deltaX * 0.008;
      dragStateRef.current.targetRotationX = Math.max(
        -Math.PI / 4,
        Math.min(Math.PI / 4, dragStateRef.current.startRotationX + deltaY * 0.008),
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

  useFrame(() => {
    if (!groupRef.current) return;

    const idleRotationY = pointer.x * 0.12;
    const idleRotationX = -pointer.y * 0.08;

    const baseRotationX = 0.55;
    const baseRotationY = -0.38;

    const targetRotX = baseRotationX + idleRotationX + dragStateRef.current.targetRotationX;
    const targetRotY = baseRotationY + idleRotationY + dragStateRef.current.targetRotationY;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.08,
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      0.08,
    );

    const targetY = isHovered ? 0.14 : 0.08;
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);
    camera.lookAt(0, 0.1, 0);
  });

  const resetKeyMaterial = (object: THREE.Object3D | null) => {
    if (!object || !(object instanceof THREE.Mesh)) return;

    const material = Array.isArray(object.material) ? object.material[0] : object.material;

    if (material && 'emissive' in material) {
      const stdMat = material as THREE.MeshStandardMaterial;
      stdMat.emissive.setHex(0x000000);
      stdMat.emissiveIntensity = 0;
    }
  };

  const handleKeyInteraction = (object: THREE.Object3D | null, isHoveredKey = false) => {
    if (!object || !(object instanceof THREE.Mesh)) return;

    const material = Array.isArray(object.material) ? object.material[0] : object.material;

    if (!material || !('emissive' in material)) return;

    const stdMat = material as THREE.MeshStandardMaterial;

    if (isHoveredKey) {
      object.position.z = -0.006;
      stdMat.emissive.setHex(0x3b82f6);
      stdMat.emissiveIntensity = 0.45;
    } else {
      object.position.z = 0;
      stdMat.emissive.setHex(0x000000);
      stdMat.emissiveIntensity = 0;
    }
  };

  return (
    <group ref={groupRef}>
      <Float speed={1.05} rotationIntensity={0.08} floatIntensity={0.06}>
        <primitive
          object={clonedScene}
          scale={2.1}
          position={[0, 0.08, 0]}
          onPointerOver={(event: ThreeEvent<PointerEvent>) => {
            event.stopPropagation();
            setIsHovered(true);
            handleKeyInteraction(event.object, true);
          }}
          onPointerOut={(event: ThreeEvent<PointerEvent>) => {
            event.stopPropagation();
            setIsHovered(false);
            handleKeyInteraction(event.object, false);
            resetKeyMaterial(event.object);
          }}
        />
      </Float>
    </group>
  );
}

useGLTF.preload(keyboardModelUrl);
