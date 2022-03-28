const { RGB, RGBA } = require('./types/RGB')
const { createHex, isHex } = require('./lib/hextools.js')

class Color {
    constructor (rOrHex, g, b, a = 255) {
        if (isHex(rOrHex)) {
            this.hex = createHex(rOrHex)
            this.rgb = this.hex.toRGB()
            this.rgba = this.hex.toRGBA()
        } else {
            this.rgb = new RGB(rOrHex, g, b)
            this.rgba = new RGBA(rOrHex, g, b, a)
            this.hex = this.rgb.toHex()
        }
    }

    toString () {
        return this.hex.withHash()
    }

    toRgbFunction () {
        return `rgb(${this.rgb.red},${this.rgb.green},${this.rgb.blue})`
    }

    toRgbaFunction () {
        return `rgba(${this.rgba.red},${this.rgba.green},${this.rgba.blue},${this.rgba.alpha / 255})`
    }
}

module.exports = Color