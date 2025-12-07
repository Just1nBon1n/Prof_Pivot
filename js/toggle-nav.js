document.addEventListener("DOMContentLoaded", function () {
    const toggleNavBtn = document.getElementById("toggle-nav");
    const containerNav = document.querySelector(".side-nav-blocks");

    toggleNavBtn.addEventListener("click", () => {
        containerNav.classList.toggle("active");
    });
});

document.getElementById('toggle-nav').addEventListener('click', function() {
    this.classList.toggle('open');
});