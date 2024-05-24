import './style.css'
import { sizes, stats } from './src/utils'
import { smokeMaterial } from './src/features/smoke'
import { camera } from './src/camera'
import { scene, initScene } from './src/scene'
import { controls } from './src/controls'
import { renderer } from './src/render'
import { clock } from './src/clock'

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
