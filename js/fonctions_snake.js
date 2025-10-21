document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("snakeJeu");
    const startButton = document.getElementById("startButton");
    const instructions = document.getElementById("instructions");
    const ctx = canvas.getContext("2d");
    
    // === Variables globales ==================================================
    let box = 40; // taille d'une case
    let game = null;
    let snake = [];
    let direction = "RIGHT";
    let growing = 3; // nombre de segments à ajouter au serpent au début
    let gameStarted = false;
    let patternTIM = []; // variable globale pour le motif TIM
    let foodListe = []; // liste des nourritures
    const foodNb = 3; // nombre de nourritures simultanées

    // === Fonctions ===========================================================
    // --- Ajuster les paramètres du jeu selon l’écran ---
    function ajusterParametresJeu() {
        const largeur = window.innerWidth;

        if (largeur < 600) { 
            box = 42;
            patternTIM = [
                "TTTTT",
                "  T  ",
                "  T  ",
                "  T  ",
                "     ",
                " III ",
                "  I  ",
                "  I  ",
                " III ",
                "     ",
                "M   M",
                "MM MM",
                "M M M",
                "M   M",
            ];
        } else if (largeur < 1024) { 
            box = 40;
            patternTIM = [
                "TTTTT  III  M   M",
                "  T     I   MM MM",
                "  T     I   M M M",
                "  T     I   M   M",
                "  T    III  M   M"
            ];
        } else { 
            box = 50;
            patternTIM = [
                "TTTTTTT  IIIII  M     M",
                "   T       I    MM   MM",
                "   T       I    M M M M",
                "   T       I    M  M  M",
                "   T     IIIII  M     M"
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


    // --- Dessiner le motif "TIM" ---
    function dessinerTIM() {
        const patternWidth = patternTIM[0].length;
        const patternHeight = patternTIM.length;
        const offsetX = Math.floor((canvas.width / box - patternWidth) / 2);
        const offsetY = Math.floor((canvas.height / box - patternHeight) / 2);

        ctx.fillStyle = "rgba(255,255,255,0.15)";
        for (let y = 0; y < patternTIM.length; y++) {
            for (let x = 0; x < patternTIM[y].length; x++) {
                if (patternTIM[y][x] !== " ") {
                    ctx.fillRect((offsetX + x) * box, (offsetY + y) * box, box, box);
                }
            }
        }
    }


    // --- Dessiner la grille ---
    function dessinerGrille() {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
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
        while (!positionValide) {
            newFood = {
                x: Math.floor(Math.random() * (canvas.width / box)) * box,
                y: Math.floor(Math.random() * (canvas.height / box)) * box
            };
            // Vérifie que la nourriture n'est pas sur le serpent
            positionValide = !snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
        }
        return newFood;
    }


    // --- Boucle principale du jeu --------------------------------------------
    function dessiner() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dessinerTIM();
        dessinerGrille();

        // --- Bouger le serpent ---
        let headX = snake[0].x;
        let headY = snake[0].y;

        if (direction === "LEFT") headX -= box;
        if (direction === "RIGHT") headX += box;
        if (direction === "UP") headY -= box;
        if (direction === "DOWN") headY += box;

        // --- Wrap autour du bord ---
        if (headX < 0) headX = canvas.width - box;
        if (headX >= canvas.width) headX = 0;
        if (headY < 0) headY = canvas.height - box;
        if (headY >= canvas.height) headY = 0;

        // --- Collision avec soi-même ---
        for (let i = 0; i < snake.length; i++) {
            if (snake[i].x === headX && snake[i].y === headY) {
                clearInterval(game);
                alert("Game Over !");
                instructions.style.display = "block";
                gameStarted = false;
                return;
            }
        }

        // --- Nouvelle tête ---
        const newHead = { x: headX, y: headY };
        snake.unshift(newHead);

        // --- Gérer les nourritures ---
        let aMange = false;
        for (let i = 0; i < foodListe.length; i++) {
            const food = foodListe[i];
            if (headX === food.x && headY === food.y) {
                growing++;
                foodListe[i] = genererNourriture(); // remplace la nourriture mangée
                aMange = true;
            }
            ctx.fillStyle = "red";
            ctx.fillRect(food.x, food.y, box, box);
        }

        // --- Réduire le serpent si pas de croissance ---
        if (growing > 0) {
            growing--;
        } else {
            snake.pop();
        }

        // --- Dessiner serpent ---
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = (i === 0) ? "green" : "lightgreen";
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

        // Déterminer si le swipe est plus horizontal ou vertical
        if (Math.abs(dx) > Math.abs(dy)) {
            // Swipe horizontal
            if (dx > 30 && direction !== "LEFT") direction = "RIGHT";
            else if (dx < -30 && direction !== "RIGHT") direction = "LEFT";
        } else {
            // Swipe vertical
            if (dy > 30 && direction !== "UP") direction = "DOWN";
            else if (dy < -30 && direction !== "DOWN") direction = "UP";
        }
    });


    // === Gestion du UI =======================================================
    // --- Bouton "Jouer" ------------------------------------------------------
    startButton.addEventListener("click", function() {
        ajusterParametresJeu();
        ajusterCanvas();

        instructions.style.display = "none";
        gameStarted = true;
        direction = "RIGHT";
        growing = 3;

        // Réinitialiser serpent et nourriture
        snake = [{x: Math.floor(canvas.width/2/box)*box, y: Math.floor(canvas.height/2/box)*box}];
        // Générer les 3 nourritures de départ
        foodListe = [];
        for (let i = 0; i < foodNb; i++) {
            foodListe.push(genererNourriture());
        }

        // Lancer la boucle du jeu
        if (game) clearInterval(game);
        game = setInterval(dessiner, 100);
    });
});
