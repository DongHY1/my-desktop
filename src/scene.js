import * as THREE from 'three'
import { bakedMaterial } from './features/desktop'
import { smoke } from './features/smoke'
import { camera } from './camera'
import { overlay } from './overlay'
import { gltfLoader } from './loaders'
const scene = new THREE.Scene()
function initScene() {
    scene.add(overlay)
    scene.background = new THREE.Color(0xf6eedc);
    gltfLoader.load(
        'desktop.glb',
        (gltf) => {
            // 遍历模型，找到laptop-a和laptop-b
            gltf.scene.traverse((child) => {
                child.material = bakedMaterial;
            })
            scene.add(gltf.scene);
            scene.add(smoke);
        });

    scene.add(camera)
}



export { initScene, scene }