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
    controls.update()
    const desktop = scene.children[1].children
    if (desktop.length > 0) {
        desktop.find((item) => {
            if (item.name === 'OfficeChair002') {
                item.rotation.z += 0.005
            }
        })
    }
    // console.log(camera.position)
    // Render
    renderer.render(scene, camera)
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    stats.end()
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
            gsap.to(camera.position, { x: -3.17, y: 1.74, z: -2.42, duration: 1.5, ease: 'power3.inOut' })
        } else {
            gsap.to(camera.position, { x: -3, y: 2, z: 1, duration: 1.5, ease: 'power3.inOut' })
        }
    }
})
