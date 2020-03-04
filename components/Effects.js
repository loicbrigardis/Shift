import React, { useRef, useMemo } from "react";
import { extend, useThree, useFrame } from "react-three-fiber";
import lerp from "lerp";

import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";

import { GlitchPass } from "./post/Glitchpass";

import settings from "../settings";

extend({ EffectComposer, ShaderPass, UnrealBloomPass, RenderPass, GlitchPass });

const Effects = () => {
  const composer = useRef();
  const glitchRef = useRef();
  const unrealRef = useRef();
  const { size, gl, scene, camera } = useThree();

  const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [
    size
  ]);
  let glitch = 0;

  useFrame(() => {
    let rand = Math.floor(Math.random() * Math.floor(30));

    if (settings.top > 5) {
      unrealRef.current.strength = lerp(unrealRef.current.strength, 0.05, 0.1);
    } else {
      unrealRef.current.strength = lerp(unrealRef.current.strength, 1.5, 0.1);
    }

    if (rand === 20) {
      glitchRef.current.factor = 1;
    } else {
      glitchRef.current.factor = 0;
    }
    composer.current.render();
  }, 1);

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />

      <unrealBloomPass
        ref={unrealRef}
        attachArray="passes"
        strength={1.5}
        args={[aspect, 2, 1, 0]}
      />
      <glitchPass ref={glitchRef} attachArray="passes" factor={glitch} />
    </effectComposer>
  );
};

export default Effects;
