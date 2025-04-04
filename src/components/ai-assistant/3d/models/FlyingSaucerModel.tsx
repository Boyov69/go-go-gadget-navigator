
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FlyingSaucerModelProps {
  isProcessing: boolean;
  isListening: boolean;
  position: [number, number, number];
}

const FlyingSaucerModel: React.FC<FlyingSaucerModelProps> = ({ 
  isProcessing, 
  isListening,
  position
}) => {
  const saucerRef = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  
  // Color based on state
  const mainColor = isProcessing 
    ? new THREE.Color("#a200ff") 
    : isListening 
      ? new THREE.Color("#00ffe5") 
      : new THREE.Color("#00e5ff");
  
  // Animation for flying saucer
  useFrame(({ clock }) => {
    if (saucerRef.current) {
      // Hover animation
      saucerRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 2) * 0.05;
      
      // Rotation
      saucerRef.current.rotation.y += 0.01;
    }
    
    if (beamRef.current) {
      // Pulse the tractor beam
      const beamPulse = Math.sin(clock.getElapsedTime() * 4) * 0.5 + 0.5;
      beamRef.current.material.opacity = 0.3 + beamPulse * 0.3;
      beamRef.current.scale.y = 1 + beamPulse * 0.2;
      
      // Only show beam during processing or listening
      beamRef.current.visible = isProcessing || isListening;
    }
    
    if (lightRef.current) {
      // Pulse the light
      const lightPulse = Math.sin(clock.getElapsedTime() * 4) * 0.5 + 0.5;
      lightRef.current.intensity = 0.5 + lightPulse * 0.5;
    }
  });

  return (
    <group ref={saucerRef} position={position} scale={[0.15, 0.15, 0.15]}>
      {/* Main saucer body (top) */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[1, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color={mainColor}
          metalness={0.9}
          roughness={0.2}
          emissive={mainColor}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Bottom part */}
      <mesh position={[0, -0.05, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[0.8, 16, 8, 0, Math.PI * 2, 0, Math.PI / 4]} />
        <meshStandardMaterial
          color="#888899"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Cockpit dome */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.4, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#aaccff"
          metalness={0.2}
          roughness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Ring around the saucer */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1.2, 0.15, 16, 32]} />
        <meshStandardMaterial
          color="#aaaacc"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Bottom lights */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh 
          key={i} 
          position={[
            1 * Math.cos(i * Math.PI / 3),
            -0.2,
            1 * Math.sin(i * Math.PI / 3)
          ]}
          scale={[0.1, 0.1, 0.1]}
        >
          <sphereGeometry />
          <meshStandardMaterial
            color={mainColor}
            emissive={mainColor}
            emissiveIntensity={2}
          />
        </mesh>
      ))}
      
      {/* Tractor beam */}
      <mesh ref={beamRef} position={[0, -0.5, 0]} rotation={[Math.PI, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.1, 2, 16, 1, true]} />
        <meshBasicMaterial
          color={mainColor}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Light source */}
      <pointLight 
        ref={lightRef}
        color={mainColor}
        intensity={0.5}
        distance={5}
        decay={2}
        position={[0, -0.3, 0]}
      />
    </group>
  );
};

export default FlyingSaucerModel;
