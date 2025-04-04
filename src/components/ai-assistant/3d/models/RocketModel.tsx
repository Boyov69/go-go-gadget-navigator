
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RocketModel = React.memo(() => {
  const flameRef = useRef<THREE.Mesh>(null);
  const flameInnerRef = useRef<THREE.Mesh>(null);
  
  const rocket = React.useMemo(() => {
    const group = new THREE.Group();
    
    // Rocket body
    const bodyGeometry = new THREE.CylinderGeometry(0.1, 0.15, 0.5, 16);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xcccccc, 
      metalness: 0.8,
      roughness: 0.2,
      envMapIntensity: 1.0
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    
    // Rocket nose
    const noseGeometry = new THREE.ConeGeometry(0.1, 0.2, 16);
    const noseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xff0000,
      metalness: 0.5,
      roughness: 0.3
    });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.y = 0.35;
    
    // Rocket fins
    const finGeometry = new THREE.BoxGeometry(0.05, 0.15, 0.15);
    const finMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x3366ff,
      metalness: 0.6,
      roughness: 0.2
    });
    
    for (let i = 0; i < 4; i++) {
      const fin = new THREE.Mesh(finGeometry, finMaterial);
      fin.position.y = -0.2;
      fin.position.x = Math.sin(i * Math.PI/2) * 0.15;
      fin.position.z = Math.cos(i * Math.PI/2) * 0.15;
      fin.rotation.y = i * Math.PI/2;
      group.add(fin);
    }
    
    // Windows (portholes)
    const windowGeometry = new THREE.CircleGeometry(0.025, 16);
    const windowMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x88ccff, 
      transparent: true,
      opacity: 0.9
    });
    
    for (let i = 0; i < 3; i++) {
      const window = new THREE.Mesh(windowGeometry, windowMaterial);
      window.position.y = 0.1 - i * 0.15;
      window.position.x = 0.09;
      window.rotation.y = Math.PI / 2;
      group.add(window);
    }
    
    group.add(body);
    group.add(nose);
    
    return group;
  }, []);
  
  // Create flames separately so they can be animated
  useFrame(({ clock }) => {
    if (flameRef.current) {
      // Animate flame size
      const flamePulse = Math.sin(clock.elapsedTime * 10) * 0.05 + 0.95;
      flameRef.current.scale.x = flamePulse;
      flameRef.current.scale.z = flamePulse;
      
      // Animate flame color
      if (flameRef.current.material instanceof THREE.MeshBasicMaterial) {
        const hue = 0.05 + Math.sin(clock.elapsedTime * 5) * 0.01;
        flameRef.current.material.color.setHSL(hue, 0.9, 0.6);
      }
    }
    
    if (flameInnerRef.current && flameInnerRef.current.material instanceof THREE.MeshBasicMaterial) {
      // Animate inner flame color
      const brightness = 0.9 + Math.sin(clock.elapsedTime * 15) * 0.1;
      flameInnerRef.current.material.color.setHSL(0.1, 0.9, brightness);
    }
  });
  
  return (
    <group>
      <primitive object={rocket} />
      
      {/* Outer flame */}
      <mesh ref={flameRef} position={[0, -0.35, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.12, 0.25, 16, 1, true]} />
        <meshBasicMaterial 
          color={0xff9500} 
          transparent={true}
          opacity={0.7}
        />
      </mesh>
      
      {/* Inner flame */}
      <mesh ref={flameInnerRef} position={[0, -0.28, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.06, 0.18, 16, 1, true]} />
        <meshBasicMaterial 
          color={0xffff00} 
          transparent={true}
          opacity={0.9}
        />
      </mesh>
      
      {/* Flame glow */}
      <pointLight 
        position={[0, -0.35, 0]} 
        color={0xff5500}
        intensity={0.8}
        distance={0.5}
      />
    </group>
  );
});

RocketModel.displayName = 'RocketModel';

export default RocketModel;
