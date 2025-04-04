
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RocketModelProps {
  isProcessing: boolean;
  isListening: boolean;
  position: [number, number, number];
  rotation?: [number, number, number];
}

const RocketModel: React.FC<RocketModelProps> = ({ 
  isProcessing, 
  isListening,
  position,
  rotation = [0, 0, 0]
}) => {
  const rocketRef = useRef<THREE.Group>(null);
  const exhaustRef = useRef<THREE.Group>(null);
  const engineGlowRef = useRef<THREE.PointLight>(null);
  
  // Color based on state
  const mainColor = isProcessing 
    ? new THREE.Color("#ff3e00") 
    : isListening 
      ? new THREE.Color("#00a2ff") 
      : new THREE.Color("#4a9eff");
  
  const exhaustColor = isProcessing 
    ? new THREE.Color("#ff7700") 
    : isListening 
      ? new THREE.Color("#00a2ff") 
      : new THREE.Color("#4a9eff");
      
  // Animation for rocket
  useFrame(({ clock }) => {
    if (rocketRef.current) {
      // Small hover animation
      rocketRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 3) * 0.02;
    }
    
    if (exhaustRef.current) {
      // Animate exhaust particles
      exhaustRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        
        // Make particles move downward and fade
        mesh.position.y -= 0.01 * (isProcessing ? 3 : isListening ? 2 : 1);
        
        // Reset particle when it goes too far
        if (mesh.position.y < -0.5) {
          mesh.position.y = 0;
          mesh.scale.set(
            Math.random() * 0.04 + 0.02,
            Math.random() * 0.04 + 0.02,
            Math.random() * 0.04 + 0.02
          );
          
          // Random offset within exhaust cone
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 0.05;
          mesh.position.x = Math.cos(angle) * radius;
          mesh.position.z = Math.sin(angle) * radius;
          
          // Material opacity
          (mesh.material as THREE.MeshBasicMaterial).opacity = 1;
        } else {
          // Fade out as it moves
          (mesh.material as THREE.MeshBasicMaterial).opacity *= 0.95;
        }
      });
    }
    
    if (engineGlowRef.current) {
      // Pulsate engine glow
      const intensity = isProcessing ? 2 : isListening ? 1.5 : 1;
      const pulse = 0.7 + Math.sin(clock.getElapsedTime() * 10) * 0.3;
      engineGlowRef.current.intensity = intensity * pulse;
    }
  });

  return (
    <group 
      ref={rocketRef} 
      position={position} 
      rotation={[rotation[0], rotation[1], rotation[2]]}
      scale={[0.1, 0.1, 0.1]}
    >
      {/* Rocket body */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.5, 2, 8]} />
        <meshStandardMaterial
          color="#dddddd"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Rocket nose cone */}
      <mesh position={[0, 1.75, 0]}>
        <coneGeometry args={[0.5, 1.5, 8]} />
        <meshStandardMaterial
          color={mainColor}
          metalness={0.8}
          roughness={0.2}
          emissive={mainColor}
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Engine section */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 1, 8]} />
        <meshStandardMaterial
          color="#999999"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
      
      {/* Engine nozzle */}
      <mesh position={[0, -1.2, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.4, 0.6, 8]} />
        <meshStandardMaterial
          color="#555555"
          metalness={0.9}
          roughness={0.4}
        />
      </mesh>
      
      {/* Fins (4 of them) */}
      {[0, 1, 2, 3].map((i) => (
        <mesh 
          key={i} 
          position={[
            0.5 * Math.cos(i * Math.PI / 2),
            -0.3,
            0.5 * Math.sin(i * Math.PI / 2)
          ]}
          rotation={[0, (i * Math.PI / 2) + Math.PI / 4, 0]}
        >
          <boxGeometry args={[0.7, 0.7, 0.05]} />
          <meshStandardMaterial
            color={mainColor}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      ))}
      
      {/* Windows/lights */}
      {[0, 1, 2, 3].map((i) => (
        <mesh 
          key={i} 
          position={[
            0.35 * Math.cos(i * Math.PI / 2),
            0.5,
            0.35 * Math.sin(i * Math.PI / 2)
          ]}
          rotation={[0, i * Math.PI / 2, 0]}
          scale={[0.15, 0.15, 0.05]}
        >
          <boxGeometry />
          <meshStandardMaterial
            color="#aaccff"
            emissive="#aaccff"
            emissiveIntensity={0.5}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
      
      {/* Engine glow */}
      <pointLight
        ref={engineGlowRef}
        position={[0, -1.5, 0]}
        color={exhaustColor}
        intensity={1.5}
        distance={5}
        decay={2}
      />
      
      {/* Exhaust particles */}
      <group ref={exhaustRef}>
        {Array.from({ length: 15 }).map((_, i) => {
          const scale = Math.random() * 0.04 + 0.02;
          const yPos = -Math.random() * 0.5 - 1.2;
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 0.05;
          
          return (
            <mesh 
              key={i} 
              position={[
                Math.cos(angle) * radius,
                yPos,
                Math.sin(angle) * radius
              ]}
              scale={[scale, scale, scale]}
            >
              <sphereGeometry />
              <meshBasicMaterial
                color={exhaustColor}
                transparent
                opacity={1 - Math.abs(yPos + 1.2) / 0.5}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

export default RocketModel;
