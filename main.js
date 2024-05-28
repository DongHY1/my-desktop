import './style.css'
import * as THREE from 'three'
import { sizes, stats, ROTATE_LISTS, screenPosition, screenTarget } from './src/utils'
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
    // Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
    stats.end();
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
window.addEventListener('mousedown', (event) => {
    const coords = new THREE.Vector2(
        (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
        -((event.clientY / renderer.domElement.clientHeight) * 2 - 1),
    );
    raycaster.setFromCamera(coords, camera);
    const intersections = raycaster.intersectObjects(scene.children[1].children);
    if (intersections.length > 0) {
        const selectedObject = intersections[0].object;
        if (selectedObject.name === 'laptop-a') {
            // 关闭电脑屏幕
            gsap.to(selectedObject.position, {
                x: -0.225,
                y: 0.558,
                z: 0.25,
                duration: 1,
                ease: 'power3.inOut'
            })
            gsap.to(selectedObject.rotation, {
                x: 1.632381,
                y: -0.06541,
                z: 2.13756,
                duration: 1,
                ease: "power3.inOut",
            });

            const targetQuaternion = new THREE.Quaternion(0.336, -0.64685, 0.597655, 0.360972);
            gsap.to(selectedObject.quaternion, {
                _x: targetQuaternion.x,
                _y: targetQuaternion.y,
                _z: targetQuaternion.z,
                _w: targetQuaternion.w,
                duration: 1,
                ease: "power3.inOut",
                onUpdate: () => {
                    selectedObject.quaternion.set(gsap.getProperty(selectedObject.quaternion, "_x"), gsap.getProperty(selectedObject.quaternion, "_y"), gsap.getProperty(selectedObject.quaternion, "_z"), gsap.getProperty(selectedObject.quaternion, "_w"));
                }
            });
        }
        if (ROTATE_LISTS.includes(selectedObject.name)) {
            gsap.to(camera.position, {
                x: screenPosition.x,
                y: screenPosition.y,
                z: screenPosition.z,
                duration: 1.5,
                ease: 'power3.inOut',
                onComplete() {
                    controls.target.copy(screenTarget);
                }
            });
        }
    }
})
