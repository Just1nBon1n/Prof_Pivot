const toggleSearch = () => {
  const searchForm = document.querySelector('.search-form');
  const searchButton = document.querySelector('.search-button');
  const searchInput = document.querySelector('.search-input');

  let scrollTimeout;
  let isClicked = false;

  //Élément du click pour ouvrir et fermer
  searchButton.addEventListener('click', () => {
    searchForm.classList.toggle('active-search');
    isClicked = searchForm.classList.contains('active-search');
    searchForm.classList.add('visible'); // toujours visible quand clické
  });

  //Enter 
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchInput.value = '';
      searchForm.classList.remove('active-search');
      isClicked = false;
    }
  });

  // Cacher et montrer la barre de recherche 
  window.addEventListener('scroll', () => {
    if (!isClicked) {
      searchForm.classList.add('visible');
    }

    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      if (!isClicked) {
        searchForm.classList.remove('visible');
      }
    }, 1000); //Cacher la barre de recherche après une seconde 
  });
};

toggleSearch();
