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

<?php get_footer(); ?>



