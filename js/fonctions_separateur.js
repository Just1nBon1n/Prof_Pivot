(function () {
    const grandConteneursSeparateurs = document.querySelectorAll(".grand-conteneur-separateur");

    // Créer une rangée de pixels
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

    // Ajoute un hover qui permet de mettre les pixels en surbrillance
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

    // Détermine le nombre de rangées de séparateur, ajuste en fonction de la taille de la fenêtre, ajuste l'opacité
    // et rend l'animation des pixels aléatoire avec un délais.
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

    function initialiserSeparateurs() {
        grandConteneursSeparateurs.forEach(grandConteneur => {
            update(grandConteneur);
        });
    }

    /* Gère l'optimisation de l'animtion des séparateurs */
    function toggleAnimation(grandConteneur, visible) {
        if (visible) {
            grandConteneur.classList.add("anime");
        } 
        else {
            grandConteneur.classList.remove("anime");
        }
    }
    
    function observeSeparateurs() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                toggleAnimation(entry.target, entry.isIntersecting);
            });
        });
    
        grandConteneursSeparateurs.forEach(grandConteneur => {
            observer.observe(grandConteneur);
        });
    }
    
    // Joue l'animation seulement quand le séparateur est visible
    observeSeparateurs();

    initialiserSeparateurs();

    window.addEventListener("resize", initialiserSeparateurs);
})();