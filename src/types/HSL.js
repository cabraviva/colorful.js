const Color = require("../color")

// Define RGB Type
class RGB {
    constructor(r = 0, g = 0, b = 0) {
        this.r = r
        this.g = g
        this.b = b
        this.red = r
        this.green = g
        this.blue = b
    }

    toHex () {
        return new Hex('#' + this.r.toString(16) + this.g.toString(16) + this.b.toString(16))
    }

    toRGB () {
        return new RGB(this.r, this.g, this.b)
    }

    toRGBA () {
        return new RGB(this.r, this.g, this.b, this.a || 255)
    }
}

class RGBA extends RGB {
    constructor(r = 0, g = 0, b = 0, a = 255) {
        super(r, g, b)
        this.a = a
        this.alpha = a
    }

    toRGBA () {
        return new RGBA(this.r, this.g, this.b, this.a)
    }
}
// End Defining RGB Type

function hsl2rgb(h,s,l) {
  let a = s*Math.min(l,1-l)
  let f = (n,k=(n+h/30)%12) => l - a*Math.max(Math.min(k-3,9-k,1),-1)
  return [f(0),f(8),f(4)]
}  

const HSLToRGB = (h, s, l) => {
    return new RGB(Math.round(hsl2rgb(h,s,l)[0] * 255), Math.round(hsl2rgb(h,s,l)[1] * 255), Math.round(hsl2rgb(h,s,l)[2] * 255))
}

class HSL {
    constructor (h, s, l, a = 1) {
        this.h = h
        this.s = s
        this.l = l

        this.hue = h
        this.saturation = s
        this.lightness = l
    }

    toRGB () {
        return HSLToRGB(this.h, this.s, this.l)
    }

    toRGBA () {
        return new RGBA(this.toRGB().r, this.toRGB().g, this.toRGB().b)
    }
}

module.exports = HSL