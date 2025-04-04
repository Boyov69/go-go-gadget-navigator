
import React from 'react';
import * as THREE from 'three';

const FlyingSaucerModel = React.memo(() => {
  const flyingSaucer = React.useMemo(() => {
    const group = new THREE.Group();
    
    // Saucer top
    const topGeometry = new THREE.SphereGeometry(0.2, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    const topMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x888888, 
      metalness: 0.8,
      roughness: 0.2
    });
    const top = new THREE.Mesh(topGeometry, topMaterial);
    top.position.y = 0.05;
    
    // Saucer bottom
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

  return <primitive object={flyingSaucer} />;
});

FlyingSaucerModel.displayName = 'FlyingSaucerModel';

export default FlyingSaucerModel;
