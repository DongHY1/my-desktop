import * as THREE from 'three'
import { initCameraPosition, sizes } from './utils'
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.copy(initCameraPosition)
export { camera }