
import React from 'react';
import * as THREE from 'three';

const RocketModel = React.memo(() => {
  const rocket = React.useMemo(() => {
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

  return <primitive object={rocket} />;
});

RocketModel.displayName = 'RocketModel';

export default RocketModel;
