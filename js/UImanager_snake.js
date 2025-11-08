// variables pour les éléments UI
const startButton = document.getElementById("startButton");
const instructions = document.getElementById("instructions");
const instructionsTitle = instructions ? instructions.querySelector('p') : null;

function toggleInstructions(titre, show) {
    if (!instructions || !instructionsTitle || !startButton) return;

    instructionsTitle.textContent = titre;
    instructions.style.display = show ? "block" : "none";
    startButton.textContent =    show ? "Rejouer" : "Jouer"; 
}

// Rendre la fonction accessible globalement pour fonctions_snake.js
window.toggleInstructions = toggleInstructions;

// --- Logique UI au chargement du DOM ---
document.addEventListener("DOMContentLoaded", function() {
    // 1. Afficher les instructions initiales
    toggleInstructions("Commandes (W A S D) ou Balayage", true);

    // 2. Écouteur de clic (Déplacé ici)
    if (startButton) {
        startButton.addEventListener("click", function() {
            // Masquer la modale
            toggleInstructions("", false); 
            
            // Démarrer le jeu (Appel de la fonction de logique de jeu)
            window.commencerPartie();
        });
    }
});
