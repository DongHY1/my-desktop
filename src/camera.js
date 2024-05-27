import * as THREE from 'three'
import { sizes } from './utils'
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.set(-3, 3, 1)

export { camera }