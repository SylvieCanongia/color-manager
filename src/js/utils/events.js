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
  COLOR_UPDATE: "colorUpdate", // { type: "primary"|"secondary"|"accent", color: { hue: 180, saturation: 50, lightness: 50 } }
  FORMAT_UPDATE: "formatUpdate", // format: "hsl"|"rgb"|"hex"

  // Theme Management
  THEME_CHANGED: "themeChanged", // { theme: "light"|"dark" }

  // Validation
  VALIDATION_ERROR: "validationError", // { type: "hsl"|"rgb"|"hex"|"detailed", message: string }

  // UI Events
  PREFIX_UPDATE: "prefixUpdate", // { prefix: string }
  RESET_PREFIX: "resetPrefix", // No payload
  TAB_CHANGE: "tabChange", // { colorType: "primary"|"secondary"|"accent" }

  // Guide Events
  GUIDE_CONTENT_UPDATED: "guideContentUpdated", // { lang: "fr"|"en" }
  GUIDE_OPENED: "guideOpened", // No payload
  GUIDE_CLOSED: "guideClosed", // No payload
  LANGUAGE_CHANGED: "languageChanged", // { lang: "fr"|"en" }
};

/**
 * Event flow documentation
 *
 * Color Update Flow:
 * 1. User Input → validation.js
 * 2. validation.js → eventBus (VALIDATION_ERROR if error)
 * 3. colorStore.js → eventBus (COLOR_UPDATE)
 * 4. preview.js & palette.js listen to COLOR_UPDATE
 *
 * Theme Flow:
 * 1. theme.js → eventBus (THEME_CHANGED)
 * 2. UI Components listen to THEME_CHANGED
 *
 * Format Flow:
 * 1. colorStore.js → eventBus (FORMAT_UPDATE)
 * 2. palette.js listens to FORMAT_UPDATE
 * 
 * Guide Flow:
 * 1. helpGuide.js → eventBus (GUIDE_OPENED, GUIDE_CLOSED)
 * 2. helpGuide.js → eventBus (GUIDE_CONTENT_UPDATED) when content changes
 * 3. helpGuide.js → eventBus (LANGUAGE_CHANGED) when language switches
 * 4. helpGuide.js listens to THEME_CHANGED for theme updates
 * 
 * Prefix Flow:
 * 1. cssVarPrefix.js → eventBus (PREFIX_UPDATE) when prefix changes
 * 2. cssVarPrefix.js listens to RESET_PREFIX to clear prefix
 * 3. cssVarPrefix.js → eventBus (PREFIX_UPDATE) after reset
 * 
 * Tab Flow:
 * 1. tabs.js → eventBus (TAB_CHANGE) when active tab changes
 * 2. Other components can listen to TAB_CHANGE for tab-specific updates
 */

/**
 * Event Listeners by Component
 * 
 * preview.js:
 * - COLOR_UPDATE
 * 
 * palette.js:
 * - COLOR_UPDATE
 * - FORMAT_UPDATE
 * 
 * helpGuide.js:
 * - THEME_CHANGED
 * 
 * cssVarPrefix.js:
 * - RESET_PREFIX
 */