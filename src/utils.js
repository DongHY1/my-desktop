import * as THREE from 'three'
import Stats from 'stats.js'
const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const ROTATE_LISTS = ['monitor', 'laptop-a', 'laptop-b']
const screenPosition = new THREE.Vector3(-0.97, 0.71, -0.24); // 用你实际打印的值替换
const screenQuaternion = new THREE.Quaternion(0.0237, -0.887, 0.048, 0.458); // 用你实际打印的值替换
const screenDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(screenQuaternion);
const screenTarget = screenPosition.clone().add(screenDirection.multiplyScalar(0.5));
export { sizes, stats, ROTATE_LISTS, screenPosition, screenTarget }