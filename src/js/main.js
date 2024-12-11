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
import { initLanguagePicker } from "./components/languagePicker.js";
import { updatePageTranslations, getText } from "./utils/i18n.js";
import { loadSvgSprite } from "./utils/loadSvgSprite.js";
import { eventBus } from "./utils/eventBus.js";

/**
 * Global color store instance
 * @type {Object}
 */
let colorStore;

/**
 * Creates and displays an error message element
 * @param {HTMLElement} container - Container element for the error message
 */
const displayErrorMessage = (container) => {
  if (!container) return;

  const errorMessage = document.createElement("div");
  Object.assign(errorMessage, {
    className: "error-message",
  });
  errorMessage.setAttribute("role", "alert");
  errorMessage.setAttribute("data-i18n", "errorLoadingApp");
  container.prepend(errorMessage);

  // Update error message translation when language changes
  eventBus.subscribe("translationsLoaded", ({ lang }) => {
    if (errorMessage && errorMessage.parentNode) {
      const key = errorMessage.getAttribute("data-i18n");
      const translatedText = getText(key, lang);
      errorMessage.textContent = translatedText;
    }
  });
};

/**
 * Initializes core application features
 * @returns {Promise<void>}
 */
const initializeCoreFeatures = async () => {
  try {
    await loadSvgSprite("src/assets/icons/flags-sprite.svg");
    colorStore = createColorStore();
    initLanguagePicker(colorStore);
    updatePageTranslations(document.documentElement.lang);
  } catch (error) {
    console.error("Failed to initialize core features:", error);
    throw error;
  }
};

/**
 * Initializes UI components in the correct order
 * @returns {Promise<void>}
 */
const initializeUIComponents = async () => {
  await Promise.all([initTabs(), initColorInputs(colorStore), initPalettes(colorStore), initExportAllPalettes(colorStore), initCopyAllPalettes(), initPreview(), initTheme(), initHelpGuide(), initCssVarPrefix()]);
};

/**
 * Initializes the application
 * Follows a specific order to ensure proper component dependencies:
 * 1. Core utilities (colorStore)
 * 2. UI components (tabs, inputs, palettes)
 * 3. Theme and guide features
 *
 * @throws {Error} When initialization fails
 */
const initializeApp = async () => {
  try {
    await initializeCoreFeatures();
    await initializeUIComponents();

    console.info("Application initialized successfully");
  } catch (error) {
    console.error("Failed to initialize application:", error);
    displayErrorMessage(document.querySelector(".container"));
  }
};

// Initialize app when DOM is fully loaded
window.addEventListener("load", initializeApp);
