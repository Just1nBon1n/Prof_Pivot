// (function() {
//     const grandConteneursSeparateurs = document.querySelectorAll(".grand-conteneur-separateur");

//     function creerSeparateur() {
//         const conteneurSeparateur = document.createElement("div");
//         conteneurSeparateur.classList.add("conteneur-separateur");

//         const taillePixel = 20; 
//         const nombreSpan = Math.floor(window.innerWidth / taillePixel);

//         for (let i = 0; i < nombreSpan; i++) {
//             const parentPixel = document.createElement("span");
//             parentPixel.classList.add("parent-pixel");

//             const pixel = document.createElement("span");
//             pixel.classList.add("pixel");

//             parentPixel.appendChild(pixel);
//             conteneurSeparateur.appendChild(parentPixel);
//         }

//         return conteneurSeparateur;
//     }

//     function addHoverListeners() {
//         const parentPixels = document.querySelectorAll(".parent-pixel");

//         parentPixels.forEach(pixel => {
//             pixel.addEventListener("mouseenter", () => {
//                 pixel.classList.add("hovered");
//             });
//             pixel.addEventListener("mouseleave", () => {
//                 setTimeout(() => {
//                     pixel.classList.remove("hovered");
//                 }, 2500);
//             });
//         });
//     }

//     function update() {
//         const titre = grandConteneurSeparateur.querySelector('.titre-section');
//         grandConteneurSeparateur.innerHTML = "";
//         if (titre) {
//             grandConteneurSeparateur.appendChild(titre);
//         }

//         const nombreSeparateurs = 11;
//         const milieuIndex = Math.floor(nombreSeparateurs / 2);

//         for (let i = 0; i < nombreSeparateurs; i++) {
//             const separateur = creerSeparateur();

//             const distanceDuCentre = Math.abs(i - milieuIndex);

//             const distanceMax = milieuIndex;
//             const opacite = 1 - (distanceDuCentre / distanceMax) * 0.8; 

//             separateur.style.opacity = opacite;

//             grandConteneurSeparateur.appendChild(separateur);
//         }

//         addHoverListeners();

//         document.querySelectorAll(".pixel").forEach(pixel => {
//             const delai = Math.random() * 4;
//             pixel.style.animationDelay = `${delai}s`;
//         });
//     }

//     update();

//     window.addEventListener("resize", update);
// })();

(function () {
    const grandConteneursSeparateurs = document.querySelectorAll(".grand-conteneur-separateur");

    function creerSeparateur() {
        const conteneurSeparateur = document.createElement("div");
        conteneurSeparateur.classList.add("conteneur-separateur");

        const taillePixel = 20;
        const nombreSpan = Math.floor(window.innerWidth / taillePixel);

        for (let i = 0; i < nombreSpan; i++) {
            const parentPixel = document.createElement("span");
            parentPixel.classList.add("parent-pixel");

            const pixel = document.createElement("span");
            pixel.classList.add("pixel");

            parentPixel.appendChild(pixel);
            conteneurSeparateur.appendChild(parentPixel);
        }

        return conteneurSeparateur;
    }

    function addHoverListeners(conteneur) {
        const parentPixels = conteneur.querySelectorAll(".parent-pixel");

        parentPixels.forEach(pixel => {
            pixel.addEventListener("mouseenter", () => {
                pixel.classList.add("hovered");
            });
            pixel.addEventListener("mouseleave", () => {
                setTimeout(() => {
                    pixel.classList.remove("hovered");
                }, 2500);
            });
        });
    }

    function update(grandConteneur) {
        const titre = grandConteneur.querySelector('.titre-section');
        grandConteneur.innerHTML = "";
        if (titre) {
            grandConteneur.appendChild(titre);
        }

        const nombreSeparateurs = 11;
        const milieuIndex = Math.floor(nombreSeparateurs / 2);

        for (let i = 0; i < nombreSeparateurs; i++) {
            const separateur = creerSeparateur();

            const distanceDuCentre = Math.abs(i - milieuIndex);

            const distanceMax = milieuIndex;
            const opacite = 1 - (distanceDuCentre / distanceMax) * 0.8;

            separateur.style.opacity = opacite;

            grandConteneur.appendChild(separateur);
        }

        addHoverListeners(grandConteneur);

        grandConteneur.querySelectorAll(".pixel").forEach(pixel => {
            const delai = Math.random() * 4;
            pixel.style.animationDelay = `${delai}s`;
        });
    }

    function initializeSeparateurs() {
        grandConteneursSeparateurs.forEach(grandConteneur => {
            update(grandConteneur);
        });
    }

    initializeSeparateurs();

    window.addEventListener("resize", initializeSeparateurs);
})();