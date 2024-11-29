/*
 * Web Palette Lab - A web tool for generating color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/utils/cssVarPrefix.js

/**
 * Handles CSS variable prefix customization
 * @module utils/cssVarPrefix
 */

/**
 * Generates CSS variable name with optional custom prefix
 * @param {string} prefix - Custom prefix for CSS variable
 * @param {string} type - Color type (primary, secondary, accent)
 * @param {string} paletteType - Palette type (normal, vivid)
 * @param {number} index - Color variation index
 * @returns {string} Formatted CSS variable name
 */
export const generateVariableName = (prefix, type, paletteType, index) => {
  const customPrefix = prefix ? `${prefix}-` : "";
  return `--${customPrefix}${type.toLowerCase()}-${paletteType.toLowerCase()}-${index * 100}`;
};

/**
 * Initialize prefix input functionality
 */
export const initCssVarPrefix = () => {
  const prefixInput = document.getElementById("cssVarPrefix");
  if (!prefixInput) return;

  // Restore saved prefix
  const savedPrefix = localStorage.getItem("cssVarPrefix");
  if (savedPrefix) {
    prefixInput.value = savedPrefix;
  }

  // Handle prefix updates
  prefixInput.addEventListener("input", (e) => {
    const prefix = e.target.value.trim();
    if (prefix && /^[a-z0-9-]+$/.test(prefix)) {
      localStorage.setItem("cssVarPrefix", prefix);
    } else {
      localStorage.removeItem("cssVarPrefix");
    }
  });
};

/**
 * Get current CSS variable prefix
 * @returns {string} Current prefix or empty string
 */
export const getCurrentPrefix = () => {
  return localStorage.getItem("cssVarPrefix") || "";
};
