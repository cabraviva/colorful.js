const Hex = require('../types/Hex')

function isHex (hex) {

    if ((typeof hex !== 'string') || hex instanceof Hex) return false // not a string and not an Hex

    if (hex instanceof Hex) return true // Hex

    // If not already an Hex, try to create an hex
    try {
        new Hex(hex)
        return true
    } catch (e) {
        return false
    }

}

function createHex (hex) {
    if (hex instanceof Hex) return hex // Already Hex
    return new Hex(hex)
}

module.exports = { isHex, createHex }