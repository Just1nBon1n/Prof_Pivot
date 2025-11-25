<?php
$count = get_theme_mod('liens_utiles_count', 6);
?>

<section class="section_LiensUtiles">
  <div class="grid-menu">

    <?php
    for ($i = 1; $i <= $count; $i++) :

      $label = get_theme_mod("lien_{$i}_label");
      $url   = get_theme_mod("lien_{$i}_url");
      $icon  = get_theme_mod("lien_{$i}_icon");

      if (!$url) continue;
    ?>

      <a href="<?php echo esc_url($url); ?>" class="menu-item" target="_blank" rel="noopener">
        <?php if ($icon) : ?>
          <img src="<?php echo esc_url($icon); ?>" class="icon" alt="<?php echo esc_attr($label); ?>">
        <?php endif; ?>
        <span class="text"><?php echo esc_html($label); ?></span>
      </a>

    <?php endfor; ?>

  </div>
</section>

<section class="section_LiensUtiles">
