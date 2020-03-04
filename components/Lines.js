import React, { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { extend, Canvas, useFrame, useThree } from "react-three-fiber";
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from "threejs-meshline";

extend({ MeshLine, MeshLineMaterial });

function Fats({ width = 0.5, color = "red", curve }) {
  const { clock } = useThree();
  const lineRef = useRef();
  const matRef = useRef();

  useFrame(() => (matRef.current.uniforms.dashOffset.value += 0.0001));

  return (
    <mesh raycast={MeshLineRaycast}>
      <meshLine ref={lineRef} attach="geometry" vertices={curve} />
      <meshLineMaterial
        attach="material"
        ref={matRef}
        transparent
        depthTest={false}
        lineWidth={width}
        color={color}
        dashArray={0.1}
        dashRatio={0.95}
      />
    </mesh>
  );
}

function Lines() {
  const colors = [
    "#A2CCB6",
    "#FCEEB5",
    "#EE786E",
    "#e0feff",
    "lightpink",
    "lightblue"
  ];
  const count = 20;
  const lines = useMemo(
    () =>
      new Array(count).fill().map(() => {
        const pos = new THREE.Vector3(
          10 - Math.random() * 20,
          10 - Math.random() * 20,
          10 - Math.random() * 20
        );
        const points = new Array(20)
          .fill()
          .map(() =>
            pos
              .add(
                new THREE.Vector3(
                  4 - Math.random() * 8,
                  4 - Math.random() * 8,
                  2 - Math.random() * 4
                )
              )
              .clone()
          );
        const curve = new THREE.CatmullRomCurve3(points).getPoints(1000);
        return {
          color: colors[parseInt(colors.length * Math.random())],
          width: Math.max(0.1, 0.15 * Math.random()),
          speed: Math.max(0.0001, 0.0005 * Math.random()),
          curve
        };
      }),
    [colors, count]
  );
  return lines.map((props, index) => <Fats key={index} {...props} />);
}

export default Lines;
