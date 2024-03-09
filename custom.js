document.addEventListener("DOMContentLoaded", function () {
  var french = document.getElementById("fr_click"),
    english = document.getElementById("en_click"),
    fr_txt = document.querySelectorAll("#fr"),
    en_txt = document.querySelectorAll("#en"),
    nb_fr = fr_txt.length,
    nb_en = en_txt.length;

  french.addEventListener(
    "click",
    function () {
      langue(french, english);
    },
    false
  );

  english.addEventListener(
    "click",
    function () {
      langue(english, french);
    },
    false
  );

  function langue(langueOn, langueOff) {
    if (!langueOn.classList.contains("current_lang")) {
      langueOn.classList.toggle("current_lang");
      langueOff.classList.toggle("current_lang");
    }
    if (langueOn.innerHTML == "Fr") {
      afficher(fr_txt, nb_fr);
      cacher(en_txt, nb_en);
    } else if (langueOn.innerHTML == "En") {
      afficher(en_txt, nb_en);
      cacher(fr_txt, nb_fr);
    }
  }

  function afficher(txt, nb) {
    for (var i = 0; i < nb; i++) {
      txt[i].style.display = "block";
    }
  }
  function cacher(txt, nb) {
    for (var i = 0; i < nb; i++) {
      txt[i].style.display = "none";
    }
  }
  function init() {
    langue(french, english);
  }
  init();

  // Light and dark mode handler
  const checkbox = document.getElementById("checkbox");
  checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    updateImageUrls();
    updateBackgroundUrl();
  });

  // Function to update image URLs based on the selected mode
  function updateImageUrls() {
    const isDarkMode = document.body.classList.contains("dark");
    const images = document.querySelectorAll(
      "*[style*='background-image'], img"
    );
    images.forEach((el) => {
      let src;
      if (el.tagName === "IMG") {
        src = el.getAttribute("src");
      } else {
        let backgroundImageUrl = window
          .getComputedStyle(el)
          .getPropertyValue("background-image");
        src = backgroundImageUrl.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
      }
      if (isDarkMode) {
        src = src.replace("/light/", "/dark/");
      } else {
        src = src.replace("/dark/", "/light/");
      }
      if (el.tagName === "IMG") {
        el.setAttribute("src", src);
      } else {
        el.style.backgroundImage = `url(${src})`;
      }
    });
  }

  // Function to update background image URL based on the selected mode
  function updateBackgroundUrl() {
    const isDarkMode = document.body.classList.contains("dark");
    const body = document.body;
    let css = window.getComputedStyle(body);
    let backgroundImageUrl = css.getPropertyValue("background-image");

    if (isDarkMode) {
      backgroundImageUrl = backgroundImageUrl.replace("/light/", "/dark/");
    } else {
      backgroundImageUrl = backgroundImageUrl.replace("/dark/", "/light/");
    }
    body.style.backgroundImage = backgroundImageUrl;
  }
});
