<?php get_header(); ?>

<!-- Inclusion du fichier background.php -->
<div id="bg-container"></div>

<Section class = "page_404">
    <div class = 404_container></div>
        <h1>404</h1>
        <h2>Cette section n'existe pas</h2>
        <a class = "btn_retourner" href="<?php echo home_url(); ?>">
            Retourner à l'acceuil
        </a>
    </div>
</Section>

<?php get_footer(); ?>

