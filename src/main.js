const Color = require('./color.js')
const Hex = require('./types/Hex')

try {
    if (window) {
        window.Color = Color
        window.Hex = Hex
    }
} catch (e) {
    // No window object
}

try {
    module.exports = { Color, Hex }
} catch (e) {
    // No module object
}