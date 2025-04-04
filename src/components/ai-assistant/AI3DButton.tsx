
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Bot, Mic, Loader2, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAI } from '@/contexts/AIContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface AI3DButtonProps {
  onClick: () => void;
  isOpen: boolean;
  isChatOpen?: boolean;
}

// 3D Bot Model
const BotModel = ({ isProcessing, isListening, isChatOpen, pulseAnimation }: { 
  isProcessing: boolean; 
  isListening: boolean;
  isChatOpen: boolean;
  pulseAnimation: boolean;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Rotation animation
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Hover effect
    if (hovered) {
      meshRef.current.rotation.y += 0.02;
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

const AI3DButton: React.FC<AI3DButtonProps> = ({ onClick, isOpen, isChatOpen = false }) => {
  const { isProcessing, isListening } = useAI();
  const [pulseAnimation, setPulseAnimation] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Periodically pulse the button to draw attention
  useEffect(() => {
    if (isOpen || isProcessing || isListening) return;
    
    const interval = setInterval(() => {
      setPulseAnimation(true);
      setTimeout(() => setPulseAnimation(false), 2000);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [isOpen, isProcessing, isListening]);

  // Hide the tooltip after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, []);

  const getTooltipText = () => {
    if (isChatOpen) return "Close chat";
    if (isOpen) return "Switch to chat mode";
    return "Open AI Assistant (Alt+A for voice, Alt+C for chat)";
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-4 right-4 z-50"
    >
      <div className="relative">
        <Tooltip open={showTooltip}>
          <TooltipTrigger asChild>
            <motion.div
              className="w-14 h-14 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClick}
            >
              <div className="w-full h-full rounded-full shadow-lg overflow-hidden">
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
              </div>
              
              {/* Status indicator */}
              {(isProcessing || isListening) && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary"
                  animate={{ 
                    boxShadow: ['0 0 0 0 rgba(79, 70, 229, 0.4)', '0 0 0 10px rgba(79, 70, 229, 0)']
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 1.5
                  }}
                />
              )}
            </motion.div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-background p-2 border shadow-lg">
            <div className="text-sm">
              {getTooltipText()}
            </div>
          </TooltipContent>
        </Tooltip>
        
        {/* Keyboard shortcut hints */}
        <AnimatePresence>
          {!isOpen && !isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.2 }}
              className="absolute top-16 right-0 bg-background shadow-md rounded-md p-3 z-50 border"
            >
              <div className="flex flex-col gap-2 items-center text-sm">
                <div className="flex gap-2 items-center">
                  <kbd className="px-2 py-1 text-xs rounded border bg-muted">Alt+A</kbd> 
                  <span>for voice</span>
                </div>
                <div className="flex gap-2 items-center">
                  <kbd className="px-2 py-1 text-xs rounded border bg-muted">Alt+C</kbd> 
                  <span>for chat</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AI3DButton;
