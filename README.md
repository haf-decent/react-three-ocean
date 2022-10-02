# react-three-ocean
React wrapper for the [threejs ocean shader](https://threejs.org/examples/?q=water#webgl_shaders_ocean)

## Installation
```bash
npm i react-three-ocean
```

## Usage
Import the `Ocean` component for use in your r3f scene. By default, it renders a ground plane with the ocean shader applied. See below example for valid props.

```js
import { FrontSide } from "three";
import { Canvas } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import { Ocean } from "react-three-ocean";

export function Scene() {
  const [ camera, setCamera ] = useState();

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
        }}>
        {(water) => {
          console.log(water); // children function is passed `Water` instance for manual manipulation (e.g. sunDirection, animated waterColor, etc.)
          return null;
        }}
       </Ocean>
    </Canvas>
  );
}
```

## Enjoy
