import './style.css'
import * as THREE from 'three'
import { sizes, stats, ROTATE_LISTS, screenPosition } from './src/utils'
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
    console.log(camera.position)
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
        if (ROTATE_LISTS.includes(selectedObject.name)) {
            gsap.to(camera.position, {
                x: screenPosition.x,
                y: screenPosition.y,
                z: screenPosition.z,
                duration: 1.5,
                ease: 'power3.inOut'
            });
        }
    }
})
