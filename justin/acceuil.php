<section class="Accueil">
    <div class="snake-container" style="position: relative; width: 100%; height: 100vh;">
        <!-- Canvas lumières (z-index 1) -->
        <canvas id="canvasLumieres" style="position: absolute; top: 0; left: 0; z-index: 1;"></canvas>
        <!-- Canvas jeu (serpent, grille, TIM) (z-index 2) -->
        <canvas id="snakeJeu" style="position: absolute; top: 0; left: 0; z-index: 2;"></canvas>
        <!-- Instructions -->
        <div id="instructions" class="instructions">
            <p>Contrôles :</p>
            <ul>
                <li>Flèche Haut : Monter</li>
                <li>Flèche Bas : Descendre</li>
                <li>Flèche Gauche : Aller à gauche</li>
                <li>Flèche Droite : Aller à droite</li>
            </ul>
            <button id="startButton">Jouer</button>
        </div>
    </div>
</section>

<!-- Lien vers les JS externes -->
<script src="<?php echo get_template_directory_uri(); ?>/js/fonctions_snake.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/lumieres_snake.js"></script>
