// This core-utils contains the most important/top-level functions needed in creating a threejs application

import * as THREE from 'three'
import { logger } from '@/lib/logger'

export type DefaultUniforms = {
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
 * Uniforms type that extends DefaultUniforms and allows additional THREE.js uniforms.
 * Ensures required uniforms are present while allowing extension.
 */
type Uniforms = DefaultUniforms & {
  [key: string]: THREE.IUniform<unknown>
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

type Vector3Like = {
  x: number
  y: number
  z: number
}

type ThreeJSApp = {
  initScene: () => Promise<void>
  updateScene?: (delta: number, elapsed: number) => void
  container?: HTMLElement
  [key: string]: unknown
}

/**
 * Get width and height for renderer/camera from a size element or fallback to window.
 * When a size element is provided (e.g. wrapper with 100svh), dimensions stay stable
 * when the browser UI toggles on mobile.
 */
const getSize = (
  sizeElement: HTMLElement | null
): { width: number; height: number } => {
  if (sizeElement) {
    return {
      width: sizeElement.clientWidth,
      height: sizeElement.clientHeight
    }
  }
  return { width: window.innerWidth, height: window.innerHeight }
}

/**
 * This function contains the boilerplate code to set up the environment for a threejs app;
 * e.g. HTML canvas, resize listener, mouse events listener, requestAnimationFrame
 */
export const runApp = (
  app: ThreeJSApp,
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  enableAnimation = false,
  uniforms: Uniforms = getDefaultUniforms(),
  sizeElement: HTMLElement | null = null
): ThreeJSApp => {
  // Create the HTML container
  const container = document.getElementById('container') as HTMLElement
  container.appendChild(renderer.domElement)

  const applySize = (): void => {
    const { width, height } = getSize(sizeElement)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    if (uniforms.u_resolution !== undefined) {
      const dpr = window.devicePixelRatio
      uniforms.u_resolution.value.x = width * dpr
      uniforms.u_resolution.value.y = height * dpr
    }
  }

  applySize()

  window.addEventListener('resize', applySize)

  // Define app
  if (app.updateScene === undefined) {
    app.updateScene = () => {}
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

    renderer.render(scene, camera)
  }

  app
    .initScene()
    .then(animate)
    .then(() => {
      // Signal animation is ready (used in pageWrapper)
      const completeEvent = new CustomEvent('webgl-load-complete')

      window.dispatchEvent(completeEvent)

      // Log renderer info in development mode
      if (process.env.NODE_ENV === 'development') {
        logger.info('Three.js renderer info', {
          rendererInfo: renderer.info
        })
      }
    })
    .catch((error) => {
      logger.error('Three.js animation error', { error })
    })

  return app
}

type RendererConfigFn = (renderer: THREE.WebGLRenderer) => void

/**
 * This creates the renderer, by default calls renderer's setPixelRatio and setSize methods
 */
export const createRenderer = (
  rendererProps: THREE.WebGLRendererParameters = {},
  configureRenderer: RendererConfigFn = () => {}
): THREE.WebGLRenderer => {
  const renderer = new THREE.WebGLRenderer(rendererProps)

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  // more configurations to the renderer from the consumer
  configureRenderer(renderer)

  return renderer
}

/**
 * This function creates the three.js camera
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
  camera.lookAt(camLookAt.x, camLookAt.y, camLookAt.z)
  camera.updateProjectionMatrix()

  return camera
}
