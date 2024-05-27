import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { camera } from './camera'
import { canvas } from './element'
import { screenTarget } from './utils'
const controls = new OrbitControls(camera, canvas)
controls.target.copy(screenTarget);
controls.enableDamping = true
export { controls }
