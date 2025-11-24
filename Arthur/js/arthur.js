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

  // Carousel JS removed — le carrousel est géré par le markup/CSS uniquement maintenant.

}); // fin DOMContentLoaded
