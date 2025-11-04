<?php get_header(); ?>

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

<!-- Scripts Snake -->
<script src="<?php echo get_template_directory_uri(); ?>/js/couleursUtils.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/lumieres_snake.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/fonctions_snake.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/UImanager_snake.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/curseur.js"></script>

<?php get_footer(); ?>



