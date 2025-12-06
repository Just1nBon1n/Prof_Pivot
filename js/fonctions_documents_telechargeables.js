const etiquettes = dossiersData.etiquettes;       // Tableau contenant les noms des dossiers
const fichiersLiens = dossiersData.fichiersLiens; // Tableau contenant les URLs des fichiers à télécharger

// Nombre de dossiers dynamiques
const nombreDossier = etiquettes.length;

// Sélecteur du conteneur principal des dossiers
const dossiers = document.querySelector(".dossiers");

// Variable pour suivre le dernier élément touché sur mobile
let dernierElementTouche = null;

// Boucle pour créer chaque dossier
for (let i = 0; i < nombreDossier; i++) {

  // Création du conteneur principal du dossier
  const dossier = document.createElement("span");
  dossier.classList.add("dossier");

  // Création de l'arrière-plan du dossier
  const arriere = document.createElement("span");
  arriere.classList.add("arriere");

  // Création du texte du nom du dossier
  const etiquette = document.createElement("span");
  etiquette.classList.add("texte-etiquette");
  etiquette.textContent = etiquettes[i] || `Dossier ${i + 1}`;
  arriere.appendChild(etiquette);

  // Alternance de position pour le texte : gauche / droite selon l'index
  if (i % 2 == 0) {
    etiquette.style.left = "15px";
    etiquette.style.right = "auto";
    etiquette.style.textAlign = "left";
  } else {
    etiquette.style.right = "15px";
    etiquette.style.left = "auto";
    etiquette.style.textAlign = "right";
  }

  // Création de l'élément papier
  const papier = document.createElement("span");
  papier.classList.add("papier");

  // Texte "Télécharger" affiché sur le papier
  const texteTelecharger = document.createElement("h2");
  texteTelecharger.classList.add("telecharger-papier");
  texteTelecharger.textContent = "Télécharger";
  papier.appendChild(texteTelecharger);

  // Création de l'élément "avant" (overlay avant pour interactions)
  const avant = document.createElement("span");
  avant.classList.add("avant");

  // Assemblage des éléments dans le dossier
  dossier.appendChild(arriere);
  dossier.appendChild(papier);
  dossier.appendChild(avant);
  dossiers.appendChild(dossier);

  // URL du fichier à télécharger pour ce dossier
  const fichierURL = fichiersLiens[i] || "#";

  // Fonction pour ouvrir le fichier dans un nouvel onglet
  const ouvrirFichier = () => {
    if (fichierURL == "#") {
      alert("Fichier non disponible pour ce dossier."); // Gestion des fichiers non disponibles
      return;
    }
    window.open(fichierURL, "_blank");
  };

  // Fonction pour gérer l'interaction selon desktop ou mobile
  const gereInteraction = (element) => {
    const touche = "ontouchstart" in window; // Détecte tactile

    if (touche) {
      // Sur mobile : double-tap pour activer le dossier et ouvrir le fichier
      element.addEventListener("touchend", (e) => {
        e.preventDefault(); 
        if (dernierElementTouche == element) {
          element.classList.add("hover-active"); // active le hover visuel
          ouvrirFichier();
          dernierElementTouche = null;
        } else {
          // Supprime le hover de tous les autres dossiers
          document.querySelectorAll(".dossier.hover-active").forEach(d =>
            d.classList.remove("hover-active")
          );
          dernierElementTouche = element;
        }
      });
    } else {
      // Sur desktop
      element.addEventListener("click", ouvrirFichier);
    }
  };

  // Applique les interactions au papier et à l'avant
  gereInteraction(avant);
  gereInteraction(papier);
}

// Sur mobile : touche en dehors d'un dossier, on supprime tous les hover
document.addEventListener("touchstart", (e) => {
  if (!e.target.closest(".dossier")) {
    document.querySelectorAll(".dossier.hover-active").forEach(d =>
      d.classList.remove("hover-active")
    );
    dernierElementTouche = null;
  }
});
