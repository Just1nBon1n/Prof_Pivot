document.addEventListener("DOMContentLoaded", () => {
    const cube = document.getElementById("credits-cube");
    const modal = document.getElementById("credits-fond");
    const closeBtn = document.getElementById("close-credits");
    
    // Durée de l'animation CSS (en millisecondes, correspond à 0.4s)
    const ANIMATION_DURATION = 400;

    // --- Fonction d'ouverture ---
    const openModal = () => {
        modal.classList.remove("closing"); 
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
    };

    // --- Fonction de fermeture ---
    const closeModal = () => {
        if (!modal.classList.contains("open")) return;
        
        // 1. Déclenche l'animation de sortie (part vers le bas)
        modal.classList.add("closing");

        // 2. Cache complètement la modale après l'animation (0.4s)
        // C'est la méthode la plus fiable
        setTimeout(() => {
            modal.classList.remove("open", "closing");
            document.body.style.overflow = "";
        }, ANIMATION_DURATION); 
    };

    // --- Écouteurs d'événements ---

    // Ouvre la carte des crédits
    cube.addEventListener("click", openModal);
    
    // Ferme via le bouton X
    closeBtn.addEventListener("click", closeModal);

    // Ferme via le clic sur le fond (backdrop)
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Ferme via la touche Échap (ESC)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});