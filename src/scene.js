import * as THREE from 'three'
import { bakedMaterial } from './features/desktop'
import { smoke } from './features/smoke'
import { camera } from './camera'
import { overlay } from './overlay'
import { gltfLoader } from './loaders'
import { GUI } from 'lil-gui'
const scene = new THREE.Scene()
const gui = new GUI
function initScene() {
    const laptop = gui.addFolder('laptop');
    scene.add(overlay)
    scene.background = new THREE.Color(0xf6eedc);
    gltfLoader.load(
        'desktop.glb',
        (gltf) => {
            // 遍历模型，找到laptop-a和laptop-b
            gltf.scene.traverse((child) => {
                child.material = bakedMaterial;
                if (child.name === 'laptop-a') {
                    // Position controls
                    laptop.add(child.position, 'x', -1, 1).name('Position X').listen();
                    laptop.add(child.position, 'y', -1, 1).name('Position Y').listen();
                    laptop.add(child.position, 'z', -1, 1).name('Position Z').listen();

                    // Rotation controls
                    laptop.add(child.rotation, 'x', -Math.PI, Math.PI).name('Rotation X').listen();
                    laptop.add(child.rotation, 'y', -Math.PI, Math.PI).name('Rotation Y').listen();
                    laptop.add(child.rotation, 'z', -Math.PI, Math.PI).name('Rotation Z').listen();
                    // quaternion controls

                    laptop.add(child.quaternion, 'x', -1, 1).name('Quaternion X').listen();
                    laptop.add(child.quaternion, 'y', -1, 1).name('Quaternion Y').listen();
                    laptop.add(child.quaternion, 'z', -1, 1).name('Quaternion Z').listen();
                    laptop.add(child.quaternion, 'w', -1, 1).name('Quaternion W').listen();
                }
                if (child.name === 'laptop-b') {
                    // Position controls
                    laptop.add(child.position, 'x', -1, 1).name('Position X').listen();
                    laptop.add(child.position, 'y', -1, 1).name('Position Y').listen();
                    laptop.add(child.position, 'z', -1, 1).name('Position Z').listen();

                    // Rotation controls
                    laptop.add(child.rotation, 'x', -Math.PI, Math.PI).name('Rotation X').listen();
                    laptop.add(child.rotation, 'y', -Math.PI, Math.PI).name('Rotation Y').listen();
                    laptop.add(child.rotation, 'z', -Math.PI, Math.PI).name('Rotation Z').listen();
                    // quaternion controls

                    laptop.add(child.quaternion, 'x', -1, 1).name('Quaternion X').listen();
                    laptop.add(child.quaternion, 'y', -1, 1).name('Quaternion Y').listen();
                    laptop.add(child.quaternion, 'z', -1, 1).name('Quaternion Z').listen();
                    laptop.add(child.quaternion, 'w', -1, 1).name('Quaternion W').listen();
                }

            })
            scene.add(gltf.scene);
            scene.add(smoke);
        });

    scene.add(camera)
}



export { initScene, scene }