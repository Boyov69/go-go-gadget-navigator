
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import RocketModel from './RocketModel';
import FlyingSaucerModel from './FlyingSaucerModel';

interface OrbitGroupProps {
  isProcessing: boolean;
  isListening: boolean;
}

const OrbitGroup: React.FC<OrbitGroupProps> = ({ isProcessing, isListening }) => {
  const orbitRef = useRef<THREE.Group>(null);
  const rocketRef = useRef<THREE.Group>(null);
  const saucerRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!orbitRef.current || !rocketRef.current || !saucerRef.current) return;
    
    // Orbital motion
    orbitRef.current.rotation.y += 0.01;
    orbitRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    
    // Rocket movement
    if (rocketRef.current) {
      rocketRef.current.rotation.y += 0.02;
      rocketRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.1;
    }
    
    // Flying saucer wobble
    if (saucerRef.current) {
      saucerRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
      saucerRef.current.rotation.z = Math.cos(state.clock.getElapsedTime() * 1.5) * 0.1;
    }
    
    // Status effects - faster orbit when active
    if (isProcessing || isListening) {
      orbitRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={orbitRef}>
      {/* Rocket */}
      <group ref={rocketRef} position={[0, 0, 1.5]} scale={[0.5, 0.5, 0.5]}>
        <RocketModel />
      </group>
      
      {/* Flying saucer */}
      <group 
        ref={saucerRef} 
        position={[-1.2, 0.8, -0.5]} 
        rotation={[0.5, 0.5, 0.2]} 
        scale={[0.4, 0.4, 0.4]}
      >
        <FlyingSaucerModel />
      </group>
    </group>
  );
};

export default OrbitGroup;
