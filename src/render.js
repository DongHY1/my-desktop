import * as THREE from 'three'
import { canvas } from './canvas'
import { sizes } from './utils'
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

export {renderer}