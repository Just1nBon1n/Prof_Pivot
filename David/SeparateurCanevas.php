<?php
// Couleur et titre dynamiques
$color = isset($args['color']) ? $args['color'] : '';
$title = isset($args['title']) ? $args['title'] : '';
?>

<div class="wrapper separateur-wrapper">
    <?php if ($title) : ?>
        <h2 class="titre-section"><?php echo esc_html($title); ?></h2>
    <?php endif; ?>

    <canvas class="separateur-canevas" data-color="<?php echo esc_attr($color); ?>"></canvas>
</div>
