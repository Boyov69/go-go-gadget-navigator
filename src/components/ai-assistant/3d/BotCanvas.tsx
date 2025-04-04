
import React from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, PerspectiveCamera, AdaptiveDpr } from '@react-three/drei';
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
    <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
      {/* Optimized camera setup */}
      <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={45} />
      
      {/* Improved lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight 
        position={[1, 1, 5]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1.5} 
        castShadow 
      />
      <hemisphereLight 
        color="#ffffff" 
        groundColor="#222266" 
        intensity={0.7} 
      />
      
      {/* Main bot model */}
      <BotModel 
        isProcessing={isProcessing} 
        isListening={isListening} 
        isChatOpen={isChatOpen}
        pulseAnimation={pulseAnimation}
      />
      
      {/* Scene fog for depth */}
      <fog attach="fog" color="#000033" near={7} far={10} />
      
      {/* Scene controls */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        enableRotate={false}
        minPolarAngle={Math.PI / 2 - 0.4}
        maxPolarAngle={Math.PI / 2 + 0.4}
      />
      
      {/* Performance optimization */}
      <AdaptiveDpr pixelated />
    </Canvas>
  );
};

export default BotCanvas;
