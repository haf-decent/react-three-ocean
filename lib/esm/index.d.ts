import { ReactNode } from "react";
import { Water, WaterOptions } from "three/examples/jsm/objects/Water";
import { GroupProps } from "@react-three/fiber";
interface OceanProps extends Omit<GroupProps, "children"> {
    dimensions?: [number, number];
    normals: string;
    distortionScale?: number;
    size?: number;
    options?: WaterOptions;
    children?: (water: Water) => ReactNode;
}
export declare function Ocean({ dimensions, normals, distortionScale, size, options, children, ...props }: OceanProps): JSX.Element;
export declare namespace Ocean {
    var displayName: string;
}
export {};
