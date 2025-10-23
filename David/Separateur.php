<?php
$args = wp_parse_args($args, array(
    'id' => 'default-separator',
    'title' => 'Default Title',
));
?>

<div class="grand-conteneur-separateur" id="<?php echo esc_attr($args['id']); ?>">
    <h2 class="titre-section"><?php echo esc_html($args['title']); ?></h2>
</div>

<script src="<?php echo get_template_directory_uri(); ?>/js/fonctions_separateur.js"></script>