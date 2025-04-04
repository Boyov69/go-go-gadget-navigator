
import React from 'react';
import { useTexture } from '@react-three/drei';

interface EarthModelProps {
  emissiveIntensity: number;
  cloudOpacity: number;
}

const EarthModel: React.FC<EarthModelProps> = ({ emissiveIntensity, cloudOpacity }) => {
  // Load Earth textures
  const earthTexture = useTexture({
    map: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_atmos_2048.jpg',
    normalMap: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_normal_2048.jpg',
    specularMap: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_specular_2048.jpg',
    bumpMap: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_bump_2048.jpg',
  });

  const cloudTexture = useTexture(
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_clouds_2048.jpg'
  );

  return (
    <>
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
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      
      {/* Cloud layer */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshPhongMaterial 
          map={cloudTexture}
          transparent={true}
          opacity={cloudOpacity}
          depthWrite={false}
        />
      </mesh>
    </>
  );
};

export default EarthModel;
