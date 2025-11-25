<?php
function theme_31w_customize_register($wp_customize) {
  // Le code pour ajouter des sections, des réglages et des contrôles ira ici.
  $wp_customize->add_section('Ressources', array(
    'title' => __('Ressources', 'theme_31w'),
    'priority' => 30,
  )); }
  ?>
<?php
// Enregistre les réglages / contrôles pour les 4 items du slider
function arthur_resources_customizer_register( $wp_customize ) {
  $wp_customize->add_section( 'arthur_resources_section', [
    'title'    => 'Ressources — slider',
    'priority' => 160,
  ] );

  for ( $i = 1; $i <= 4; $i++ ) {
    // Titre
    $wp_customize->add_setting( "res_titre_item_{$i}", [
      'default'           => "Titre {$i}",
      'sanitize_callback' => 'sanitize_text_field',
      'transport'         => 'postMessage',
    ] );
    $wp_customize->add_control( "res_titre_item_{$i}", [
      'label'    => "Titre item {$i}",
      'section'  => 'arthur_resources_section',
      'type'     => 'text',
    ] );

    // Description
    $wp_customize->add_setting( "res_description_item_{$i}", [
      'default'           => "Description {$i}",
      'sanitize_callback' => 'wp_kses_post',
      'transport'         => 'postMessage',
    ] );
    $wp_customize->add_control( "res_description_item_{$i}", [
      'label'    => "Description item {$i}",
      'section'  => 'arthur_resources_section',
      'type'     => 'textarea',
    ] );
  }
}
add_action( 'customize_register', 'arthur_resources_customizer_register' );

// Enqueue du script de live-preview (postMessage) dans le Customizer
function arthur_customizer_live_preview() {
  $handle = 'arthur-customizer-preview';
  $src = get_template_directory_uri() . '/Arthur/functions/Arthur_customizer.js';
  $ver = file_exists( get_template_directory() . '/Arthur/functions/Arthur_customizer.js' )
    ? filemtime( get_template_directory() . '/Arthur/functions/Arthur_customizer.js' )
    : false;
  wp_enqueue_script( $handle, $src, array( 'customize-preview', 'jquery' ), $ver, true );
}
add_action( 'customize_preview_init', 'arthur_customizer_live_preview' );