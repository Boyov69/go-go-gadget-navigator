
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FlyingSaucerModel = React.memo(() => {
  const ringRef = useRef<THREE.Mesh>(null);
  const windowsRef = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    // Animate the ring
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.elapsedTime * 0.5;
      
      if (ringRef.current.material instanceof THREE.MeshPhongMaterial) {
        // Pulse the emissive intensity
        const pulse = Math.sin(clock.elapsedTime * 4) * 0.3 + 0.7;
        ringRef.current.material.emissiveIntensity = pulse;
      }
    }
    
    // Rotate windows
    if (windowsRef.current) {
      windowsRef.current.rotation.y = clock.elapsedTime * 0.3;
    }
    
    // Animate beam
    if (beamRef.current && beamRef.current.material instanceof THREE.MeshBasicMaterial) {
      // Pulse beam opacity
      const opacity = Math.sin(clock.elapsedTime * 2) * 0.1 + 0.2;
      beamRef.current.material.opacity = opacity;
    }
  });
  
  const flyingSaucer = React.useMemo(() => {
    const group = new THREE.Group();
    
    // Saucer top
    const topGeometry = new THREE.SphereGeometry(0.2, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    const topMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x888888, 
      metalness: 0.8,
      roughness: 0.2
    });
    const top = new THREE.Mesh(topGeometry, topMaterial);
    top.position.y = 0.05;
    
    // Saucer bottom
    const bottomGeometry = new THREE.SphereGeometry(0.25, 24, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
    const bottomMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x666666,
      metalness: 0.8, 
      roughness: 0.3
    });
    const bottom = new THREE.Mesh(bottomGeometry, bottomMaterial);
    bottom.position.y = -0.05;
    
    // Windows group
    const windowsGroup = new THREE.Group();
    
    // Windows
    const windowGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const windowMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffff00,
      transparent: true,
      opacity: 0.9
    });
    
    for (let i = 0; i < 8; i++) {
      const window = new THREE.Mesh(windowGeometry, windowMaterial);
      const angle = i * Math.PI/4;
      window.position.set(
        Math.sin(angle) * 0.2,
        0,
        Math.cos(angle) * 0.2
      );
      windowsGroup.add(window);
    }
    
    group.add(top);
    group.add(bottom);
    group.add(windowsGroup);
    
    return { group, windowsGroup };
  }, []);

  return (
    <group>
      <primitive object={flyingSaucer.group} />
      <group ref={windowsRef}>
        <primitive object={flyingSaucer.windowsGroup} />
      </group>
      
      {/* Glowing ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.25, 0.05, 16, 32]} />
        <meshPhongMaterial 
          color={0x44aaff}
          transparent={true}
          opacity={0.8}
          emissive={0x44aaff}
          emissiveIntensity={0.7}
        />
      </mesh>
      
      {/* Tractor beam effect */}
      <mesh ref={beamRef} position={[0, -0.2, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.15, 0.3, 16, 1, true]} />
        <meshBasicMaterial 
          color={0x88ccff} 
          transparent={true}
          opacity={0.2}
        />
      </mesh>
      
      {/* Beam light */}
      <pointLight 
        position={[0, -0.1, 0]} 
        color={0x88ccff}
        intensity={0.5}
        distance={0.5}
      />
    </group>
  );
});

FlyingSaucerModel.displayName = 'FlyingSaucerModel';

export default FlyingSaucerModel;
