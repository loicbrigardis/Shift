import React, { useRef, useEffect } from "react";
import { useThree, useFrame } from "react-three-fiber";
import lerp from "lerp";

import settings from "../settings";

const Section = ({ left, center, order, children, factor = 1 }) => {
  const { viewport, size } = useThree();
  const mesh = useRef();
  let halfCanvas = viewport.width / 2;
  const ratio = 1.75;
  const margin = 0.2;
  const align = halfCanvas - halfCanvas * 0.5 - margin;
  let sectionPosition = left ? -align : align - 0.15;

  useEffect(() => {
    mesh.current.order = order;
  }, []);

  useFrame(() => {
    mesh.current.position.y = lerp(
      mesh.current.position.y,
      settings.top * factor,
      0.1
    );
  });

  if (center) {
    sectionPosition -= halfCanvas / 2;
  }

  if (size.width < settings.mobileSize) {
    sectionPosition = 0;
    halfCanvas = viewport.width * 0.9 - 0.5;
  }

  return (
    <>
      <group position={[0, (-size.height / 75) * order * factor, 0]}>
        <group ref={mesh} position={[sectionPosition, 0, 0]}>
          {children}
        </group>
      </group>
    </>
  );
};

export default Section;
