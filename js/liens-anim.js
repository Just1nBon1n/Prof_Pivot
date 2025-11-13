document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".menu-item");
  if (!items.length) return;

  const animationDuration = 10000; // 10s
  const pause = 2000;              // 2s pause
  const totalDuration = animationDuration + pause;

  // Track hover state
  items.forEach(item => {
    item.addEventListener("mouseenter", () => {
      item.classList.add("hovered");
    });
    item.addEventListener("mouseleave", () => {
      item.classList.remove("hovered");
    });
  });

  const startTime = performance.now(); // global timeline start

  function updateAnimation(timestamp) {
    const elapsed = (timestamp - startTime) % totalDuration;
    const progress = elapsed / animationDuration; // 0 → 1 (animation only, ignore pause)

    items.forEach(item => {
      if (item.classList.contains("hovered")) return; // skip hover override

      const text = item.querySelector(".text");

      // Map progress to opacity & transform based on keyframes
      if (progress < 0.15) {
        text.style.opacity = progress / 0.15;
        text.style.transform = `translateY(${10 - 14 * (progress/0.15)}px)`; 
      } else if (progress < 0.65) {
        text.style.opacity = 1;
        text.style.transform = `translateY(-4px)`;
      } else if (progress < 0.8) {
        text.style.opacity = 1 - ((progress - 0.65) / 0.15);
        text.style.transform = `translateY(${-4 + 14 * ((progress - 0.65)/0.15)}px)`;
      } else {
        text.style.opacity = 0;
        text.style.transform = `translateY(10px)`;
      }
    });

    requestAnimationFrame(updateAnimation);
  }

  requestAnimationFrame(updateAnimation);
});
