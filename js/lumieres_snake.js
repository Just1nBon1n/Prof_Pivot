document.addEventListener("DOMContentLoaded", function() {
    const canvasLum = document.getElementById("canvasLumieres");
    const ctx = canvasLum.getContext("2d");
    let box = 40;
    let blocsLumineux = [];

    // --- Ajuster les paramètres du jeu selon l’écran ---
    function ajusterParametresJeu() {
        const largeur = window.innerWidth;

        if (largeur < 600) { 
            box = 42;
        } else if (largeur < 1024) { 
            box = 40;
        } else { 
            box = 50;
        }
    }

    // --- Ajuster la taille du canvas ---
    function ajusterCanvas() {
        ajusterParametresJeu();
        const canvasJeu = document.getElementById("snakeJeu");
        canvasLum.width = canvasJeu.width;
        canvasLum.height = canvasJeu.height;

        // Regénérer les blocs pour qu'ils s'alignent avec la nouvelle grille
        genererBlocsLumineux();
    }

    window.addEventListener('resize', ajusterCanvas);
    ajusterCanvas();


    // --- Générer et animer les blocs lumineux ---
    function genererBlocsLumineux() {
        blocsLumineux = [];
        const nbBlocs = Math.floor((canvasLum.width * canvasLum.height) / (box*box) * 0.02);
        for (let i = 0; i < nbBlocs; i++) {
            blocsLumineux.push({
                x: Math.floor(Math.random() * (canvasLum.width / box)) * box,
                y: Math.floor(Math.random() * (canvasLum.height / box)) * box,
                alpha: Math.random(),
                sens: Math.random() > 0.5 ? 1 : -1,
                vitesse: 0.01 + Math.random() * 0.02
            });
        }
    }

    // --- Animer les blocs lumineux ---
    function animerBlocs() {
        ctx.clearRect(0, 0, canvasLum.width, canvasLum.height);
        for (let bloc of blocsLumineux) {
            bloc.alpha += bloc.vitesse * bloc.sens;
            if (bloc.alpha > 1) bloc.sens = -1;
            if (bloc.alpha < 0) { 
                bloc.sens = 1;
                bloc.x = Math.floor(Math.random() * (canvasLum.width / box)) * box;
                bloc.y = Math.floor(Math.random() * (canvasLum.height / box)) * box;
            }
            // Couleur des blocs lumineux
            ctx.fillStyle = `rgba(255,255,150,${bloc.alpha*0.4})`;
            ctx.fillRect(bloc.x, bloc.y, box, box);
        }
        requestAnimationFrame(animerBlocs);
    }

    genererBlocsLumineux();
    animerBlocs();
});
