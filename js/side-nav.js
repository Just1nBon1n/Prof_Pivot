document.addEventListener("DOMContentLoaded", function () {
    const navBlocks = document.querySelectorAll('.side-nav-blocks .nav-block');
    let isAutoScrolling = false; // Flag pour scroll automatique

    // --- Fonction pour activer un bloc ---
    window.setActiveBlock = function(block) {
        const oldActive = document.querySelector(".nav-block.active");
        if (oldActive) {
            oldActive.classList.remove("active");
            oldActive.classList.remove("just-activated");
        }

        block.classList.add("active");
        block.classList.add("just-activated");

        setTimeout(() => {
            block.classList.remove("just-activated");
        }, 600);
    };

    // --- Détecte la section visible pour activer le bloc ---
    function updateActiveBlock() {
        if (isAutoScrolling) return; // Ne rien faire pendant un scroll automatique

        const currentScroll = window.scrollY;
        let activeSet = false;

        if (currentScroll < 10) {
            const accueilBlock = document.getElementById('nav-accueil');
            if (accueilBlock) {
                setActiveBlock(accueilBlock);
                activeSet = true;
            }
        }

        if (!activeSet) {
            navBlocks.forEach(block => {
                const sectionId = block.getAttribute("href").substring(1);
                const section = document.getElementById(sectionId);
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionBottom = sectionTop + section.offsetHeight;

                    if (currentScroll >= sectionTop - 50 && currentScroll < sectionBottom - 50) {
                        setActiveBlock(block);
                        activeSet = true;
                    }
                }
            });
        }
    }

    // --- Appeler au chargement pour initialiser ---
    updateActiveBlock();

    // --- Mettre à jour lors du scroll ---
    window.addEventListener("scroll", updateActiveBlock);

    // --- Gestion du clic sur les blocs ---
    navBlocks.forEach(block => {
        block.addEventListener("click", function (e) {
            e.preventDefault();

            const sectionId = this.getAttribute("href").substring(1);

            // Déclencher le flag pour bloquer updateActiveBlock pendant le scroll
            isAutoScrolling = true;
            setActiveBlock(this);

            const target = document.getElementById(sectionId);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            } else if (sectionId === "Accueil") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }

            // Remettre le flag à false après la durée du scroll
            setTimeout(() => {
                isAutoScrolling = false;
                updateActiveBlock(); // pour s'assurer que le bloc correct est actif après scroll
            }, 600); // correspond à la durée de scroll/animation
        });
    });
});
