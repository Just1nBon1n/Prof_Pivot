// Convertit une couleur hexadécimale en objet RGB pour une utilisation en JavaScript.

// fonctionne pour tout les formats en entrés
// Transforme #RRGGBB, #RGB, #RRGGBBAA ou #RGBA en {r: _, g: _, b: _, a: _}
function hexToRgb(hex) {
    if (!hex) return { r: 0, g: 0, b: 0, a: 1 };
    hex = hex.trim();
    if (hex.startsWith('#')) hex = hex.slice(1);

    // Gère le format court (3 ou 4 chiffres)
    if (hex.length === 3 || hex.length === 4) {
        hex = hex.split('').map(h => h + h).join('');
    }

    const bigint = parseInt(hex, 16);
    let r, g, b, a;

    if (hex.length === 8) { // Format #RRGGBBAA
        r = (bigint >> 24) & 255;
        g = (bigint >> 16) & 255;
        b = (bigint >> 8) & 255;
        a = bigint & 255;
        a = a / 255; // Convertit 0-255 en 0.0-1.0
    } else { // Format #RRGGBB (opaque)
        r = (bigint >> 16) & 255;
        g = (bigint >> 8) & 255;
        b = bigint & 255;
        a = 1; // 100% opaque
    }

    return { r, g, b, a };
}

// Récupère la valeur RGB(A) d'une variable CSS définie dans :root et
// la retourne sous forme d'objet {r: _, g: _, b: _, a: _}
function getCssColor(varName) {
    const couleurCSS = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();

    // Cas 1 : Couleur Hexadécimale (#...)
    if (couleurCSS.startsWith('#')) return hexToRgb(couleurCSS);

    // Cas 2 : Couleur RGBA()
    if (couleurCSS.startsWith('rgba')) {
        // Cherche tous les nombres (R, G, B, A)
        const match = couleurCSS.match(/(\d+(\.\d+)?)/g); 
        if (match && match.length === 4) {
            return {
                r: parseInt(match[0]),
                g: parseInt(match[1]),
                b: parseInt(match[2]),
                a: parseFloat(match[3]), // Alpha est le 4ème nombre (0.0 à 1.0)
            };
        }
    }

    // Cas 3 : Couleur RGB() (traité comme opaque)
    if (couleurCSS.startsWith('rgb')) {
        const match = couleurCSS.match(/\d+/g);
        if (match && match.length >= 3) {
            return {
                r: parseInt(match[0]),
                g: parseInt(match[1]),
                b: parseInt(match[2]),
                a: 1, // Opacité par défaut si rgb() est utilisé
            };
        }
    }

    // Valeur de repli
    return { r: 255, g: 255, b: 255, a: 1 };
}


// Convertit l'objet couleur {r: _, g: _, b: _, a: _} en chaîne CSS "rgba(r, g, b, a)"
// en gros "reconstruit la chaine"
function rgbToString(colorObj, alphaOverride = null) {
    // 1. Détermine la valeur alpha à utiliser (si utilisée) :
    const a = (alphaOverride !== null && alphaOverride !== undefined) ? alphaOverride : colorObj.a;
    
    // 2. S'assure que les composantes RGB sont des entiers
    const r = Math.round(colorObj.r);
    const g = Math.round(colorObj.g);
    const b = Math.round(colorObj.b);
    
    // 3. Retourne la chaîne de couleur
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
