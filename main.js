import './style.css'
import * as THREE from 'three'
import { sizes, stats, ROTATE_LISTS } from './src/utils'
import { smokeMaterial } from './src/features/smoke'
import { camera } from './src/camera'
import { scene, initScene } from './src/scene'
import { controls } from './src/controls'
import { renderer } from './src/render'
import { clock } from './src/clock'
import { raycaster } from './src/raycaster'
import { gsap } from 'gsap'

initScene()
function tick() {
    stats.begin()
    const elapsedTime = clock.getElapsedTime()
    smokeMaterial.uniforms.uTime.value = elapsedTime
    // Update controls
    controls.update(0.01)
    const desktop = scene.children[1].children
    if (desktop.length > 0) {
        desktop.find((item) => {
            if (item.name === 'OfficeChair002') {
                item.rotation.z += 0.005
            }
        })
    }
    // Render
    renderer.render(scene, camera)
    // Call tick again on the next frame

    window.requestAnimationFrame(tick)
    stats.end()
    console.log('Camera Position:', camera.position);
    console.log('Camera Quaternion:', camera.quaternion);
}

tick()

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const _target = controls.target
window.addEventListener('mousedown', (event) => {
    const coords = new THREE.Vector2(
        (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
        -((event.clientY / renderer.domElement.clientHeight) * 2 - 1),
    );
    raycaster.setFromCamera(coords, camera);
    const intersections = raycaster.intersectObjects(scene.children[1].children);
    if (intersections.length > 0) {
        const selectedObject = intersections[0].object;
        if (ROTATE_LISTS.includes(selectedObject.name)) {
            // 添加逻辑代码来复现相机的位置和方向
            const flyPosition = new THREE.Vector3(-0.699, 0.736, -0.071); // 用你实际打印的值替换
            const flyQuaternion = new THREE.Quaternion(0.0237, -0.887, 0.048, 0.458); // 用你实际打印的值替换

            // 设置相机位置和四元数
            camera.position.copy(flyPosition);
            camera.quaternion.copy(flyQuaternion);

            // 计算目标点
            const direction = new THREE.Vector3(0, 0, -1).applyQuaternion(flyQuaternion);
            const distanceToTarget = 10; // 根据具体情况调整
            const target = flyPosition.clone().add(direction.multiplyScalar(distanceToTarget));

            // 设置 OrbitControls 的目标
            controls.target.copy(target);
        } else {
            // gsap.to(camera.position, { x: -3, y: 2, z: 1, duration: 1.5, ease: 'power3.inOut' })
            // controls.target.copy(_target)
        }
    }
})
