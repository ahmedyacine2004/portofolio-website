'use client';

import { Float, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
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
    const canvas = gl.domElement;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const direction = event.deltaY > 0 ? 1.03 : 1 / 1.03;
      camera.position.z = THREE.MathUtils.clamp(camera.position.z * direction, 1.45, 2.55);
    };

    const handlePointerDown = (event: PointerEvent) => {
      dragStateRef.current.active = true;
      dragStateRef.current.startX = event.clientX;
      dragStateRef.current.startY = event.clientY;
      dragStateRef.current.startRotationX = dragStateRef.current.targetRotationX;
      dragStateRef.current.startRotationY = dragStateRef.current.targetRotationY;
      canvas.style.cursor = 'grabbing';
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!dragStateRef.current.active) return;

      const deltaX = event.clientX - dragStateRef.current.startX;
      const deltaY = event.clientY - dragStateRef.current.startY;

      dragStateRef.current.targetRotationX = dragStateRef.current.startRotationX + deltaY * 0.005;
      dragStateRef.current.targetRotationY = dragStateRef.current.startRotationY + deltaX * 0.005;
    };

    const handlePointerUp = () => {
      dragStateRef.current.active = false;
      canvas.style.cursor = 'grab';
    };

    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [camera, gl]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const targetY = Math.sin(state.clock.elapsedTime * 0.4) * 0.04;
    const rotationX = dragStateRef.current.active
      ? dragStateRef.current.targetRotationX
      : pointer.y * 0.2;
    const rotationY = dragStateRef.current.active
      ? dragStateRef.current.targetRotationY
      : pointer.x * 0.2;
    const hoverFactor = isHovered ? 0.16 : 0;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      rotationX + hoverFactor * 0.4,
      0.12,
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      rotationY,
      0.12,
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);
    camera.lookAt(0, 0.1, 0);
  });

  const resetKeyMaterial = (object: THREE.Object3D | null) => {
    if (!object?.isMesh) return;

    const mesh = object as THREE.Mesh;
    const material = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;

    if (material && 'emissive' in material) {
      material.emissive.setHex(0x000000);
      material.emissiveIntensity = 0;
    }
  };

  const handleKeyInteraction = (object: THREE.Object3D | null, isHoveredKey = false) => {
    if (!object?.isMesh) return;

    const mesh = object as THREE.Mesh;
    const material = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;

    if (!material || !('emissive' in material)) return;

    if (isHoveredKey) {
      mesh.position.z = -0.006;
      material.emissive.setHex(0x3b82f6);
      material.emissiveIntensity = 0.45;
    } else {
      mesh.position.z = 0;
      material.emissive.setHex(0x000000);
      material.emissiveIntensity = 0;
    }
  };

  return (
    <group ref={groupRef}>
      <Float speed={1.05} rotationIntensity={0.08} floatIntensity={0.06}>
        <primitive
          object={clonedScene}
          scale={2.1}
          position={[0, 0.08, 0]}
          onPointerOver={(event) => {
            event.stopPropagation();
            setIsHovered(true);
            handleKeyInteraction(event.object, true);
          }}
          onPointerOut={(event) => {
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
