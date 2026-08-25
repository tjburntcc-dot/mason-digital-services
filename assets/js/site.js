(function () {
  var email = (window.MDS && window.MDS.contactEmail) || "hemmerdigital@gmail.com";
  var linkedin = (window.MDS && window.MDS.linkedinUrl) || "";
  var credentials = (window.MDS && window.MDS.credentials) || [];

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

  // LinkedIn is only shown once a real, confirmed profile URL is configured.
  // Until then every [data-linkedin] element stays hidden — no dead links.
  document.querySelectorAll("[data-linkedin]").forEach(function (el) {
    if (linkedin) {
      if (el.tagName === "A") el.setAttribute("href", linkedin);
      el.hidden = false;
    } else {
      el.hidden = true;
    }
  });

  // Credentials render only when at least one real, earned credential exists
  // in site-config.js. No placeholders are ever shown.
  var credWrap = document.querySelector("[data-credentials]");
  if (credWrap) {
    if (credentials.length) {
      var list = credWrap.querySelector("[data-credentials-list]");
      credentials.forEach(function (c) {
        var item = document.createElement("li");
        item.className = "credential";
        var name = document.createElement("span");
        name.className = "credential-name";
        name.textContent = c.name + (c.issuer ? " — " + c.issuer : "");
        item.appendChild(name);
        if (c.url) {
          var link = document.createElement("a");
          link.href = c.url;
          link.textContent = "Verify";
          link.rel = "noopener";
          item.appendChild(link);
        }
        list.appendChild(item);
      });
      credWrap.hidden = false;
    } else {
      credWrap.hidden = true;
    }
  }

  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });
  }

  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var reveals = document.querySelectorAll(".js-reveal");
  if (reveals.length) {
    var revealAll = function () {
      reveals.forEach(function (el) { el.classList.add("is-visible"); });
    };
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      reveals.forEach(function (el) { io.observe(el); });
      // Safety net: a full-height render (print, some headless capture, an
      // observer that never fires) must never leave real copy invisible.
      setTimeout(revealAll, 900);
    } else {
      revealAll();
    }
  }
})();
