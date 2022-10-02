"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ocean = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var three_1 = require("three");
var Water_1 = require("three/examples/jsm/objects/Water");
var fiber_1 = require("@react-three/fiber");
function Ocean(_a) {
    var _b = _a.dimensions, dimensions = _b === void 0 ? [10000, 10000] : _b, normals = _a.normals, _c = _a.distortionScale, distortionScale = _c === void 0 ? 3.7 : _c, _d = _a.size, size = _d === void 0 ? 1 : _d, _e = _a.options, options = _e === void 0 ? {} : _e, children = _a.children, props = __rest(_a, ["dimensions", "normals", "distortionScale", "size", "options", "children"]);
    var geometry = (0, react_1.useState)(function () { return new (three_1.PlaneGeometry.bind.apply(three_1.PlaneGeometry, __spreadArray([void 0], dimensions, false)))(); })[0];
    var normalMap = (0, react_1.useMemo)(function () {
        if (!normals)
            return undefined;
        return new three_1.TextureLoader().load(normals, function (texture) {
            texture.wrapS = texture.wrapT = three_1.RepeatWrapping;
        });
    }, []);
    var water = (0, react_1.useState)(function () {
        return new Water_1.Water(geometry, __assign({ textureWidth: 512, textureHeight: 512, waterNormals: normalMap, sunDirection: new three_1.Vector3(), sunColor: 0xffffff, waterColor: 0x001e0f, distortionScale: 3.7, fog: false }, options));
    })[0];
    (0, react_1.useEffect)(function () {
        water.material.uniforms.distortionScale.value = distortionScale;
        water.material.uniforms.size.value = size;
    }, [distortionScale, size]);
    (0, fiber_1.useFrame)(function () {
        water.material.uniforms.time.value += 1 / 60;
    });
    return ((0, jsx_runtime_1.jsxs)("group", __assign({}, props, { children: [(0, jsx_runtime_1.jsx)("primitive", { object: water, "rotation-x": -Math.PI / 2 }), !!children && children(water)] })));
}
exports.Ocean = Ocean;
Ocean.displayName = "Ocean";
