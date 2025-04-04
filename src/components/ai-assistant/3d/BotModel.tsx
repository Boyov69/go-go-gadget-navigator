
import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

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
  const rocketRef = useRef<THREE.Group>(null);
  const saucerRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Load Earth textures
  const earthTexture = useTexture({
    map: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_atmos_2048.jpg',
    normalMap: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_normal_2048.jpg',
    specularMap: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_specular_2048.jpg',
    bumpMap: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_bump_2048.jpg',
  });

  // Create simple rocket and flying saucer geometries
  const rocket = useMemo(() => {
    const group = new THREE.Group();
    
    // Rocket body
    const bodyGeometry = new THREE.CylinderGeometry(0.1, 0.15, 0.5, 16);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    
    // Rocket nose
    const noseGeometry = new THREE.ConeGeometry(0.1, 0.2, 16);
    const noseMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.y = 0.35;
    
    // Rocket fins
    const finGeometry = new THREE.BoxGeometry(0.05, 0.15, 0.15);
    const finMaterial = new THREE.MeshPhongMaterial({ color: 0x3366ff });
    
    for (let i = 0; i < 4; i++) {
      const fin = new THREE.Mesh(finGeometry, finMaterial);
      fin.position.y = -0.2;
      fin.position.x = Math.sin(i * Math.PI/2) * 0.15;
      fin.position.z = Math.cos(i * Math.PI/2) * 0.15;
      fin.rotation.y = i * Math.PI/2;
      group.add(fin);
    }
    
    // Flames
    const flameGeometry = new THREE.ConeGeometry(0.12, 0.2, 16);
    const flameMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xff9500, 
      transparent: true,
      opacity: 0.8
    });
    const flame = new THREE.Mesh(flameGeometry, flameMaterial);
    flame.position.y = -0.35;
    flame.rotation.x = Math.PI;
    
    group.add(body);
    group.add(nose);
    group.add(flame);
    
    return group;
  }, []);

  // Create flying saucer
  const flyingSaucer = useMemo(() => {
    const group = new THREE.Group();
    
    // Saucer top - Changed from MeshPhongMaterial to MeshStandardMaterial
    const topGeometry = new THREE.SphereGeometry(0.2, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    const topMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x888888, 
      metalness: 0.8,
      roughness: 0.2
    });
    const top = new THREE.Mesh(topGeometry, topMaterial);
    top.position.y = 0.05;
    
    // Saucer bottom - Changed from MeshPhongMaterial to MeshStandardMaterial
    const bottomGeometry = new THREE.SphereGeometry(0.25, 24, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
    const bottomMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x666666,
      metalness: 0.8, 
      roughness: 0.3
    });
    const bottom = new THREE.Mesh(bottomGeometry, bottomMaterial);
    bottom.position.y = -0.05;
    
    // Saucer middle ring
    const ringGeometry = new THREE.TorusGeometry(0.25, 0.05, 16, 32);
    const ringMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x44aaff,
      transparent: true,
      opacity: 0.8,
      emissive: 0x44aaff,
      emissiveIntensity: 0.5
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    
    // Windows
    const windowGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const windowMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    
    for (let i = 0; i < 8; i++) {
      const window = new THREE.Mesh(windowGeometry, windowMaterial);
      const angle = i * Math.PI/4;
      window.position.set(
        Math.sin(angle) * 0.2,
        0,
        Math.cos(angle) * 0.2
      );
      group.add(window);
    }
    
    group.add(top);
    group.add(bottom);
    group.add(ring);
    
    return group;
  }, []);

  // Animations and rotations
  useFrame((state) => {
    if (!earthRef.current || !orbitRef.current || !rocketRef.current || !saucerRef.current) return;
    
    // Earth rotation
    const earthRotationSpeed = isProcessing ? 0.01 : isListening ? 0.008 : 0.002;
    earthRef.current.rotation.y += earthRotationSpeed;
    
    // Orbital motion
    orbitRef.current.rotation.y += 0.01;
    orbitRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    
    // Rocket movement
    if (rocketRef.current) {
      rocketRef.current.rotation.y += 0.02;
      rocketRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.1;
    }
    
    // Flying saucer wobble
    if (saucerRef.current) {
      saucerRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
      saucerRef.current.rotation.z = Math.cos(state.clock.getElapsedTime() * 1.5) * 0.1;
    }
    
    // Hover and pulse effects
    if (hovered) {
      earthRef.current.scale.set(1.1, 1.1, 1.1);
    } else if (pulseAnimation && !isProcessing && !isListening) {
      const pulseFactor = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
      earthRef.current.scale.set(pulseFactor, pulseFactor, pulseFactor);
    } else {
      earthRef.current.scale.set(1, 1, 1);
    }
    
    // Status effects
    if (isProcessing || isListening) {
      orbitRef.current.rotation.y += 0.01; // Faster orbit when active
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
      {/* Earth */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshPhongMaterial 
          map={earthTexture.map}
          normalMap={earthTexture.normalMap}
          specularMap={earthTexture.specularMap}
          bumpMap={earthTexture.bumpMap}
          bumpScale={0.05}
          shininess={5}
          emissive={0x2233ff}
          emissiveIntensity={earthEmissiveIntensity}
        />
      </mesh>
      
      {/* Cloud layer */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshPhongMaterial 
          map={useTexture('https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_clouds_2048.jpg')}
          transparent={true}
          opacity={cloudOpacity}
          depthWrite={false}
        />
      </mesh>
      
      {/* Orbit path */}
      <group ref={orbitRef}>
        {/* Rocket */}
        <group ref={rocketRef} position={[0, 0, 1.5]} scale={[0.5, 0.5, 0.5]}>
          <primitive object={rocket} />
        </group>
        
        {/* Flying saucer */}
        <group 
          ref={saucerRef} 
          position={[-1.2, 0.8, -0.5]} 
          rotation={[0.5, 0.5, 0.2]} 
          scale={[0.4, 0.4, 0.4]}
        >
          <primitive object={flyingSaucer} />
        </group>
      </group>
    </group>
  );
};

export default BotModel;
