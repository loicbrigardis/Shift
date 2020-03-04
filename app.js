import React, { useRef, useEffect, Suspense } from "react";
import ReactDOM from "react-dom";
import { Canvas, Dom, useLoader } from "react-three-fiber";
import { TextureLoader } from "three";
import dragscroll from "dragscroll";

import Section from "./components/Section";
import Card from "./components/Card";
import settings from "./settings";
import Effects from "./components/Effects";
import Lines from "./components/Lines";

import images from "./assets/img/*.jpg";
import Torus from "./components/Torus";

const App = () => {
  return <Wrapper />;
};

const Sphere = () => {
  const material = useRef();
  const texture = useLoader(TextureLoader, images.s2);

  return (
    <mesh position={[0, 0, 0]}>
      <sphereBufferGeometry attach="geometry" args={[2, 32, 32]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  );
};

const Wrapper = () => {
  useEffect(() => {
    settings.top = 0;
  });

  const onScroll = e => {
    settings.top = e.target.scrollTop / 75;
  };

  return (
    <>
      <header className="header">
        <ul className="header__list">
          <li className="header__item">Shift</li>
          <li className="header__item header__item--left">Products</li>
          <li className="header__item header__item--left">Customers</li>
          <li className="header__item header__item--left">Features</li>
          <li className="header__item header__item--left">Medias</li>
          <li className="header__item header__item--left">Contact</li>
          <li className="header__item header__item--burger">
            <svg
              style={{
                height: "32px",
                id: "Layer_1",
                style: "enable-background:new 0 0 32 32",
                version: "1.1",
                viewBox: "0 0 32 32",
                width: "32px"
              }}
            >
              <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
            </svg>
          </li>
        </ul>
      </header>

      <Canvas>
        <pointLight position={[10, 10, 10]} />
        <Section factor={1.5} order={0} center>
          <Suspense fallback="...">
            <Sphere />
            <Lines />
          </Suspense>
          <Dom>
            <div className="title">
              <h1 className="title__h1">Shift</h1>
              <p className="title__desc">It's just the beginning.</p>
            </div>
          </Dom>
        </Section>
        <Section factor={1.0} order={1} left>
          <Card left map={images.s1}>
            <span>01</span>
            <h2 style={{ color: "#15b9b5" }}>Lady Liberty of Tokio</h2>
            <p>
              In the Odaiba area of Tokyo, a smaller scale Statue of Liberty
              stands in front of the skyline of Tokyo Bay and the Rainbow
              Bridge.
            </p>
          </Card>
        </Section>
        <Section factor={1.5} order={2} right>
          <Card right map={images.s2}>
            <span>02</span>
            <h2 style={{ color: "#EC5433" }}>The Tokyo Path</h2>
            <p>
              From the Kaga exit and entrance north to Kawaguchi Junction. The
              Kawaguchi Route was opened on 9 September 1987.
            </p>
          </Card>
        </Section>
        <Section order={3} center>
          <Torus />
          <Dom>
            <h3 className="middle">Doloribus excepturi.</h3>
          </Dom>
        </Section>
        <Section factor={1.5} order={4} left>
          <Card left map={images.s3}>
            <span>03</span>
            <h2 style={{ color: "#15b9b5" }}>Window blurry</h2>
            <p>
              The City of Edmonton maintains roads and approximately 5000 km of
              sidewalks to ensure accessibility and safety.
            </p>
          </Card>
        </Section>
        <Section factor={1.0} order={5} right>
          <Card right map={images.s4}>
            <span>04</span>
            <h2 style={{ color: "#EC5433" }}>Night Photography</h2>
            <p>
              Night Photography Camera Settings for Beginners. I have spent many
              nights over the last 8 years teaching photographers how to capture
              night photography.
            </p>
          </Card>
        </Section>
        <Section order={6} center>
          <Suspense fallback="...">
            <Lines />
          </Suspense>
          <Dom>
            <h3 className="middle">Next</h3>
          </Dom>
        </Section>
        <Effects />
      </Canvas>
      <div className="main dragscroll" onScroll={onScroll}>
        {[...Array(settings.sections).keys()].map(item => (
          <p key={item} className="sections" style={{ height: `${100}vh` }}></p>
        ))}
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.querySelector("#scene"));
