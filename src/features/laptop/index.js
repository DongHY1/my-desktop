
import * as THREE from 'three'
import { gsap } from 'gsap'
import { scene } from '../../scene';
function closeLaptop() {
    const laptop = scene.children[1].children.find((item) => item.name === 'laptop-a')
    gsap.to(laptop.position, {
        x: -0.225,
        y: 0.558,
        z: 0.25,
        duration: 1,
        ease: 'power3.inOut'
    })
    gsap.to(laptop.rotation, {
        x: 1.632381,
        y: -0.06541,
        z: 2.13756,
        duration: 1,
        ease: "power3.inOut",
    });

    const targetQuaternion = new THREE.Quaternion(0.336, -0.64685, 0.597655, 0.360972);
    gsap.to(laptop.quaternion, {
        _x: targetQuaternion.x,
        _y: targetQuaternion.y,
        _z: targetQuaternion.z,
        _w: targetQuaternion.w,
        duration: 1,
        ease: "power3.inOut",
        onUpdate: () => {
            laptop.quaternion.set(gsap.getProperty(laptop.quaternion, "_x"), gsap.getProperty(laptop.quaternion, "_y"), gsap.getProperty(laptop.quaternion, "_z"), gsap.getProperty(laptop.quaternion, "_w"));
        }
    });
}


function openLaptop() {
    const laptop = scene.children[1].children.find((item) => item.name === 'laptop-a')
    gsap.to(laptop.position, {
        x: -0.274,
        y: 0.652,
        z: 0.221,
        duration: 1,
        ease: 'power3.inOut'
    })
    gsap.to(laptop.rotation, {
        x: 3.141592,
        y: -0.9948,
        z: 3.141592,
        duration: 1,
        ease: "power3.inOut",
    });

    const targetQuaternion = new THREE.Quaternion(0, -0.87881, 0, 0.477);
    gsap.to(laptop.quaternion, {
        _x: targetQuaternion.x,
        _y: targetQuaternion.y,
        _z: targetQuaternion.z,
        _w: targetQuaternion.w,
        duration: 1,
        ease: "power3.inOut",
        onUpdate: () => {
            laptop.quaternion.set(gsap.getProperty(laptop.quaternion, "_x"), gsap.getProperty(laptop.quaternion, "_y"), gsap.getProperty(laptop.quaternion, "_z"), gsap.getProperty(laptop.quaternion, "_w"));
        }
    });
}

export { openLaptop, closeLaptop }