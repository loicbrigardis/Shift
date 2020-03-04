import React, { useRef, Suspense } from "react";
import { useThree, Dom } from "react-three-fiber";

import Plane from "./Plane";
import settings from "../settings";

const Card = ({ children, left, map }) => {
  const { size, viewport } = useThree();
  const number = useRef();
  const isMobile = size.width < settings.mobileSize;
  let halfCanvas = viewport.width / 2;
  const ratio = 1.75;

  if (size.width < settings.mobileSize) {
    left = true;
    halfCanvas = viewport.width * 0.85;
  }

  return (
    <group>
      <Suspense fallback="loading...">
        <Plane scale={[halfCanvas, halfCanvas / ratio, 1]} map={map} />
      </Suspense>
      <Dom
        position={[-halfCanvas + halfCanvas / 2, halfCanvas / ratio / 2, 0]}
        style={{
          width: `${isMobile ? viewport.width * 75 : size.width / 2}px`,
          textAlign: `${left ? "left" : "right"}`
        }}
      >
        {children[1]}
      </Dom>
      <group
        ref={number}
        position={[
          left
            ? halfCanvas - halfCanvas / 2 - 0.5
            : -halfCanvas + halfCanvas / 2 - 0.5,
          halfCanvas / ratio / 2 + 1.0,
          0
        ]}
      >
        <Dom>
          <div
            className="number"
            style={{
              textAlign: `${left ? "left" : "right"}`
            }}
          >
            {children[0]}
          </div>
        </Dom>
      </group>
      <Dom
        position={[-halfCanvas + halfCanvas / 2, -halfCanvas / ratio / 2, 0]}
      >
        <div
          className="description"
          style={{
            width: `${size.width / 4}px`,
            textAlign: `${left ? "left" : "right"}`,
            paddingLeft: `${left ? 0 : "100%"}`
          }}
        >
          {children[2]}
        </div>
      </Dom>
    </group>
  );
};

export default Card;
