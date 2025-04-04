
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Trail } from '@react-three/drei';

interface OrbitGroupProps {
  isProcessing: boolean;
  isListening: boolean;
}

const OrbitGroup: React.FC<OrbitGroupProps> = ({ isProcessing, isListening }) => {
  const orbitRef = useRef<THREE.Group>(null);
  const rocketRef = useRef<THREE.Mesh>(null);
  const saucerRef = useRef<THREE.Mesh>(null);
  
  // Fix: Change the ref type from SVGLineElement to THREE.Line
  const orbitTrailRef = useRef<THREE.Line>(null);
  const saucerTrailRef = useRef<THREE.Line>(null);
  
  // Rotation speed for orbit objects
  const rocketSpeed = isProcessing ? 0.03 : isListening ? 0.02 : 0.01;
  const saucerSpeed = isProcessing ? 0.02 : isListening ? 0.015 : 0.008;
  
  // Update the orbit animations
  useFrame((state, delta) => {
    if (!orbitRef.current) return;
    
    // Rotate the entire orbit group
    orbitRef.current.rotation.y += 0.002;
    
    // Animate rocket position along orbit
    if (rocketRef.current) {
      const rocketTime = state.clock.getElapsedTime() * rocketSpeed;
      rocketRef.current.position.x = Math.sin(rocketTime) * 1.5;
      rocketRef.current.position.z = Math.cos(rocketTime) * 1.5;
      
      // Make rocket face the direction of travel
      rocketRef.current.rotation.y = Math.atan2(
        -Math.cos(rocketTime),
        -Math.sin(rocketTime)
      );
    }
    
    // Animate flying saucer along a different orbit
    if (saucerRef.current) {
      const saucerTime = state.clock.getElapsedTime() * saucerSpeed;
      saucerRef.current.position.x = Math.sin(saucerTime + Math.PI) * 2;
      saucerRef.current.position.z = Math.cos(saucerTime + Math.PI) * 2;
      // Add slight tilt and bobbing to saucer
      saucerRef.current.rotation.y += 0.01;
      saucerRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={orbitRef}>
      {/* Rocket orbit */}
      <Trail
        width={1.5}
        color={isProcessing ? "#ff3e00" : isListening ? "#00a2ff" : "#4a9eff"}
        length={5}
        decay={5}
        attenuation={(width) => width}
      >
        <mesh
          ref={rocketRef}
          position={[1.5, 0, 0]}
          scale={[0.1, 0.1, 0.2]}
        >
          <coneGeometry args={[1, 2, 8]} />
          <meshStandardMaterial
            color={isProcessing ? "#ff3e00" : isListening ? "#00a2ff" : "#4a9eff"}
            emissive={isProcessing ? "#ff3e00" : isListening ? "#00a2ff" : "#4a9eff"}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Trail>

      {/* Flying saucer orbit */}
      <Trail
        width={1.5}
        color={isProcessing ? "#a200ff" : isListening ? "#00ffe5" : "#00e5ff"}
        length={5}
        decay={5}
        attenuation={(width) => width}
      >
        <mesh
          ref={saucerRef}
          position={[2, 0, 0]}
          scale={[0.15, 0.05, 0.15]}
        >
          <sphereGeometry args={[1, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color={isProcessing ? "#a200ff" : isListening ? "#00ffe5" : "#00e5ff"}
            emissive={isProcessing ? "#a200ff" : isListening ? "#00ffe5" : "#00e5ff"}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Trail>

      {/* Orbital rings for visual effect */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.45, 1.55, 64]} />
        <meshBasicMaterial
          color="#4080ff"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.95, 2.05, 64]} />
        <meshBasicMaterial
          color="#40ffff"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export default OrbitGroup;
