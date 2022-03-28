const { RGB, RGBA } = require('./types/RGB')
const HSL = require('./types/HSL')
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

        this.hsl = new HSL(this.getHue(), this.getSaturation(), this.getLightness())
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

    saturate (percentage) {
        if (percentage > 1 || percentage < 0) return new Error('Percentage must be between 0 and 1')
        let r = (this.rgb.red + (255 * percentage)) >= 255 ? 255 : (this.rgb.red + (255 * percentage))
        let g = (this.rgb.green + (255 * percentage)) >= 255 ? 255 : (this.rgb.green + (255 * percentage))
        let b = (this.rgb.blue + (255 * percentage)) >= 255 ? 255 : (this.rgb.blue + (255 * percentage))
        return new Color(r, g, b)
    }

    desaturate (percentage) {
        if (percentage > 1 || percentage < 0) return new Error('Percentage must be between 0 and 1')
        let r = (this.rgb.red - (255 * percentage)) >= 255 ? 255 : (this.rgb.red - (255 * percentage))
        let g = (this.rgb.green - (255 * percentage)) >= 255 ? 255 : (this.rgb.green - (255 * percentage))
        let b = (this.rgb.blue - (255 * percentage)) >= 255 ? 255 : (this.rgb.blue - (255 * percentage))
        return new Color(r, g, b)
    }

    getHue () {
        let r = this.rgb.red / 255
        let g = this.rgb.green / 255
        let b = this.rgb.blue / 255
        let max = Math.max(r, g, b)
        let min = Math.min(r, g, b)
        let delta = max - min
        let hue
        if (r === max) {
            hue = (g - b) / delta
        } else if (g === max) {
            hue = 2 + (b - r) / delta
        } else if (b === max) {
            hue = 4 + (r - g) / delta
        }
        hue *= 60
        if (hue < 0) {
            hue += 360
        }
        return hue
    }

    getSaturation () {
        let r = this.rgb.red / 255
        let g = this.rgb.green / 255
        let b = this.rgb.blue / 255
        let max = Math.max(r, g, b)
        let min = Math.min(r, g, b)
        let delta = max - min
        if (max === 0) {
            return 0
        }
        return delta / max
    }

    getLightness () {
        let r = this.rgb.red / 255
        let g = this.rgb.green / 255
        let b = this.rgb.blue / 255
        let max = Math.max(r, g, b)
        let min = Math.min(r, g, b)
        return (max + min) / 2
    }

    toHsl () {
        let h = this.getHue()
        let s = this.getSaturation()
        let l = this.getLightness()
        return new HSL(h, s, l)
    }

    hueRotate (degrees) {
        let hsl = this.toHsl()
        hsl.hue += degrees
        if (hsl.hue > 360) {
            hsl.hue -= 360
        } else if (hsl.hue < 0) {
            hsl.hue += 360
        }
        hsl.h = hsl.hue
        return Color.fromHSL(hsl)
    }
}

Color.fromHSL = function (hsl) {
    const rgb = hsl.toRGB()
    return new Color(rgb.red, rgb.green, rgb.blue)
}

module.exports = Color