import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { camera } from './camera'
import { canvas } from './element'
import { screenTarget } from './utils'
const controls = new OrbitControls(camera, canvas)
controls.target.copy(screenTarget);
controls.enableDamping = true

const maxPolarAngle = THREE.MathUtils.degToRad(85);
controls.maxPolarAngle = maxPolarAngle;

const minAzimuthAngle = THREE.MathUtils.degToRad(-130);
const maxAzimuthAngle = THREE.MathUtils.degToRad(-50);
controls.minAzimuthAngle = minAzimuthAngle;
controls.maxAzimuthAngle = maxAzimuthAngle;
export { controls }
