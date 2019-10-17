// Close mobile dropdown menu on orientation change
window.addEventListener("orientationchange", function() {
  document.querySelector("input#hamburger-toggle").checked = false;
});

