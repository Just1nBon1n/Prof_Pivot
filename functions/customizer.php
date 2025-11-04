<?php
// Il va falloir vérifier la base de donné pour le menu customizer 

function theme_31w_customize_register($wp_customize) {
    // SECTION DES SÉPARATEURS //
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
        'label' => __('Titre séparateur 1', 'theme_31w'),
        'section' => 'separateurs',
        'type' => 'text',
    ));

    // Titre du séparateur 3
    $wp_customize->add_setting('titre_separateur_3', array(
        'default' => __('DOCUMENTS TÉLÉCHARGEABLES', 'theme_31w'),
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('titre_separateur_3', array(
        'label' => __('Titre séparateur 1', 'theme_31w'),
        'section' => 'separateurs',
        'type' => 'text',
    ));

    // SECTION DES DOCUMENTS TÉLÉCHARGEABLES //
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

        // Lien de fichier
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
}

// Section des documents téléchargeables - JS
function theme_31w_enqueue_scripts() {
    wp_enqueue_script('dossiers-script', get_template_directory_uri() . '/js/fonctions_documents_telechargeables.js', 
    array(), '1.0', true);

    // Prépare les valeurs dynamiques
    $etiquettes = [];
    $fichiersLiens = [];

    for ($i = 1; $i <= 7; $i++) {
        $etiquettes[] = get_theme_mod("etiquette_$i", "Étiquette $i");
        $fichiersLiens[] = get_theme_mod("fichier_lien_$i", "#");
    }

    // Injecte dans le JS
    wp_localize_script('dossiers-script', 'dossiersData', array(
        'etiquettes' => $etiquettes,
        'fichiersLiens' => $fichiersLiens,
    ));
}

add_action('customize_register', 'theme_31w_customize_register');
// Pour charger le script js des documents téléchargeables
add_action('wp_enqueue_scripts', 'theme_31w_enqueue_scripts');