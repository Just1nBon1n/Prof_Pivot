// variables pour les éléments UI
const startButton = document.getElementById("startButton");
const instructions = document.getElementById("instructions");
const welcomeTitle = instructions ? instructions.querySelector('.welcome-title') : null;
const dynamicTitle = instructions ? instructions.querySelector('p') : null; // <p> pour titre dynamique
const instructionsBody = instructions ? instructions.querySelector('.instructions-body') : null;

// --- Logique UI au chargement du DOM ---
document.addEventListener("DOMContentLoaded", function() {
    if (!instructions || !startButton || !welcomeTitle || !dynamicTitle || !instructionsBody) return;
    
    // État initial du jeu
    // Etat possible: 'initial', 'instructions', 'playing-pending', 'playing', 'gameover'
    let currentPhase = 'initial'; 
    
    
    // --- Fonction utilitaire pour gérer l'affichage/contenu ---
    function setUIEtat(phase, titre = null) {
        currentPhase = phase;
        
        // Nettoyage de l'affichage
        instructionsBody.innerHTML = '';
        welcomeTitle.style.display = 'none';
        dynamicTitle.style.display = 'none';
        
        switch (phase) {
            // Phase 1: Bienvenue (Bouton Jouer)
            case 'initial': 
                welcomeTitle.style.display = 'block';
                welcomeTitle.textContent = 'Bienvenue !';
                startButton.textContent = 'Jouer';
                startButton.style.display = 'inline-block';
                instructions.style.display = 'block';
                break;
            
            // Phase 2: Commandes (Bouton Commencer)
            case 'instructions': 
                welcomeTitle.style.display = 'none';
                dynamicTitle.style.display = 'block';
                dynamicTitle.textContent = 'Contrôles du jeu :';
                instructionsBody.innerHTML = COMMANDES_HTML;
                startButton.textContent = 'Commencer';
                startButton.style.display = 'inline-block';
                instructions.style.display = 'block';
                break;
                
            // Phase 3: Attente du mouvement
            case 'playing-pending': 
                welcomeTitle.style.display = 'none';
                dynamicTitle.style.display = 'block';
                dynamicTitle.textContent = 'Touchez une touche / balayez pour commencer !';
                startButton.style.display = 'none'; // Bouton masqué
                instructions.style.display = 'block';
                // ACTION IMPORTANTE : Le jeu est initialisé, mais la boucle n'est pas lancée.
                window.commencerPartie(); 
                break;
                
            // Phase 4: Jeu en cours
            case 'playing': 
                instructions.style.display = 'none';
                break;
                
            // Phase 5: Game Over (Bouton Rejouer)
            case 'gameover': 
                dynamicTitle.style.display = 'block';
                dynamicTitle.textContent = titre || 'GAME OVER !';
                instructionsBody.innerHTML = '<p class="final-message">Appuyez sur Rejouer.</p>';
                startButton.textContent = 'Rejouer';
                startButton.style.display = 'inline-block';
                instructions.style.display = 'block';
                break;
        }
    }


    // --- Logique de progression par clic ---
    startButton.addEventListener("click", function() {
        if (currentPhase === 'initial') {
            setUIEtat('instructions'); // Phase 1 -> Phase 2
        } else if (currentPhase === 'instructions') {
            setUIEtat('playing-pending'); // Phase 2 -> Phase 3
        } else if (currentPhase === 'gameover') {
            setUIEtat('playing-pending'); // Phase 5: Game Over -> Phase 3 (Réinitialise le jeu)
        }
    });


    // --- Fonctions globales pour la communication avec le jeu ---
    window.getCurrentPhase = function() { return currentPhase; };
    
    // Fonction appelée par fonctions_snake.js au premier mouvement
    window.setGameActive = function() {
        if (currentPhase === 'playing-pending') {
            setUIEtat('playing'); // Démarrer le jeu et masquer l'UI
        }
    };
    
    // Fonction appelée par fonctions_snake.js à la fin du jeu
    window.toggleInstructions = function(titre, isRestart = false) {
        if (isRestart) {
            setUIEtat('gameover', titre);
        } else {
             // Utilisé pour l'initialisation et le cas de base
             setUIEtat('initial');
        }
    };

    // Afficher la Phase 1 au chargement
    setUIEtat('initial');
});