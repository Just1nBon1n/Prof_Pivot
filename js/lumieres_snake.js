document.addEventListener("DOMContentLoaded", function() {
    const canvasLum = document.getElementById("canvasLumieres");
    if (!canvasLum) return;
    const ctx = canvasLum.getContext("2d");
    
    // === Variables globales ==================================================
    let box = 40;
    let blocsLumineux = []; // Tableau pour suivre chaque point lumineux

    // CONSTANTES
    const BLOCS_DENSITE = 0.3; 
    const INTENSITE_MAX = 0.15; // Intensité maximale 
    const INTENSITE_MIN = 0.05; // Opacité minimale 
    const VITESSE_ANIM = 0.0003; // Vitesse 
    const TAILLE_BLOC = 1.0; // la taille de la case

    // Utilisation de la fonction définie dans couleursUtils.js
    const couleurLumiere = getCssColor('--snake-couleur-lumiere');

    // === Fonctions ===========================================================
    function ajusterParametresJeu() {
        const largeur = window.innerWidth;
        if (largeur < 600) box = 34;
        else if (largeur < 1024) box = 40;
        else box = 50;
    }

    function ajusterCanvas() {
        ajusterParametresJeu();
        const canvasJeu = document.getElementById("snakeJeu");
        if (!canvasJeu) return;
        
        canvasLum.width = canvasJeu.width;
        canvasLum.height = canvasJeu.height;
        
        genererBlocsLumineux();
    }
    
    // --- Initialisation des blocs lumineux ---
    function genererBlocsLumineux() {
        blocsLumineux = [];
        const gridW = canvasLum.width / box;
        const gridH = canvasLum.height / box;
        
        for (let y = 0; y < gridH; y++) {
            for (let x = 0; x < gridW; x++) {
                if (Math.random() < BLOCS_DENSITE) { 
                    blocsLumineux.push({
                        x: x * box,
                        y: y * box,
                        // Démarrer à une opacité aléatoire pour que tout ne pulse pas en même temps
                        alpha: INTENSITE_MIN + Math.random() * (INTENSITE_MAX - INTENSITE_MIN), 
                        sens: Math.random() > 0.5 ? 1 : -1,
                        vitesse: VITESSE_ANIM + Math.random() * VITESSE_ANIM
                    });
                }
            }
        }
    }


    // --- Boucle principale d'animation ---
    function animerBlocs() {
        // Effacement complet pour la transparence
        ctx.clearRect(0, 0, canvasLum.width, canvasLum.height); 
        
        const blockSize = box * TAILLE_BLOC;
        
        for (let bloc of blocsLumineux) {
            
            // Logique de pulsation normale (simplifiée)
            bloc.alpha += bloc.vitesse * bloc.sens;
            
            if (bloc.alpha > INTENSITE_MAX) {
                bloc.sens = -1; // Commence à s'estomper
            }
            
            if (bloc.alpha < INTENSITE_MIN) {
                bloc.sens = 1; // Commence à s'éclaircir
            }
            
            // Dessin
            if (bloc.alpha > 0.01) { 
                ctx.fillStyle = rgbToString(couleurLumiere, bloc.alpha);
                
                ctx.fillRect(
                    bloc.x, 
                    bloc.y, 
                    blockSize, 
                    blockSize
                );
            }
        }

        requestAnimationFrame(animerBlocs);
    }

    window.addEventListener('resize', ajusterCanvas);
    ajusterCanvas();
    animerBlocs();
});