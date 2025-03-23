// This core-utils contains the most important/top-level functions needed in creating a threejs application

import * as THREE from 'three'
import { EffectComposer, RenderPass } from 'postprocessing'

// // Fix: Use consistent declaration for devicePixelRatio
// declare global {
//   interface Window {
//     // No need to redeclare devicePixelRatio as it's already defined in lib.dom.d.ts
//     // Removing this line fixes the "identical modifiers" error
//   }
//   // Changed 'var' to 'let' to fix ESLint warning
//   let THREE: typeof THREE
// }

// // Using proper assignment instead of global declaration
// // This avoids the circular reference in type annotation
// window.THREE = THREE

interface DefaultUniforms {
  u_time: { value: number }
  u_mouse: {
    value: {
      x: number
      y: number
    }
  }
  u_resolution: {
    value: {
      x: number
      y: number
    }
  }
}

/**
 * Initializes a reasonable uniforms object ready to be used in fragments
 * @returns a uniforms object with u_time, u_mouse and u_resolution
 */
export const getDefaultUniforms = (): DefaultUniforms => {
  return {
    u_time: { value: 0.0 },
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
  }
}

interface Vector3Like {
  x: number
  y: number
  z: number
}

interface ThreeJSApp {
  initScene: () => Promise<void>
  updateScene?: (delta: number, elapsed: number) => void
  container?: HTMLElement
  // eslint-disable-next-line
  [key: string]: any
}

/**
 * This function contains the boilerplate code to set up the environment for a threejs app;
 * e.g. HTML canvas, resize listener, mouse events listener, requestAnimationFrame
 * Consumer needs to provide the created renderer, camera and (optional) composer to this setup function
 * This has the benefit of bringing the app configurations directly to the consumer, instead of hiding/passing them down one more layer
 * @param {object} app a custom Threejs app instance that needs to call initScene and (optioal) updateScene if animation is needed
 * @param {object} scene Threejs scene instance
 * @param {object} renderer Threejs renderer instance
 * @param {object} camera Threejs camera instance
 * @param {bool} enableAnimation whether the app needs to animate stuff
 * @param {object} uniforms Uniforms object to be used in fragments, u_resolution/u_mouse/u_time got updated here
 * @param {object} composer Threejs EffectComposer instance
 * @returns a custom threejs app instance that has the basic setup ready that can be further acted upon/customized
 */
export const runApp = (
  app: ThreeJSApp,
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  enableAnimation = false,
  // eslint-disable-next-line
  uniforms: any = getDefaultUniforms(),
  composer: EffectComposer | null = null
): ThreeJSApp => {
  // Create the HTML container, styles defined in index.html
  const container = document.getElementById('container') as HTMLElement
  container.appendChild(renderer.domElement)

  // Register resize listener
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    // update uniforms.u_resolution
    if (uniforms.u_resolution !== undefined) {
      uniforms.u_resolution.value.x =
        window.innerWidth * window.devicePixelRatio
      uniforms.u_resolution.value.y =
        window.innerHeight * window.devicePixelRatio
    }
  })

  // Define your app
  if (app.updateScene === undefined) {
    // eslint-disable-next-line
    app.updateScene = (delta: number, elapsed: number) => {}
  }

  Object.assign(app, { container })

  // The engine that powers your scene into movement
  const clock = new THREE.Clock()
  const animate = () => {
    if (enableAnimation) {
      requestAnimationFrame(animate)
    }

    const delta = clock.getDelta()
    const elapsed = clock.getElapsedTime()
    uniforms.u_time.value = elapsed

    app.updateScene!(delta, elapsed)

    if (composer === null) {
      renderer.render(scene, camera)
    } else {
      composer.render()
    }
  }

  app
    .initScene()
    .then(() => {
      const veil = document.getElementById('veil') as HTMLElement
      veil.style.opacity = '0'
      return true
    })
    .then(animate)
    .then(() => {
      // debugging info
      renderer.info.reset()
      // not sure if reliable enough, numbers change everytime...
      console.log('Renderer info', renderer.info)
    })
    .catch((error) => {
      console.log(error)
    })

  return app
}

type RendererConfigFn = (renderer: THREE.WebGLRenderer) => void

/**
 * This creates the renderer, by default calls renderer's setPixelRatio and setSize methods
 * further reading on color management: See https://www.donmccurdy.com/2020/06/17/color-management-in-threejs/
 * @param {object} rendererProps props fed to WebGlRenderer constructor
 * @param {function} configureRenderer custom function for consumer to tune the renderer, takes renderer as the only parameter
 * @returns created renderer
 */
export const createRenderer = (
  rendererProps: THREE.WebGLRendererParameters = {},
  // eslint-disable-next-line
  configureRenderer: RendererConfigFn = (renderer) => {}
): THREE.WebGLRenderer => {
  const renderer = new THREE.WebGLRenderer(rendererProps)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  // more configurations to the renderer from the consumer
  configureRenderer(renderer)

  return renderer
}

type ComposerPassesFn = (composer: EffectComposer) => void

/**
 * This function creates the EffectComposer object for post processing
 * @param {object} renderer The threejs renderer
 * @param {object} scene The threejs scene
 * @param {object} camera The threejs camera
 * @param {function} extraPasses custom function that takes takes composer as the only parameter, for the consumer to add custom passes
 * @returns The created composer object used for post processing
 */
export const createComposer = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera,
  extraPasses: ComposerPassesFn
): EffectComposer => {
  const renderScene = new RenderPass(scene, camera)

  const composer = new EffectComposer(renderer)
  composer.addPass(renderScene)

  // custom passes that the consumer wants to add
  extraPasses(composer)

  return composer
}

/**
 * This function creates the three.js camera
 * @param {number} fov Field of view, def = 45
 * @param {number} near nearest distance of camera render range
 * @param {number} far furthest distance of camera render range
 * @param {object} camPos {x,y,z} of camera position
 * @param {object} camLookAt {x,y,z} where camera's looking at
 * @param {number} aspect Aspect ratio of camera, def = screen aspect
 * @returns the created camera object
 */
export const createCamera = (
  fov = 45,
  near = 0.1,
  far = 100,
  camPos: Vector3Like = { x: 0, y: 0, z: 5 },
  camLookAt: Vector3Like = { x: 0, y: 0, z: 0 },
  aspect = window.innerWidth / window.innerHeight
): THREE.PerspectiveCamera => {
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(camPos.x, camPos.y, camPos.z)
  camera.lookAt(camLookAt.x, camLookAt.y, camLookAt.z) // this only works when there's no OrbitControls
  camera.updateProjectionMatrix()
  return camera
}
