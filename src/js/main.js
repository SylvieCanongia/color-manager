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
import { eventBus } from './utils/eventBus.js';
import { createColorStore } from './utils/colorStore.js';
import { initTabs } from "./components/tabs.js";
import { initColorInputs } from "./components/colorInput.js";
import { initPalettes, initCopyAllPalettes } from "./components/palette.js";
import { initTheme } from "./utils/theme.js";
import { initHelpGuide } from "./components/helpGuide.js";
import { initCssVarPrefix } from "./utils/cssVarPrefix.js";
import { createColorString } from './utils/colorUtils.js';

// Create store instance
let colorStore;

/**
 * Handles color updates in the UI
 * @param {Object} param0 - Color update event data
 * @param {string} param0.type - Color type (primary/secondary/accent)
 * @param {string} param0.color - Color value
 */
const handleColorUpdate = ({ type, color }) => {
  if (!color) return;
  
  const preview = document.querySelector(`#${type}ColorPreview`);
  const valueDisplay = document.querySelector(`#${type}ColorValue`);
  
  if (preview) {
    preview.style.backgroundColor = color;
    preview.classList.remove('empty-preview');
  }
  
  if (valueDisplay) {
    valueDisplay.textContent = color;
  }
};

/**
 * Updates all color displays with the new format
 * @param {string} format - Color format (hex/rgb/hsl)
 */
const updateAllColorDisplays = (format) => {
  ['primary', 'secondary', 'accent'].forEach(type => {
    const color = colorStore.getColor(type);
    if (color) {
      const converted = createColorString(color, format);
      const valueDisplay = document.querySelector(`#${type}ColorValue`);
      if (valueDisplay) {
        valueDisplay.textContent = converted;
      }
    }
  });
};

// Wait for all resources to load
window.addEventListener("load", () => {
  try {
    // Initialize core utilities
    colorStore = createColorStore();

    // Initialize UI components in specific order
    initTabs();
    initColorInputs(colorStore);
    initPalettes(colorStore);
    initCopyAllPalettes();
    initTheme();
    initHelpGuide();
    initCssVarPrefix();

    // Setup event subscriptions
    eventBus.subscribe('colorUpdate', handleColorUpdate);
    eventBus.subscribe('formatUpdate', updateAllColorDisplays);

    // Log successful initialization
    console.info("Application initialized successfully");
  } catch (error) {
    console.error("Failed to initialize application:", error);

    // Display user-friendly error message if needed
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
