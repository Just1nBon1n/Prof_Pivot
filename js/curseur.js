const cursor = document.querySelector(".cursor");

// Suivi du mouvement de la souris
document.addEventListener("mousemove", (e) => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});

// Effet de clic
document.addEventListener("click", () => {
  cursor.classList.add("clicked");

  // Retire la classe après 150 ms pour laisser le temps à l’anim de jouer
  setTimeout(() => {
    cursor.classList.remove("clicked");
  }, 300);
});

// Sélectionne uniquement les éléments où tu veux l'effet
const hoverElements = document.querySelectorAll('.hoverable');

hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hovered');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovered');
  });
});