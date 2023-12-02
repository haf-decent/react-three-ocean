/// <reference types="react" />
import { Water, type WaterOptions } from "three/examples/jsm/Addons";
import { type GroupProps } from "@react-three/fiber";
export interface OceanProps extends Omit<GroupProps, "children"> {
    dimensions?: [number, number];
    normals: string;
    distortionScale?: number;
    size?: number;
    options?: WaterOptions;
}
export declare const Ocean: import("react").ForwardRefExoticComponent<Omit<OceanProps, "ref"> & import("react").RefAttributes<Water>>;
