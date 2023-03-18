import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import styles from './cube.module.css';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

export default function Component() {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current! });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 10);
    scene.add(light);

    const loader = new FBXLoader();
    loader.load('../world.fbx', (model: THREE.Object3D) => {
      // const mixer = new THREE.AnimationMixer(model);
      // const animation = mixer.clipAction(model.animations[0]); // assuming only one animation clip
      // animation.play(); // start the animation
      // scene.add(model);
      // animate();

      // function animate() {
      //   requestAnimationFrame(animate);
      //   mixer.update(0.01); // update the animation mixer
      //   renderer.render(scene, camera);
      // }
    });
  }, []);

  return <>
            <canvas className={ styles.cv } ref={ canvasRef } />
        </>
}
