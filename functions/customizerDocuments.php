<?php
// ================================
// CUSTOMIZER DU THÈME Prof_Pivot
// ================================

// -----------------------------------------------------------------
// 1. Personnalisation : Séparateurs, Documents téléchargeables et Icônes sociales
// -----------------------------------------------------------------
function theme_31w_customize_register($wp_customize) {

    // -------------------
    // SECTION : Séparateurs
    // -------------------
    $wp_customize->add_section('separateurs', array(
        'title'    => __('Séparateurs', 'theme_31w'),
        'priority' => 30,
    ));

    // Titre séparateur 1
    $wp_customize->add_setting('titre_separateur_1', array(
        'default'           => __('LIENS UTILES', 'theme_31w'),
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('titre_separateur_1', array(
        'label'   => __('Titre séparateur 1', 'theme_31w'),
        'section' => 'separateurs',
        'type'    => 'text',
    ));

    // Titre séparateur 2
    $wp_customize->add_setting('titre_separateur_2', array(
        'default'           => __('PERSONNES RESSOURCES', 'theme_31w'),
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('titre_separateur_2', array(
        'label'   => __('Titre séparateur 2', 'theme_31w'),
        'section' => 'separateurs',
        'type'    => 'text',
    ));

    // Titre séparateur 3
    $wp_customize->add_setting('titre_separateur_3', array(
        'default'           => __('DOCUMENTS TÉLÉCHARGEABLES', 'theme_31w'),
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('titre_separateur_3', array(
        'label'   => __('Titre séparateur 3', 'theme_31w'),
        'section' => 'separateurs',
        'type'    => 'text',
    ));


    // -------------------
    // SECTION : Documents téléchargeables
    // -------------------
    $wp_customize->add_section('section_documents', array(
        'title'    => __('Documents téléchargeables', 'theme_31w'),
        'priority' => 40,
    ));

    for ($i = 1; $i <= 8; $i++) {
        // Étiquette
        $wp_customize->add_setting("etiquette_$i", array(
            'default'           => __("Étiquette $i", 'theme_31w'),
            'sanitize_callback' => 'sanitize_text_field',
        ));
        $wp_customize->add_control("etiquette_$i", array(
            'label'   => sprintf(__('Nom du dossier %d', 'theme_31w'), $i),
            'section' => 'section_documents',
            'type'    => 'text',
        ));

        // Lien du fichier
        $wp_customize->add_setting("fichier_lien_$i", array(
            'default'           => '#',
            'sanitize_callback' => 'esc_url_raw',
        ));
        $wp_customize->add_control("fichier_lien_$i", array(
            'label'   => sprintf(__('Lien du fichier %d', 'theme_31w'), $i),
            'section' => 'section_documents',
            'type'    => 'url',
        ));
    }


    // -------------------
    // SECTION : Footer icônes sociales
    // -------------------
    $wp_customize->add_section('footer_icones_sociales', array(
        'title'    => __('Icônes sociales du pied de page', 'theme_31w'),
        'priority' => 50,
    ));

    // Nombre d'icônes
    $wp_customize->add_setting('nombre_icones', array(
        'default'           => 3,
        'sanitize_callback' => 'absint',
        'capability'        => 'edit_theme_options',
    ));
    $wp_customize->add_control('nombre_icones', array(
        'type'    => 'number',
        'section' => 'footer_icones_sociales',
        'label'   => __('Nombre d’icônes sociales', 'theme_31w'),
    ));

    // Boucle pour les icônes
    $nombre_icones = get_theme_mod('nombre_icones', 3);
    for ($k = 0; $k < $nombre_icones; $k++) {
        // Image de l’icône
        $wp_customize->add_setting("footer_image_icone_sociale_$k", array(
            'default'           => '',
            'sanitize_callback' => 'esc_url_raw',
        ));
        $wp_customize->add_control(new WP_Customize_Image_Control(
            $wp_customize,
            "footer_image_icone_sociale_$k",
            array(
                'label'   => sprintf(__('Icône sociale (image) %d', 'theme_31w'), $k + 1),
                'section' => 'footer_icones_sociales',
            )
        ));

        // Lien de l’icône
        $wp_customize->add_setting("footer_lien_icone_sociale_$k", array(
            'default'           => '',
            'sanitize_callback' => 'esc_url_raw',
        ));
        $wp_customize->add_control("footer_lien_icone_sociale_$k", array(
            'label'   => sprintf(__('Lien de l’icône %d', 'theme_31w'), $k + 1),
            'section' => 'footer_icones_sociales',
            'type'    => 'url',
        ));
    }


    // -------------------
    // SECTION : Ressources (slider)
    // -------------------
    $wp_customize->add_section('arthur_resources_section', array(
        'title'    => 'Ressources — slider',
        'priority' => 160,
    ));

    for ($i = 1; $i <= 4; $i++) {
        // Titre
        $wp_customize->add_setting("res_titre_item_$i", array(
            'default'           => "Titre $i",
            'sanitize_callback' => 'sanitize_text_field',
            'transport'         => 'postMessage',
        ));
        $wp_customize->add_control("res_titre_item_$i", array(
            'label'   => "Titre item $i",
            'section' => 'arthur_resources_section',
            'type'    => 'text',
        ));

        // Description
        $wp_customize->add_setting("res_description_item_$i", array(
            'default'           => "Description $i",
            'sanitize_callback' => 'wp_kses_post',
            'transport'         => 'postMessage',
        ));
        $wp_customize->add_control("res_description_item_$i", array(
            'label'   => "Description item $i",
            'section' => 'arthur_resources_section',
            'type'    => 'textarea',
        ));
    }

}
add_action('customize_register', 'theme_31w_customize_register');


// -----------------------------------------------------------------
// 2. Enqueue des scripts JS
// -----------------------------------------------------------------
function theme_31w_enqueue_scripts() {
    wp_enqueue_script(
        'dossiers-script',
        get_template_directory_uri() . '/js/fonctions_documents_telechargeables.js',
        array(),
        '1.0',
        true
    );

    // Préparer les données dynamiques pour le JS
    $nombreDossiers = 8;
    $etiquettes = [];
    $fichiersLiens = [];

    for ($i = 1; $i <= $nombreDossiers; $i++) {
        $etiquettes[] = get_theme_mod("etiquette_$i", "Étiquette $i");
        $fichiersLiens[] = get_theme_mod("fichier_lien_$i", "#");
    }

    wp_localize_script('dossiers-script', 'dossiersData', array(
        'etiquettes'    => $etiquettes,
        'fichiersLiens' => $fichiersLiens,
    ));
}
add_action('wp_enqueue_scripts', 'theme_31w_enqueue_scripts');


// -----------------------------------------------------------------
// 3. Live Preview Customizer pour le slider (postMessage)
// -----------------------------------------------------------------
function arthur_customizer_live_preview() {
    $handle = 'arthur-customizer-preview';
    $src    = get_template_directory_uri() . '/Arthur/functions/Arthur_customizer.js';
    $ver    = file_exists(get_template_directory() . '/Arthur/functions/Arthur_customizer.js')
        ? filemtime(get_template_directory() . '/Arthur/functions/Arthur_customizer.js')
        : false;

    wp_enqueue_script($handle, $src, array('customize-preview', 'jquery'), $ver, true);
}
add_action('customize_preview_init', 'arthur_customizer_live_preview');
?>
