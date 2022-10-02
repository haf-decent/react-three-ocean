import { ReactNode, useEffect, useMemo, useState } from "react";
import { PlaneGeometry, RepeatWrapping, TextureLoader, Vector3 } from "three";
import { Water, WaterOptions } from "three/examples/jsm/objects/Water";
import { GroupProps, useFrame } from "@react-three/fiber";

interface OceanProps extends Omit<GroupProps, "children"> {
	dimensions?: [ number, number ],
	normals: string,
	distortionScale?: number,
	size?: number,
	options?: WaterOptions,
	children?: (water: Water) => ReactNode
}

export function Ocean({
	dimensions = [ 10000, 10000 ],
	normals,
	distortionScale = 3.7,
	size = 1,
	options = {},
	children,
	...props
}: OceanProps) {
	const [ geometry ] = useState(() => new PlaneGeometry(...dimensions));

	const normalMap = useMemo(() => {
		if (!normals) return undefined;
		return new TextureLoader().load(normals, texture => {
			texture.wrapS = texture.wrapT = RepeatWrapping;
		})
	}, []);

	const [ water ] = useState(() => {
		return new Water(
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
	});

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
			<primitive object={water} rotation-x={-Math.PI / 2}/>
			{!!children && children(water)}
		</group>
	)
}

Ocean.displayName = "Ocean";