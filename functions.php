<?php
  // Définir le chemin vers le dossier "functions"
  $functions_dir = get_template_directory() . '/functions/';
  
  // Liste des fichiers à inclure
  $function_files = array(
    'options.php',
    'customizerDocuments.php',
    'optionsSVG.php'
  );

  // Boucle pour inclure tous les fichiers
  foreach ($function_files as $file) {
    include_once $functions_dir . $file;
  }
?>