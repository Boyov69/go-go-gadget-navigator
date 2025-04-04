
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import EarthModel from './models/EarthModel';
import OrbitGroup from './models/OrbitGroup';

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
  const earthRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Animations and rotations
  useFrame((state) => {
    if (!earthRef.current) return;
    
    // Earth rotation
    const earthRotationSpeed = isProcessing ? 0.01 : isListening ? 0.008 : 0.002;
    earthRef.current.rotation.y += earthRotationSpeed;
    
    // Hover and pulse effects
    if (hovered) {
      earthRef.current.scale.set(1.1, 1.1, 1.1);
    } else if (pulseAnimation && !isProcessing && !isListening) {
      const pulseFactor = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
      earthRef.current.scale.set(pulseFactor, pulseFactor, pulseFactor);
    } else {
      earthRef.current.scale.set(1, 1, 1);
    }
  });

  // Set appearance based on state
  let earthEmissiveIntensity = 0.2;
  let cloudOpacity = 0.5;
  
  if (isProcessing) {
    earthEmissiveIntensity = 0.4;
    cloudOpacity = 0.8;
  } else if (isListening) {
    earthEmissiveIntensity = 0.6;
    cloudOpacity = 0.7;
  } else if (isChatOpen) {
    earthEmissiveIntensity = 0.3;
    cloudOpacity = 0.6;
  } else if (hovered) {
    earthEmissiveIntensity = 0.5;
    cloudOpacity = 0.9;
  }

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <group ref={earthRef}>
        <EarthModel 
          emissiveIntensity={earthEmissiveIntensity} 
          cloudOpacity={cloudOpacity} 
        />
      </group>
      
      <OrbitGroup 
        isProcessing={isProcessing}
        isListening={isListening}
      />
    </group>
  );
};

export default BotModel;
