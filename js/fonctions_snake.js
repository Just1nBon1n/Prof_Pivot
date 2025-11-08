document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("snakeJeu");
    
    // Vérification que les fonctions utilitaires sont chargées
    if (typeof rgbToString === 'undefined' || typeof window.toggleInstructions === 'undefined') {
        console.error("Erreur: Les fonctions utilitaires (couleursUtils.js ou ui_manager.js) ne sont pas chargées.");
        return;
    }

    const ctx = canvas.getContext("2d");
    
    // === Variables globales du jeu ===========================================
    let box = 40; 
    let game = null; 
    let snake = [];
    let direction = "RIGHT";
    let growing = 3; 
    let gameStarted = false;
    let patternTIM = []; 
    let foodListe = []; 
    const foodNb = 3; 
    // Taille du logo TIM en proportion de la taille d'une case (ici 0.5)
    const TIMTaille = 0.5;

    // Récupération des couleurs CSS (effectuée une seule fois au chargement)
    const couleurLogoTIMContour = getCssColor('--snake-couleur-Logo-TIM-Contour');
    const couleurLogoTIMInterieur = getCssColor('--snake-couleur-Logo-TIM-Interieur');
    const couleurGrille = getCssColor('--snake-couleur-grille');
    const couleurNourriture = getCssColor('--snake-couleur-nourriture');
    const couleurSerpentTete = getCssColor('--snake-couleur-tete');
    const couleurSerpentCorps = getCssColor('--snake-couleur-corps');

    // === Fonctions de jeu =====================================================
    // --- Ajuster les paramètres du jeu selon l’écran ---
    function ajusterParametresJeu() {
        const largeur = window.innerWidth;
        // Taille mobile
        if (largeur < 600) { 
            box = 42;
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
    ajusterCanvas(); // Premier appel pour définir la taille du canvas au chargement


    // --- Initialise et démarre la boucle de jeu. Appelée par ui_manager.js. ---
    function commencerPartie() {
        ajusterParametresJeu();
        ajusterCanvas(); 
        
        gameStarted = true;
        direction = "RIGHT";
        growing = 3;

        // Réinitialiser serpent et nourriture
        snake = [{x: Math.floor(canvas.width/2/box)*box, y: Math.floor(canvas.height/2/box)*box}];
        
        foodListe = [];
        for (let i = 0; i < foodNb; i++) {
            foodListe.push(genererNourriture());
        }

        // Lancer la boucle du jeu (100ms interval)
        if (game) clearInterval(game);
        game = setInterval(dessiner, 100);
    }
    // Rendre la fonction accessible globalement pour le ui_manager.js
    window.commencerPartie = commencerPartie; 


    // --- Dessiner le motif "TIM" (Double Couleur) ---
    function dessinerTIM() {
        if (!patternTIM || patternTIM.length === 0) return;

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

        // Note: L'appel clearRect dans dessiner() s'occupe de vider, mais c'est bien de le garder ici 
        // pour l'appel initial dans ajusterCanvas().
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        
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

        // 3. Redessiner le logo TIM
        dessinerTIM();

        // --- Bouger le serpent ---
        let headX = snake[0].x;
        let headY = snake[0].y;

        if (direction === "LEFT") headX -= box;
        if (direction === "RIGHT") headX += box;
        if (direction === "UP") headY -= box;
        if (direction === "DOWN") headY += box;

        // --- Wrap autour du bord ---
        const width = canvas.width;
        const height = canvas.height;
        if (headX < 0) headX = width - box;
        if (headX >= width) headX = 0;
        if (headY < 0) headY = height - box;
        if (headY >= height) headY = 0;

        // --- Collision avec soi-même ---
        for (let i = 1; i < snake.length; i++) { 
            if (snake[i].x === headX && snake[i].y === headY) {
                // GAME OVER : Utilisation de la fonction globale toggleInstructions()
                clearInterval(game);
                window.toggleInstructions("Game Over !", true); 
                gameStarted = false;
                return;
            }
        }

        // --- Nouvelle tête ---
        const newHead = { x: headX, y: headY };
        snake.unshift(newHead);

        // --- Gérer les nourritures ---
        for (let i = 0; i < foodListe.length; i++) {
            const food = foodListe[i];
            
            // Collision avec la nourriture
            if (headX === food.x && headY === food.y) {
                growing++;
                foodListe[i] = genererNourriture(); 
            }
            
            // Dessiner la nourriture
            ctx.fillStyle = rgbToString(couleurNourriture); 
            ctx.fillRect(food.x, food.y, box, box);
        }

        // --- Réduire le serpent si pas de croissance ---
        if (growing > 0) {
            growing--;
        } else {
            snake.pop();
        }

        // --- Dessiner serpent (Utilisation de l'alpha CSS) ---
        for (let i = 0; i < snake.length; i++) {
            const couleurDessinSnake = (i === 0) ? couleurSerpentTete : couleurSerpentCorps;
            
            ctx.fillStyle = rgbToString(couleurDessinSnake); 
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }
    }


    // === Contrôles du serpent ================================================
    // --- Contrôles au clavier ------------------------------------------------
    document.addEventListener("keydown", function(e) {
        if (!gameStarted) return;
        const key = e.key.toLowerCase();
        if (key === "w" && direction !== "DOWN") direction = "UP";
        if (key === "s" && direction !== "UP") direction = "DOWN";
        if (key === "a" && direction !== "RIGHT") direction = "LEFT";
        if (key === "d" && direction !== "LEFT") direction = "RIGHT";
    });


    // --- Contrôles tactiles (swipes) pour mobiles et tablettes ---------------
    let touchStartX = 0;
    let touchStartY = 0;

    canvas.addEventListener("touchstart", function(e) {
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
    });

    canvas.addEventListener("touchend", function(e) {
        if (!gameStarted) return;
        const touch = e.changedTouches[0];
        const dx = touch.clientX - touchStartX;
        const dy = touch.clientY - touchStartY;

        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 30 && direction !== "LEFT") direction = "RIGHT";
            else if (dx < -30 && direction !== "RIGHT") direction = "LEFT";
        } else {
            if (dy > 30 && direction !== "UP") direction = "DOWN";
            else if (dy < -30 && direction !== "DOWN") direction = "UP";
        }
    });
});
