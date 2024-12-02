/*
 * Web Palette Lab - A web tool for generating color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/utils/events.js

/**
 * Application events documentation
 * @module events
 */

export const EVENTS = {
  // Color Management
  COLOR_UPDATE: "colorUpdate", // { type, color } - Émis lors de la mise à jour d'une couleur
  FORMAT_UPDATE: "formatUpdate", // format - Émis lors du changement de format de couleur

  // Theme Management
  THEME_CHANGED: "themeChanged", // { theme } - Émis lors du changement de thème

  // Validation
  VALIDATION_ERROR: "validationError", // { type, message } - Émis lors d'une erreur de validation

  // UI Events
  PREFIX_UPDATE: "prefixUpdate", // { prefix } - Émis lors du changement de préfixe CSS
  TAB_CHANGE: "tabChange", // { colorType } - Émis lors du changement d'onglet

  // Guide Events
  GUIDE_OPENED: "guideOpened", // Émis à l'ouverture du guide
  GUIDE_CLOSED: "guideClosed", // Émis à la fermeture du guide
  LANGUAGE_CHANGED: "languageChanged", // { lang } - Émis lors du changement de langue
};

/**
 * Event flow documentation
 *
 * Color Update Flow:
 * 1. User Input → validation.js
 * 2. validation.js → eventBus (VALIDATION_ERROR si erreur)
 * 3. colorStore.js → eventBus (COLOR_UPDATE)
 * 4. preview.js & palette.js écoutent COLOR_UPDATE
 *
 * Theme Flow:
 * 1. theme.js → eventBus (THEME_CHANGED)
 * 2. Composants UI écoutent THEME_CHANGED
 *
 * Format Flow:
 * 1. colorStore.js → eventBus (FORMAT_UPDATE)
 * 2. palette.js écoute FORMAT_UPDATE
 */
