<section class="Ressources">
  <section class="pivots">
  <h2 class="res-titre">Profs pivots</h2>
  <div class="prof">
      <figure class="David">
        <img class="img-pivots" src="<?php echo get_template_directory_uri(); ?>/Arthur/images/David.png" alt="">
        <figcaption>Appuyez pour plus d'infos sur David</figcaption>
      </figure>
       <figure class="Greg">
        <img class="img-pivots" src="<?php echo get_template_directory_uri(); ?>/Arthur/images/Greg.png" alt="">
        <figcaption>Appuyez pour plus d'infos sur Grégory</figcaption>
       </figure>
  </div>
  </section>
  <section class="aide">
  <h2 class="res-titre">Soutien et encadrement</h2>
  <div class="controls">
    <button id="btn-play" class="btn-pixel">Play</button>
    <button id="btn-stop" class="btn-pixel">Stop</button>
  </div>
  <div class="banner">
    <div class="slider" style="--quantity: 4">
      <?php for ($i = 1; $i <= 4; $i++) :
        // priorité au Customizer (theme_mod) ; si vide, fallback vers ACF (get_field)
        $titre = get_theme_mod("res_titre_item_$i", get_field("titre_item_$i"));
        $desc  = get_theme_mod("res_description_item_$i", get_field("description_item_$i"));
      ?>
        <div class="item" style="--position: <?= esc_attr($i) ?>">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <?php 
                $image = get_theme_mod("res_image_item_$i", get_field("image_item_$i"));
                if ($image) : 
              ?>
                <img src="<?= esc_url($image) ?>" alt="<?= esc_attr($titre) ?>">
              <?php else : ?>
                <h2><?= esc_html($titre) ?></h2>
              <?php endif; ?>
            </div>
            <div class="flip-card-back">
              <p><?= wp_kses_post($desc) ?></p>
            </div>
          </div>
        </div>
      <?php endfor; ?>
    </div>
  </div>
  </section>

</section>
<script src="<?php echo get_template_directory_uri(); ?>/Arthur/js/arthur.js"></script>
