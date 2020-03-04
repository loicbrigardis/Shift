import { ShaderMaterial, Color } from "three";
import { extend } from "react-three-fiber";

class CustomMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader: `
      uniform float shift;
      varying vec2 vUv;
      uniform float time;
      void main() {
        vec3 pos = position;
        pos.y = pos.y + ((sin(uv.x * 3.14) * shift * 5.0) * 0.125);
        pos.z = -abs((pos.z + shift * 2.0)) ;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
      }`,
      fragmentShader: `
      uniform sampler2D texture;
      uniform float hasTexture;
      uniform float shift;
      uniform float scale;
      uniform vec3 color;
      uniform float opacity;
      uniform float time;
      uniform float isclose;

      varying vec2 vUv;
      void main() {
        float angle = 1.55;
        vec2 p = (vUv - vec2(0.5, 0.5)) * (1.0 - scale) + vec2(0.5, 0.5);
        vec2 offset = shift / 4.0 * vec2(cos(angle), sin(angle));
        vec4 cr = texture2D(texture, p + offset);
        vec4 cga = texture2D(texture, p);
        vec4 cb = texture2D(texture, p - offset);

        float alpha = 1.0 - (abs(isclose) / 4.0);
                
        gl_FragColor = vec4(vec3(cr.r, cga.g, cb.b) * alpha , 0.0);
        
      }`,
      uniforms: {
        texture: { value: null },
        hasTexture: { value: 0 },
        scale: { value: 0 },
        shift: { value: 0 },
        opacity: { value: 1 },
        color: { value: new Color("white") },
        time: { value: 0 },
        isclose: { value: 0 }
      }
    });
  }
  set time(value) {
    this.uniforms.time.value = value;
  }

  get time() {
    return this.uniforms.time.value;
  }

  set isclose(value) {
    this.uniforms.isclose.value = value;
  }

  get isclose() {
    return this.uniforms.isclose.value;
  }

  set scale(value) {
    this.uniforms.scale.value = value;
  }

  get scale() {
    return this.uniforms.scale.value;
  }

  set shift(value) {
    this.uniforms.shift.value = value;
  }

  get shift() {
    return this.uniforms.shift.value;
  }

  set map(value) {
    this.uniforms.hasTexture.value = !!value;
    this.uniforms.texture.value = value;
  }

  get map() {
    return this.uniforms.texture.value;
  }

  get color() {
    return this.uniforms.color.value;
  }

  get opacity() {
    return this.uniforms.opacity.value;
  }

  set opacity(value) {
    if (this.uniforms) this.uniforms.opacity.value = value;
  }
}

extend({ CustomMaterial });
