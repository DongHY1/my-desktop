varying vec2 vUv;
uniform float uTime;
uniform sampler2D uPerlinTexture;

#include ./rotate2D.glsl


void main()
{
    vUv = uv;
    vec3 newPosition = position;
    // Twist
    float twistPerlin = texture(uPerlinTexture, vec2(0.5, uv.y * 0.2 - uTime * 0.005)).r;
    float angle = twistPerlin * 10.0;
    newPosition.xz = rotate2D(newPosition.xz, angle);
    // Final position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}