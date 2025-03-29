'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Core boilerplate code deps
import {
  createCamera,
  createRenderer,
  runApp,
  getDefaultUniforms
} from './animationUtils'

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
`

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
`

interface CustomUniforms {
  [key: string]: THREE.IUniform<unknown> // Changed from 'any' to 'unknown'
}

export const WavesAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  // const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Capture current ref value to use in cleanup function
    const currentContainer = containerRef.current

    if (!currentContainer) return

    // Create container element for three.js
    const container = document.createElement('div')
    container.id = 'container'
    currentContainer.appendChild(container)

    // Create veil element (used in animation utils)
    const veil = document.createElement('div')
    veil.id = 'veil'
    currentContainer.appendChild(veil)

    // Setup uniforms for the scene
    const uniforms: CustomUniforms = {
      ...getDefaultUniforms(),
      u_pointsize: { value: 1.9 },
      // wave 1
      u_noise_freq_1: { value: 3.0 },
      u_noise_amp_1: { value: 0.2 },
      u_spd_modifier_1: { value: 0.8 },
      // wave 2
      u_noise_freq_2: { value: 2.0 },
      u_noise_amp_2: { value: 0.3 },
      u_spd_modifier_2: { value: 0.6 }
    }

    // Create the scene
    const scene = new THREE.Scene()

    // Create the renderer
    const renderer = createRenderer({ antialias: true, alpha: true })

    // Create the camera
    const camera = createCamera(60, 1, 100, { x: 0, y: -7, z: 0 })
    camera.lookAt(0, 33.2, 16)

    // Variables to store our components
    let geometry: THREE.PlaneGeometry
    let material: THREE.ShaderMaterial
    let mesh: THREE.Points

    const app = {
      container,
      initScene: async () => {
        // Mesh
        geometry = new THREE.PlaneGeometry(4, 4, 128, 128)
        material = new THREE.ShaderMaterial({
          uniforms: uniforms,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader
        })

        mesh = new THREE.Points(geometry, material)
        scene.add(mesh)
        mesh.position.set(-0.1, -4.4, 0)
      }
    }

    // Run the app
    runApp(app, scene, renderer, camera, true, uniforms, undefined)

    // Cleanup function
    return () => {
      if (geometry) geometry.dispose()
      if (material) material.dispose()
      if (mesh) {
        scene.remove(mesh)
        mesh.geometry.dispose()
        // Correctly dispose of material
        if (mesh.material) {
          ;(mesh.material as THREE.Material).dispose()
        }
      }

      renderer.dispose()
      renderer.forceContextLoss()

      if (currentContainer) {
        currentContainer.innerHTML = ''
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className='fixed bottom-0 left-0 w-full h-full pointer-events-none z-0'
    />
  )
}
