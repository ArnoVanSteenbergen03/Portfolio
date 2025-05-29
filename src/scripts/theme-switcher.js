export default function initTheme() {
  const $body = document.querySelector("body");
  const $toggleButton = document.querySelector(".js__theme");
  const $buttonPathMoon = document.querySelector(".js__moon");
  const $buttonPathSun = document.querySelector(".js__sun");

  // Function to apply the theme
  function applyTheme(theme) {
    if (theme === "dark") {
      $body.classList.add("dark-mode");
      $buttonPathMoon.classList.add("hidden");
      $buttonPathSun.classList.remove("hidden");
      $buttonPathSun.setAttribute("fill", "var(--sun)");
    } else {
      $body.classList.remove("dark-mode");
      $buttonPathMoon.classList.remove("hidden");
      $buttonPathSun.classList.add("hidden");
      $buttonPathMoon.setAttribute("fill", "#000");
    }
  }

  // Check and apply the saved theme on page load
  document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);
  });

  // Toggle the theme when the button is clicked
  $toggleButton.addEventListener("click", () => {
    const isDarkMode = $body.classList.toggle("dark-mode");
    const newTheme = isDarkMode ? "dark" : "light";

    // Apply the new theme and save it
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });
}
