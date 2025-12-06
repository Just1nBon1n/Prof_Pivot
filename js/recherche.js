const toggleSearch = () => {
  const searchForm = document.querySelector('.search-form');
  const searchButton = document.querySelector('.search-button');
  const searchInput = document.querySelector('.search-input');

  let scrollTimeout;
  let isClicked = false;

  // Mots clés
  const sections = {
    liens: {
      keywords: ['liens', 'links', 'utile', 'Tutorat', 'Materiel', 'Stage', 'ate', 'evaluation', 'Calendrier', 'Disponibilite', 'omnivox'],
      target: '#separateur-1'
    },
    profs: {
      keywords: ['profs', 'enseignants', 'ressources', 'soutien', 'Gregory','David','Cetim', 'Pivot'],
      target: '#separateur-2'
    },
    documents: {
      keywords: ['documents', 'docs', 'telechargement', 'contrat', 'Grille', 'Pondération', 'Adobe','MacOS'],
      target: '#separateur-3'
    }
  };

  // Custom smooth scroll
  const smoothScrollTo = (target, duration = 700) => {
    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + window.scrollY;

    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeInOutQuad
      const easing = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(0, start + (end - start) * easing);

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  // Trouver la section
  const findSection = (query) => {
    query = query.toLowerCase();

    for (const key in sections) {
      const { keywords, target } = sections[key];

      if (keywords.some(k => k.startsWith(query))) {
        return target;
      }
    }
    return null;
  };

  // Click pour ouvrir et fermer
  searchButton.addEventListener('click', () => {
    searchForm.classList.toggle('active-search');
    isClicked = searchForm.classList.contains('active-search');
    searchForm.classList.add('visible');
  });

  // Enter to search
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const query = searchInput.value.trim();
      searchInput.value = '';

      const selector = findSection(query);
      const target = selector ? document.querySelector(selector) : null;

      if (target) {
        smoothScrollTo(target, 800); // adjust speed here
      }

      searchForm.classList.remove('active-search');
      isClicked = false;
    }
  });

  // Show/hide on scroll
  window.addEventListener('scroll', () => {
    if (!isClicked) {
      searchForm.classList.add('visible');
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (!isClicked) {
        searchForm.classList.remove('visible');
      }
    }, 2000);
  });
};

toggleSearch();
