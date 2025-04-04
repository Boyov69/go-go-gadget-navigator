
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  AdaptiveDpr, 
  Stars, 
  Preload,
  Effects
} from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
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
      
      {/* Enhanced lighting */}
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
      
      {/* Main bot model with loading fallback */}
      <Suspense fallback={null}>
        <BotModel 
          isProcessing={isProcessing} 
          isListening={isListening} 
          isChatOpen={isChatOpen}
          pulseAnimation={pulseAnimation}
        />
      </Suspense>
      
      {/* Background stars */}
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={0.5}
      />
      
      {/* Scene fog for depth */}
      <fog attach="fog" color="#000033" near={7} far={10} />
      
      {/* Scene controls */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        enableRotate={true}
        rotateSpeed={0.2}
        minPolarAngle={Math.PI / 2 - 0.5}
        maxPolarAngle={Math.PI / 2 + 0.5}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
      />
      
      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom 
          intensity={0.5} 
          luminanceThreshold={0.1} 
          luminanceSmoothing={0.9} 
          height={300}
        />
        <ChromaticAberration 
          offset={[0.0005, 0.0005]} 
          radialModulation={true}
          modulationOffset={0.5}
        />
      </EffectComposer>
      
      {/* Performance optimization */}
      <AdaptiveDpr pixelated />
      <Preload all />
    </Canvas>
  );
};

export default BotCanvas;
