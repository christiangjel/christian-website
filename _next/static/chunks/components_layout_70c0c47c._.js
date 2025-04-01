(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/components_layout_70c0c47c._.js", {

"[project]/components/layout/theme/theme-provider.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ThemeProvider": (()=>ThemeProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
'use client';
;
;
function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/layout/theme/theme-provider.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
_c = ThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/layout/wavesAnimation/animationUtils.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// This core-utils contains the most important/top-level functions needed in creating a threejs application
__turbopack_context__.s({
    "createCamera": (()=>createCamera),
    "createRenderer": (()=>createRenderer),
    "getDefaultUniforms": (()=>getDefaultUniforms),
    "runApp": (()=>runApp)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-client] (ecmascript) <locals>");
;
const getDefaultUniforms = ()=>{
    return {
        u_time: {
            value: 0.0
        },
        u_mouse: {
            value: {
                x: 0.0,
                y: 0.0
            }
        },
        u_resolution: {
            value: {
                x: window.innerWidth * window.devicePixelRatio,
                y: window.innerHeight * window.devicePixelRatio
            }
        }
    };
};
const runApp = (app, scene, renderer, camera, enableAnimation = false, // eslint-disable-next-line
uniforms = getDefaultUniforms())=>{
    // Create the HTML container, styles defined in index.html
    const container = document.getElementById('container');
    container.appendChild(renderer.domElement);
    // Register resize listener
    window.addEventListener('resize', ()=>{
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        // update uniforms.u_resolution
        if (uniforms.u_resolution !== undefined) {
            uniforms.u_resolution.value.x = window.innerWidth * window.devicePixelRatio;
            uniforms.u_resolution.value.y = window.innerHeight * window.devicePixelRatio;
        }
    });
    // Define app
    if (app.updateScene === undefined) {
        app.updateScene = ()=>{};
    }
    Object.assign(app, {
        container
    });
    // The engine that powers your scene into movement
    const clock = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Clock"]();
    const animate = ()=>{
        if (enableAnimation) {
            requestAnimationFrame(animate);
        }
        const delta = clock.getDelta();
        const elapsed = clock.getElapsedTime();
        uniforms.u_time.value = elapsed;
        app.updateScene(delta, elapsed);
        renderer.render(scene, camera);
    };
    app.initScene().then(animate).then(()=>{
        // Signal animation is ready (used in pageWrapper)
        const completeEvent = new CustomEvent('webgl-load-complete');
        window.dispatchEvent(completeEvent);
        // debugging info
        renderer.info.reset();
        console.log('Renderer info', renderer.info);
    }).catch((error)=>{
        console.log(error);
    });
    return app;
};
const createRenderer = (rendererProps = {}, configureRenderer = ()=>{})=>{
    const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"](rendererProps);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // more configurations to the renderer from the consumer
    configureRenderer(renderer);
    return renderer;
};
const createCamera = (fov = 45, near = 0.1, far = 100, camPos = {
    x: 0,
    y: 0,
    z: 5
}, camLookAt = {
    x: 0,
    y: 0,
    z: 0
}, aspect = window.innerWidth / window.innerHeight)=>{
    const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"](fov, aspect, near, far);
    camera.position.set(camPos.x, camPos.y, camPos.z);
    camera.lookAt(camLookAt.x, camLookAt.y, camLookAt.z);
    camera.updateProjectionMatrix();
    return camera;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/layout/wavesAnimation/wavesAnimation.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "WavesAnimation": (()=>WavesAnimation)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
// Core boilerplate code deps
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$wavesAnimation$2f$animationUtils$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/wavesAnimation/animationUtils.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const vertexShader = `
  #define PI 3.14159265359

  uniform float u_time;
  uniform float u_pointsize;
  uniform float u_noise_amp_1;
  uniform float u_noise_freq_1;
  uniform float u_spd_modifier_1;
  uniform float u_noise_amp_2;
  uniform float u_noise_freq_2;
  uniform float u_spd_modifier_2;

  // 2D Random
  float random (in vec2 st) {
      return fract(sin(dot(st.xy,
                          vec2(12.9898,78.233)))
                  * 43758.5453123);
  }

  // 2D Noise based on Morgan McGuire @morgan3d
  // https://www.shadertoy.com/view/4dS3Wd
  float noise (in vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);

      // Four corners in 2D of a tile
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));

      // Smooth Interpolation

      // Cubic Hermine Curve.  Same as SmoothStep()
      vec2 u = f*f*(3.0-2.0*f);
      // u = smoothstep(0.,1.,f);

      // Mix 4 coorners percentages
      return mix(a, b, u.x) +
              (c - a)* u.y * (1.0 - u.x) +
              (d - b) * u.x * u.y;
  }

  mat2 rotate2d(float angle){
      return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
  }

  void main() {
    gl_PointSize = u_pointsize;

    vec3 pos = position;
    // pos.xy is the original 2D dimension of the plane coordinates
    pos.z += noise(pos.xy * u_noise_freq_1 + u_time * u_spd_modifier_1) * u_noise_amp_1;
    // add noise layering
    // minus u_time makes the second layer of wave goes the other direction
    pos.z += noise(rotate2d(PI / 4.) * pos.yx * u_noise_freq_2 - u_time * u_spd_modifier_2 * 0.6) * u_noise_amp_2;

    vec4 mvm = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvm;
  }
`;
const fragmentShader = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  #define PI 3.14159265359
  #define TWO_PI 6.28318530718
  
  uniform vec2 u_resolution;

  void main() {
    // vec2 st = gl_FragCoord.xy/u_resolution.xy;
    // gl_FragColor = vec4(vec3(0.0, st),1.0);
    gl_FragColor = vec4(0.392, 0.949, 0.761, 1.0);
  }
`;
const WavesAnimation = ()=>{
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WavesAnimation.useEffect": ()=>{
            const currentContainer = containerRef.current;
            if (!currentContainer) return;
            // Create container element for three.js
            const container = document.createElement('div');
            container.id = 'container';
            currentContainer.appendChild(container);
            // Setup uniforms for the scene
            const uniforms = {
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$wavesAnimation$2f$animationUtils$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultUniforms"])(),
                u_pointsize: {
                    value: 1.9
                },
                // wave 1
                u_noise_freq_1: {
                    value: 3.0
                },
                u_noise_amp_1: {
                    value: 0.2
                },
                u_spd_modifier_1: {
                    value: 0.8
                },
                // wave 2
                u_noise_freq_2: {
                    value: 2.0
                },
                u_noise_amp_2: {
                    value: 0.3
                },
                u_spd_modifier_2: {
                    value: 0.6
                }
            };
            // Create the scene
            const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"]();
            // Create the renderer
            const renderer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$wavesAnimation$2f$animationUtils$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRenderer"])({
                antialias: true,
                alpha: true
            });
            // Create the camera
            const camera = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$wavesAnimation$2f$animationUtils$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCamera"])(60, 1, 100, {
                x: 0,
                y: -7,
                z: 0
            });
            camera.lookAt(0, 33.2, 16);
            // Variables to store our components
            let geometry;
            let material;
            let mesh;
            const app = {
                initScene: {
                    "WavesAnimation.useEffect": async ()=>{
                        // Mesh
                        geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](4, 4, 128, 128);
                        material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
                            uniforms: uniforms,
                            vertexShader: vertexShader,
                            fragmentShader: fragmentShader
                        });
                        mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Points"](geometry, material);
                        scene.add(mesh);
                        mesh.position.set(-0.1, -4.4, 0);
                    }
                }["WavesAnimation.useEffect"]
            };
            // Run the app
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$wavesAnimation$2f$animationUtils$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runApp"])(app, scene, renderer, camera, true, uniforms);
            // Cleanup function
            return ({
                "WavesAnimation.useEffect": ()=>{
                    if (geometry) geometry.dispose();
                    if (material) material.dispose();
                    if (mesh) {
                        scene.remove(mesh);
                        mesh.geometry.dispose();
                        if (mesh.material) {
                            ;
                            mesh.material.dispose();
                        }
                    }
                    renderer.dispose();
                    renderer.forceContextLoss();
                    if (currentContainer) {
                        currentContainer.innerHTML = '';
                    }
                }
            })["WavesAnimation.useEffect"];
        }
    }["WavesAnimation.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "fixed bottom-0 left-0 w-full h-full pointer-events-none z-0"
    }, void 0, false, {
        fileName: "[project]/components/layout/wavesAnimation/wavesAnimation.tsx",
        lineNumber: 184,
        columnNumber: 5
    }, this);
};
_s(WavesAnimation, "8puyVO4ts1RhCfXUmci3vLI3Njw=");
_c = WavesAnimation;
var _c;
__turbopack_context__.k.register(_c, "WavesAnimation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/layout/pageWrapper/pageWrapper.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$wavesAnimation$2f$wavesAnimation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/wavesAnimation/wavesAnimation.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const PageWrapper = ({ children })=>{
    _s();
    const [isAnimationReady, setIsAnimationReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Listen for webgl-load-complete event from animationUtils
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PageWrapper.useEffect": ()=>{
            const handleWebGLComplete = {
                "PageWrapper.useEffect.handleWebGLComplete": ()=>{
                    setIsAnimationReady(true);
                }
            }["PageWrapper.useEffect.handleWebGLComplete"];
            // eslint-disable-next-line
            window.addEventListener('webgl-load-complete', handleWebGLComplete);
            return ({
                "PageWrapper.useEffect": ()=>{
                    window.removeEventListener(// eslint-disable-next-line
                    'webgl-load-complete', handleWebGLComplete);
                }
            })["PageWrapper.useEffect"];
        }
    }["PageWrapper.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `fixed inset-0 z-50 flex flex-col items-center bg-background justify-center transition-opacity duration-500 ${isAnimationReady ? 'opacity-0' : 'opacity-100'}`,
                style: {
                    pointerEvents: isAnimationReady ? 'none' : 'auto'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    className: "h-12 w-12 animate-spin text-mint"
                }, void 0, false, {
                    fileName: "[project]/components/layout/pageWrapper/pageWrapper.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/layout/pageWrapper/pageWrapper.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `relative min-h-screen bg-background transition-opacity duration-200 ${isAnimationReady ? 'opacity-100' : 'opacity-0'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$wavesAnimation$2f$wavesAnimation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WavesAnimation"], {}, void 0, false, {
                        fileName: "[project]/components/layout/pageWrapper/pageWrapper.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    children
                ]
            }, void 0, true, {
                fileName: "[project]/components/layout/pageWrapper/pageWrapper.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
};
_s(PageWrapper, "8n2iM3t28S7jXkG5EVGrcibjkzo=");
_c = PageWrapper;
const __TURBOPACK__default__export__ = PageWrapper;
var _c;
__turbopack_context__.k.register(_c, "PageWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=components_layout_70c0c47c._.js.map