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
      // david.style.transform = 'scaleX(1.5)';
      david.style.transform = 'translateX(50%)';
      david.style.transition = 'transform 0.3s ease-in-out';
      greg.style.transform = 'scaleX(0.5)';
      greg.style.transition = 'transform 0.3s ease-in-out';
      greg.style.transformOrigin = 'right center';
      CacherCaption(gregCaption);
    };
    const DavidLeave = () => {
      Styles(david, ['zIndex','transform','transition']);
      Styles(greg, ['transform','transformOrigin','transition']);
      MontrerCaption(gregCaption);
    };
    const GregHover = () => {
      greg.style.zIndex = '3';
      greg.style.transform = 'scaleX(1.5)';
      greg.style.transition = 'transform 0.3s ease-in-out';
      greg.style.transformOrigin = 'right center';
      david.style.transform = 'scaleX(0.5)';
      david.style.transition = 'transform 0.3s ease-in-out';
      david.style.transformOrigin = 'left center';
      CacherCaption(davidCaption);
    };
    const GregLeave = () => {
      Styles(greg, ['zIndex','transform','transition','transformOrigin']);
      Styles(david, ['transform','transformOrigin','transition']);
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

    // track garde 100% de la zone visible ; chaque slide = 100% du track
    track.style.display = 'flex';
    track.style.transition = 'transform 0.6s ease';
    track.style.willChange = 'transform';
    // track.style.overflow = 'hidden';
    track.style.width = '100%';

    slides.forEach(li => {
      li.style.flex = '0 0 100%';   // chaque slide prend 100% du track (une seule visible)
      li.style.width = '100%';
      li.style.boxSizing = 'border-box';
    });

    let currentIndex = 0;

    const goTo = (index) => {
      currentIndex = (index + total) % total;
      // translation par pas de 100% du track (une slide)
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      slides.forEach((s, i) => s.classList.toggle('active', i === currentIndex));
    };

    // autoplay / controls (modifié : premier click stoppe l'autoplay mais ne change pas l'index)
    let autoplay = setInterval(() => goTo(currentIndex + 1), 3000);
    let autoplayStoppedByUser = false; // true si l'utilisateur a cliqué pour stopper
    let firstClickIgnored = false;     // true après le premier click (qui n'indexe pas)

    track.addEventListener('mouseenter', () => {
      clearInterval(autoplay);
    });
    track.addEventListener('mouseleave', () => {
      // ne redémarre pas si l'utilisateur a cliqué pour arrêter
      if (!autoplayStoppedByUser) {
        clearInterval(autoplay);
        autoplay = setInterval(() => goTo(currentIndex + 1), 3000);
      }
    });

    track.addEventListener('click', (e) => {
      // Premier clic : stoppe l'autoplay mais ne change pas l'index
      if (!firstClickIgnored) {
        clearInterval(autoplay);
        autoplayStoppedByUser = true;
        firstClickIgnored = true;
        return;
      }

      // Clics suivants : comportement normal (navigation)
      clearInterval(autoplay);
      autoplayStoppedByUser = true;
      const rect = track.getBoundingClientRect();
      const x = e.clientX - rect.left;
      if (x < rect.width / 2) goTo(currentIndex - 1); else goTo(currentIndex + 1);
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
      if (e.key === 'ArrowRight') goTo(currentIndex + 1);
    });
    window.addEventListener('resize', () => {
      // réappliquer au resize (garde 1 slide visible)
      slides.forEach(li => { li.style.flex = '0 0 100%'; li.style.width = '100%'; });
      goTo(currentIndex);
    });

    // init
    goTo(0);
  }
});
