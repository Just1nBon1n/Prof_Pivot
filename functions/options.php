<?php 

  function theme_5w5_enqueue_styles() { 
      // Inclut style.css (CSS principal du thème)
      wp_enqueue_style('mon-style-style', get_stylesheet_uri()); 
  }
  add_action('wp_enqueue_scripts', 'theme_5w5_enqueue_styles');

?>