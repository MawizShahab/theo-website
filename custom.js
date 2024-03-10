document.addEventListener("DOMContentLoaded", function () {
  // Get all language toggle elements
  var languageToggles = document.querySelectorAll(".button_lang");

  // Function to toggle language
  function toggleLanguage(languageToggle) {
    // Toggle the current language class for all language toggles
    languageToggles.forEach(function (toggle) {
      toggle.classList.toggle("current_lang", toggle === languageToggle);
    });

    // Get the language text elements for this language toggle
    var languageText = languageToggle.innerHTML.trim() === "Fr" ? "fr" : "en";
    var textsToShow = document.querySelectorAll("#" + languageText);
    var textsToHide = document.querySelectorAll(
      "#" + (languageText === "fr" ? "en" : "fr")
    );

    // Show the text elements in the selected language and hide the text elements in the other language
    textsToShow.forEach(function (text) {
      text.style.display = "block";
    });
    textsToHide.forEach(function (text) {
      text.style.display = "none";
    });
  }

  // Attach click event listener to each language toggle
  languageToggles.forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      toggleLanguage(this);
    });
  });

  // Set default language to English
  var defaultToggle = document.querySelector(".current_lang");
  if (defaultToggle) {
    toggleLanguage(defaultToggle);
  }

  // Light and dark mode handler
  const checkbox = document.getElementById("checkbox");
  checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    updateImageUrls();
    updateBackgroundUrl();
  });

  // Trigger change event to apply dark mode by default
  checkbox.dispatchEvent(new Event("change"));

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
