(function () {
  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");

  function headerHeight() {
    return header ? header.offsetHeight : 0;
  }

  function smoothScrollToHash(hash) {
    if (!hash || hash === "#") return;
    var target = document.querySelector(hash);
    if (!target) return;
    var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight() - 12;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = link.getAttribute("href");
      if (!href || href.length < 2) return;
      var id = href.slice(1);
      if (!document.getElementById(id)) return;
      e.preventDefault();
      if (header && header.classList.contains("nav-open")) {
        header.classList.remove("nav-open");
        if (navToggle) navToggle.setAttribute("aria-expanded", "false");
      }
      smoothScrollToHash(href);
      if (history.replaceState) {
        history.replaceState(null, "", href);
      }
    });
  });

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var open = !header.classList.contains("nav-open");
      header.classList.toggle("nav-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    mainNav.querySelectorAll("a").forEach(function (a) {
      if (a.getAttribute("href") && a.getAttribute("href").startsWith("http")) {
        a.addEventListener("click", function () {
          header.classList.remove("nav-open");
          navToggle.setAttribute("aria-expanded", "false");
        });
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && header && header.classList.contains("nav-open")) {
      header.classList.remove("nav-open");
      if (navToggle) navToggle.setAttribute("aria-expanded", "false");
    }
  });
})();
