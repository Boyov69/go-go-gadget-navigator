
import React, { useRef, useMemo } from 'react';
import { useTexture, useFrame, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface EarthModelProps {
  emissiveIntensity: number;
  cloudOpacity: number;
}

const EarthModel: React.FC<EarthModelProps> = ({ emissiveIntensity, cloudOpacity }) => {
  // Refs for animations
  const earthRef = useRef<THREE.Group>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  // Load Earth textures
  const textures = useTexture({
    map: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_atmos_2048.jpg',
    normalMap: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_normal_2048.jpg',
    specularMap: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_specular_2048.jpg',
    bumpMap: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_bump_2048.jpg',
    emissiveMap: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_lights_2048.jpg',
    roughnessMap: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
  });

  const cloudTexture = useTexture(
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_clouds_2048.jpg'
  );
  
  // Create stars
  const starCount = 2000;
  const starPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < starCount; i++) {
      const r = 30; // Radius of star sphere
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions.push(x, y, z);
    }
    return new Float32Array(positions);
  }, []);
  
  // Star colors
  const starColors = useMemo(() => {
    const colors = [];
    const colorOptions = [
      new THREE.Color(0xffffff), // White
      new THREE.Color(0xaaaaff), // Blue-ish
      new THREE.Color(0xffffaa), // Yellow-ish
      new THREE.Color(0xffaaaa), // Red-ish
    ];
    
    for (let i = 0; i < starCount; i++) {
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors.push(color.r, color.g, color.b);
    }
    return new Float32Array(colors);
  }, []);
  
  // Animation for cloud layer and atmosphere
  useFrame(({ clock }) => {
    if (cloudRef.current) {
      // Make clouds rotate slightly faster than the earth
      cloudRef.current.rotation.y = clock.elapsedTime * 0.02;
    }
    
    if (atmosphereRef.current) {
      // Pulse the atmosphere glow
      const pulse = Math.sin(clock.elapsedTime * 0.5) * 0.05 + 1;
      atmosphereRef.current.scale.set(pulse, pulse, pulse);
    }
    
    if (glowRef.current) {
      // Rotate glow layer in opposite direction
      glowRef.current.rotation.y = -clock.elapsedTime * 0.01;
      
      // Pulse the glow
      const glowPulse = Math.sin(clock.elapsedTime * 0.3) * 0.1 + 1;
      glowRef.current.scale.set(glowPulse, glowPulse, glowPulse);
    }
  });

  return (
    <>
      {/* Stars background */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starCount}
            array={starPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={starCount}
            array={starColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.8}
        />
      </points>
      
      <group ref={earthRef}>
        {/* Earth */}
        <mesh>
          <sphereGeometry args={[0.8, 64, 64]} />
          <meshStandardMaterial 
            map={textures.map}
            normalMap={textures.normalMap}
            roughnessMap={textures.roughnessMap}
            roughness={0.7}
            metalness={0.1}
            bumpMap={textures.bumpMap}
            bumpScale={0.05}
            emissive={0x2233ff}
            emissiveMap={textures.emissiveMap}
            emissiveIntensity={emissiveIntensity}
          />
        </mesh>
        
        {/* Cloud layer */}
        <mesh ref={cloudRef} scale={[1.02, 1.02, 1.02]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial 
            map={cloudTexture}
            transparent={true}
            opacity={cloudOpacity}
            depthWrite={false}
            roughness={1}
            metalness={0}
          />
        </mesh>
        
        {/* Atmosphere glow */}
        <mesh ref={atmosphereRef} scale={[1.05, 1.05, 1.05]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshBasicMaterial 
            color={0x4444ff}
            transparent={true}
            opacity={0.15}
            side={THREE.BackSide}
          />
        </mesh>
        
        {/* Outer atmosphere halo */}
        <mesh scale={[1.2, 1.2, 1.2]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshBasicMaterial 
            color={0x0033ff}
            transparent={true}
            opacity={0.05}
            side={THREE.BackSide}
          />
        </mesh>
        
        {/* Enhanced glow layer */}
        <mesh ref={glowRef} scale={[1.35, 1.35, 1.35]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshBasicMaterial 
            color={0x0066ff}
            transparent={true}
            opacity={0.1}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </>
  );
};

export default EarthModel;
