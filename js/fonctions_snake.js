document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("snakeJeu");
    const stopButton = document.getElementById("stopButton");
    
    // Vérification que les fonctions utilitaires sont chargées
    if (typeof rgbToString === 'undefined' || typeof window.setGameActive === 'undefined' || typeof window.getCurrentPhase === 'undefined') {
        console.error("Erreur: Le gestionnaire UI (UImanager_snake.js) n'est pas chargé ou est incomplet. Veuillez vérifier l'ordre des balises <script>.");
        return;
    }

    const ctx = canvas.getContext("2d");
    
    // === Variables globales du jeu ===========================================
    let box = 40; 
    let game = null; 
    let snake = [];
    let direction = "RIGHT";
    let growing = 3; 
    let gameStarted = false; // CRITIQUE : Démarrage différé
    let patternTIM = []; 
    let foodListe = []; 
    const foodNb = 3; 
    const TIMTaille = 0.5;

    // Constantes de dessin
    const COUPE_TETE = 0.9; // Tête
    const COUPE_CORPS = 0.8; // Corps
    const COUPE_NOURRITURE = 0.7; // Nourriture

    // Récupération des couleurs CSS (effectuée une seule fois au chargement)
    const couleurLogoTIMContour = getCssColor('--snake-couleur-Logo-TIM-Contour');
    const couleurLogoTIMInterieur = getCssColor('--snake-couleur-Logo-TIM-Interieur');
    const couleurGrille = getCssColor('--snake-couleur-grille');
    const couleurNourriture = getCssColor('--snake-couleur-nourriture');
    const couleurSerpentTete = getCssColor('--snake-couleur-tete');
    const couleurSerpentCorps = getCssColor('--snake-couleur-corps');

    // COULEURS DE NAVIGATION ET CROISSANCE
    const couleursNavigation = {
        'liens': getCssColor('--liens-couleur-section'),       // Bleu
        'ressources': getCssColor('--personnes-couleur-section'), // Orange
        'documents': getCssColor('--docs-couleur-section')     // Vert
    };


    // --- Fonction utilitaire pour démarrer la boucle de jeu ---
    function startLoop() {
        if (game) clearInterval(game);
        game = setInterval(dessiner, 125); // Vitesse constante de 125ms
        gameStarted = true;
        window.setGameActive(); // Informe l'UI Manager que le jeu est actif (masque l'UI)
    }


    function stopGame() {
        if (game) clearInterval(game);
        gameStarted = false;
        
        // Forcer la transition vers l'écran Game Over
        window.toggleInstructions("Partie Terminée", true); 
        
        // Nettoyer les éléments du jeu (déclenche dessiner() une fois)
        // La visibilité du stopButton est gérée dans l'UI Manager.
        dessiner(); 
    }
    window.stopGame = stopGame; // Rendre la fonction accessible au gestionnaire UI
    

    // --- Déclencheur de navigation au contact de la nourriture ---
    function triggerNavigation(type) {
        let sectionId = '';
        
        // MAPPAGE DES TYPES DE NOURRITURE VERS LES ID DE SECTION
        if (type === 'liens') {
            sectionId = 'separateur-1'; // Bleu -> Liens Utiles
        } else if (type === 'ressources') {
            sectionId = 'separateur-2'; // Orange -> Personnes Ressources
        } else if (type === 'documents') {
            sectionId = 'separateur-3';  // Vert -> Documents Téléchargeables
        }
        
        if (sectionId) {
            console.log(`Navigation vers la section: ${type} (#${sectionId})`);
            const targetElement = document.getElementById(sectionId);
            
            if (targetElement) {
                 // Lancer le défilement
                 targetElement.scrollIntoView({ behavior: 'smooth' });
                 
                 // Arrêter le jeu après le délai de défilement (800ms)
                 setTimeout(() => {
                      stopGame(); 
                 }, 800); 
            } else {
                 // Si la section n'est pas trouvée (bug), arrêter le jeu immédiatement
                 stopGame(); 
                 console.error(`Erreur: Élément cible #${sectionId} non trouvé.`);
            }
        }
    }


    /**
     * Initialise le serpent et la nourriture, mais NE démarre PAS la boucle de jeu.
     */
    function commencerPartie() {
        ajusterParametresJeu();
        ajusterCanvas(); 
        
        gameStarted = false; // Le jeu est PRÊT, mais non DÉMARRÉ
        direction = "RIGHT"; // Direction par défaut pour le premier mouvement
        growing = 3;

        // NETTOYAGE CRITIQUE : Vider les tableaux avant la réinitialisation
        snake = [];
        foodListe = [];

        // Réinitialiser serpent et nourriture
        snake.push({x: Math.floor(canvas.width/2/box)*box, y: Math.floor(canvas.height/2/box)*box});
        
        // CRÉATION DES 3 NOURRITURES DE NAVIGATION (Couleurs)
        const navigationTypes = ['liens', 'ressources', 'documents']; 
        navigationTypes.forEach(type => foodListe.push(genererNourriture('navigation', type)));

        // CRÉATION DES 3 NOURRITURES DE CROISSANCE (Blanches)
        for(let i = 0; i < 3; i++) {
            foodListe.push(genererNourriture('croissance'));
        }


        // Dessiner le serpent et la nourriture en place
        dessiner(); 
    }
    // Rendre la fonction accessible globalement pour le ui_manager.js
    window.commencerPartie = commencerPartie; 


    // --- Ajuster les paramètres du jeu selon l’écran ---
    function ajusterParametresJeu() {
        const largeur = window.innerWidth;
        // Taille mobile
         if (largeur < 600) {
            box = 34;
            patternTIM = [
                "XXXXXXXXXXX ",
                "XOOOOOOOOOXX",
                "XOOOOOOOOOXX",
                "XXXXOOOXXXXX",
                "   XOOOXXXXX",
                "   XOOOXX   ",
                "   XOOOXX   ",
                "   XOOOXX   ",
                "   XOOOXX   ",
                "   XOOOXX   ",
                "   XXXXXX   ",
                "    XXXXX   ",
                "            ",
                "   XXXXX    ",
                "   XOOOXX   ",
                "   XOOOXX   ",
                "   XOOOXX   ",
                "   XOOOXX   ",
                "   XOOOXX   ",
                "   XOOOXX   ",
                "   XOOOXX   ",
                "   XOOOXX   ",
                "   XOOOXX   ",
                "   XXXXXX   ",
                "    XXXXX   ",
                "            ",
                " XXXX  XXXX ",
                " XOOXXXXOOXX",
                " XOOOOXOOOXX",
                " XOOOOOOOOXX",
                " XOOOOOOOOXX",
                " XOOXOOXOOXX",
                " XOOXXXXOOXX",
                " XOOXX XOOXX",
                " XOOXX XOOXX",
                " XOOXX XOOXX",
                " XXXXX XXXXX",
                "  XXXX  XXXX",
            ];
        // Taille tablette
        } else if (largeur < 1024) {
            box = 38;
            patternTIM = [
                " XXXXXXXXXXX XXXXX XXXX  XXXX ",
                " XOOOOOOOOOXXXOOOXXXOOXXXXOOXX",
                " XOOOOOOOOOXXXOOOXXXOOOXXOOOXX",
                " XXXXOOOXXXXXXOOOXXXOOOOOOOOXX",
                "    XOOOXXXXXXOOOXXXOOOOOOOOXX",
                "    XOOOXX   XOOOXXXOOXOOXOOXX",
                "    XOOOXX   XOOOXXXOOXXXXOOXX",
                "    XOOOXX   XOOOXXXOOXX XOOXX",
                "    XOOOXX   XOOOXXXOOXX XOOXX",
                "    XOOOXX   XOOOXXXOOXX XOOXX",
                "    XXXXXX   XXXXXXXXXXX XXXXX",
                "     XXXXX    XXXXX XXXX  XXXX",
            ];
        // Taille desktop
        } else {
            box = 50;
            patternTIM = [
                " XXXXXXXXXXX XXXXX XXXX  XXXX ",
                " XOOOOOOOOOXXXOOOXXXOOXXXXOOXX",
                " XOOOOOOOOOXXXOOOXXXOOOXXOOOXX",
                " XXXXOOOXXXXXXOOOXXXOOOOOOOOXX",
                "    XOOOXXXXXXOOOXXXOOOOOOOOXX",
                "    XOOOXX   XOOOXXXOOXOOXOOXX",
                "    XOOOXX   XOOOXXXOOXXXXOOXX",
                "    XOOOXX   XOOOXXXOOXX XOOXX",
                "    XOOOXX   XOOOXXXOOXX XOOXX",
                "    XOOOXX   XOOOXXXOOXX XOOXX",
                "    XXXXXX   XXXXXXXXXXX XXXXX",
                "     XXXXX    XXXXX XXXX  XXXX",

            ];

        }
    }


    // --- Ajuster la taille du canvas ---
    function ajusterCanvas() {
        ajusterParametresJeu();
        canvas.width = Math.floor(window.innerWidth / box) * box;
        canvas.height = Math.floor(window.innerHeight / box) * box;

        dessinerGrille();
        dessinerTIM();
    }
    window.addEventListener('resize', ajusterCanvas);
    ajusterCanvas(); 

    // --- Dessiner le motif "TIM" (Double Couleur) ---
    function dessinerTIM() {
        if (!patternTIM || patternTIM.length === 0) return;
        
        // Ne pas dessiner le logo si le jeu est en phase active.
        if (window.getCurrentPhase() === 'playing-pending' || window.getCurrentPhase() === 'playing') {
            return;
        }

        const patternWidth = patternTIM[0].length;
        const patternHeight = patternTIM.length;
        const gridW = canvas.width / box;
        const gridH = canvas.height / box;
        
        const boxTIM = box * TIMTaille; // Taille du bloc de dessin (0.5x)
        
        const patternDisplayWidth = patternWidth * TIMTaille;
        const patternDisplayHeight = patternHeight * TIMTaille;

        const offsetX = Math.floor((gridW - patternDisplayWidth) / 2) * box;
        const offsetY = Math.floor((gridH - patternDisplayHeight) / 2) * box;

        
        for (let y = 0; y < patternTIM.length; y++) {
            for (let x = 0; x < patternTIM[y].length; x++) {
                const char = patternTIM[y][x];

                if (char === " ") continue; 

                // MAPPING DE COULEUR : X pour Contour, O pour Intérieur
                let couleurAUtiliser;
                
                if (char === 'X') {
                    couleurAUtiliser = couleurLogoTIMContour;
                } else {
                    couleurAUtiliser = couleurLogoTIMInterieur;
                }

                ctx.fillStyle = rgbToString(couleurAUtiliser);

                // Dessin en micro-blocs
                ctx.fillRect(
                    offsetX + x * boxTIM, 
                    offsetY + y * boxTIM, 
                    boxTIM, 
                    boxTIM
                );
            }
        }
    }


    // --- Dessiner la grille ---
    function dessinerGrille() {
        ctx.strokeStyle = rgbToString(couleurGrille);
        ctx.lineWidth = 1;
        
        for (let x = 0; x < canvas.width; x += box) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += box) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }


    // --- Générer la nourriture à une position libre ---
    function genererNourriture(type, destinationType = null) {
        let positionValide = false;
        let newFood;
        const gridWidth = canvas.width / box;
        const gridHeight = canvas.height / box;

        const actualType = destinationType || type; // Utilise destinationType pour les couleurs si fourni
        
        while (!positionValide) {
            newFood = {
                x: Math.floor(Math.random() * gridWidth) * box,
                y: Math.floor(Math.random() * gridHeight) * box,
                type: type, // 'navigation' ou 'croissance'
                destination: actualType, // Liens, ressources, ou croissance
                couleur: type === 'croissance' ? couleurNourriture : couleursNavigation[actualType]
            };
            // Vérifie que la nourriture n'est pas sur le serpent ou une autre nourriture
            positionValide = !snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)
                             && !foodListe.some(food => food.x === newFood.x && food.y === newFood.y);
        }
        return newFood;
    }


    // --- Boucle principale du jeu --------------------------------------------
    function dessiner() {
        // 1. Vider le canvas 
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 2. Redessiner la grille et le logo TIM
        dessinerGrille(); 
        dessinerTIM();

        // 💡 Logique de nettoyage : Fait dans commencerPartie pour les phases statiques.
        // Si la phase est gameover ou initial, nous sortons sans dessiner le serpent/nourriture.
        if (window.getCurrentPhase() === 'gameover' || window.getCurrentPhase() === 'initial') {
            return;
        }

        // 💡 Le dessin du jeu ne se produit que si snake.length > 0
        if (snake.length > 0) {
            
            // --- Bouger le serpent ---
            let headX = snake[0].x;
            let headY = snake[0].y;
            const headBeforeMove = { x: headX, y: headY }; // Sauvegarder la position avant le mouvement

            if (gameStarted) { // Le mouvement n'est effectué qu'en mode "gameStarted"
                if (direction === "LEFT") headX -= box;
                if (direction === "RIGHT") headX += box;
                if (direction === "UP") headY -= box;
                if (direction === "DOWN") headY += box;
            }

            // --- Wrap autour du bord ---
            const width = canvas.width;
            const height = canvas.height;
            if (headX < 0) headX = width - box;
            if (headX >= width) headX = 0;
            if (headY < 0) headY = height - box;
            if (headY >= height) headY = 0;

            // --- Collision avec soi-même ---
            if (gameStarted) { // Vérifier la collision seulement si le jeu est en cours
                 for (let i = 1; i < snake.length; i++) { 
                    if (snake[i].x === headX && snake[i].y === headY) {
                        clearInterval(game);
                        window.toggleInstructions("GAME OVER !", true); 
                        gameStarted = false;
                        dessiner(); 
                        return;
                    }
                }
            }

            // --- Gérer les nourritures (Collision et Dessin) ---
            const foodSize = box * COUPE_NOURRITURE;
            const foodOffset = (box - foodSize) / 2;
            let ateFood = false;

            for (let i = 0; i < foodListe.length; i++) {
                const food = foodListe[i];
                
                if (headX === food.x && headY === food.y) {
                    
                    if (food.type === 'navigation') {
                        triggerNavigation(food.destination);
                        return; // Arrêter le jeu après la navigation
                    } else {
                        growing++;
                        foodListe[i] = genererNourriture('croissance');
                    }
                }
                
                // Dessiner la nourriture (utiliser la couleur spécifique)
                ctx.fillStyle = rgbToString(food.couleur); 
                ctx.fillRect(
                    food.x + foodOffset, 
                    food.y + foodOffset, 
                    foodSize, 
                    foodSize
                );
            }

            // --- Nouvelle tête ---
            const newHead = { x: headX, y: headY };
            snake.unshift(newHead);

            // --- Réduire le serpent (ou non) ---
            if (growing > 0) {
                growing--;
            } else {
                snake.pop();
            }
            
            // --- Dessiner serpent (Carré Harmonisé) ---
            const segmentSizeCorps = box * COUPE_CORPS;
            const offsetCorps = (box - segmentSizeCorps) / 2;
            const segmentSizeTete = box * COUPE_TETE;
            const offsetTete = (box - segmentSizeTete) / 2;

            for (let i = 0; i < snake.length; i++) {
                const couleurDessinSnake = (i === 0) ? couleurSerpentTete : couleurSerpentCorps;
                
                if (i === 0) {
                    // Tête (Carré légèrement plus petit)
                    ctx.fillStyle = rgbToString(couleurSerpentTete); 
                    ctx.fillRect(snake[i].x + offsetTete, snake[i].y + offsetTete, segmentSizeTete, segmentSizeTete);
                } else {
                    // Corps (Carré plus petit)
                    ctx.fillStyle = rgbToString(couleurSerpentCorps); 
                    ctx.fillRect(snake[i].x + offsetCorps, snake[i].y + offsetCorps, segmentSizeCorps, segmentSizeCorps);
                }
            }
        } // Fin de la condition if (snake.length > 0)
    }


    // === Contrôles du serpent ================================================
    // --- Contrôles au clavier ------------------------------------------------
    document.addEventListener("keydown", function(e) {
        const key = e.key.toLowerCase();
        
        // 💡 CRITIQUE : DÉTERMINER SI NOUS DEVONS BLOQUER L'ACTION PAR DÉFAUT
        const isGameControl = (key === "w" || key === "s" || key === "a" || key === "d" || 
                               key === "arrowup" || key === "arrowdown" || key === "arrowleft" || key === "arrowright");

        const isGameActive = window.getCurrentPhase() === 'playing' || window.getCurrentPhase() === 'playing-pending';
        
        if (isGameControl && isGameActive) {
             e.preventDefault(); // Bloque le défilement
        }


        // Fonction utilitaire pour gérer les changements de direction
        const setDirection = (newDir) => {
             if (gameStarted) {
                 direction = newDir;
             } else if (window.getCurrentPhase() === 'playing-pending') {
                 // Démarrer le jeu au premier mouvement valide
                 startLoop();
                 direction = newDir;
             }
        };

        // Mappage WASD
        if (key === "w" && direction !== "DOWN") setDirection("UP");
        if (key === "s" && direction !== "UP") setDirection("DOWN");
        if (key === "a" && direction !== "RIGHT") setDirection("LEFT");
        if (key === "d" && direction !== "LEFT") setDirection("RIGHT");

        // Mappage Flèches
        if (key === "arrowup" && direction !== "DOWN") setDirection("UP");
        if (key === "arrowdown" && direction !== "UP") setDirection("DOWN");
        if (key === "arrowleft" && direction !== "RIGHT") setDirection("LEFT");
        if (key === "arrowright" && direction !== "LEFT") setDirection("RIGHT");
    });


    // --- Contrôles tactiles (swipes) pour mobiles et tablettes ---------------
    let touchStartX = 0;
    let touchStartY = 0;

    canvas.addEventListener("touchstart", function(e) {
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        
        // Bloquer l'action par défaut du tactile (pinch zoom, défilement)
        if (window.getCurrentPhase() === 'playing' || window.getCurrentPhase() === 'playing-pending') {
             e.preventDefault();
        }
    }, { passive: false }); // Utiliser { passive: false } pour permettre le preventDefault

    canvas.addEventListener("touchend", function(e) {
        const touch = e.changedTouches[0];
        const dx = touch.clientX - touchStartX;
        const dy = touch.clientY - touchStartY;

        if (Math.abs(dx) < 30 && Math.abs(dy) < 30) return; // Ignorer les tapotements
        
        const isPending = window.getCurrentPhase() === 'playing-pending';
        
        // Déterminer la direction du swipe
        let newDir = direction;
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 30 && direction !== "LEFT") newDir = "RIGHT";
            else if (dx < -30 && direction !== "RIGHT") newDir = "LEFT";
        } else {
            if (dy > 30 && direction !== "UP") newDir = "DOWN";
            else if (dy < -30 && direction !== "DOWN") newDir = "UP";
        }
        
        // Appliquer la direction et démarrer le jeu si nécessaire
        if (newDir !== direction) {
            if (isPending) {
                startLoop();
            }
            direction = newDir;
        }
    });
});