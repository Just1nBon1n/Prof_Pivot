<?php

function mon_theme_customizer_register($wp_customize) {

    // SECTION : Liens utiles
    $wp_customize->add_section('liens_utiles_section', array(
        'title'       => __('Liens utiles', 'mon-theme'),
        'priority'    => 30,
        'description' => __('Ajoutez ou supprimez vos liens utiles.', 'mon-theme'),
    ));

    // Nombre de liens
    $wp_customize->add_setting('liens_utiles_count', array(
        'default'           => 6,
        'sanitize_callback' => 'absint'
    ));

    $wp_customize->add_control('liens_utiles_count', array(
        'label'       => __('Nombre de liens', 'mon-theme'),
        'section'     => 'liens_utiles_section',
        'type'        => 'number',
        'input_attrs' => array(
            'min' => 1,
            'max' => 30
        )
    ));

    // 💡 Génération automatique des champs
    $count = get_theme_mod('liens_utiles_count', 6);

    for ($i = 1; $i <= $count; $i++) {

        // Label
        $wp_customize->add_setting("lien_{$i}_label", array(
            'default'           => 'Lien '.$i,
            'sanitize_callback' => 'sanitize_text_field'
        ));

        $wp_customize->add_control("lien_{$i}_label", array(
            'label'   => __("Lien {$i} – Texte", 'mon-theme'),
            'section' => 'liens_utiles_section',
            'type'    => 'text'
        ));

        // URL
        $wp_customize->add_setting("lien_{$i}_url", array(
            'default'           => '',
            'sanitize_callback' => 'esc_url_raw'
        ));

        $wp_customize->add_control("lien_{$i}_url", array(
            'label'   => __("Lien {$i} – URL", 'mon-theme'),
            'section' => 'liens_utiles_section',
            'type'    => 'url'
        ));

        // Icône
        $wp_customize->add_setting("lien_{$i}_icon", array(
            'default'           => '',
            'sanitize_callback' => 'esc_url_raw'
        ));

        $wp_customize->add_control(new WP_Customize_Image_Control(
            $wp_customize,
            "lien_{$i}_icon",
            array(
                'label'    => __("Lien {$i} – Icône", 'mon-theme'),
                'section'  => 'liens_utiles_section',
                'settings' => "lien_{$i}_icon"
            )
        ));
    }
}

add_action('customize_register', 'mon_theme_customizer_register');

?>
