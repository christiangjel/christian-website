(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[177],{420:(e,t,n)=>{"use strict";n.d(t,{ThemeProvider:()=>p});var o=n(5155),i=n(2115),r=(e,t,n,o,i,r,a,s)=>{let l=document.documentElement,d=["light","dark"];function c(t){var n;(Array.isArray(e)?e:[e]).forEach(e=>{let n="class"===e,o=n&&r?i.map(e=>r[e]||e):i;n?(l.classList.remove(...o),l.classList.add(r&&r[t]?r[t]:t)):l.setAttribute(e,t)}),n=t,s&&d.includes(n)&&(l.style.colorScheme=n)}if(o)c(o);else try{let e=localStorage.getItem(t)||n,o=a&&"system"===e?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":e;c(o)}catch(e){}},a=["light","dark"],s="(prefers-color-scheme: dark)",l=i.createContext(void 0),d=e=>i.useContext(l)?i.createElement(i.Fragment,null,e.children):i.createElement(m,{...e}),c=["light","dark"],m=e=>{let{forcedTheme:t,disableTransitionOnChange:n=!1,enableSystem:o=!0,enableColorScheme:r=!0,storageKey:d="theme",themes:m=c,defaultTheme:p=o?"system":"light",attribute:_="data-theme",value:w,children:g,nonce:y,scriptProps:x}=e,[b,S]=i.useState(()=>f(d,p)),[E,k]=i.useState(()=>"system"===b?v():b),C=w?Object.values(w):m,P=i.useCallback(e=>{let t=e;if(!t)return;"system"===e&&o&&(t=v());let i=w?w[t]:t,s=n?h(y):null,l=document.documentElement,d=e=>{"class"===e?(l.classList.remove(...C),i&&l.classList.add(i)):e.startsWith("data-")&&(i?l.setAttribute(e,i):l.removeAttribute(e))};if(Array.isArray(_)?_.forEach(d):d(_),r){let e=a.includes(p)?p:null,n=a.includes(t)?t:e;l.style.colorScheme=n}null==s||s()},[y]),N=i.useCallback(e=>{let t="function"==typeof e?e(b):e;S(t);try{localStorage.setItem(d,t)}catch(e){}},[b]),z=i.useCallback(e=>{k(v(e)),"system"===b&&o&&!t&&P("system")},[b,t]);i.useEffect(()=>{let e=window.matchMedia(s);return e.addListener(z),z(e),()=>e.removeListener(z)},[z]),i.useEffect(()=>{let e=e=>{e.key===d&&(e.newValue?S(e.newValue):N(p))};return window.addEventListener("storage",e),()=>window.removeEventListener("storage",e)},[N]),i.useEffect(()=>{P(null!=t?t:b)},[t,b]);let L=i.useMemo(()=>({theme:b,setTheme:N,forcedTheme:t,resolvedTheme:"system"===b?E:b,themes:o?[...m,"system"]:m,systemTheme:o?E:void 0}),[b,N,t,E,o,m]);return i.createElement(l.Provider,{value:L},i.createElement(u,{forcedTheme:t,storageKey:d,attribute:_,enableSystem:o,enableColorScheme:r,defaultTheme:p,value:w,themes:m,nonce:y,scriptProps:x}),g)},u=i.memo(e=>{let{forcedTheme:t,storageKey:n,attribute:o,enableSystem:a,enableColorScheme:s,defaultTheme:l,value:d,themes:c,nonce:m,scriptProps:u}=e,f=JSON.stringify([o,n,l,t,c,d,a,s]).slice(1,-1);return i.createElement("script",{...u,suppressHydrationWarning:!0,nonce:"",dangerouslySetInnerHTML:{__html:"(".concat(r.toString(),")(").concat(f,")")}})}),f=(e,t)=>{let n;try{n=localStorage.getItem(e)||void 0}catch(e){}return n||t},h=e=>{let t=document.createElement("style");return e&&t.setAttribute("nonce",e),t.appendChild(document.createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(t),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(t)},1)}},v=e=>(e||(e=window.matchMedia(s)),e.matches?"dark":"light");function p(e){let{children:t,...n}=e;return(0,o.jsx)(d,{...n,children:t})}},3729:e=>{e.exports={style:{fontFamily:"'fontNormal', 'fontNormal Fallback'"},className:"__className_2ee29e",variable:"__variable_2ee29e"}},6225:e=>{e.exports={style:{fontFamily:"'fontBold', 'fontBold Fallback'"},className:"__className_716dfa",variable:"__variable_716dfa"}},6255:(e,t,n)=>{"use strict";n.d(t,{default:()=>f});var o=n(5155),i=n(2115),r=n(3264),a=n(7431);let s=()=>({u_time:{value:0},u_mouse:{value:{x:0,y:0}},u_resolution:{value:{x:window.innerWidth*window.devicePixelRatio,y:window.innerHeight*window.devicePixelRatio}}}),l=function(e,t,n,o){let i=arguments.length>4&&void 0!==arguments[4]&&arguments[4],a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:s(),l=document.getElementById("container");l.appendChild(n.domElement),window.addEventListener("resize",()=>{o.aspect=window.innerWidth/window.innerHeight,o.updateProjectionMatrix(),n.setSize(window.innerWidth,window.innerHeight),void 0!==a.u_resolution&&(a.u_resolution.value.x=window.innerWidth*window.devicePixelRatio,a.u_resolution.value.y=window.innerHeight*window.devicePixelRatio)}),void 0===e.updateScene&&(e.updateScene=()=>{}),Object.assign(e,{container:l});let d=new r.zD7,c=()=>{i&&requestAnimationFrame(c);let r=d.getDelta(),s=d.getElapsedTime();a.u_time.value=s,e.updateScene(r,s),n.render(t,o)};return e.initScene().then(c).then(()=>{let e=new CustomEvent("webgl-load-complete");window.dispatchEvent(e),n.info.reset(),console.log("Renderer info",n.info)}).catch(e=>{console.log(e)}),e},d=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:()=>{},n=new a.JeP(e);return n.setPixelRatio(window.devicePixelRatio),n.setSize(window.innerWidth,window.innerHeight),t(n),n},c=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:45,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:100,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{x:0,y:0,z:5},i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{x:0,y:0,z:0},a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:window.innerWidth/window.innerHeight,s=new r.ubm(e,a,t,n);return s.position.set(o.x,o.y,o.z),s.lookAt(i.x,i.y,i.z),s.updateProjectionMatrix(),s},m=()=>{let e=(0,i.useRef)(null);return(0,i.useEffect)(()=>{let t,n,o;let i=e.current;if(!i)return;let a=document.createElement("div");a.id="container",i.appendChild(a);let m={...s(),u_pointsize:{value:1.9},u_noise_freq_1:{value:3},u_noise_amp_1:{value:.2},u_spd_modifier_1:{value:.8},u_noise_freq_2:{value:2},u_noise_amp_2:{value:.3},u_spd_modifier_2:{value:.6}},u=new r.Z58,f=d({antialias:!0,alpha:!0}),h=c(60,1,100,{x:0,y:-7,z:0});return h.lookAt(0,33.2,16),l({initScene:async()=>{t=new r.bdM(4,4,128,128),n=new r.BKk({uniforms:m,vertexShader:"\n  #define PI 3.14159265359\n\n  uniform float u_time;\n  uniform float u_pointsize;\n  uniform float u_noise_amp_1;\n  uniform float u_noise_freq_1;\n  uniform float u_spd_modifier_1;\n  uniform float u_noise_amp_2;\n  uniform float u_noise_freq_2;\n  uniform float u_spd_modifier_2;\n\n  // 2D Random\n  float random (in vec2 st) {\n      return fract(sin(dot(st.xy,\n                          vec2(12.9898,78.233)))\n                  * 43758.5453123);\n  }\n\n  // 2D Noise based on Morgan McGuire @morgan3d\n  // https://www.shadertoy.com/view/4dS3Wd\n  float noise (in vec2 st) {\n      vec2 i = floor(st);\n      vec2 f = fract(st);\n\n      // Four corners in 2D of a tile\n      float a = random(i);\n      float b = random(i + vec2(1.0, 0.0));\n      float c = random(i + vec2(0.0, 1.0));\n      float d = random(i + vec2(1.0, 1.0));\n\n      // Smooth Interpolation\n\n      // Cubic Hermine Curve.  Same as SmoothStep()\n      vec2 u = f*f*(3.0-2.0*f);\n      // u = smoothstep(0.,1.,f);\n\n      // Mix 4 coorners percentages\n      return mix(a, b, u.x) +\n              (c - a)* u.y * (1.0 - u.x) +\n              (d - b) * u.x * u.y;\n  }\n\n  mat2 rotate2d(float angle){\n      return mat2(cos(angle),-sin(angle),\n                sin(angle),cos(angle));\n  }\n\n  void main() {\n    gl_PointSize = u_pointsize;\n\n    vec3 pos = position;\n    // pos.xy is the original 2D dimension of the plane coordinates\n    pos.z += noise(pos.xy * u_noise_freq_1 + u_time * u_spd_modifier_1) * u_noise_amp_1;\n    // add noise layering\n    // minus u_time makes the second layer of wave goes the other direction\n    pos.z += noise(rotate2d(PI / 4.) * pos.yx * u_noise_freq_2 - u_time * u_spd_modifier_2 * 0.6) * u_noise_amp_2;\n\n    vec4 mvm = modelViewMatrix * vec4(pos, 1.0);\n    gl_Position = projectionMatrix * mvm;\n  }\n",fragmentShader:"\n  #ifdef GL_ES\n  precision mediump float;\n  #endif\n\n  #define PI 3.14159265359\n  #define TWO_PI 6.28318530718\n  \n  uniform vec2 u_resolution;\n\n  void main() {\n    // vec2 st = gl_FragCoord.xy/u_resolution.xy;\n    // gl_FragColor = vec4(vec3(0.0, st),1.0);\n    gl_FragColor = vec4(0.392, 0.949, 0.761, 1.0);\n  }\n"}),o=new r.ONl(t,n),u.add(o),o.position.set(-.1,-4.4,0)}},u,f,h,!0,m),()=>{t&&t.dispose(),n&&n.dispose(),o&&(u.remove(o),o.geometry.dispose(),o.material&&o.material.dispose()),f.dispose(),f.forceContextLoss(),i&&(i.innerHTML="")}},[]),(0,o.jsx)("div",{ref:e,className:"fixed bottom-0 left-0 w-full h-full pointer-events-none z-0"})},u=(0,n(9946).A)("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]),f=e=>{let{children:t}=e,[n,r]=(0,i.useState)(!1);return(0,i.useEffect)(()=>{let e=()=>{r(!0)};return window.addEventListener("webgl-load-complete",e),()=>{window.removeEventListener("webgl-load-complete",e)}},[]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{className:"fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500 ".concat(n?"opacity-0":"opacity-100"),children:(0,o.jsx)(u,{className:"h-12 w-12 animate-spin text-[#64f2c2]"})}),(0,o.jsxs)("div",{className:"relative min-h-screen bg-background transition-opacity duration-200 ".concat(n?"opacity-100":"opacity-0"),children:[(0,o.jsx)(m,{}),t]})]})}},7073:(e,t,n)=>{Promise.resolve().then(n.t.bind(n,9324,23)),Promise.resolve().then(n.bind(n,6255)),Promise.resolve().then(n.bind(n,420)),Promise.resolve().then(n.t.bind(n,3729,23)),Promise.resolve().then(n.t.bind(n,6225,23))},9324:()=>{},9946:(e,t,n)=>{"use strict";n.d(t,{A:()=>l});var o=n(2115);let i=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),r=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter((e,t,n)=>!!e&&""!==e.trim()&&n.indexOf(e)===t).join(" ").trim()};var a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let s=(0,o.forwardRef)((e,t)=>{let{color:n="currentColor",size:i=24,strokeWidth:s=2,absoluteStrokeWidth:l,className:d="",children:c,iconNode:m,...u}=e;return(0,o.createElement)("svg",{ref:t,...a,width:i,height:i,stroke:n,strokeWidth:l?24*Number(s)/Number(i):s,className:r("lucide",d),...u},[...m.map(e=>{let[t,n]=e;return(0,o.createElement)(t,n)}),...Array.isArray(c)?c:[c]])}),l=(e,t)=>{let n=(0,o.forwardRef)((n,a)=>{let{className:l,...d}=n;return(0,o.createElement)(s,{ref:a,iconNode:t,className:r("lucide-".concat(i(e)),l),...d})});return n.displayName="".concat(e),n}}},e=>{var t=t=>e(e.s=t);e.O(0,[633,367,831,441,684,358],()=>t(7073)),_N_E=e.O()}]);