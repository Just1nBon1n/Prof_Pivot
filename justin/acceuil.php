<section class="Accueil">
    <div class="snake-container" style="position: relative; width: 100%; height: 100vh;">
        <!-- Canvas lumières (z-index 1) -->
        <canvas id="canvasLumieres" style="position: absolute; top: 0; left: 0; z-index: 1;"></canvas>
        <!-- Canvas jeu (serpent, grille, TIM) (z-index 2) -->
        <canvas id="snakeJeu" style="position: absolute; top: 0; left: 0; z-index: 2;"></canvas>
        
        <!-- Instructions (Modale) -->
        <div id="instructions" class="instructions">
            <!-- Titre de Bienvenue statique -->
            <h2 class="titre">Bienvenue !</h2> 
            
            <div class="instructions-container">
                <!-- Contient le Titre Dynamique (Commandes / Game Over) -->
                <p class="instructions-titre"></p> 
                
                <!-- Conteneur pour le corps des commandes (sera vide en phase 1) -->
                <div class="instructions-body">
                    <!-- Remplace en JS -->
                </div>
            </div>
        </div>

        <!-- Bouton Arrêter -->
        <button id="stopButton" style="display:none;">Arrêter</button> 

        <!-- Boutons -->
         <div class="boutton-container">
            <button id="startButton">Jouer</button> 
            <button id="quitButton" style="display:none;">Quitter</button>
         </div>

         <!-- Icône de flèche Unicode (Symbole de Chevron Bas) -->
        <div id="arrowIndicator" class="arrow-indicator">
            <span class="arrow-icon">▼</span>
        </div>
    </div>
</section>

<!-- --- Lien vers les JS externes --- -->
<!-- 1. Couleurs Utils -->
<script src="<?php echo get_template_directory_uri(); ?>/js/couleursUtils.js"></script>
<!-- 2. UI Manager Snake -->
<script src="<?php echo get_template_directory_uri(); ?>/js/UImanager_snake.js"></script>
<!-- 3. Navigation Latérale -->
<script src="<?php echo get_template_directory_uri(); ?>/js/side-nav.js"></script>
<!-- 3.1 Toggle Navigation -->
<script src="<?php echo get_template_directory_uri(); ?>/js/toggle-nav.js"></script>
<!-- 4. Scripts Snake -->
<script src="<?php echo get_template_directory_uri(); ?>/js/fonctions_snake.js"></script>
<!-- 5. Lumières Snake -->
<script src="<?php echo get_template_directory_uri(); ?>/js/lumieres_snake.js"></script>
<!-- 6. Background Animé -->
<script>
    const cubesBase = "<?php echo get_stylesheet_directory_uri(); ?>/justin/images/";
</script>
<script src="<?php echo get_template_directory_uri(); ?>/js/background.js"></script>
<!-- 7. Crédits -->
<script src="<?php echo get_template_directory_uri(); ?>/js/credits.js"></script>
