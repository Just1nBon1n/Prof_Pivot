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
      // appliquer BOTH filters ensemble (ne pas écraser)
      greg.style.filter = 'grayscale(60%) blur(3px)';
      greg.style.transform = 'scale(0.95)';
      greg.style.transition = 'transform 0.3s ease-in-out, filter 0.3s ease-in-out';
      greg.style.transformOrigin = 'right center';
      CacherCaption(gregCaption);
    };
    const DavidLeave = () => {
      // réinitialiser transform/transition/filter
      Styles(david, ['zIndex','transform','transition','filter']);
      Styles(greg, ['transform','transformOrigin','transition','filter']);
      MontrerCaption(gregCaption);
    };
    const GregHover = () => {
      greg.style.zIndex = '3';
      greg.style.transform = 'translateX(-50%)';
      greg.style.transition = 'transform 0.3s ease-in-out';
      greg.style.transformOrigin = 'right center';
      // appliquer BOTH filters sur david
      david.style.filter = 'grayscale(60%) blur(3px)';
      david.style.transform = 'scale(0.95)';
      david.style.transition = 'transform 0.3s ease-in-out, filter 0.3s ease-in-out';
      david.style.transformOrigin = 'left center';
      CacherCaption(davidCaption);
    };
    const GregLeave = () => {
      Styles(greg, ['zIndex','transform','transition','transformOrigin','filter']);
      Styles(david, ['transform','transformOrigin','transition','filter']);
      MontrerCaption(davidCaption);
    };

    david.addEventListener('mouseenter', DavidHover);
    david.addEventListener('mouseleave', DavidLeave);
    greg.addEventListener('mouseenter', GregHover);
    greg.addEventListener('mouseleave', GregLeave);

    // tactile : toggle au clic
    david.addEventListener('click', () => {
      const active = david.style.transform && david.style.transform !== '';
      if (active) DavidLeave(); else DavidHover();
    });
    greg.addEventListener('click', () => {
      const active = greg.style.transform && greg.style.transform !== '';
      if (active) GregLeave(); else GregHover();
    });
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

  // ----- Carrousel .aide (4 li dans le DOM, 1 visible à la fois) -----
  const track = document.querySelector('.aide ul');
  if (track) {
    const slides = Array.from(track.querySelectorAll('li'));
    const total = slides.length;
    if (total === 0) return;

    // setup track / slides
    const container = track.parentElement || track;
    track.style.display = 'flex';
    track.style.willChange = 'transform';
    track.style.width = '100%';
    slides.forEach(li => {
      li.style.flex = '0 0 100%';
      li.style.width = '100%';
      li.style.boxSizing = 'border-box';
    });

    // état
    let currentIndex = 0;
    let autoplay = null;
    let isPausedByUser = false;         // true si l'utilisateur a mis en pause
    let animationsPausedByUser = false; // stoppe les transitions visuelles si true

    // helpers autoplay
    const startAutoplay = () => {
      clearInterval(autoplay);
      autoplay = setInterval(() => goTo(currentIndex + 1), 3000);
      window.carouselAutoplayInterval = autoplay;
    };
    const stopAutoplay = () => {
      clearInterval(autoplay);
      autoplay = null;
      window.carouselAutoplayInterval = null;
    };

    // pause / resume (appelables depuis UI)
    const pauseCarousel = () => {
      if (isPausedByUser) return;
      isPausedByUser = true;
      animationsPausedByUser = true;
      stopAutoplay();
      track.style.transition = 'none';
      slides.forEach(s => { s.style.transition = 'none'; });
      container.classList && container.classList.add('paused');
      window.carouselIsPaused = true;
    };
    const resumeCarousel = () => {
      if (!isPausedByUser) return;
      isPausedByUser = false;
      animationsPausedByUser = false;
      // remettre transitions (les goTo gèrent la transition)
      slides.forEach(s => { s.style.transition = ''; });
      container.classList && container.classList.remove('paused');
      startAutoplay();
      window.carouselIsPaused = false;
    };

    // fonction de navigation principale
    const goTo = (index) => {
      const prevIndex = currentIndex;
      // boucle infinie des index
      let nextIndex = index % total;
      if (nextIndex < 0) nextIndex = (total + nextIndex) % total;
      if (nextIndex === prevIndex) return;

      const useAnimation = !animationsPausedByUser;
      track.style.transition = useAnimation ? "transform 0.8s cubic-bezier(.2,.8,.2,1)" : "none";
      slides.forEach(s => {
        s.style.transition = useAnimation ? "transform 0.8s cubic-bezier(.2,.8,.2,1), box-shadow 0.6s ease" : "none";
      });

      const outgoing = slides[prevIndex];
      if (outgoing) {
        outgoing.classList.remove("active");
        outgoing.style.transform = "translateY(-2.5rem)";
        outgoing.style.boxShadow = "none";
        outgoing.style.zIndex = "1";
      }

      const incoming = slides[nextIndex];
      if (incoming) {
        incoming.classList.add("active");
        incoming.style.zIndex = "5";
        incoming.style.transform = "translateY(-2.5rem)";
      }

      track.style.transform = `translateX(${-nextIndex * 100}%)`;

      if (incoming) {
        void incoming.offsetHeight;
        incoming.style.transform = "translateY(0)";
      }

      slides.forEach((s, i) => {
        if (i !== nextIndex && i !== prevIndex) {
          s.classList.remove("active");
          s.style.transform = "translateY(-2.5rem)";
          s.style.boxShadow = "none";
          s.style.zIndex = "1";
        }
      });

      currentIndex = nextIndex;
    };

    // démarrer autoplay par défaut
    startAutoplay();

    // pointerdown => toggle pause/resume (arrête exactement là où on a cliqué)
    track.addEventListener('pointerdown', (e) => {
      // empêcher le click suivant d'être traité comme navigation (on gère tout ici)
      e.preventDefault();
      e.stopImmediatePropagation();

      if (!isPausedByUser) {
        pauseCarousel();
      } else {
        resumeCarousel();
      }
    }, { passive: false });

    // click sur track (navigation) uniquement si non-paused
    track.addEventListener('click', (e) => {
      if (isPausedByUser) return; // interdit de naviguer quand en pause
      const rect = track.getBoundingClientRect();
      const x = e.clientX - rect.left;
      if (x < rect.width / 2) goTo(currentIndex - 1); else goTo(currentIndex + 1);
    });

    // hover stop/start autoplay behaviour (respecte pause utilisateur)
    track.addEventListener('mouseenter', () => { if (!isPausedByUser) stopAutoplay(); });
    track.addEventListener('mouseleave', () => { if (!isPausedByUser) startAutoplay(); });

    // flèches prev/next : si paused => resume ; sinon navigue
    const prevArrow = document.querySelector('.carousel-arrow.left');
    const nextArrow = document.querySelector('.carousel-arrow.right');
    if (prevArrow) {
      prevArrow.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isPausedByUser) { resumeCarousel(); return; }
        stopAutoplay();
        goTo(currentIndex - 1);
      });
    }
    if (nextArrow) {
      nextArrow.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isPausedByUser) { resumeCarousel(); return; }
        stopAutoplay();
        goTo(currentIndex + 1);
      });
    }

    // clavier : interdit quand paused
    window.addEventListener('keydown', (e) => {
      if (isPausedByUser) return;
      if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
      if (e.key === 'ArrowRight') goTo(currentIndex + 1);
    });

    // resize -> réappliquer tailles / reposition
    window.addEventListener('resize', () => {
      slides.forEach(li => { li.style.flex = '0 0 100%'; li.style.width = '100%'; });
      goTo(currentIndex);
    });

    // init position
    goTo(0);
  } // fin du if(track)
});
