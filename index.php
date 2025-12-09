<?php get_header(); ?>
<!-- barre de recherche -->
<?php get_template_part('Johnny/search'); ?>
<!-- navigation principale -->
<?php get_template_part('justin/navigation'); ?>
<!-- Inclusion du fichier background.php -->
<?php get_template_part('justin/background'); ?>
<!-- Inclusion du fichier accueil.php -->
<?php get_template_part('justin/acceuil'); ?>

<!-- Séparateur Bleu Liens Utiles-->
<section id="separateur-1">
    <?php get_template_part(
        'David/SeparateurCanevas', 
        null, 
        array(
            'color' => '#3498db',
            'title' => get_theme_mod('titre_separateur_1', 'LIENS UTILES')
        )
    ); ?>
</section>

<section class="Liens"> 
    <?php get_template_part('Johnny/Johnny'); ?>
</section>

<!-- Séparateur Orange Personnes Ressources-->
<section id="separateur-2">
    <?php get_template_part(
        'David/SeparateurCanevas',  
        null, 
        array(
            'color' => '#e67e22',
            'title' => get_theme_mod('titre_separateur_2', 'PERSONNES RESSOURCES')
        )
    ); ?>
</section>

<section class="Profs">
  <?php get_template_part('Arthur/Ressources'); ?>
</section>

<!-- Séparateur Vert Documents Téléchargeables -->
<section id="separateur-3">
    <?php get_template_part(
        'David/SeparateurCanevas', 
        null, 
        array(
            'color' => '#2ecc71',
            'title' => get_theme_mod('titre_separateur_3', 'DOCUMENTS TÉLÉCHARGEABLES')
        )
    ); ?>
</section>

<section class="Documents">
    <?php get_template_part('David/DocumentsTelechargeables'); ?>
</section>

<script src="<?php echo get_template_directory_uri(); ?>/js/fonctions_canevas_separateur.js"></script>

<?php get_footer(); ?>



