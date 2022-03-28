const Hex = require('./Hex')

// Function to outpot the input string (twice) concatted if the length of the input string is not 2
function twoCharacters (input) {
    return input.length === 2 ? input : input + input
}

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
        return new Hex('#' + twoCharacters(this.r.toString(16)) + twoCharacters(this.g.toString(16)) + twoCharacters(this.b.toString(16)))
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

module.exports = { RGB, RGBA }