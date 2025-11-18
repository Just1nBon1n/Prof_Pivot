document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.querySelector(".search-bar");

    if (!searchBar) return;

    searchBar.addEventListener("click", (e) => {
        e.stopPropagation();
        searchBar.classList.toggle("open");
    });

    // Ferme quand on clique ailleurs
    document.addEventListener("click", () => {
        searchBar.classList.remove("open");
    });
});