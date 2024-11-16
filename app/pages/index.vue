<template>
  <div class="background">
    <ClientOnly>
      <ParticleBackground />
    </ClientOnly>
  </div>
  <UContainer class="flex flex-col items-center justify-center my-4 min-h-screen">
    <div class="login">
      <h1 class="text-3xl font-bold">Get stuff done! </h1>
      <p class="text-base text-gray-500">Welcome to our hub of getting shit done!!</p>
      <UButton
        v-if="!loggedIn"
        to="/api/auth/github"
        label="LOGIN"
        color="white"
        size="xl"
        external
        block
        class="text-center"
      />
    </div>
  </UContainer>
</template>

<style>
.background {
  @apply
  bg-gray-200
  dark:bg-gray-950
  ;
  display: block;
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
.login {
  @apply
  flex
  flex-col
  gap-4
  text-center
  relative
  p-4
  border
  border-solid
  border-gray-200
  dark:border-gray-700
  bg-white
  dark:bg-gray-800
  rounded-2xl
  shadow
  ;
}
</style>

<!-- components/ParticleBackground.vue -->
<script setup>
import * as THREE from 'three'
import { onMounted, onBeforeUnmount, watch } from 'vue'
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()

let scene, camera, renderer, particles
let animationFrameId

const particleCount = 1000
const particleGeometry = new THREE.BufferGeometry()
const positions = new Float32Array(particleCount * 3)
const velocities = new Float32Array(particleCount * 3)

// Initialize particle positions and velocities
for (let i = 0; i < particleCount * 3; i += 3) {
  positions[i] = (Math.random() - 0.5) * 10
  positions[i + 1] = (Math.random() - 0.5) * 10
  positions[i + 2] = (Math.random() - 0.5) * 10

  velocities[i] = (Math.random() - 0.5) * 0.01
  velocities[i + 1] = (Math.random() - 0.5) * 0.01
  velocities[i + 2] = (Math.random() - 0.5) * 0.01
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

const updateParticleColors = () => {
  if (!particles) return
  
  const color = colorMode.value === 'dark' 
    ? new THREE.Color(0x2563eb)  // Blue in dark mode
    : new THREE.Color(0x93c5fd)  // Light blue in light mode
    
  particles.material.color = color
}

const init = () => {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  
  renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x000000, 0)
  
  const container = document.querySelector('.background')
  if (container) {
    container.appendChild(renderer.domElement)
  }

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.05,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
  })

  particles = new THREE.Points(particleGeometry, particleMaterial)
  scene.add(particles)

  camera.position.z = 5
  
  updateParticleColors()
}

const animate = () => {
  animationFrameId = requestAnimationFrame(animate)

  const positions = particles.geometry.attributes.position.array

  for (let i = 0; i < positions.length; i += 3) {
    positions[i] += velocities[i]
    positions[i + 1] += velocities[i + 1]
    positions[i + 2] += velocities[i + 2]

    // Bounce particles when they hit boundaries
    if (Math.abs(positions[i]) > 5) velocities[i] *= -1
    if (Math.abs(positions[i + 1]) > 5) velocities[i + 1] *= -1
    if (Math.abs(positions[i + 2]) > 5) velocities[i + 2] *= -1
  }

  particles.geometry.attributes.position.needsUpdate = true
  particles.rotation.y += 0.001

  renderer.render(scene, camera)
}

const handleResize = () => {
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
}

onMounted(() => {
  init()
  animate()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  window.removeEventListener('resize', handleResize)
  if (renderer) {
    renderer.dispose()
  }
})

watch(() => colorMode.value, updateParticleColors)
</script>
