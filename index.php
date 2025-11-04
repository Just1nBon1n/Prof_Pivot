<?php get_header(); ?>

<!-- Curseur personnalisé -->
 <?php get_template_part('justin/curseur'); ?>
<!-- Inclusion du fichier accueil.php -->
<?php get_template_part('justin/acceuil'); ?>
<!-- <section class="Pixel PixelsB"></section> -->
<?php get_template_part('David/Separateur', null, array('id' => 'separateur-1', 'title' => 'LIENS UTILES'));?>
<section class="Liens">
    <?php get_template_part('Johnny/Johnny'); ?>
</section>
<!-- <section class="Pixel PixelsO"></section> -->
<?php get_template_part('David/Separateur', null, array('id' => 'separateur-2', 'title' => 'PERSONNES RESSOURCES'));?>
<section class="Profs">
  <?php get_template_part('Arthur/Ressources'); ?>
</section>
<!-- <section class="Pixel Pixelsv"></section> -->
<?php get_template_part('David/Separateur', null, array('id' => 'separateur-3', 'title' => 'DOCUMENTS TÉLÉCHARGEABLES'));?>
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



