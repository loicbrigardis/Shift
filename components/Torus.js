import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";

const Torus = () => {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={meshRef} position={[0, 0, -15]}>
      <torusKnotBufferGeometry attach="geometry" args={[10, 3, 64, 8, 1, 3]} />
      <meshBasicMaterial
        attach="material"
        color="#ff9900"
        wireframe={true}
        opacity={0.015}
        transparent={true}
      />
    </mesh>
  );
};

export default Torus;
