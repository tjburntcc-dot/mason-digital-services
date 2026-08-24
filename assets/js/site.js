(function () {
  var email = (window.MDS && window.MDS.contactEmail) || "masonhemmer@icloud.com";

  document.querySelectorAll("[data-contact-email]").forEach(function (el) {
    if (el.tagName === "A") {
      el.setAttribute("href", "mailto:" + email);
      if (el.getAttribute("data-keep-label") == null) {
        el.textContent = email;
      }
    } else if (el.tagName === "FORM") {
      el.setAttribute("action", "mailto:" + email);
    } else {
      el.textContent = email;
    }
  });

  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });

  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setOpen(false);
  });
})();
