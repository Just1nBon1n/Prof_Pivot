// variables pour les éléments UI
const buttonsContainer = document.querySelector('.boutton-container');
const quitButton = document.getElementById('quitButton');
const startButton = document.getElementById("startButton");
const instructions = document.getElementById("instructions");
const instructionsContainer = instructions ? instructions.querySelector('.instructions-container') : null;
const welcomeTitle = instructions ? instructions.querySelector('h2.titre') : null; 
const dynamicTitle = instructions ? instructions.querySelector('p') : null; // <p> pour titre dynamique
const instructionsBody = instructions ? instructions.querySelector('.instructions-body') : null;

// --- Contenu HTML pour les différentes phases ---
const COMMANDES_HTML = `
    <div class="controls-display">
        <div class="control-section controls-desktop">
            <h4>Clavier</h4>
            <div class="commands-container">
                <div class="command-group two-column">
                    <!-- WASD -->
                    <span class="key">W</span> <span class="key-desc">Haut</span>
                    <span class="key">A</span> <span class="key-desc">Gauche</span>
                    <span class="key">S</span> <span class="key-desc">Bas</span>
                    <span class="key">D</span> <span class="key-desc">Droite</span>
                </div>
                <span class="separator">ou</span>
                <div class="command-group two-column">
                    <!-- Flèches -->
                    <span class="key">◀</span> <span class="key-desc">Gauche</span>
                    <span class="key">▼</span> <span class="key-desc">Bas</span>
                    <span class="key">▶</span> <span class="key-desc">Droite</span>
                    <span class="key">▲</span> <span class="key-desc">Haut</span>
                </div>
            </div>
        </div>
        <div class="control-section controls-mobile">
            <h4>Mobile</h4>
            <span class="key-group"><span class="key-desc">Balayage (Swipe)</span></span>
        </div>
    </div>
`;


// --- Logique UI au chargement du DOM ---
document.addEventListener("DOMContentLoaded", function() {
    // Vérification de la structure après le chargement du DOM
    if (!instructions || !dynamicTitle || !instructionsBody || !instructionsContainer) {
        console.error("Erreur: Structure des instructions incorrecte. Manque .instructions-container.");
        return;
    }
    if (!startButton || !quitButton || !buttonsContainer || !welcomeTitle ) {
        console.error("Erreur: Un élément bouton ou titre initial est manquant.");
        return;
    }

    // État initial du jeu
    let currentPhase = 'initial'; 
    
    
    // --- Fonction utilitaire pour gérer l'affichage/contenu ---
    function setUIState(phase, titre = null) {
        currentPhase = phase;
        
        // Nettoyage de l'affichage
        instructionsBody.innerHTML = '';
        welcomeTitle.style.display = 'none';
        dynamicTitle.style.display = 'none';
        quitButton.style.display = 'none'; 
        instructionsContainer.style.display = 'none'; 

        
        switch (phase) {
            // 1. Bienvenue (Bouton Jouer)
            case 'initial': 
                welcomeTitle.style.display = 'block';
                welcomeTitle.textContent = 'Bienvenue !'; // Texte statique
                startButton.textContent = 'Jouer';
                startButton.style.display = 'inline-block';
                instructions.style.display = 'block';
                // instructionsContainer reste masqué
                break;
            
            // 2. Prêt à jouer (Attente du mouvement)
            case 'playing-pending': 
                // 💡 NOUVEAU MESSAGE ADAPTATIF BASÉ SUR LA LARGEUR
                const message = window.innerWidth < 1024
                    ? 'Balayez l\'écran pour commencer' 
                    : 'Appuyez sur une touche (W A S D) pour commencer'; 
                welcomeTitle.style.display = 'none';
                dynamicTitle.style.display = 'block';
                dynamicTitle.textContent = message; 
                instructionsBody.innerHTML = COMMANDES_HTML; // Afficher les commandes
                startButton.style.display = 'none'; // Bouton masqué
                instructions.style.display = 'block';
                instructionsContainer.style.display = 'flex'; // AFFICHER LE CONTENEUR STYLISÉ
                
                // Initialisation du jeu (ne lance pas la boucle)
                if (window.commencerPartie) {
                    window.commencerPartie(); 
                }
                break;
                
            // 3. Jeu en cours
            case 'playing': 
                instructions.style.display = 'none';
                break;
                
            // 4. Fin de partie (Game Over)
            case 'gameover': 
                welcomeTitle.style.display = 'none';
                dynamicTitle.style.display = 'block';
                dynamicTitle.textContent = titre || 'GAME OVER !';
                instructionsBody.innerHTML = '<p class="final-message">Choisissez une option.</p>'; // Message de fin
                
                startButton.textContent = 'Rejouer';
                startButton.style.display = 'inline-block';
                quitButton.style.display = 'inline-block'; // Afficher le bouton Quitter
                
                instructionsContainer.style.display = 'flex';

                instructions.style.display = 'block';
                break;
        }
    }


    // --- Logique de progression par clic ---
    startButton.addEventListener("click", function() {
        if (currentPhase === 'initial' || currentPhase === 'gameover') {
            // Jouer/Rejouer -> Commandes/Attente du mouvement
            setUIState('playing-pending'); 
        }
    });

    // Écouteur direct sur le bouton Quitter
    quitButton.addEventListener("click", function() {
        // Quitter le jeu -> Retour à l'accueil (Phase 1)
        setUIState('initial'); 
    });


    // --- Fonctions globales pour la communication avec le jeu ---
    window.getCurrentPhase = function() { return currentPhase; };
    
    // Fonction appelée par fonctions_snake.js au premier mouvement
    window.setGameActive = function() {
        if (currentPhase === 'playing-pending') {
            setUIState('playing'); // Démarrer le jeu et masquer l'UI
        }
    };
    
    // Fonction appelée par fonctions_snake.js à la fin du jeu
    window.toggleInstructions = function(titre, isRestart = false) {
        if (isRestart) {
            setUIState('gameover', titre);
        } else {
            setUIState('initial');
        }
    };

    // Afficher la Phase 1 au chargement
    setUIState('initial');
});