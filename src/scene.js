import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { bakedMaterial } from './features/desktop'
import { smoke } from './features/smoke'
import { camera } from './camera'
import { overlay } from './overlay'
import { gltfLoader } from './loaders'


function initScene() {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf6eedc);
    gltfLoader.load(
        'desktop.glb',
        (gltf) => {
            gltf.scene.traverse((child) => {
                child.material = bakedMaterial
            })
            scene.add(gltf.scene)
        }
    )
    scene.add(smoke)
    scene.add(camera)
    scene.add(overlay)
    return scene
}

export { initScene }