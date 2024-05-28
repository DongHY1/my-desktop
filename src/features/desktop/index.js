import * as THREE from 'three'
import { gsap } from 'gsap'
import { textureLoader } from "../../loaders"
import { camera } from '../../camera'
import { controls } from '../../controls'
import { initCameraPosition, screenPosition, screenTarget } from '../../utils'

const bakedTexture = textureLoader.load('baked.jpg')

const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })


bakedTexture.flipY = false
bakedTexture.colorSpace = THREE.SRGBColorSpace


function diveInDesktop() {
    gsap.to(camera.position, {
        x: screenPosition.x,
        y: screenPosition.y,
        z: screenPosition.z,
        duration: 1.5,
        ease: 'power3.inOut',
        onComplete() {
            controls.target.copy(screenTarget);
        }
    });
}
function diveOutDesktop() {
    gsap.to(camera.position, {
        x: initCameraPosition.x,
        y: initCameraPosition.y,
        z: initCameraPosition.z,
        duration: 1.5,
        ease: 'power3.inOut'
    });
}
export { bakedMaterial, bakedTexture, diveInDesktop, diveOutDesktop }