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
            console.log(this.rgb)
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

    getTextContrast () {
        let yiq = ((this.rgb.red * 299) + (this.rgb.green * 587) + (this.rgb.blue * 114)) / 1000
        return (yiq >= 128) ? new Color('#000') : new Color('#fff')
    }

    debug () {
        console.log(`%c${this.toString()}`, `background-color:${this.toRgbFunction()};color:${this.getTextContrast().toRgbFunction()}`)
    }

    getComplementaryContrast () {
        let r = 255 - this.rgb.red
        let g = 255 - this.rgb.green
        let b = 255 - this.rgb.blue
        return new Color(r, g, b)
    }

    brighten (percentage) {
        if (percentage > 1 || percentage < 0) return new Error('Percentage must be between 0 and 1')
        let r = (this.rgb.red + (255 * percentage)) >= 255 ? 255 : (this.rgb.red + (255 * percentage))
        let g = (this.rgb.green + (255 * percentage)) >= 255 ? 255 : (this.rgb.green + (255 * percentage))
        let b = (this.rgb.blue + (255 * percentage)) >= 255 ? 255 : (this.rgb.blue + (255 * percentage))
        return new Color(r, g, b)
    }

    darken (percentage) {
        if (percentage > 1 || percentage < 0) return new Error('Percentage must be between 0 and 1')
        let r = (this.rgb.red - (255 * percentage)) >= 255 ? 255 : (this.rgb.red - (255 * percentage))
        let g = (this.rgb.green - (255 * percentage)) >= 255 ? 255 : (this.rgb.green - (255 * percentage))
        let b = (this.rgb.blue - (255 * percentage)) >= 255 ? 255 : (this.rgb.blue - (255 * percentage))
        return new Color(r, g, b)
    }
}

module.exports = Color