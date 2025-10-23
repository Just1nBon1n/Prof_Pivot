<?php get_header(); ?>

<!-- Inclusion du fichier accueil.php -->
<?php get_template_part('justin/acceuil'); ?>

<!-- <section class="Pixel PixelsB"></section> -->
<?php get_template_part('David/Separateur'); ?>
<section id="Imp" class="Liens"></section>
<!-- <section class="Pixel PixelsO"></section> -->
<?php get_template_part('David/Separateur'); ?>
<section id="Imp" class="Profs"></section>
<!-- <section class="Pixel Pixelsv"></section> -->
<?php get_template_part('David/Separateur'); ?>
<section id="Imp" class="Documents">
    <?php get_template_part('David/DocumentsTelechargeables'); ?>
</section>
<h1>TEST</h1>
<?php get_footer(); ?>


