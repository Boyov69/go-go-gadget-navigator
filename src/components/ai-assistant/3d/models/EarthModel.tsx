
import React, { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
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
  
  // Load Earth textures
  const earthTexture = useTexture({
    map: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_atmos_2048.jpg',
    normalMap: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_normal_2048.jpg',
    specularMap: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_specular_2048.jpg',
    bumpMap: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_bump_2048.jpg',
    emissiveMap: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_lights_2048.jpg',
  });

  const cloudTexture = useTexture(
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_clouds_2048.jpg'
  );
  
  // Animation for cloud layer
  useFrame(({ clock }) => {
    if (cloudRef.current) {
      // Make clouds rotate slightly faster than the earth
      cloudRef.current.rotation.y = clock.elapsedTime * 0.02;
    }
    
    if (atmosphereRef.current) {
      // Pulse the atmosphere glow
      const pulse = Math.sin(clock.elapsedTime) * 0.05 + 1;
      atmosphereRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={earthRef}>
      {/* Earth */}
      <mesh>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshPhongMaterial 
          map={earthTexture.map}
          normalMap={earthTexture.normalMap}
          specularMap={earthTexture.specularMap}
          bumpMap={earthTexture.bumpMap}
          bumpScale={0.05}
          shininess={5}
          emissive={0x2233ff}
          emissiveMap={earthTexture.emissiveMap}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      
      {/* Cloud layer */}
      <mesh ref={cloudRef} scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshPhongMaterial 
          map={cloudTexture}
          transparent={true}
          opacity={cloudOpacity}
          depthWrite={false}
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
    </group>
  );
};

export default EarthModel;
