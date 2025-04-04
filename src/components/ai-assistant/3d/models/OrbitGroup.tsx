
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import RocketModel from './RocketModel';
import FlyingSaucerModel from './FlyingSaucerModel';
import { Stars } from '@react-three/drei';

interface OrbitGroupProps {
  isProcessing: boolean;
  isListening: boolean;
}

const OrbitGroup: React.FC<OrbitGroupProps> = ({ isProcessing, isListening }) => {
  const orbitRef = useRef<THREE.Group>(null);
  const rocketRef = useRef<THREE.Group>(null);
  const saucerRef = useRef<THREE.Group>(null);
  const orbitalTrailRef = useRef<THREE.Line>(null);

  // Create orbital trail
  const trailPoints = React.useMemo(() => {
    const points = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      const x = Math.sin(angle) * 1.5;
      const z = Math.cos(angle) * 1.5;
      points.push(new THREE.Vector3(x, 0, z));
    }
    return points;
  }, []);

  useFrame((state) => {
    if (!orbitRef.current || !rocketRef.current || !saucerRef.current) return;
    
    // Orbital motion
    orbitRef.current.rotation.y += 0.01;
    orbitRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    
    // Rocket movement
    if (rocketRef.current) {
      // Make rocket follow a path with some vertical movement
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
      
      // Pulse the orbital trail when active
      if (orbitalTrailRef.current && orbitalTrailRef.current.material instanceof THREE.LineBasicMaterial) {
        const pulseColor = new THREE.Color();
        pulseColor.setHSL(
          (state.clock.getElapsedTime() * 0.1) % 1, 
          0.7, 
          0.5 + Math.sin(state.clock.getElapsedTime() * 5) * 0.2
        );
        orbitalTrailRef.current.material.color = pulseColor;
      }
    } else if (orbitalTrailRef.current && orbitalTrailRef.current.material instanceof THREE.LineBasicMaterial) {
      // Default trail color
      orbitalTrailRef.current.material.color.set(0x4466ff);
    }
  });

  return (
    <group ref={orbitRef}>
      {/* Orbital trail */}
      <line ref={orbitalTrailRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={trailPoints.length}
            array={new Float32Array(trailPoints.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={0x4466ff} transparent opacity={0.5} />
      </line>
      
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
      
      {/* Space environment */}
      <Stars 
        radius={5} 
        depth={10} 
        count={500} 
        factor={2} 
        saturation={1}
        fade
        speed={1}
      />
    </group>
  );
};

export default OrbitGroup;
