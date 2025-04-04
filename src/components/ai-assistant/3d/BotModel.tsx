
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface BotModelProps { 
  isProcessing: boolean; 
  isListening: boolean;
  isChatOpen: boolean;
  pulseAnimation: boolean;
}

const BotModel: React.FC<BotModelProps> = ({ 
  isProcessing, 
  isListening, 
  isChatOpen, 
  pulseAnimation 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Rotation and hover animations
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Hover effect with subtle bounce
    if (hovered) {
      meshRef.current.rotation.y += 0.02;
      // Add a slight scale bounce on hover
      const bounceFactor = 1 + Math.sin(state.clock.getElapsedTime() * 5) * 0.05;
      meshRef.current.scale.set(bounceFactor, bounceFactor, bounceFactor);
    } else if (isProcessing || isListening) {
      meshRef.current.rotation.y += 0.03;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
    } else {
      meshRef.current.rotation.y += 0.005;
    }
    
    // Pulse animation
    if (pulseAnimation && !hovered && !isProcessing && !isListening) {
      const pulseFactor = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
      meshRef.current.scale.set(pulseFactor, pulseFactor, pulseFactor);
    }
  });

  let color = '#60a5fa'; // Default color
  
  if (isProcessing) color = '#8B5CF6'; // Purple
  else if (isListening) color = '#10B981'; // Green
  else if (isChatOpen) color = '#EC4899'; // Pink
  else if (hovered) color = '#3B82F6'; // Bright blue

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main sphere */}
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.8}
        roughness={0.2}
        emissive={color} 
        emissiveIntensity={0.4} 
      />
      
      {/* Decorative rings */}
      <group rotation={[Math.PI / 4, 0, Math.PI / 6]}>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[1.3, 0.08, 16, 100]} />
          <meshStandardMaterial 
            color={"#33C3F0"} 
            transparent={true} 
            opacity={0.7}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </group>
      
      <group rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[1.5, 0.05, 16, 100]} />
          <meshStandardMaterial 
            color={"#9b87f5"} 
            transparent={true} 
            opacity={0.5}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </group>
    </mesh>
  );
};

export default BotModel;
