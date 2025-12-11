<?php
  // Définir le chemin vers le dossier "functions"
  $functions_dir = get_template_directory() . '/functions/';
  
  // Liste des fichiers à inclure
  $function_files = array(
    'options.php',
    'customizerDocuments.php',
    'customizerLiensUtiles.php',
  );

  // Boucle pour inclure tous les fichiers
  foreach ($function_files as $file) {
    include_once $functions_dir . $file;
  }

  function liens_utiles_scripts() {
      wp_enqueue_script(
          'liens-anim', // identifiant unique du script
          get_template_directory_uri() . '/js/liens-anim.js', // bon chemin vers ton fichier
          array(), // dépendances (ex: ['jquery'] si besoin)
          null,    // version
          true     // chargement dans le footer
      );
  }
  add_action('wp_enqueue_scripts', 'liens_utiles_scripts');

  function theme_scripts() {
    wp_enqueue_script(
        'search-js',
        get_template_directory_uri() . '/js/recherche.js',
        array(),
        null,
        true
    );
}
add_action('wp_enqueue_scripts', 'theme_scripts');

  // Charger le Customizer du module Arthur
  // require_once get_template_directory() . '/Arthur/functions/';
?>