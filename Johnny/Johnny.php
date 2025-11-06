<section class="section_LiensUtiles">
  <div class="grid-menu">
    <?php
    // mêmes identifiants que dans ton Customizer
    $liens = ['instagram', 'omnivox', 'ate', 'linkedin', 'calendrier_tim', 'calendrier_ecole', 'evaluations', 'profs', 'stages', 'tutorat', 'materiel', 'behance'];

    foreach ($liens as $lien) :
        $url  = get_theme_mod("lien_{$lien}_url");
        $icon = get_theme_mod("lien_{$lien}_icon");

        // Nom lisible (tu peux le remplacer par un tableau associatif pour plus de contrôle)
        $label = ucfirst(str_replace('_', ' ', $lien));

        if ($url) : ?>
          <a href="<?php echo esc_url($url); ?>" class="menu-item" target="_blank" rel="noopener">
            <?php if ($icon) : ?>
              <img src="<?php echo esc_url($icon); ?>" class="icon" alt="<?php echo esc_attr($label); ?>" />
            <?php else : ?>
              <!-- Icône par défaut si aucune n’est mise -->
              <img src="<?php echo get_template_directory_uri(); ?>/Johnny/icones/default.svg" class="icon" alt="<?php echo esc_attr($label); ?>" />
            <?php endif; ?>
            <span class="text"><?php echo esc_html($label); ?></span>
          </a>
        <?php endif;
    endforeach; ?>
  </div>
</section>
