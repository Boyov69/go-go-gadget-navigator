
import React from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import BotModel from './BotModel';

interface BotCanvasProps {
  isProcessing: boolean;
  isListening: boolean;
  isChatOpen: boolean;
  pulseAnimation: boolean;
}

const BotCanvas: React.FC<BotCanvasProps> = ({ 
  isProcessing, 
  isListening, 
  isChatOpen, 
  pulseAnimation 
}) => {
  return (
    <Canvas camera={{ position: new THREE.Vector3(0, 0, 3), fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight 
        position={[1, 1, 5]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1} 
        castShadow 
      />
      <hemisphereLight 
        color="#ffffff" 
        groundColor="#222266" 
        intensity={0.5} 
      />
      <BotModel 
        isProcessing={isProcessing} 
        isListening={isListening} 
        isChatOpen={isChatOpen}
        pulseAnimation={pulseAnimation}
      />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        enableRotate={false}
        minPolarAngle={Math.PI / 2 - 0.4}
        maxPolarAngle={Math.PI / 2 + 0.4}
      />
    </Canvas>
  );
};

export default BotCanvas;
