<?php get_header(); ?>
<!-- barre de recherche -->
<?php get_template_part('Johnny/search'); ?>
<!-- Curseur personnalisé -->
 <?php get_template_part('justin/curseur'); ?>

<!-- Inclusion du fichier accueil.php -->
<?php get_template_part('justin/acceuil'); ?>

<!-- Séparateur Bleu Liens Utiles-->
<?php get_template_part('David/Separateur', null, array(
    'id' => 'separateur-1',
    'title' => get_theme_mod('titre_separateur_1', 'LIENS UTILES')
)); ?>

<section class="Liens">
    <?php get_template_part('Johnny/Johnny'); ?>
</section>

<!-- Séparateur Orange Personnes Ressources-->
<?php get_template_part('David/Separateur', null, array(
    'id' => 'separateur-2',
    'title' => get_theme_mod('titre_separateur_2', 'PERSONNES RESSOURCES')
)); ?>

<section class="Profs">
  <?php get_template_part('Arthur/Ressources'); ?>
</section>

<!-- Séparateur Vert Documents Téléchargeables-->
<?php get_template_part('David/Separateur', null, array(
    'id' => 'separateur-3',
    'title' => get_theme_mod('titre_separateur_3', 'DOCUMENTS TÉLÉCHARGEABLES')
)); ?>

<section class="Documents">
    <?php get_template_part('David/DocumentsTelechargeables'); ?>
</section>

<?php get_template_part('David/SeparateurCanevas'); ?>

<?php get_footer(); ?>



