import Stats from 'stats.js'

const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

export {sizes,stats}