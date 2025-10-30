// couleursUtils.js

function hexToRgb(hex) {
    if (!hex) return { r: 0, g: 0, b: 0 };
    hex = hex.trim();
    if (hex.startsWith('#')) hex = hex.slice(1);
    if (hex.length === 3) hex = hex.split('').map(h => h + h).join('');

    const bigint = parseInt(hex, 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
    };
}

function getCssColor(varName) {
    const couleurCSS = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();

    if (couleurCSS.startsWith('#')) return hexToRgb(couleurCSS);

    if (couleurCSS.startsWith('rgb')) {
        const match = couleurCSS.match(/\d+/g);
        if (match) {
            return {
                r: parseInt(match[0]),
                g: parseInt(match[1]),
                b: parseInt(match[2]),
            };
        }
    }

    return { r: 255, g: 255, b: 255 };
}
