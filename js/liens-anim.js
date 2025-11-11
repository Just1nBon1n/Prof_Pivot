// liens-anim.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Script LiensUtiles chargé !");
  const items = document.querySelectorAll(".menu-item");
  if (!items.length) return;

  const animationDuration = 10000; // durée CSS (10s)
  const pause = 2000; // pause invisible supplémentaire (2s)

  function animateAll() {
    items.forEach(item => item.classList.add("animate"));

    // Retirer la classe après l’animation
    setTimeout(() => {
      items.forEach(item => item.classList.remove("animate"));
    }, animationDuration);
  }

  // Lancer une première animation
  animateAll();

  // Relancer le cycle : durée totale = animation + pause
  setInterval(animateAll, animationDuration + pause);
});