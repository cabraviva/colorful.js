const Color = require('./color.js')
const Hex = require('./types/Hex')
const { isHex } = require('./lib/hextools.js')

try {
    if (window) {
        window.Color = Color
        window.Hex = Hex
        window.isHex = isHex
    }
} catch (e) {
    // No window object
}

try {
    module.exports = { Color, Hex, isHex }
} catch (e) {
    // No module object
}