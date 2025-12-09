<section class="Ressources">
  <section class="pivots">
  <h2 class="res-titre"><?php echo esc_html( get_theme_mod('res_titre_profs_pivots', 'Profs pivots') ); ?></h2>
  <div class="prof">
    <div class="prof-texte-content prof-texte-david" aria-live="polite"></div>
    <div class="prof-texte-content prof-texte-greg" aria-live="polite"></div>
    <figure class="David" data-prof-text="<?php echo esc_attr( wp_strip_all_tags( get_theme_mod('prof_david_text', 'Texte de présentation de David.') ) ); ?>">
      <?php
        $david_img = get_theme_mod('prof_david_image', '');
        $david_src = $david_img ? esc_url( $david_img ) : esc_url( get_template_directory_uri() . '/Arthur/images/David.png' );
      ?>
      <img class="img-pivots" src="<?php echo $david_src; ?>" alt="<?php echo esc_attr( get_theme_mod('prof_david_h2', 'David') ); ?>">
      <figcaption><?php echo esc_html( get_theme_mod('prof_david_caption', 'Survolez pour plus d\'infos sur David') ); ?></figcaption>
    </figure>
    <figure class="Greg" data-prof-text="<?php echo esc_attr( wp_strip_all_tags( get_theme_mod('prof_greg_text', 'Texte de présentation de Grégory.') ) ); ?>">
      <?php
        $greg_img = get_theme_mod('prof_greg_image', '');
        $greg_src = $greg_img ? esc_url( $greg_img ) : esc_url( get_template_directory_uri() . '/Arthur/images/Greg.png' );
      ?>
      <img class="img-pivots" src="<?php echo $greg_src; ?>" alt="<?php echo esc_attr( get_theme_mod('prof_greg_h2', 'Grégory') ); ?>">
      <figcaption><?php echo esc_html( get_theme_mod('prof_greg_caption', 'Survolez pour plus d\'infos sur Grégory') ); ?></figcaption>
    </figure>
  </div>
  </section>
  <section class="aide">
  <h2 class="res-titre"><?php echo esc_html( get_theme_mod('res_titre_soutien_encadrement', 'Soutien et encadrement') ); ?></h2>
  <div class="controls">
    <button id="btn-play" class="btn-pixel">
      <?php echo esc_html( get_theme_mod('res_btn_play_text', 'Play') ); ?>
    </button>
    <button id="btn-stop" class="btn-pixel">
      <?php echo esc_html( get_theme_mod('res_btn_stop_text', 'Stop') ); ?>
    </button>
  </div>
  <div class="banner">
    <?php
      $quantity = (int) get_theme_mod( 'res_slider_quantity', 4 );
      if ( $quantity < 1 ) {
          $quantity = 1;
      }
    ?>
    <div class="slider" style="--quantity: <?php echo esc_attr( $quantity ); ?>">
      <?php for ( $i = 1; $i <= $quantity; $i++ ) :

        $titre = (string) get_theme_mod( "res_titre_item_$i", '' );
        $desc  = (string) get_theme_mod( "res_description_item_$i", '' );
        $image = (string) get_theme_mod( "res_image_item_$i", '' );

        // optionnel : ne pas afficher les cartes totalement vides
        if ( ! $titre && ! $desc && ! $image ) {
          continue;
        }
      ?>
        <div class="item" style="--position: <?php echo esc_attr( $i ); ?>">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <?php if ( $image ) : ?>
                <img src="<?php echo esc_url( $image ); ?>" alt="<?php echo esc_attr( $titre ); ?>">
              <?php else : ?>
                <h2><?php echo esc_html( $titre ); ?></h2>
              <?php endif; ?>
            </div>
            <div class="flip-card-back">
              <p><?php echo wp_kses_post( $desc ); ?></p>
            </div>
          </div>
        </div>
      <?php endfor; ?>
    </div>
   </div>
  </section>

</section>
<script src="<?php echo get_template_directory_uri(); ?>/Arthur/js/arthur.js"></script>
