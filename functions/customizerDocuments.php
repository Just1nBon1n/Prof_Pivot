<?php
// Personnalisation du thème : séparateurs, documents téléchargeables et icônes sociales

function theme_31w_customize_register($wp_customize) {

    //SECTION : SÉPARATEURS
    $wp_customize->add_section('separateurs', array(
        'title' => __('Séparateurs', 'theme_31w'),
        'priority' => 30,
    ));

    // Titre du séparateur 1
    $wp_customize->add_setting('titre_separateur_1', array(
        'default' => __('LIENS UTILES', 'theme_31w'),
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('titre_separateur_1', array(
        'label' => __('Titre séparateur 1', 'theme_31w'),
        'section' => 'separateurs',
        'type' => 'text',
    ));

    // Titre du séparateur 2
    $wp_customize->add_setting('titre_separateur_2', array(
        'default' => __('PERSONNES RESSOURCES', 'theme_31w'),
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('titre_separateur_2', array(
        'label' => __('Titre séparateur 2', 'theme_31w'),
        'section' => 'separateurs',
        'type' => 'text',
    ));

    // Titre du séparateur 3
    $wp_customize->add_setting('titre_separateur_3', array(
        'default' => __('DOCUMENTS TÉLÉCHARGEABLES', 'theme_31w'),
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('titre_separateur_3', array(
        'label' => __('Titre séparateur 3', 'theme_31w'),
        'section' => 'separateurs',
        'type' => 'text',
    ));


    //SECTION : DOCUMENTS TÉLÉCHARGEABLES
    $wp_customize->add_section('section_documents', array(
        'title' => __('Documents téléchargeables', 'theme_31w'),
        'priority' => 40,
    ));

    // 7 documents téléchargeables
    for ($i = 1; $i <= 7; $i++) {
        // Étiquette
        $wp_customize->add_setting("etiquette_$i", array(
            'default' => __("Étiquette $i", 'theme_31w'),
            'sanitize_callback' => 'sanitize_text_field',
        ));
        $wp_customize->add_control("etiquette_$i", array(
            'label' => sprintf(__('Nom du dossier %d', 'theme_31w'), $i),
            'section' => 'section_documents',
            'type' => 'text',
        ));

        // Lien du fichier
        $wp_customize->add_setting("fichier_lien_$i", array(
            'default' => '#',
            'sanitize_callback' => 'esc_url_raw',
        ));
        $wp_customize->add_control("fichier_lien_$i", array(
            'label' => sprintf(__('Lien du fichier %d', 'theme_31w'), $i),
            'section' => 'section_documents',
            'type' => 'url',
        ));
    }


    //SECTION : FOOTER ICONES SOCIALES
    $wp_customize->add_section('footer_icones_sociales', array(
        'title' => __('Icônes sociales du pied de page', 'theme_31w'),
        'priority' => 50,
    ));

    // Nombre d'icônes
    $wp_customize->add_setting('nombre_icones', array(
        'default' => 3,
        'sanitize_callback' => 'absint',
        'capability' => 'edit_theme_options',
    ));
    $wp_customize->add_control('nombre_icones', array(
        'type' => 'number',
        'section' => 'footer_icones_sociales',
        'label' => __('Nombre d’icônes sociales', 'theme_31w'),
    ));

    // Boucle pour les icônes
    $nombre_icones = get_theme_mod('nombre_icones', 3);
    for ($k = 0; $k < $nombre_icones; $k++) {
        // Image de l’icône
        $wp_customize->add_setting("footer_image_icone_sociale_$k", array(
            'default' => '',
            'sanitize_callback' => 'esc_url_raw',
        ));
        $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, "footer_image_icone_sociale_$k", array(
            'label' => sprintf(__('Icône sociale (image) %d', 'theme_31w'), $k + 1),
            'section' => 'footer_icones_sociales',
        )));

        // Lien de l’icône
        $wp_customize->add_setting("footer_lien_icone_sociale_$k", array(
            'default' => '',
            'sanitize_callback' => 'esc_url_raw',
        ));
        $wp_customize->add_control("footer_lien_icone_sociale_$k", array(
            'label' => sprintf(__('Lien de l’icône %d', 'theme_31w'), $k + 1),
            'section' => 'footer_icones_sociales',
            'type' => 'url',
        ));
    }
}
add_action('customize_register', 'theme_31w_customize_register');



//ENQUEUE DU SCRIPT JS
function theme_31w_enqueue_scripts() {
    wp_enqueue_script(
        'dossiers-script',
        get_template_directory_uri() . '/js/fonctions_documents_telechargeables.js',
        array(),
        '1.0',
        true
    );

    // Préparer les données dynamiques
    $etiquettes = [];
    $fichiersLiens = [];

    for ($i = 1; $i <= 7; $i++) {
        $etiquettes[] = get_theme_mod("etiquette_$i", "Étiquette $i");
        $fichiersLiens[] = get_theme_mod("fichier_lien_$i", "#");
    }

    // Injection dans le JS
    wp_localize_script('dossiers-script', 'dossiersData', array(
        'etiquettes' => $etiquettes,
        'fichiersLiens' => $fichiersLiens,
    ));
}
add_action('wp_enqueue_scripts', 'theme_31w_enqueue_scripts');
