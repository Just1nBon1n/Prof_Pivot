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
    

    /**
     * Initialise le serpent et la nourriture, mais NE démarre PAS la boucle de jeu.
     */
    function commencerPartie() {
        ajusterParametresJeu();
        ajusterCanvas(); 
        
        gameStarted = false; // Le jeu est PRÊT, mais non DÉMARRÉ
        direction = "RIGHT"; // Direction par défaut pour le premier mouvement
        growing = 3;

        // Réinitialiser serpent et nourriture
        snake = [{x: Math.floor(canvas.width/2/box)*box, y: Math.floor(canvas.height/2/box)*box}];
        
        foodListe = [];
        for (let i = 0; i < foodNb; i++) {
            foodListe.push(genererNourriture());
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
            box = 40;
            patternTIM = [
                "XXXXXXXXXXX XXXXX XXXX  XXXX ",
                "XOOOOOOOOOXXXOOOXXXOOXXXXOOXX",
                "XOOOOOOOOOXXXOOOXXXOOOXXOOOXX",
                "XXXXOOOXXXXXXOOOXXXOOOOOOOOXX",
                "   XOOOXXXXXXOOOXXXOOOOOOOOXX",
                "   XOOOXX   XOOOXXXOOXOOXOOXX",
                "   XOOOXX   XOOOXXXOOXXXXOOXX",
                "   XOOOXX   XOOOXXXOOXX XOOXX",
                "   XOOOXX   XOOOXXXOOXX XOOXX",
                "   XOOOXX   XOOOXXXOOXX XOOXX",
                "   XXXXXX   XXXXXXXXXXX XXXXX",
                "    XXXXX    XXXXX XXXX  XXXX",
            ];
        // Taille desktop
        } else {
            box = 50;
            patternTIM = [
                "XXXXXXXXXXX XXXXX XXXX  XXXX ",
                "XOOOOOOOOOXXXOOOXXXOOXXXXOOXX",
                "XOOOOOOOOOXXXOOOXXXOOOXXOOOXX",
                "XXXXOOOXXXXXXOOOXXXOOOOOOOOXX",
                "   XOOOXXXXXXOOOXXXOOOOOOOOXX",
                "   XOOOXX   XOOOXXXOOXOOXOOXX",
                "   XOOOXX   XOOOXXXOOXXXXOOXX",
                "   XOOOXX   XOOOXXXOOXX XOOXX",
                "   XOOOXX   XOOOXXXOOXX XOOXX",
                "   XOOOXX   XOOOXXXOOXX XOOXX",
                "   XXXXXX   XXXXXXXXXXX XXXXX",
                "    XXXXX    XXXXX XXXX  XXXX",

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
    function genererNourriture() {
        let positionValide = false;
        let newFood;
        const gridWidth = canvas.width / box;
        const gridHeight = canvas.height / box;

        while (!positionValide) {
            newFood = {
                x: Math.floor(Math.random() * gridWidth) * box,
                y: Math.floor(Math.random() * gridHeight) * box
            };
            positionValide = !snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
        }
        return newFood;
    }


    // --- Boucle principale du jeu --------------------------------------------
    function dessiner() {
        // 1. Vider le canvas 
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 2. Redessiner la grille
        dessinerGrille(); 

        // 3. Redessiner le logo TIM au centre
        dessinerTIM();

        // 💡 CONDIȚION PRINCIPALE DE DESSIN : Dessiner le serpent/nourriture uniquement en mode ACTIF
        if (window.getCurrentPhase() === 'playing' || window.getCurrentPhase() === 'playing-pending') {
            
            // --- Bouger le serpent ---
            let headX = snake[0].x;
            let headY = snake[0].y;

            if (gameStarted) { // Bouger seulement si le jeu a commencé
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
                        // GAME OVER
                        clearInterval(game);
                        window.toggleInstructions("GAME OVER !", true); 
                        gameStarted = false;
                        
                        // Forcer un redraw immédiat (nécessaire pour masquer le serpent)
                        dessiner(); 
                        return;
                    }
                }
            }

            // --- Nouvelle tête ---
            const newHead = { x: headX, y: headY };
            snake.unshift(newHead);

            // --- Gérer les nourritures (Carré) ---
            const foodSize = box * COUPE_NOURRITURE;
            const foodOffset = (box - foodSize) / 2;

            for (let i = 0; i < foodListe.length; i++) {
                const food = foodListe[i];
                
                // Collision avec la nourriture
                if (headX === food.x && headY === food.y) {
                    growing++;
                    foodListe[i] = genererNourriture(); 
                }
                
                // Dessiner la nourriture (Carré centré)
                ctx.fillStyle = rgbToString(couleurNourriture); 
                ctx.fillRect(
                    food.x + foodOffset, 
                    food.y + foodOffset, 
                    foodSize, 
                    foodSize
                );
            }

            // --- Réduire le serpent si pas de croissance ---
            if (gameStarted) {
                if (growing > 0) {
                    growing--;
                } else {
                    snake.pop();
                }
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
                    ctx.fillStyle = rgbToString(couleurDessinSnake); 
                    ctx.fillRect(snake[i].x + offsetTete, snake[i].y + offsetTete, segmentSizeTete, segmentSizeTete);
                } else {
                    // Corps (Carré plus petit)
                    ctx.fillStyle = rgbToString(couleurDessinSnake); 
                    ctx.fillRect(snake[i].x + offsetCorps, snake[i].y + offsetCorps, segmentSizeCorps, segmentSizeCorps);
                }
            }
        } else {
            // 💡 CORRECTION : Nettoyer le tableau du serpent et de la nourriture lorsque le jeu est terminé.
            if (snake.length > 0) {
                 snake = [];
                 foodListe = [];
            }
        } // Fin de la condition de dessin du jeu (playing / playing-pending)
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