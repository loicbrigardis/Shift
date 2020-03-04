import React, { useRef, useEffect } from "react";
import { TextureLoader } from "three";
import { useLoader, useFrame, useThree } from "react-three-fiber";
import lerp from "lerp";

import settings from "../settings";
import "./CustomMaterial";

const Plane = ({ color = "orange", map, ...props }) => {
  const texture = useLoader(TextureLoader, map);
  const { clock, viewport, size } = useThree();
  const material = useRef();
  const plane = useRef();

  let last = settings.top;
  let parent = 0;

  useEffect(() => {
    parent = (plane.current.parent.parent.parent.order * size.height) / 75;
  });

  useFrame(() => {
    const { top } = settings;
    material.current.time = clock.elapsedTime;

    material.current.isclose = parent - top;

    let target = (top - last) * 1.5;
    material.current.shift = lerp(material.current.shift, target, 0.1);
    last = top;
  });

  return (
    <mesh {...props}>
      <planeBufferGeometry ref={plane} attach="geometry" args={[1, 1, 15]} />
      <customMaterial
        ref={material}
        attach="material"
        color={color}
        map={texture}
      />
    </mesh>
  );
};

export default Plane;
