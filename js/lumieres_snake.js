document.addEventListener("DOMContentLoaded", function() {
    const canvasLum = document.getElementById("canvasLumieres");
    if (!canvasLum) return;
    const ctx = canvasLum.getContext("2d");
    
    // === Variables globales ==================================================
    let box = 40;
    let blocsLumineux = []; // Tableau commence vide
    let animationActive = false; // Pour contrôler la boucle requestAnimationFrame
    let hasEntered = false; // Pour garantir que l'animation d'entrée ne se joue qu'une seule fois

    // CONSTANTES
    const BLOCS_DENSITE = 0.3; 
    const INTENSITE_MAX = 0.40; 
    const INTENSITE_MIN = 0.10; 
    const VITESSE_ANIM = 0.0003; 
    const VITESSE_DERIVE_PIXELS = 0.15; 
    const VITESSE_ENTREE_SORTIE = 1.5; 
    const TAILLE_BLOC = 1.0; 
    const DISTANCE_DEPART = 4 * box; 

    // Utilisation de la fonction définie dans couleursUtils.js
    const couleurLumiere = getCssColor('--snake-couleur-lumiere');

    // === Fonctions ===========================================================
    function ajusterParametresJeu() {
        const largeur = window.innerWidth;
        if (largeur < 600) box = 34;
        else if (largeur < 1024) box = 40;
        else box = 50;
    }

    // --- Initialisation des blocs lumineux ---
    function genererBlocsLumineux() {
        blocsLumineux = [];
        const canvasJeu = document.getElementById("snakeJeu");
        if (!canvasJeu || canvasJeu.width === 0) return;

        // Synchroniser la taille avec le canvas du jeu
        canvasLum.width = canvasJeu.width;
        canvasLum.height = canvasJeu.height;
        
        const gridW = canvasLum.width / box;
        const gridH = canvasLum.height / box;
        
        for (let y = 0; y < gridH; y++) {
            for (let x = 0; x < gridW; x++) {
                if (Math.random() < BLOCS_DENSITE) { 
                    
                    const edge = Math.floor(Math.random() * 4); 
                    let initialX = x * box;
                    let initialY = y * box;
                    
                    // Vitesse de retour rapide
                    let initialSpeedX = (edge === 1) ? -VITESSE_ENTREE_SORTIE : (edge === 3 ? VITESSE_ENTREE_SORTIE : (Math.random() - 0.5) * VITESSE_DERIVE_PIXELS);
                    let initialSpeedY = (edge === 2) ? -VITESSE_ENTREE_SORTIE : (edge === 0 ? VITESSE_ENTREE_SORTIE : (Math.random() - 0.5) * VITESSE_DERIVE_PIXELS);

                    // Position de départ décalée
                    if (edge === 0) initialY -= DISTANCE_DEPART;
                    else if (edge === 1) initialX += DISTANCE_DEPART;
                    else if (edge === 2) initialY += DISTANCE_DEPART;
                    else initialX -= DISTANCE_DEPART;
                    
                    blocsLumineux.push({
                        x: initialX, 
                        y: initialY, 
                        
                        moveSpeedX: initialSpeedX, 
                        moveSpeedY: initialSpeedY, 
                        pixelAccumulatorX: 1 + Math.random(), 
                        pixelAccumulatorY: 1 + Math.random(),
                        
                        alpha: INTENSITE_MIN + Math.random() * (INTENSITE_MAX - INTENSITE_MIN), 
                        sens: Math.random() > 0.5 ? 1 : -1,
                        vitesse: VITESSE_ANIM + Math.random() * VITESSE_ANIM,
                        
                        isEntering: true, // Est en phase d'entrée au démarrage
                        isExiting: false, 
                        targetX: x * box, // Position finale
                        targetY: y * box  // Position finale
                    });
                }
            }
        }
    }

    function ajusterCanvas() {
        ajusterParametresJeu();
        const canvasJeu = document.getElementById("snakeJeu");
        
        if (!canvasJeu || canvasJeu.width === 0) return;
        
        canvasLum.width = canvasJeu.width;
        canvasLum.height = canvasJeu.height;
    }
    
    // --- Fonction exposée pour démarrer l'animation de fond (ENTRÉE) ---
    window.startBackgroundAnimation = function() {
        if (animationActive) return;
        
        ajusterCanvas(); 
        genererBlocsLumineux(); 
        
        animationActive = true;
    };
    
    // --- Fonction exposée pour démarrer l'animation de sortie ---
    window.startBackgroundExit = function() {
        if (!animationActive || blocsLumineux.length === 0) return;
        
        // Déclencheur de la phase de sortie
        blocsLumineux.forEach(bloc => {
            if (!bloc.isEntering && !bloc.isExiting) {
                bloc.isExiting = true;
                // Vitesse rapide et direction vers l'extérieur (opposée à la dérive actuelle)
                bloc.moveSpeedX = bloc.moveSpeedX > 0 ? VITESSE_ENTREE_SORTIE : -VITESSE_ENTREE_SORTIE;
                bloc.moveSpeedY = bloc.moveSpeedY > 0 ? VITESSE_ENTREE_SORTIE : -VITESSE_ENTREE_SORTIE;
            }
        });
    };

    // --- Boucle principale d'animation ---
    function animerBlocs() {
        ctx.clearRect(0, 0, canvasLum.width, canvasLum.height); 
        
        // Dessine uniquement si les blocs ont été générés
        if (animationActive && blocsLumineux.length > 0) {
            
            const blockSize = box * TAILLE_BLOC;
            const width = canvasLum.width;
            const height = canvasLum.height;
            
            // Vitesse de dérive normale
            const currentDriftSpeed = 0.05; 
            
            const nouveauxBlocs = [];

            for (let bloc of blocsLumineux) {
                
                // 1. Logique d'entrée/sortie
                if (bloc.isEntering) {
                    // Mouvement vers la cible
                    bloc.pixelAccumulatorX += bloc.moveSpeedX;
                    bloc.pixelAccumulatorY += bloc.moveSpeedY;

                    const dx = bloc.x - bloc.targetX;
                    const dy = bloc.y - bloc.targetY;
                    
                    // Si près de la cible, on passe en mode normal
                    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                        bloc.isEntering = false;
                        bloc.x = bloc.targetX; 
                        bloc.y = bloc.targetY;
                        // Réinitialiser la dérive à la vitesse lente normale
                        bloc.moveSpeedX = (Math.random() - 0.5) * currentDriftSpeed;
                        bloc.moveSpeedY = (Math.random() - 0.5) * currentDriftSpeed;
                        bloc.pixelAccumulatorX = 0;
                        bloc.pixelAccumulatorY = 0;
                    }
                } else if (bloc.isExiting) {
                    // Mouvement rapide vers l'extérieur
                    bloc.pixelAccumulatorX += bloc.moveSpeedX;
                    bloc.pixelAccumulatorY += bloc.moveSpeedY;
                    
                    // Estompage rapide du bloc qui sort
                    bloc.alpha *= 0.95; 
                    
                    // Si le bloc est hors écran ET alpha est faible, NE PAS le rajouter
                    const isOutside = bloc.x > width + blockSize || bloc.x < 0 - blockSize || bloc.y > height + blockSize || bloc.y < 0 - blockSize;
                    if (isOutside && bloc.alpha < 0.01) {
                         continue; // Ne pas ajouter ce bloc à la nouvelle liste (sera filtré)
                    }
                } else {
                    // 2. Logique de dérive lente et pulsation normale
                    bloc.pixelAccumulatorX += bloc.moveSpeedX;
                    // 💡 CORRECTION : Ajout de la vitesse, pas de l'accumulateur !
                    bloc.pixelAccumulatorY += bloc.moveSpeedY; 
                }
                
                // 3. Pulsation
                bloc.alpha += bloc.vitesse * bloc.sens;
                if (bloc.alpha > INTENSITE_MAX) {
                    bloc.sens = -1;
                } else if (bloc.alpha < INTENSITE_MIN) {
                    bloc.sens = 1;
                }

                // 4. Mouvement du pixel (Déplacement forcé si accumulateur >= 1)
                if (Math.abs(bloc.pixelAccumulatorX) >= 1) {
                    const shift = Math.floor(bloc.pixelAccumulatorX);
                    bloc.x += shift;
                    bloc.pixelAccumulatorX -= shift; 
                }
                if (Math.abs(bloc.pixelAccumulatorY) >= 1) {
                    const shift = Math.floor(bloc.pixelAccumulatorY);
                    bloc.y += shift;
                    bloc.pixelAccumulatorY -= shift;
                }
                
                // 5. Logique de "wrap" (réapparition à l'opposé)
                if (!bloc.isEntering && !bloc.isExiting) { // Wrap uniquement en mode normal
                    if (bloc.x > width) bloc.x = 0 - blockSize;
                    else if (bloc.x < 0 - blockSize) bloc.x = width;

                    if (bloc.y > height) bloc.y = 0 - blockSize;
                    else if (bloc.y < 0 - blockSize) bloc.y = height;
                }
                
                
                // 6. Dessin
                if (bloc.alpha > 0.01) { 
                    ctx.fillStyle = rgbToString(couleurLumiere, bloc.alpha);
                    
                    // Forcer l'alignement à la grille la plus proche AVANT le dessin
                    const drawX = Math.round(bloc.x / box) * box;
                    const drawY = Math.round(bloc.y / box) * box;
                    
                    ctx.fillRect(
                        drawX, 
                        drawY, 
                        blockSize, 
                        blockSize
                    );
                }
                
                nouveauxBlocs.push(bloc); // Ajouter le bloc pour la prochaine frame
            }
            
            blocsLumineux = nouveauxBlocs; // Remplacer par la nouvelle map de blocs actifs
            
            // CRITIQUE : Si la liste est vide après une sortie, désactiver l'animation
            if (blocsLumineux.length === 0 && animationActive) {
                 animationActive = false;
            }
        }
        requestAnimationFrame(animerBlocs);
    }

    window.addEventListener('resize', ajusterCanvas);
    
    // Le premier appel n'initialise pas les blocs.
    ajusterCanvas(); 
    animerBlocs();
});