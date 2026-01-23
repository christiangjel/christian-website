'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Core boilerplate code deps
import {
  createCamera,
  createRenderer,
  runApp,
  getDefaultUniforms,
  type DefaultUniforms
} from './animation-utils'

const VERTEX_SHADER = `
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
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
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
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle), sin(angle),cos(angle));
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

const FRAGMENT_SHADER = `
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

const ANIMATION_CONFIG = {
  geometry: {
    width: 4,
    height: 4,
    widthSegments: 128,
    heightSegments: 128
  },
  camera: {
    fov: 60,
    near: 1,
    far: 100,
    position: { x: 0, y: -7, z: 0 },
    lookAt: { x: 0, y: 33.2, z: 16 }
  },
  mesh: {
    position: { x: -0.1, y: -4.4, z: 0 }
  },
  uniforms: {
    u_pointsize: 1.9,
    // wave 1
    u_noise_freq_1: 3.0,
    u_noise_amp_1: 0.2,
    u_spd_modifier_1: 0.8,
    // wave 2
    u_noise_freq_2: 2.0,
    u_noise_amp_2: 0.3,
    u_spd_modifier_2: 0.6
  }
} as const

type CustomUniforms = DefaultUniforms & {
  [key: string]: THREE.IUniform<unknown>
}

type SceneComponents = {
  geometry: THREE.PlaneGeometry
  material: THREE.ShaderMaterial
  mesh: THREE.Points
}

export const WavesAnimation = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentContainer = containerRef.current
    if (!currentContainer) return

    // Create container element for three.js
    const container = document.createElement('div')
    container.id = 'container'
    currentContainer.appendChild(container)

    // Setup uniforms for the scene
    const uniforms: CustomUniforms = {
      ...getDefaultUniforms(),
      u_pointsize: { value: ANIMATION_CONFIG.uniforms.u_pointsize },
      // wave 1
      u_noise_freq_1: { value: ANIMATION_CONFIG.uniforms.u_noise_freq_1 },
      u_noise_amp_1: { value: ANIMATION_CONFIG.uniforms.u_noise_amp_1 },
      u_spd_modifier_1: { value: ANIMATION_CONFIG.uniforms.u_spd_modifier_1 },
      // wave 2
      u_noise_freq_2: { value: ANIMATION_CONFIG.uniforms.u_noise_freq_2 },
      u_noise_amp_2: { value: ANIMATION_CONFIG.uniforms.u_noise_amp_2 },
      u_spd_modifier_2: { value: ANIMATION_CONFIG.uniforms.u_spd_modifier_2 }
    }

    // Create the scene
    const scene = new THREE.Scene()

    // Create the renderer
    const renderer = createRenderer({ antialias: true, alpha: true })

    // Create the camera
    const camera = createCamera(
      ANIMATION_CONFIG.camera.fov,
      ANIMATION_CONFIG.camera.near,
      ANIMATION_CONFIG.camera.far,
      ANIMATION_CONFIG.camera.position
    )
    camera.lookAt(
      ANIMATION_CONFIG.camera.lookAt.x,
      ANIMATION_CONFIG.camera.lookAt.y,
      ANIMATION_CONFIG.camera.lookAt.z
    )

    // Variables to store our components
    let sceneComponents: SceneComponents | null = null

    const app = {
      initScene: async () => {
        // Mesh
        const geometry = new THREE.PlaneGeometry(
          ANIMATION_CONFIG.geometry.width,
          ANIMATION_CONFIG.geometry.height,
          ANIMATION_CONFIG.geometry.widthSegments,
          ANIMATION_CONFIG.geometry.heightSegments
        )

        const material = new THREE.ShaderMaterial({
          uniforms: uniforms,
          vertexShader: VERTEX_SHADER,
          fragmentShader: FRAGMENT_SHADER
        })

        const mesh = new THREE.Points(geometry, material)
        scene.add(mesh)
        mesh.position.set(
          ANIMATION_CONFIG.mesh.position.x,
          ANIMATION_CONFIG.mesh.position.y,
          ANIMATION_CONFIG.mesh.position.z
        )

        sceneComponents = { geometry, material, mesh }
      }
    }

    // Run the app
    runApp(app, scene, renderer, camera, true, uniforms)

    // Cleanup function
    return () => {
      if (sceneComponents) {
        const { geometry, material, mesh } = sceneComponents

        if (geometry) geometry.dispose()
        if (material) material.dispose()
        if (mesh) {
          scene.remove(mesh)
          mesh.geometry.dispose()
          if (mesh.material) {
            ;(mesh.material as THREE.Material).dispose()
          }
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
})

WavesAnimation.displayName = 'WavesAnimation'
