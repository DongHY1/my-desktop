import * as THREE from 'three'
import { textureLoader } from "../../loaders"

const bakedTexture = textureLoader.load('baked.jpg')

const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })


bakedTexture.flipY = false
bakedTexture.colorSpace = THREE.SRGBColorSpace

export {bakedMaterial,bakedTexture}