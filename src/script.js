document.addEventListener('DOMContentLoaded', () => {
  const hamburgerToggle = document.querySelector("input#hamburger-toggle");
  const navLinks = document.querySelectorAll("a.nav-link");
  
  // Close mobile dropdown menu on orientation change
  window.addEventListener("orientationchange", () => hamburgerToggle.checked = false);

  navLinks.forEach(link => link.addEventListener("click", linkClickHandler));

  function linkClickHandler() {
    hamburgerToggle.checked = false;
    navLinks.forEach(link => link.classList.remove("is-active"));
    this.classList.add("is-active");
  };
});
