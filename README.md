# react-three-ocean
React/R3F wrapper for the [threejs ocean shader](https://threejs.org/examples/?q=water#webgl_shaders_ocean)

## Installation
```bash
yarn add react-three-ocean
```
```bash
npm i react-three-ocean
```

`react-three-ocean` exports a React component specifically for use in react-three-fiber scenes. It has peer dependencies for [react](https://github.com/facebook/react), [three](https://github.com/mrdoob/three.js), and [@react-three/fiber](https://github.com/pmndrs/react-three-fiber).

## Usage
Import the `Ocean` component for use in your r3f scene. By default, it renders a ground plane with the ocean shader applied.

You may forward a ref object to the `Ocean` component, which allows for further customization (e.g. sunDirection, animated waterColor, etc.). See below example for valid props.

```js
import { useRef, useState } from "react";
import { FrontSide } from "three";
import { Canvas } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import { Ocean } from "react-three-ocean";

export function Scene() {
  const [ camera, setCamera ] = useState();

  const ocean = useRef();

  return (
    <Canvas
      dpr={window.devicePixelRatio}
      flat={true}>
      <ambientLight intensity={0.8} color="#ddd"/>
      <directionalLight position={[ 3, 5, -2 ]} intensity={1.2}/>
      <Box args={[ 3, 3, 3 ]}>
        <meshStandardMaterial color="red"/>
      </Box>
      <Ocean
        ref={ocean}
        dimensions={[ 10000, 10000 ]}
        normals="https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg"
        distortionScale={20}
        size={10}
        options={{ // defaults
          clipBias: 0,
          alpha: 1,
          waterNormals: null, // automatically set to provided texture from "normals" prop
          sunDirection: new Vector3(0.70707, 0.70707, 0),
          sunColor: 0xffffff,
          waterColor: 0x001e0f,
          eye: new Vector3(0, 0, 0),
          distortionScale: 3.7, // automatically set from "distortionScale" prop
          side: FrontSide,
          fog: false
        }}
      />
    </Canvas>
  );
}
```

## Enjoy
