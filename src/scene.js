import * as THREE from 'three'
import { gltfLoader } from './loaders'
import { bakedMaterial } from './features/desktop'
import { smoke } from './features/smoke'
import { camera } from './camera'
function initScene(){
    const scene = new THREE.Scene()
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
    return scene
}

export {initScene}