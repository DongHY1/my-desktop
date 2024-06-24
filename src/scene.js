import * as THREE from 'three'
import { bakedMaterial } from './features/desktop'
import { smoke } from './features/smoke'
import { camera } from './camera'
import { overlay } from './overlay'
import { gltfLoader } from './loaders'
import { videoMaterial } from './features/video'
const scene = new THREE.Scene()
function initScene() {
    scene.add(overlay)
    scene.background = new THREE.Color(0xFFFFFF);
    gltfLoader.load(
        'desktop.glb',
        (gltf) => {
            gltf.scene.traverse((child) => {
                if (child.name === 'monitor') {
                    child.material = videoMaterial
                } else {
                    child.material = bakedMaterial;
                }

            })
            scene.add(gltf.scene);
            scene.add(smoke);
        });

    scene.add(camera)
}



export { initScene, scene }
