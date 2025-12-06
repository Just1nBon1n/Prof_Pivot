document.addEventListener("DOMContentLoaded", function() {
    const navBlocks = document.querySelectorAll('.side-nav-blocks .nav-block');
    

    function scrollASection(sectionId) {
        let targetElement;
        
        if (sectionId === 'Accueil') {
            // Remonter au tout début de la page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        targetElement = document.getElementById(sectionId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start' // Aligne le haut de l'élément avec le haut du viewport
            });
        }
    }

    // --- Écouteur de clic sur les blocs de navigation ---
    navBlocks.forEach(block => {
        block.addEventListener('click', function(e) {
            e.preventDefault(); // Empêche le saut instantané du navigateur
            
            const sectionId = this.getAttribute('href').substring(1);
            scrollASection(sectionId);
        });
    });
});