import * as THREE from 'three'
const videoElement = document.createElement('video');
videoElement.muted = true;
videoElement.loop = true;
videoElement.controls = true;
videoElement.playsInline = true;
videoElement.autoplay = true;
videoElement.src = 'video.mp4'; // 设置视频路径
videoElement.play();


// Video Texture
const videoTexture = new THREE.VideoTexture(videoElement);
videoTexture.encoding = THREE.sRGBEncoding;
const videoMaterial = new THREE.MeshBasicMaterial({
    map: videoTexture
});
export { videoElement, videoMaterial }