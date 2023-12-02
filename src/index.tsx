import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { PlaneGeometry, RepeatWrapping, TextureLoader, Vector3 } from "three";
import { Water, type WaterOptions } from "three/examples/jsm/Addons";
import { type GroupProps, useFrame } from "@react-three/fiber";

export interface OceanProps extends Omit<GroupProps, "children"> {
	dimensions?: [ number, number ],
	normals: string,
	distortionScale?: number,
	size?: number,
	options?: WaterOptions
}

export const Ocean = forwardRef<Water, OceanProps>(({
	dimensions = [ 10000, 10000 ],
	normals,
	distortionScale = 3.7,
	size = 1,
	options = {},
	...props
}, ref) => {
	const [ geometry ] = useState(() => new PlaneGeometry(...dimensions));

	const normalMap = useMemo(() => {
		if (!normals) return undefined;
		return new TextureLoader().load(normals, texture => {
			texture.wrapS = texture.wrapT = RepeatWrapping;
		})
	}, [ normals ]);

	const [ water ] = useState(() => (
		new Water(
			geometry,
			{
				textureWidth: 512,
				textureHeight: 512,
				waterNormals: normalMap,
				sunDirection: new Vector3(),
				sunColor: 0xffffff,
				waterColor: 0x001e0f,
				distortionScale: 3.7,
				fog: false,
				...options
			}
		)
	));

	useImperativeHandle(ref, () => water)

	useEffect(() => {
		water.material.uniforms.distortionScale.value = distortionScale;
		water.material.uniforms.size.value = size;
		water.material.uniforms.normalSampler.value = normalMap;
	}, [ distortionScale, size, normalMap ]);

	useFrame(() => {
		water.material.uniforms.time.value += 1 / 60;
	});

	return (
		<group {...props}>
			<primitive
				object={water}
				rotation-x={-Math.PI / 2}
			/>
		</group>
	);
});

Ocean.displayName = "Ocean";