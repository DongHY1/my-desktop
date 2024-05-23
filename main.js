import './style.css'
import { sizes } from './src/utils'
import { smokeMaterial } from './src/features/smoke'
import { camera } from './src/camera'
import {initScene} from './src/scene'
import {controls} from './src/controls'
import { renderer } from './src/render'
import { clock } from './src/clock'

const scene = initScene()

function tick(){
    const elapsedTime = clock.getElapsedTime()
    smokeMaterial.uniforms.uTime.value = elapsedTime
    // Update controls
    controls.update()
    // Render
    renderer.render(scene, camera)
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
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
