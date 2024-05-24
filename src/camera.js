import * as THREE from 'three'
import { sizes } from './utils'
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -3
camera.position.y = 3
camera.position.z = 1
console.log(camera.position)
export { camera }