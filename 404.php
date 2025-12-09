<?php get_header(); ?>

<!-- Inclusion du fichier background.php -->
<?php get_template_part('justin/background'); ?>
<script>
    const cubesBase = "<?php echo get_stylesheet_directory_uri(); ?>/justin/images/";
</script>
<script src="<?php echo get_template_directory_uri(); ?>/js/background.js"></script>


<Section class = "page_404">
    <div class = 404_container></div>
        <h1>404</h1>
        <h2>Cette section n'existe pas</h2>
        <a class = "btn_retourner" href="<?php echo home_url(); ?>">
            Retourner à l'acceuil
        </a>
    </div>
</Section>

<?php get_template_part(
    'David/SeparateurCanevas', 
    null, 
    array(
        'color' => '#555555',
        'title' => get_theme_mod('', '')
    )
); ?>

<script src="<?php echo get_template_directory_uri(); ?>/js/fonctions_canevas_separateur.js"></script>

<?php get_footer(); ?>

