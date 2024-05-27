
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { camera } from './camera'
import { canvas } from './element'
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
export { controls }
