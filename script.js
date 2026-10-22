(function () {
  "use strict";

  function openLocation(card) {
    var target = document.getElementById(card.dataset.target);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  document.querySelectorAll(".location-card").forEach(function (card) {
    card.addEventListener("click", function (event) {
      if (!event.target.closest("a")) {
        openLocation(card);
      }
    });

    card.addEventListener("keydown", function (event) {
      if (event.target.closest("a")) {
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLocation(card);
      }
    });
  });

  var navLinks = Array.from(document.querySelectorAll(".main-nav a"));
  var sections = navLinks.map(function (link) {
    return document.querySelector(link.getAttribute("href"));
  }).filter(Boolean);

  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    }, { rootMargin: "-25% 0px -60% 0px" });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  var pathStatus = document.querySelector(".path-status");
  document.querySelectorAll(".path-choice").forEach(function (choice) {
    choice.addEventListener("click", function () {
      document.querySelectorAll(".path-choice").forEach(function (item) {
        item.classList.toggle("is-selected", item === choice);
      });

      if (pathStatus) {
        pathStatus.innerHTML = "Vybraná cesta: <strong>" + choice.dataset.path + "</strong>. "
          + choice.dataset.description;
      }
    });
  });

  var backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      backToTop.classList.toggle("is-visible", window.scrollY > 500);
    }, { passive: true });
  }
}());