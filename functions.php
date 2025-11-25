<?php
  // Définir le chemin vers le dossier "functions"
  $functions_dir = get_template_directory() . '/functions/';
  
  // Liste des fichiers à inclure
  $function_files = array(
    'options.php'
  );

  // Boucle pour inclure tous les fichiers
  foreach ($function_files as $file) {
    include_once $functions_dir . $file;
  }

  // Charger le Customizer du module Arthur
  require_once get_template_directory() . '/Arthur/functions/Arthur_customizer.php';
?>