import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { camera } from './camera'
import { canvas } from './element'
import { screenPosition, screenDirection } from './utils'
const controls = new OrbitControls(camera, canvas)
const distanceToTarget = 0.5;
const target = screenPosition.clone().add(screenDirection.multiplyScalar(distanceToTarget));
controls.target.copy(target);
controls.enableDamping = true
export { controls }
