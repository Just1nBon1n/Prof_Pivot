<!-- Bouton pour cacher la navigation -->
<div id="toggle-nav" class="toggle-nav" title="Afficher/Masquer la navigation">
    <span class="toggle-bar"></span>
    <span class="toggle-bar"></span>
    <span class="toggle-bar"></span>
</div>
<div class="container-navigation">
    <!-- Barre de navigation latérale par blocs de couleur -->
    <div class="side-nav-blocks">
        <!-- Bloc Accueil avec icône serpent -->
        <a href="#Accueil" id="nav-accueil" class="nav-block nav-accueil" data-section="accueil" title="Accueil">
            <svg class="nav-snake-icon" viewBox="0 0 100 100">
                <rect x="0" y="0" width="10" height="10" class="snake-segment segment-1"/>
                <rect x="0" y="0" width="10" height="10" class="snake-segment segment-2"/>
                <rect x="0" y="0" width="10" height="10" class="snake-segment segment-3"/>
            </svg>
            <span class="nav-label label-accueil">Accueil</span>
        </a>

        <!-- SÉPARATEUR 1 -->
        <div class="nav-separator nav-separator-1" data-target-id="separateur-1"></div>
        
        <!-- Bloc 1: Bleu -> Liens Utiles -->
        <a href="#separateur-1" id="nav-liens" class="nav-block nav-liens" data-section="liens" title="Liens Utiles">
            <span class="nav-label label-liens">Liens Utiles</span>
        </a>
        
        <!-- SÉPARATEUR 2 -->
        <div class="nav-separator nav-separator-2" data-target-id="separateur-2"></div>

        <!-- Bloc 2: Orange -> Personnes Ressources -->
        <a href="#separateur-2" id="nav-ressources" class="nav-block nav-ressources" data-section="ressources" title="Personnes Ressources">
            <span class="nav-label label-ressources">Personnes Ressources</span>
        </a>

        <!-- SÉPARATEUR 3 -->
        <div class="nav-separator nav-separator-3" data-target-id="separateur-3"></div>

        <!-- Bloc 3: Vert -> Documents Téléchargeables -->
        <a href="#separateur-3" id="nav-documents" class="nav-block nav-documents" data-section="documents" title="Documents Téléchargeables">
            <span class="nav-label label-documents">Documents Téléchargeables</span>
        </a>
    </div> 
</div>