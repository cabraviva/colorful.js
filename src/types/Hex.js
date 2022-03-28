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

class Hex {
    constructor (hex) {
        if (typeof hex !== 'string') {
            throw new TypeError('Expected a string')
        }
        
        let hexParts = hex.split('') // split into array
        if (hexParts[0] === '#') hexParts.shift() // remove # if present

        if (hexParts.length == 3) {
            // Generate a 6 digit hex from 3 digit hex
            let newHexParts = []

            hexParts = hexParts.map(function (part) {
                newHexParts.push(part)
                newHexParts.push(part)
                return part + part
            })

            hexParts = newHexParts
        }

        if (hexParts.length !== 6) {
            throw new TypeError('Expected a 6-digit hex string')
        }

        // Check if only the characters A-F and 0-9 are present
        if (!hexParts.every(function (part) {
            return /^[0-9A-F]$/i.test(part)
        })) {
            return false
        }

        hex = hexParts.join('') // Convert array to string

        this.hex = hex // Store hex string
    }

    toString () {
        return this.hex
    }

    withHash () {
        return '#' + this.hex
    }

    toRGB () {
        // Convert hex to RGB
        var r = parseInt(this.hex.substring(0, 2), 16)
        var g = parseInt(this.hex.substring(2, 4), 16)
        var b = parseInt(this.hex.substring(4, 6), 16)

        return new RGB(r, g, b)
    }

    toRGBA () {
        // Convert hex to RGBA
        var r = parseInt(this.hex.substring(0, 2), 16)
        var g = parseInt(this.hex.substring(2, 4), 16)
        var b = parseInt(this.hex.substring(4, 6), 16)
        var a = 255

        return new RGBA(r, g, b, a)
    }
}

module.exports = Hex