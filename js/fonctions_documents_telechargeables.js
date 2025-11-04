const dossiers = document.querySelector(".dossiers");
let nombreDossier = 7;

// Données injectées depuis PHP

// Étiquettes
const etiquettes = dossiersData.etiquettes;
// Liens des fichiers à télécharger
const fichiersLiens = dossiersData.fichiersLiens;

let dernierElementTouche = null;

for (let i = 0; i < nombreDossier; i++) {

  // Création de la structure
  const dossier = document.createElement("div");
  dossier.classList.add("dossier");

  const arriere = document.createElement("div");
  arriere.classList.add("arriere");

  const etiquette = document.createElement("span");
  etiquette.classList.add("texte-etiquette");
  etiquette.textContent = etiquettes[i] || `Dossier ${i + 1}`;
  arriere.appendChild(etiquette);

  if (i % 2 === 0) {
    //odd
    etiquette.style.left = "15px";
    etiquette.style.right = "auto";
    etiquette.style.textAlign = "left";
  } 
  else {
    //even
    etiquette.style.right = "15px";
    etiquette.style.left = "auto";
    etiquette.style.textAlign = "right";
  }

  const papier = document.createElement("div");
  papier.classList.add("papier");

  const texteTelecharger = document.createElement("h2");
  texteTelecharger.classList.add("telecharger-papier");
  texteTelecharger.textContent = "Télécharger";
  papier.appendChild(texteTelecharger);

  const avant = document.createElement("div");
  avant.classList.add("avant");

  // Append
  dossier.appendChild(arriere);
  dossier.appendChild(papier);
  dossier.appendChild(avant);
  dossiers.appendChild(dossier);

  const fichierURL = fichiersLiens[i] || "#";

  const ouvrirFichier = () => {
    if (fichierURL == "#") {
      alert("Fichier non disponible pour ce dossier.");
      return;
    }
    window.open(fichierURL, "_blank");
  };

    // Gestion des interactions
    const gereInteraction = (element) => {
    const touche = "ontouchstart" in window;

    if (touche) {
        element.addEventListener("touchend", (e) => {
            e.preventDefault();
            // Si on touche le même élément deux fois de suite, on l'ouvre
            if (dernierElementTouche == element) {
                element.classList.add("hover-active");
                ouvrirFichier();
                dernierElementTouche = null;
            } 
            else {
                // Sinon, activer "hover"
                document.querySelectorAll(".dossier.hover-active").forEach(d =>
                    d.classList.remove("hover-active")
                );
                dernierElementTouche = element;
            }
        });
    } 
    else {
        // Desktop
        element.addEventListener("click", ouvrirFichier);
    }
  };

  // Zones cliquables
  gereInteraction(avant);
  gereInteraction(papier);
}

// Si on tape ailleurs sur mobile, on désactive le hover
document.addEventListener("touchstart", (e) => {
  if (!e.target.closest(".dossier")) {
    document.querySelectorAll(".dossier.hover-active").forEach(d =>
      d.classList.remove("hover-active")
    );
    dernierElementTouche = null;
  }
});
