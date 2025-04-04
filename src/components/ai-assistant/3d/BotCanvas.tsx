
import React from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
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
    <Canvas camera={{ position: new THREE.Vector3(0, 0, 5), fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight 
        position={[-10, -10, 10]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1} 
        castShadow 
      />
      <BotModel 
        isProcessing={isProcessing} 
        isListening={isListening} 
        isChatOpen={isChatOpen}
        pulseAnimation={pulseAnimation}
      />
    </Canvas>
  );
};

export default BotCanvas;
