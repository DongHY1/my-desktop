import * as THREE from 'three'
import smokeVertexShader from './shaders/smoke/vertex.glsl'
import smokeFragmentShader from './shaders/smoke/fragment.glsl'
const smokeGeometry = new THREE.PlaneGeometry(1, 1, 16, 64)
smokeGeometry.translate(0, 0.5, 0)
smokeGeometry.scale(0.08, 0.5, 1)


const textureLoader = new THREE.TextureLoader()
const perlinTexture = textureLoader.load('perlin.png')

const smokeMaterial = new THREE.ShaderMaterial({
    vertexShader: smokeVertexShader,
    fragmentShader: smokeFragmentShader,
    transparent:true,
    uniforms:
    {
        uPerlinTexture: new THREE.Uniform(perlinTexture)
    },
    side: THREE.DoubleSide
})

export const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial)
smoke.position.y = 0.68
smoke.position.x = -0.1
smoke.position.z = -0.11