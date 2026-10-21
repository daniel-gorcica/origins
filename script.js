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
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLocation(card);
      }
    });
  });
}());