/*
 * Web Palette Lab - A web tool for generating color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/utils/theme.js
import { eventBus } from "./eventBus.js";

export const initTheme = () => {
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  /**
   * Updates theme UI elements
   * @param {string} theme - Theme name ('light' or 'dark')
   */
  const updateThemeUI = (theme) => {
    const label = theme === "dark" ? "Passer au thème clair" : "Passer au thème sombre";
    themeToggle.setAttribute("aria-label", label);
    eventBus.emit("themeChanged", { theme });
  };

  /**
   * Sets theme and persists preference
   * @param {string} theme - Theme name ('light' or 'dark')
   */
  const setTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    updateThemeUI(theme);
  };

  /**
   * Handles system color scheme changes
   * @param {MediaQueryListEvent} e - Media query change event
   */
  const handleColorSchemeChange = (e) => {
    if (!localStorage.getItem("theme")) {
      setTheme(e.matches ? "dark" : "light");
    }
  };

  // Initialize theme
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

  setTheme(initialTheme);

  // Theme toggle handler
  themeToggle.addEventListener("click", () => {
    const newTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    setTheme(newTheme);
  });

  // System preference handler with error handling
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  try {
    mediaQuery.addEventListener("change", handleColorSchemeChange);
  } catch (e) {
    console.warn("MediaQueryList.addEventListener not supported");
    // Handle initial state only
    setTheme(mediaQuery.matches ? "dark" : "light");
  }
};
