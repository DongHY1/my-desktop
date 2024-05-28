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
import { closeLaptop, openLaptop } from './src/features/laptop'
import { diveInDesktop, diveOutDesktop } from './src/features/desktop'

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

// 点击或触摸处理函数
function onPointerDown(event) {
    event.preventDefault();

    let clientX, clientY;
    if (event.type === 'mousedown' || event.type === 'mousemove') {
        clientX = event.clientX;
        clientY = event.clientY;
    } else if (event.type === 'touchstart' || event.type === 'touchmove') {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    }

    const coords = new THREE.Vector2(
        (clientX / renderer.domElement.clientWidth) * 2 - 1,
        -((clientY / renderer.domElement.clientHeight) * 2 - 1)
    );

    raycaster.setFromCamera(coords, camera);
    const intersections = raycaster.intersectObjects(scene.children[1].children);
    if (intersections.length > 0) {
        const selectedObject = intersections[0].object;
        if (ROTATE_LISTS.includes(selectedObject.name)) {
            diveInDesktop();
            closeLaptop();
        } else {
            diveOutDesktop();
            openLaptop();
        }
    }
}
window.addEventListener('mousedown', onPointerDown, false);
window.addEventListener('touchstart', onPointerDown, false);
