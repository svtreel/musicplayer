import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Preload, useFBX } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";

const Scene = () => {
  const fbx = useFBX("/world.fbx");

  return <>
    <primitive object={fbx} scale={0.05} />
  </>
};

export default function Cube2() {
  return <>
    <div styles={{
        border: "1px solid blue"
      }}>
      <Canvas>
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls />
          <Environment preset="sunset" background />
        </Suspense>
      </Canvas>
    </div>
    </>
} 