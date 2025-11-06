
<?php

// Enregistrer les options personnalisées dans le Customizer
function mon_theme_customizer_register($wp_customize) {

    // --- SECTION : Liens utiles ---
    $wp_customize->add_section('liens_utiles_section', array(
        'title'       => __('Liens utiles', 'mon-theme'),
        'priority'    => 30,
        'description' => __('Ajoutez vos liens utiles (URL + icône)', 'mon-theme'),
    ));

    // --- Exemple de liens utiles ---
    $liens = ['instagram', 'omnivox', 'Stage ATE', 'linkedin', 'calendrier_tim', 'calendrier_ecole', 'Horaire_evaluations', 'Horaire_profs', 'stages', 'tutorat', 'materiel', 'behance'];

    foreach ($liens as $lien) {

        // URL du lien utile
        $wp_customize->add_setting("lien_{$lien}_url", [
            'default'           => '',
            'sanitize_callback' => 'esc_url_raw',
        ]);

        $wp_customize->add_control("lien_{$lien}_url", [
            'label'   => ucfirst($lien) . ' URL',
            'section' => 'liens_utiles_section',
            'type'    => 'url',
        ]);

        // Icône ou image associée
        $wp_customize->add_setting("lien_{$lien}_icon", [
            'default'           => '',
            'sanitize_callback' => 'esc_url_raw',
        ]);

        $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, "lien_{$lien}_icon", [
            'label'    => 'Icône pour ' . ucfirst($lien),
            'section'  => 'liens_utiles_section',
            'settings' => "lien_{$lien}_icon",
        ]));
    }
}

add_action('customize_register', 'mon_theme_customizer_register');

?>
