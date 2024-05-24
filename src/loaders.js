import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { gsap } from 'gsap'
import { overlay, overlayMaterial } from './overlay'
import { scene } from './scene'
const loadingManager = new THREE.LoadingManager(
    () => {
        gsap.to(overlayMaterial.uniforms.uAlpha, {
            duration: 3,
            value: 0,
            delay: 1,
            onComplete: () => {
                scene.remove(overlay);
            }
        });

    }
)
const textureLoader = new THREE.TextureLoader(loadingManager)
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
const gltfLoader = new GLTFLoader(loadingManager)
gltfLoader.setDRACOLoader(dracoLoader)


export { textureLoader, dracoLoader, gltfLoader }