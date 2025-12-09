document.addEventListener('DOMContentLoaded', () => {
  // ----- Profs pivots (David / Greg) -----
  const david = document.querySelector('.David');
  const greg = document.querySelector('.Greg');

  if (david && greg) {
    const davidCaption = david.querySelector('figcaption');
    const gregCaption = greg.querySelector('figcaption');

    const Styles = (el, props) => { if (!el) return; props.forEach(p => el.style[p] = ''); };

    const CacherCaption = (cap) => { if (!cap) return; cap.style.opacity = '0'; cap.style.transition = 'opacity 0.2s ease'; };
    const MontrerCaption = (cap) => { if (!cap) return; Styles(cap, ['opacity','transition']); };

    const DavidHover = () => {
      david.style.zIndex = '3';
      david.style.transform = 'translateX(50%)';
      david.style.transition = 'transform 0.3s ease-in-out';
      david.style.border = '2px solid var(--personnes-border-pivots-active)';
      david.style.filter = 'grayscale(0) blur(0)';
      david.style.zIndex = '3';
      // appliquer BOTH filters ensemble (ne pas écraser)
      greg.style.filter = 'grayscale(60%) blur(3px)';
      greg.style.transform = 'scale(0.95)';
      greg.style.transition = 'transform 0.3s ease-in-out, filter 0.3s ease-in-out';
      greg.style.transformOrigin = 'right center';
      greg.style.zIndex = '1';
      CacherCaption(gregCaption);
      davidCaption.style.filter = 'blur(.7px)'; // flouter légèrement son propre caption
    };
    const DavidLeave = () => {
      if (david.classList.contains('hover-locked')) return;
      // appliquer des transitions de sortie pour obtenir une animation fluide
      david.style.transition = 'transform 0.35s ease-in-out, border-color 0.18s ease, filter 0.35s ease-in-out';
      greg.style.transition  = 'transform 0.35s ease-in-out, filter 0.35s ease-in-out';

      // remettre les valeurs "par défaut" (vider transform/filter) pour que la transition anime
      david.style.transform = '';
      david.style.filter = '';
      greg.style.transform = '';
      greg.style.filter = '';

      // figcaptions
      Styles(davidCaption, ['filter']);
      MontrerCaption(gregCaption);

      // retirer zIndex + border inline après la transition (petit délai)
      window.setTimeout(() => {
        Styles(david, ['zIndex','transition','border','transform','filter']);
        Styles(greg,  ['transform','transformOrigin','transition','filter']);
      }, 380);
    };

    const GregHover = () => {
      greg.style.zIndex = '3';
      greg.style.transform = 'translateX(-50%)';
      greg.style.transition = 'transform 0.3s ease-in-out';
      greg.style.transformOrigin = 'right center';
      greg.style.border = '2px solid var(--personnes-border-pivots-active)';
      greg.style.filter = 'grayscale(0) blur(0)';
      greg.style.zIndex = '3';
      // appliquer BOTH filters sur david
      david.style.filter = 'grayscale(60%) blur(3px)';
      david.style.transform = 'scale(0.95)';
      david.style.transition = 'transform 0.3s ease-in-out, filter 0.3s ease-in-out';
      david.style.transformOrigin = 'left center';
      CacherCaption(davidCaption);
      gregCaption.style.filter = 'blur(.7px)'; // flouter légèrement son propre caption

    };
    const GregLeave = () => {
      if (greg.classList.contains('hover-locked')) return;
      greg.style.transition = 'transform 0.35s ease-in-out, border-color 0.18s ease, filter 0.35s ease-in-out';
      david.style.transition = 'transform 0.35s ease-in-out, filter 0.35s ease-in-out';

      greg.style.transform = '';
      greg.style.filter = '';
      david.style.transform = '';
      david.style.filter = '';

      Styles(gregCaption, ['filter']);
      MontrerCaption(davidCaption);

      window.setTimeout(() => {
        Styles(greg,  ['zIndex','transform','transition','transformOrigin','filter','border']);
        Styles(david, ['transform','transformOrigin','transition','filter']);
      }, 380);
    };

    // les listeners « simples » ont été retirés : on utilise les handlers
    // plus haut (activerDavid / activerGreg) qui gèrent le verrouillage et le texte.

    // ----- Texte au hover (blocs absolus left/right) -----
    const texteDavidBloc = document.querySelector('.prof-texte-david');
    const texteGregBloc  = document.querySelector('.prof-texte-greg');

    // david et greg existent déjà (vérifiés plus haut) — ne vérifier que les blocs texte
    if (texteDavidBloc && texteGregBloc) {

      const clearTextes = () => {
        texteDavidBloc.classList.remove('is-visible');
        texteGregBloc.classList.remove('is-visible');
        // réinitialiser les états visuels (si non verrouillés)
        // on appelle leave qui vérifiera le verrou
        DavidLeave();
        GregLeave();
      };

      // fonctions pour activer visuellement chaque prof
      const activerDavid = () => {
        texteDavidBloc.textContent = david.dataset.profText || '';
        texteDavidBloc.classList.add('is-visible');
        // ajouter verrou si souhaité (aide la stabilité)
        david.classList.add('hover-locked');
        texteGregBloc.classList.remove('is-visible');
        greg.classList.remove('hover-locked');
        DavidHover();
        MontrerCaption(davidCaption);
      };

      const desactiverDavid = () => {
        david.classList.remove('hover-locked');
        clearTextes();
      };

      const activerGreg = () => {
        texteGregBloc.textContent = greg.dataset.profText || '';
        texteGregBloc.classList.add('is-visible');
        greg.classList.add('hover-locked');
        texteDavidBloc.classList.remove('is-visible');
        david.classList.remove('hover-locked');
        GregHover();
        MontrerCaption(gregCaption);
      };

      const desactiverGreg = () => {
        greg.classList.remove('hover-locked');
        clearTextes();
      };


      // ---- Remplacement hover par click ----
      // click sur figure -> toggle open/close (préserve l'expérience visuelle actuelle via DavidHover/GregHover)
      david.addEventListener('click', (e) => {
        e.stopPropagation();
        if (texteDavidBloc.classList.contains('is-visible')) desactiverDavid();
        else activerDavid();
      });
      texteDavidBloc.addEventListener('click', (e) => {
        e.stopPropagation();
        if (texteDavidBloc.classList.contains('is-visible')) desactiverDavid();
        else activerDavid();
      });

      greg.addEventListener('click', (e) => {
        e.stopPropagation();
        if (texteGregBloc.classList.contains('is-visible')) desactiverGreg();
        else activerGreg();
      });
      texteGregBloc.addEventListener('click', (e) => {
        e.stopPropagation();
        if (texteGregBloc.classList.contains('is-visible')) desactiverGreg();
        else activerGreg();
      });

      // clic en dehors ferme tout
      document.addEventListener('click', () => {
        if (texteDavidBloc.classList.contains('is-visible')) desactiverDavid();
        if (texteGregBloc.classList.contains('is-visible')) desactiverGreg();
      });

      // --- positionner les blocs texte au centre (vertical) des images ---
      function setTextBlockPosition(block, img) {
        if (!block || !img) return;
        const pivots = document.querySelector('.pivots') || document.body;
        const pivotsRect = pivots.getBoundingClientRect();
        const imgRect = img.getBoundingClientRect();

        // centre vertical de l'image, en coordonnées relatives à .pivots
        const centerY = (imgRect.top - pivotsRect.top) + (imgRect.height / 9);

        block.style.position = 'absolute';
        block.style.top = Math.round(centerY) + 'px';
        // conserver translateY(-50%) dans le CSS pour centrer exactement
      }

      function positionProfTextBlocks() {
        const imgDavid = david.querySelector('.img-pivots');
        const imgGreg  = greg.querySelector('.img-pivots');
        setTextBlockPosition(texteDavidBloc, imgDavid);
        setTextBlockPosition(texteGregBloc, imgGreg);
      }

      // repositionne maintenant si images déjà chargées ou quand elles se chargent
      const imgD = david.querySelector('.img-pivots');
      const imgG = greg.querySelector('.img-pivots');
      if (imgD) {
        if (imgD.complete) positionProfTextBlocks();
        else imgD.addEventListener('load', positionProfTextBlocks);
      }
      if (imgG) {
        if (imgG.complete) positionProfTextBlocks();
        else imgG.addEventListener('load', positionProfTextBlocks);
      }

      // recalculer au redimensionnement, orientationchange et scroll
      window.addEventListener('resize', positionProfTextBlocks);
      window.addEventListener('orientationchange', positionProfTextBlocks);
      window.addEventListener('scroll', positionProfTextBlocks, { passive: true });
      // appel initial de sécurité
      positionProfTextBlocks();
    }
  }

  // toggle classe hover-david pour afficher le texte à gauche (si present)
  const zoneDavid = document.querySelector('.zone-david');
  if (zoneDavid && david) {
    david.addEventListener('mouseenter', () => zoneDavid.classList.add('hover-david'));
    david.addEventListener('mouseleave', () => zoneDavid.classList.remove('hover-david'));
    // tactile / clic : toggle (optionnel — garde le texte visible après le premier tap)
    david.addEventListener('touchstart', (e) => {
      // empêcher double déclenchement mouse events sur certains navigateurs
      e.stopPropagation();
      zoneDavid.classList.toggle('hover-david');
    }, { passive: true });
  }

  // Carousel JS removed — le carrousel est géré par le markup/CSS uniquement maintenant.

}); // fin DOMContentLoaded

// ----- Carousel play / stop -----
const slider = document.querySelector('.slider');
const btnPlay = document.getElementById('btn-play');
const btnStop = document.getElementById('btn-stop');

function updateSliderButtonsState() {
  if (!btnPlay || !btnStop) return;
  // si slider présent, lire son état d'animation ; sinon se baser sur les classes
  let state = null;
  if (slider) {
    // try computed style first, fallback to inline style
    const computed = window.getComputedStyle(slider);
    state = computed && computed.animationPlayState ? computed.animationPlayState : slider.style.animationPlayState;
  }
  // default to 'running' if null
  if (!state) state = 'running';

  if (state === 'running') {
    btnPlay.classList.add('is-active');
    btnStop.classList.remove('is-active');
  } else {
    btnPlay.classList.remove('is-active');
    btnStop.classList.add('is-active');
  }
}

if (btnPlay && btnStop) {
  btnPlay.addEventListener('click', () => {
    if (slider) slider.style.animationPlayState = 'running';
    // si pas de slider, on force l'état visuel uniquement
    updateSliderButtonsState();
  });

  btnStop.addEventListener('click', () => {
    if (slider) slider.style.animationPlayState = 'paused';
    updateSliderButtonsState();
  });

  // initialiser l'état des boutons au chargement
  updateSliderButtonsState();

  // si le slider existe et que son animationPlayState peut changer par CSS/JS externe,
  // on surveille les changements via mutation observer sur l'attribut style (optionnel)
  if (slider && typeof MutationObserver !== 'undefined') {
    const mo = new MutationObserver(() => updateSliderButtonsState());
    mo.observe(slider, { attributes: true, attributeFilter: ['style'] });
  }
}

( function( wp ) {
  if ( ! wp || ! wp.customize ) return;

  function safeSet(selector, html, isHTML) {
    var el = document.querySelector(selector);
    if (!el) return;
    if (isHTML) el.innerHTML = html;
    else el.textContent = html;
  }

  for (var i = 1; i <= 4; i++) {
    (function(i){
      wp.customize('res_titre_item_' + i, function(value) {
        value.bind(function(newval) {
          safeSet('.slider .item:nth-child(' + i + ') .flip-card-front h2', newval, false);
        });
      });
      wp.customize('res_description_item_' + i, function(value) {
        value.bind(function(newval) {
          safeSet('.slider .item:nth-child(' + i + ') .flip-card-back p', newval, true);
        });
      });
    })(i);
  }
})( window.wp );
