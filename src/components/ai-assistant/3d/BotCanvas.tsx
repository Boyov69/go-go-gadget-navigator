
import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Vector2 } from 'three';
import BotModel from './BotModel';
import OrbitGroup from './models/OrbitGroup';
import EarthModel from './models/EarthModel';
import FlyingSaucerModel from './models/FlyingSaucerModel';
import RocketModel from './models/RocketModel';

// Fix type issues with postprocessing effects
import { EffectComposer, ChromaticAberration, Bloom, Noise, Vignette } from '@react-three/postprocessing';

// Loading placeholder component
const LoadingPlaceholder = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
  </div>
);

// Camera setup component
const CameraSetup = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 0, 6);
    // Prevent console errors by ensuring this effect only runs once
  }, [camera]);
  
  return null;
};

interface BotCanvasProps {
  isProcessing: boolean;
  isListening: boolean;
  isChatOpen?: boolean;
  pulseAnimation?: boolean;
}

const BotCanvas: React.FC<BotCanvasProps> = ({ 
  isProcessing, 
  isListening, 
  isChatOpen = false,
  pulseAnimation = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <Canvas ref={canvasRef} gl={{ antialias: true, alpha: true }}>
        <CameraSetup />
        
        {/* Scene lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <spotLight 
          position={[5, 10, -10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={0.5} 
        />
        
        {/* Bot model at the center */}
        <BotModel 
          isProcessing={isProcessing} 
          isListening={isListening}
          isChatOpen={isChatOpen}
          pulseAnimation={pulseAnimation}
        />
        
        {/* Earth in the background */}
        <EarthModel />
        
        {/* Orbiting elements */}
        <OrbitGroup 
          isProcessing={isProcessing} 
          isListening={isListening} 
        />
        
        {/* Flying saucer */}
        <FlyingSaucerModel 
          position={[-2, 1, -1]} 
          isProcessing={isProcessing} 
          isListening={isListening}
        />
        
        {/* Rocket */}
        <RocketModel 
          position={[2, -1, -1]}
          isProcessing={isProcessing}
          isListening={isListening}
        />
        
        {/* Environment for reflective materials */}
        <Environment preset="city" />
        
        {/* Post-processing effects */}
        <EffectComposer>
          <ChromaticAberration 
            offset={new Vector2(0.0005, 0.0005)} 
          />
          <Bloom 
            intensity={0.2} 
            luminanceThreshold={0.8} 
            luminanceSmoothing={0.9}
          />
          <Noise opacity={0.015} />
          <Vignette eskil={false} offset={0.1} darkness={0.8} />
        </EffectComposer>
        
        {/* Controls disabled in production to prevent user interaction */}
        {process.env.NODE_ENV === 'development' && (
          <OrbitControls enableZoom={false} enablePan={false} />
        )}
      </Canvas>
    </Suspense>
  );
};

export default BotCanvas;
