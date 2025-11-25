// Données injectées depuis PHP
const etiquettes = dossiersData.etiquettes;
const fichiersLiens = dossiersData.fichiersLiens;

// Nombre de dossiers dynamiques
const nombreDossier = etiquettes.length;

// Sélecteur
const dossiers = document.querySelector(".dossiers");

let dernierElementTouche = null;

for (let i = 0; i < nombreDossier; i++) {

  const dossier = document.createElement("span");
  dossier.classList.add("dossier");

  const arriere = document.createElement("span");
  arriere.classList.add("arriere");

  const etiquette = document.createElement("span");
  etiquette.classList.add("texte-etiquette");
  etiquette.textContent = etiquettes[i] || `Dossier ${i + 1}`;
  arriere.appendChild(etiquette);

  if (i % 2 === 0) {
    etiquette.style.left = "15px";
    etiquette.style.right = "auto";
    etiquette.style.textAlign = "left";
  } else {
    etiquette.style.right = "15px";
    etiquette.style.left = "auto";
    etiquette.style.textAlign = "right";
  }

  const papier = document.createElement("span");
  papier.classList.add("papier");

  const texteTelecharger = document.createElement("h2");
  texteTelecharger.classList.add("telecharger-papier");
  texteTelecharger.textContent = "Télécharger";
  papier.appendChild(texteTelecharger);

  const avant = document.createElement("span");
  avant.classList.add("avant");

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

  const gereInteraction = (element) => {
    const touche = "ontouchstart" in window;

    if (touche) {
      element.addEventListener("touchend", (e) => {
        e.preventDefault();
        if (dernierElementTouche == element) {
          element.classList.add("hover-active");
          ouvrirFichier();
          dernierElementTouche = null;
        } else {
          document.querySelectorAll(".dossier.hover-active").forEach(d =>
            d.classList.remove("hover-active")
          );
          dernierElementTouche = element;
        }
      });
    } else {
      element.addEventListener("click", ouvrirFichier);
    }
  };

  gereInteraction(avant);
  gereInteraction(papier);
}

document.addEventListener("touchstart", (e) => {
  if (!e.target.closest(".dossier")) {
    document.querySelectorAll(".dossier.hover-active").forEach(d =>
      d.classList.remove("hover-active")
    );
    dernierElementTouche = null;
  }
});
