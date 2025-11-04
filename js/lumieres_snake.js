document.addEventListener("DOMContentLoaded", function() {
    const canvasLum = document.getElementById("canvasLumieres");
    if (!canvasLum) return;
    const ctx = canvasLum.getContext("2d");
    
    // === Variables globales ==================================================
    let box = 40;
    let blocsLumineux = [];

    // Utilisation de la fonction définie dans couleursUtils.js
    // pour obtenir la couleur des lumières du snake
    const couleurLumiere = getCssColor('--snake-couleur-lumiere');
    // console.log(couleurLumiere);

    // === Fonctions ===========================================================
    function ajusterParametresJeu() {
        const largeur = window.innerWidth;
        if (largeur < 600) box = 42;
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

    function genererBlocsLumineux() {
        blocsLumineux = [];
        const nbBlocs = Math.floor((canvasLum.width * canvasLum.height) / (box * box) * 0.02);
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

            ctx.fillStyle = rgbToString(couleurLumiere, bloc.alpha);
            ctx.fillRect(bloc.x, bloc.y, box, box);
        }
        requestAnimationFrame(animerBlocs);
    }

    window.addEventListener('resize', ajusterCanvas);
    ajusterCanvas();
    genererBlocsLumineux();
    animerBlocs();
});
