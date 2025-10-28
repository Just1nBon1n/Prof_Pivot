document.addEventListener('DOMContentLoaded', () => {
  const david = document.querySelector('.David');
  const greg = document.querySelector('.Greg');
  if (!david || !greg) return;

  const davidCaption = david.querySelector('figcaption');
  const gregCaption = greg.querySelector('figcaption');

  const Styles = (el, props) => { if (!el) return; props.forEach(p => el.style[p] = ''); };

  const CacherCaption = (cap) => { if (!cap) return; cap.style.opacity = '0'; cap.style.transition = 'opacity 0.2s ease'; };
  const MontrerCaption = (cap) => { if (!cap) return; Styles(cap, ['opacity','transition']); };

  const DavidHover = () => {
    david.style.zIndex = '3';
    david.style.transform = 'scaleX(1.5)';
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

  // Support tactile : toggle au clic
  david.addEventListener('click', () => {
    const active = david.style.transform && david.style.transform !== '';
    if (active) DavidLeave(); else DavidHover();
  });
  greg.addEventListener('click', () => {
    const active = greg.style.transform && greg.style.transform !== '';
    if (active) GregLeave(); else GregHover();
  });
});
