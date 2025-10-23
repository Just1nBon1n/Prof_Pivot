const dossiers = document.querySelector(".dossiers");
let nombreDossier = 7;

// Étiquettes
const etiquettes = [
    "Contrat d’engagement TIM",
    "Grille des cours en TIM",
    "Pondération des cours TIM",
    "Guide des ressources d'aide",
    "Par où commencer",
    "Introduction à MacOS",
    "Installation Adobe"
];

const fichiersLiens = [

  ];

for (let i = 0; i < nombreDossier; i++) {
    // Dossier
    const dossier = document.createElement("div");
    dossier.classList.add('dossier');

    // Arrière
    const arriere = document.createElement('div');
    arriere.classList.add('arriere');

    // Etiquette
    const etiquette = document.createElement('span');
    etiquette.classList.add('texte-etiquette');
    etiquette.textContent = etiquettes[i] || `Dossier ${i+1}`;
    arriere.appendChild(etiquette);

    if (i % 2 == 0) {
        // odd
        etiquette.style.left = '15px';
        etiquette.style.right = 'auto';
        etiquette.style.textAlign = 'left';
    } 
    else {
        // even
        etiquette.style.right = '15px';
        etiquette.style.left = 'auto';
        etiquette.style.textAlign = 'right';
    }

    // Papier
    const papier = document.createElement('div');
    papier.classList.add('papier');

    const texteTelecharger = document.createElement('h2');
    texteTelecharger.classList.add('telecharger-papier');
    texteTelecharger.textContent = 'Télécharger';
    papier.appendChild(texteTelecharger);

    // Avant
    const avant = document.createElement('div');
    avant.classList.add('avant');

    // Append
    dossier.appendChild(arriere);
    dossier.appendChild(papier);
    dossier.appendChild(avant);

    dossiers.appendChild(dossier);

    // Gestion clics et tapotements
    const fichierURL = fichiersLiens[i] || "#";

    const ouvrirFichier = () => {
    if (fichierURL == "#") {
        alert("Fichier non disponible pour ce dossier.");
        return;
    }
    window.open(fichierURL, "_blank");
    };

    // Détecte clic ou tapotements
    const addTapOuClickListener = (element, callback) => {
    let startX, startY, startTime;
    let tapDetecte = false;

    // Événements mobile
    element.addEventListener("touchstart", (e) => {
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        startTime = Date.now();
        tapDetecte = false;
    });

    element.addEventListener("touchend", (e) => {
        const touch = e.changedTouches[0];
        const dx = Math.abs(touch.clientX - startX);
        const dy = Math.abs(touch.clientY - startY);
        const dt = Date.now() - startTime;

        if (dx < 10 && dy < 10 && dt < 300) {
        tapDetecte = true;
        e.preventDefault();
        callback(e);
        }
    });

    // Événement desktop
    element.addEventListener("click", (e) => {
        if (!tapDetecte) callback(e);
    });
    };

    // Utilisation
    addTapOuClickListener(avant, ouvrirFichier);
    addTapOuClickListener(papier, ouvrirFichier);
}
