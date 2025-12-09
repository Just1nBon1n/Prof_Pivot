document.addEventListener("DOMContentLoaded", function() {
    const canvasLum = document.getElementById("canvasLumieres");
    if (!canvasLum) return;
    const ctx = canvasLum.getContext("2d");
    
    // === Variables globales ==================================================
    let box = 40;
    let blocsLumineux = []; 

    // CONSTANTES
    const BLOCS_DENSITE = 0.3; // 30% des cases ont un bloc lumineux
    const VITESSE_ANIM = 0.0003; // Vitesse de pulsation
    const VITESSE_DERIVE_PIXELS = 0.4; // AUGMENTÉ pour garantir le mouvement immédiat
    const TAILLE_BLOC = 1.0; 
    const TAUX_TRANSITION = 0.15; // Taux de transition rapide (env. 0.5s)

    // CONSTANTES D'INTENSITÉ 
    const INTENSITE_MAX_BASE = 0.45; // Opacité maximale hors jeu
    const INTENSITE_MIN_BASE = 0.15; // Opacité minimale hors jeu
    const INTENSITE_MAX_JEU = 0.10; // Opacité maximale en jeu (subtile)
    const INTENSITE_MIN_JEU = 0.05; // Opacité minimale en jeu (subtile)


    // Utilisation de la fonction définie dans couleursUtils.js
    const couleurLumiere = getCssColor('--snake-couleur-lumiere');

    // Drapeau pour éviter de régénérer la grille si la taille de BOX n'a pas changé
    let lastBox = 0; 
    
    // === Fonctions ===========================================================
    function ajusterParametresJeu() {
        const largeur = window.innerWidth;
        if (largeur < 600) box = 34;
        else if (largeur < 1024) box = 38;
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
                    
                    // Utiliser Math.pow pour favoriser les valeurs élevées (proches de INTENSITE_MAX_BASE)
                    const initialRange = INTENSITE_MAX_BASE - INTENSITE_MIN_BASE;
                    const initialAlpha = INTENSITE_MIN_BASE + Math.pow(Math.random(), 0.5) * initialRange;

                    blocsLumineux.push({
                        x: x * box, 
                        y: y * box, 
                        
                        // Vitesse de dérive et accumulateur
                        moveSpeedX: (Math.random() - 0.5) * (VITESSE_DERIVE_PIXELS / box * 50),
                        moveSpeedY: (Math.random() - 0.5) * (VITESSE_DERIVE_PIXELS / box * 50),
                        // Force le mouvement immédiat
                        pixelAccumulatorX: 1 + Math.random(), 
                        pixelAccumulatorY: 1 + Math.random(),
                        
                        alpha: initialAlpha, // Utiliser la nouvelle alpha initialisée
                        sens: Math.random() > 0.5 ? 1 : -1,
                        vitesse: VITESSE_ANIM,
                        
                        // Stocke les cibles d'intensité
                        targetMax: INTENSITE_MAX_BASE,
                        targetMin: INTENSITE_MIN_BASE
                    });
                }
            }
        }
    }

    function ajusterCanvas() {
        ajusterParametresJeu();
        const canvasJeu = document.getElementById("snakeJeu");
        
        if (!canvasJeu || canvasJeu.width === 0) return;
        
        const currentWidth = canvasJeu.width;
        const currentHeight = canvasJeu.height; 
        const oldBox = lastBox;
        lastBox = box; 

        // Régénérer les blocs seulement si la taille de BOX change
        if (box !== oldBox && oldBox !== 0) {
            genererBlocsLumineux(); 
            return;
        }

        // Si la taille du Canvas change, nous régénérons tout.
        if (currentWidth !== canvasLum.width || currentHeight !== canvasLum.height) {
             genererBlocsLumineux();
             return;
        }
        
        // Si les blocs n'ont pas encore été générés (première exécution)
        if (blocsLumineux.length === 0) {
            genererBlocsLumineux();
        }
    }
    
    // --- Boucle principale d'animation ---
    function animerBlocs() {
        const phase = window.getCurrentPhase ? window.getCurrentPhase() : 'initial';
        // Le jeu est considéré actif s'il est en cours OU en attente de démarrage (playing-pending)
        const isGamePlaying = (phase === 'playing'); 

        ctx.clearRect(0, 0, canvasLum.width, canvasLum.height); 
        
        if (blocsLumineux.length > 0) {
            
            const blockSize = box * TAILLE_BLOC;
            const width = canvasLum.width;
            const height = canvasLum.height;
            
            for (let bloc of blocsLumineux) {
                
                // 1. GESTION DE LA TRANSITION DE LA CIBLE D'INTENSITÉ
                // Définir les cibles actuelles pour la transition
                const targetMax = isGamePlaying ? INTENSITE_MAX_JEU : INTENSITE_MAX_BASE;
                const targetMin = isGamePlaying ? INTENSITE_MIN_JEU : INTENSITE_MIN_BASE;
                
                // Mélanger les cibles pour la transition douce
                bloc.targetMax += (targetMax - bloc.targetMax) * TAUX_TRANSITION;
                bloc.targetMin += (targetMin - bloc.targetMin) * TAUX_TRANSITION;

                // 2. Logique de dérive lente et pulsation
                bloc.pixelAccumulatorX += bloc.moveSpeedX;
                bloc.pixelAccumulatorY += bloc.moveSpeedY;
                
                // 3. Pulsation
                bloc.alpha += bloc.vitesse * bloc.sens;
                
                // Vérifier la pulsation par rapport aux cibles mélangées (bloc.targetMax/Min)
                if (bloc.alpha > bloc.targetMax) {
                    bloc.sens = -1;
                } else if (bloc.alpha < bloc.targetMin) {
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
                if (bloc.x > width) bloc.x = 0 - blockSize;
                else if (bloc.x < 0 - blockSize) bloc.x = width;

                if (bloc.y > height) bloc.y = 0 - blockSize;
                else if (bloc.y < 0 - blockSize) bloc.y = height;
                
                
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
            }
        }
        requestAnimationFrame(animerBlocs);
    }

    window.addEventListener('resize', ajusterCanvas);
    
    // Déclenchement synchrone
    ajusterCanvas(); 
    animerBlocs(); 
});