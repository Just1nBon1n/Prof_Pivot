// variables pour les éléments UI
const buttonsContainer = document.querySelector('.boutton-container');
const quitButton = document.getElementById('quitButton');
const startButton = document.getElementById("startButton");
const instructions = document.getElementById("instructions");
const welcomeTitle = instructions ? instructions.querySelector('.titre') : null;
const dynamicTitle = instructions ? instructions.querySelector('p') : null; // <p> pour titre dynamique
const instructionsBody = instructions ? instructions.querySelector('.instructions-body') : null;

// --- Contenu HTML pour les différentes phases ---
const COMMANDES_HTML = `
    <div class="controls-display">
        <div class="control-section">
            <h4>Clavier</h4>
            <div class="command-group">
                <span class="key">W</span> <span class="key-desc">Haut</span>
            </div>
            <div class="command-group">
                <span class="key">A</span> <span class="key-desc">Gauche</span>
                <span class="key">S</span> <span class="key-desc">Bas</span>
                <span class="key">D</span> <span class="key-desc">Droite</span>
            </div>
        </div>
        <div class="control-section">
            <h4>Mobile</h4>
            <p>Balayage (Swipe)</p>
        </div>
    </div>
`;

// --- Logique UI au chargement du DOM ---
document.addEventListener("DOMContentLoaded", function() {
    // Vérification de la structure après le chargement du DOM
    if (!instructions || !dynamicTitle || !instructionsBody) {
        console.error("Erreur: Structure des instructions incorrecte");
        return;
    }
    if (!startButton || !quitButton || !buttonsContainer ) {
        console.error("Erreur: Bouton non trouvé");
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
        quitButton.style.display = 'none'; // Masquer par défaut

        
        switch (phase) {
            // 1. Bienvenue (Bouton Jouer)
            case 'initial': 
                welcomeTitle.style.display = 'block';
                welcomeTitle.textContent = 'Bienvenue !';
                startButton.textContent = 'Jouer';
                startButton.style.display = 'inline-block';
                instructions.style.display = 'block';
                break;
            
            // 2. COMMANDES + ATTENTE DU MOUVEMENT (Fusion)
            case 'playing-pending': 
                welcomeTitle.style.display = 'none';
                dynamicTitle.style.display = 'block';
                dynamicTitle.textContent = 'Touchez une touche / balayez pour commencer !';
                instructionsBody.innerHTML = COMMANDES_HTML; // Afficher les commandes
                startButton.style.display = 'none'; // Bouton masqué
                instructions.style.display = 'block';
                
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

    // 💡 CORRECTION : Écouteur direct sur le bouton Quitter
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