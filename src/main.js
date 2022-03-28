const Color = require('./color.js')
const Hex = require('./types/Hex')
const { isHex } = require('./lib/hextools.js')
const COLORS = {
    WHITE: new Color(255, 255, 255),
    BLACK: new Color(0, 0, 0),
    RED: new Color(255, 0, 0),
    GREEN: new Color(0, 255, 0),
    BLUE: new Color(0, 0, 255),
    YELLOW: new Color(255, 255, 0),
    CYAN: new Color(0, 255, 255),
    MAGENTA: new Color(255, 0, 255),
    GRAY: new Color(128, 128, 128),
    DARK_GRAY: new Color(64, 64, 64),
    LIGHT_GRAY: new Color(192, 192, 192),
    DARK_RED: new Color(128, 0, 0),
    DARK_GREEN: new Color(0, 128, 0),
    DARK_BLUE: new Color(0, 0, 128),
    DARK_YELLOW: new Color(128, 128, 0),
    DARK_CYAN: new Color(0, 128, 128),
    DARK_MAGENTA: new Color(128, 0, 128),
    DARK_ORANGE: new Color(255, 128, 0),
    DARK_BROWN: new Color(128, 64, 0),
    ORANGE: new Color(255, 128, 0),
    BROWN: new Color(128, 64, 0),
    MINT: new Color(0, 255, 128),
    ROYAL_BLUE: new Color(0, 128, 255),
    LIME: new Color(128, 255, 0),
    PINK: new Color(255, 0, 128),
    PURPLE: new Color(128, 0, 255),
    LIGHT_ORANGE: new Color(255, 255, 128),
    LIGHT_BROWN: new Color(255, 128, 64),
    LIGHT_MINT: new Color(128, 255, 128),
    LIGHT_ROYAL_BLUE: new Color(128, 128, 255),
    LIGHT_LIME: new Color(255, 255, 128),
    LIGHT_PINK: new Color(255, 128, 255),
    LIGHT_PURPLE: new Color(255, 128, 255)
}

try {
    if (window) {
        window.Color = Color
        window.Hex = Hex
        window.isHex = isHex
        window.COLORS = COLORS
    }
} catch (e) {
    // No window object
}

try {
    module.exports = { Color, Hex, isHex, COLORS }
} catch (e) {
    // No module object
}