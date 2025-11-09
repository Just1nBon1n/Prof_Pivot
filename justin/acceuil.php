<section class="Accueil">
    <div class="snake-container" style="position: relative; width: 100%; height: 100vh;">
        <!-- Canvas lumières (z-index 1) -->
        <canvas id="canvasLumieres" style="position: absolute; top: 0; left: 0; z-index: 1;"></canvas>
        <!-- Canvas jeu (serpent, grille, TIM) (z-index 2) -->
        <canvas id="snakeJeu" style="position: absolute; top: 0; left: 0; z-index: 2;"></canvas>
        
        <!-- Instructions (Modale) -->
        <div id="instructions" class="instructions">
            <!-- 💡 NOUVEAU : Titre de Bienvenue statique -->
            <h2 class="welcome-title">Bienvenue !</h2> 
            
            <!-- P: Contient le Titre Dynamique (Commandes / Game Over) -->
            <p></p> 
            
            <!-- 🎯 Conteneur pour le corps des commandes (sera vide en phase 1) -->
            <div class="instructions-body">
                <!-- Le contenu initial des commandes sera remplacé par JS -->
            </div>
            
            <!-- Le bouton est maintenant géré par le JS pour changer le texte et l'affichage -->
        </div>
        <!-- IMPORTANT : Le bouton est maintenant hors de la div instructions pour être géré séparément par les z-index/l'UI manager. -->
        <button id="startButton">Jouer</button> 
    </div>
</section>

<!-- --- Lien vers les JS externes --- -->
<!-- 1. Couleurs Utils -->
<script src="<?php echo get_template_directory_uri(); ?>/js/couleursUtils.js"></script>
<!-- 2. UI Manager Snake -->
<script src="<?php echo get_template_directory_uri(); ?>/js/UImanager_snake.js"></script>
<!-- 3. Scripts Snake -->
<script src="<?php echo get_template_directory_uri(); ?>/js/fonctions_snake.js"></script>
<!-- 4. Lumières Snake -->
<script src="<?php echo get_template_directory_uri(); ?>/js/lumieres_snake.js"></script>
<!-- 5. Curseur -->
<script src="<?php echo get_template_directory_uri(); ?>/js/curseur.js"></script>
