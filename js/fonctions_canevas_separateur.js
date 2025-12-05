// Sélectionne tous les wrappers de séparateurs sur la page
const lesWrappers = document.querySelectorAll(".separateur-wrapper");

lesWrappers.forEach(wrapper => {
    // Canvas principal : affiche le flicker de base
    const canvasBase = wrapper.querySelector(".separateur-canevas");
    const ctxBase = canvasBase.getContext("2d");

    // Canvas hover : affichera l'effet lumineux quand on survole
    const canvasHover = document.createElement("canvas");
    canvasHover.classList.add("separateur-hover");
    wrapper.appendChild(canvasHover);

    // Positionne le canvas hover exactement au-dessus du canvas de base
    canvasHover.style.position = "absolute";
    canvasHover.style.top = "0";
    canvasHover.style.left = "0";
    canvasHover.style.zIndex = "2"; // au-dessus du canvas de base
    const ctxHover = canvasHover.getContext("2d");

    // Couleur des pixels récupérée depuis l'attribut data-color
    const couleur = canvasBase.dataset.color || "#ffffff";

    const rangees = 13;       // nombre de lignes de pixels
    const flickerMin = 0.9;   // luminosité minimale des pixels de base
    const flickerMax = 1.05;  // luminosité maximale des pixels de base
    let taillePixel = 20;     // taille d'un pixel carré
    const gap = 1;            // espace entre chaque pixel

    let mouseX = -1, mouseY = -1; // position de la souris sur le canvas
    let flickerValue = [];         // tableau des valeurs de flicker pour le canvas de base
    let hoverValue = [];           // tableau des valeurs de luminosité pour le canvas hover

    // Fonction pour redimensionner les canvas et réinitialiser les tableaux
    function redimensionnerCanvas() {
        [canvasBase, canvasHover].forEach(c => {
            c.width = window.innerWidth;
            c.height = window.innerHeight * 0.33;
        });

        // Taille de chaque pixel en fonction de la hauteur
        taillePixel = (canvasBase.height / rangees) - gap;

        // Nombre de colonnes nécessaire pour couvrir toute la largeur
        const colonnes = Math.ceil(canvasBase.width / (taillePixel + gap));

        // Initialise le flicker de base à la luminosité minimale
        flickerValue = Array(rangees).fill().map(() =>
            Array(colonnes).fill(flickerMin)
        );

        // Initialise le hover à zéro (pas de luminosité au départ)
        hoverValue = Array(rangees).fill().map(() =>
            Array(colonnes).fill(0)
        );
    }

    window.addEventListener("resize", redimensionnerCanvas);
    redimensionnerCanvas();

    // Suivi de la position de la souris
    window.addEventListener("mousemove", e => {
        const rect = canvasBase.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    // Réinitialise la position si la souris quitte le canvas
    window.addEventListener("mouseout", () => {
        mouseX = -1;
        mouseY = -1;
    });

    // Met à jour les valeurs de flicker aléatoires du canvas de base
    function updateFlicker() {
        const colonnes = flickerValue[0].length;
        for (let row = 0; row < rangees; row++) {
            for (let col = 0; col < colonnes; col++) {
                flickerValue[row][col] = flickerMin + Math.random() * (flickerMax - flickerMin);
            }
        }
    }
    setInterval(updateFlicker, 1000); // mise à jour

    // Fonction principale de dessin
    function draw() {
        ctxBase.clearRect(0, 0, canvasBase.width, canvasBase.height);
        ctxHover.clearRect(0, 0, canvasHover.width, canvasHover.height);

        const rangeeMilieu = Math.floor(rangees / 2); // ligne centrale pour gérer l'opacité

        for (let row = 0; row < rangees; row++) {
            const y = row * (taillePixel + gap);

            // Calcul de l'opacité selon la distance par rapport au centre
            const distanceDuCentre = Math.abs(row - rangeeMilieu);
            const distanceMax = rangeeMilieu;
            const opaciteCentre = 1 - (distanceDuCentre / distanceMax) * 0.8;

            for (let col = 0; col < flickerValue[row].length; col++) {
                const x = col * (taillePixel + gap);

                // Dessine le canvas de base avec le flicker
                ctxBase.fillStyle = couleur;
                ctxBase.globalAlpha = flickerValue[row][col] * opaciteCentre;
                ctxBase.fillRect(x, y, taillePixel, taillePixel);

                // Vérifie si la souris survole ce pixel
                const isHovered =
                    mouseX >= x && mouseX < x + taillePixel &&
                    mouseY >= y && mouseY < y + taillePixel;

                if (isHovered) {
                    // Si survolé, augmente la luminosité du hover
                    hoverValue[row][col] = 10 * opaciteCentre;
                }

                // Dessine le hover si la luminosité > 0
                if (hoverValue[row][col] > 0) {
                    ctxHover.fillStyle = couleur;
                    ctxHover.globalAlpha = hoverValue[row][col];
                    ctxHover.fillRect(x, y, taillePixel, taillePixel);

                    // Diminue progressivement la luminosité pour effet de fade
                    hoverValue[row][col] *= 0.8;
                    if (hoverValue[row][col] < 0.01) hoverValue[row][col] = 0;
                }
            }
        }

        // Reset alpha pour éviter d'affecter d'autres dessins
        ctxBase.globalAlpha = 1;
        ctxHover.globalAlpha = 1;

        // Boucle d'animation
        requestAnimationFrame(draw);
    }

    draw();
});
