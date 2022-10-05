var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { PlaneGeometry, RepeatWrapping, TextureLoader, Vector3 } from "three";
import { Water } from "three/examples/jsm/objects/Water";
import { useFrame } from "@react-three/fiber";
export function Ocean(_a) {
    var _b = _a.dimensions, dimensions = _b === void 0 ? [10000, 10000] : _b, normals = _a.normals, _c = _a.distortionScale, distortionScale = _c === void 0 ? 3.7 : _c, _d = _a.size, size = _d === void 0 ? 1 : _d, _e = _a.options, options = _e === void 0 ? {} : _e, children = _a.children, props = __rest(_a, ["dimensions", "normals", "distortionScale", "size", "options", "children"]);
    var geometry = useState(function () { return new (PlaneGeometry.bind.apply(PlaneGeometry, __spreadArray([void 0], dimensions, false)))(); })[0];
    var normalMap = useMemo(function () {
        if (!normals)
            return undefined;
        return new TextureLoader().load(normals, function (texture) {
            texture.wrapS = texture.wrapT = RepeatWrapping;
        });
    }, [normals]);
    var water = useState(function () {
        return new Water(geometry, __assign({ textureWidth: 512, textureHeight: 512, waterNormals: normalMap, sunDirection: new Vector3(), sunColor: 0xffffff, waterColor: 0x001e0f, distortionScale: 3.7, fog: false }, options));
    })[0];
    useEffect(function () {
        water.material.uniforms.distortionScale.value = distortionScale;
        water.material.uniforms.size.value = size;
        water.material.uniforms.normalSampler.value = normalMap;
    }, [distortionScale, size, normalMap]);
    useFrame(function () {
        water.material.uniforms.time.value += 1 / 60;
    });
    return (_jsxs("group", __assign({}, props, { children: [_jsx("primitive", { object: water, "rotation-x": -Math.PI / 2 }), !!children && children(water)] })));
}
Ocean.displayName = "Ocean";
