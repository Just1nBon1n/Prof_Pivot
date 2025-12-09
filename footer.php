<footer>
    <div>
      <section class="dessus">
        <section class="nous-joindre">
          <h2 class="titre-nous-joindre">Nous Joindre</h2>
          <h2 class="no-telephone">(514) - 254 - 7131</h2>
        </section>
        <section class="medias-sociaux">
          <h2 class="titre-medias-sociaux">Médias Sociaux</h2>
          <?php
            $nombre_icones = get_theme_mod('nombre_icones', 3);
          ?>
          <div class="footer-icones-sociales">
              <?php for ($k = 0; $k < $nombre_icones; $k++): ?>
                  <?php
                  $icone_image = get_theme_mod("footer_image_icone_sociale_$k", '');
                  $icone_lien = get_theme_mod("footer_lien_icone_sociale_$k", '#');
                  ?>
                  <?php if ($icone_image): ?>
                      <a href="<?php echo esc_url($icone_lien); ?>" target="_blank" rel="noopener noreferrer">
                          <img src="<?php echo esc_url($icone_image); ?>" alt="<?php printf(__('Social Icon %d', 'theme_31w'), $k + 1); ?>" class="icone-sociale">
                      </a>
                  <?php endif; ?>
              <?php endfor; ?>
          </div>
        </section>
      </section>
      <section class="dessous">
        <h2 class="adresse">3800 rue Sherbrooke E,<br>Montréal QUÉBEC H1X 2A2</h2>
      </section>
    </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
