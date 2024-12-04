/*
 * Web Palette Lab - A web tool for generating color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/main.js

/**
 * Main application entry point
 * @module main
 * @description Initializes the application components and state management
 */

import { createColorStore } from "./utils/colorStore.js";
import { initTabs } from "./components/tabs.js";
import { initColorInputs } from "./components/colorInput.js";
import { initPalettes, initExportAllPalettes, initCopyAllPalettes } from "./components/palette.js";
import { initTheme } from "./utils/theme.js";
import { initHelpGuide } from "./components/helpGuide.js";
import { initCssVarPrefix } from "./utils/cssVarPrefix.js";
import { initPreview } from "./components/preview.js";

/**
 * Global color store instance
 * @type {Object}
 */
let colorStore;

/**
 * Initializes the application
 * Follows a specific order to ensure proper component dependencies:
 * 1. Core utilities (colorStore)
 * 2. UI components (tabs, inputs, palettes)
 * 3. Theme and guide features
 * 
 * @throws {Error} When initialization fails
 */
window.addEventListener("load", () => {
  try {
    // Initialize core utilities
    colorStore = createColorStore();

    // Initialize UI components in specific order
    initTabs();
    initColorInputs(colorStore);
    initPalettes(colorStore);
    initExportAllPalettes(colorStore);
    initCopyAllPalettes();
    initPreview();
    initTheme();
    initHelpGuide();
    initCssVarPrefix();

    // Log successful initialization
    console.info("Application initialized successfully");
  } catch (error) {
    console.error("Failed to initialize application:", error);

    /**
     * Display user-friendly error message
     * @param {string} message - Error message to display
     */
    const container = document.querySelector(".container");
    if (container) {
      const errorMessage = document.createElement("div");
      errorMessage.className = "error-message";
      errorMessage.setAttribute("role", "alert");
      errorMessage.textContent = "Une erreur est survenue lors du chargement de l'application. Veuillez rafraîchir la page.";
      container.prepend(errorMessage);
    }
  }
});
