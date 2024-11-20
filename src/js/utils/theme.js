/*
 * Color Manager - A web tool for generating HSL color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/utils/theme.js

export const initTheme = () => {
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  // Update icon and aria-label
  const updateThemeUI = (theme) => {
    const label = theme === "dark" ? "Passer au thème clair" : "Passer au thème sombre";
    themeToggle.setAttribute("aria-label", label);
  };

  // Define the theme
  const setTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    updateThemeUI(theme);
  };

  // Initialization of the theme
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

  setTheme(initialTheme);

  // Button event listener
  themeToggle.addEventListener("click", () => {
    const newTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    setTheme(newTheme);
  });

  // Listen to system preference changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      setTheme(e.matches ? "dark" : "light");
    }
  });
};
