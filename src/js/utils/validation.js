/*
 * Web Palette Lab - A web tool for generating color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/utils/validation.js

// Regular expression for HSL format validation
const HSL_REGEX = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;

// Validation messages
const MESSAGES = {
  INVALID_FORMAT: "Format HSL invalide. Utilisez : hsl(360, 100%, 100%)",
  INVALID_HUE: "La teinte doit être entre 0 et 360",
  INVALID_SATURATION: "La saturation doit être entre 0 et 100",
  INVALID_LIGHTNESS: "La luminosité doit être entre 0 et 100",
};

// Validate HSL string format and values
export const isValidHSL = (hslString) => {
  const match = HSL_REGEX.exec(hslString);

  if (!match) {
    return {
      isValid: false,
      error: MESSAGES.INVALID_FORMAT,
    };
  }

  const hue = parseInt(match[1]);
  const saturation = parseInt(match[2]);
  const lightness = parseInt(match[3]);

  // Validate hue (0-360)
  if (hue < 0 || hue > 360) {
    return {
      isValid: false,
      error: MESSAGES.INVALID_HUE,
    };
  }

  // Validate saturation (0-100)
  if (saturation < 0 || saturation > 100) {
    return {
      isValid: false,
      error: MESSAGES.INVALID_SATURATION,
    };
  }

  // Validate lightness (0-100)
  if (lightness < 0 || lightness > 100) {
    return {
      isValid: false,
      error: MESSAGES.INVALID_LIGHTNESS,
    };
  }

  return {
    isValid: true,
    values: { hue, saturation, lightness },
  };
};

// =========================================================
/**
 * Detects the color format of a given string
 * @param {string} value - Color string to analyze
 * @returns {string|null} Format ('hsl', 'rgb', 'hex') or null if not recognized
 */
export const detectColorFormat = (value) => {
  value = value.trim().toLowerCase();

  if (value.startsWith("hsl(")) return "hsl";
  if (value.startsWith("rgb(")) return "rgb";
  if (value.startsWith("#")) return "hex";

  return null;
};

/**
 * Validates RGB color string format and values
 * @param {string} value - RGB color string to validate
 * @returns {Object} Validation result with isValid and error/values properties
 */
export const isValidRGB = (value) => {
  const rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
  const match = value.match(rgbRegex);

  if (!match) {
    return {
      isValid: false,
      error: "Format RGB invalide. Utilisez : rgb(255, 100, 50)",
    };
  }

  const [, r, g, b] = match.map(Number);

  if ([r, g, b].some((v) => v < 0 || v > 255)) {
    return {
      isValid: false,
      error: "Valeurs RGB entre 0-255",
    };
  }

  return {
    isValid: true,
    values: { r, g, b },
  };
};

/**
 * Validates hexadecimal color string format
 * @param {string} value - Hexadecimal color string to validate
 * @returns {Object} Validation result with isValid and error/values properties
 */
export const isValidHEX = (value) => {
  const hexRegex = /^#?([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;

  if (!hexRegex.test(value)) {
    return {
      isValid: false,
      error: "Format HEX invalide. Utilisez : #FF6432",
    };
  }

  return {
    isValid: true,
    values: value.startsWith("#") ? value : `#${value}`,
  };
};

// =========================================================

// Validate detailed inputs format and values
export const validateDetailedInput = (value, min, max) => {
  if (value.trim() === "") {
    return {
      isValid: true,
      error: "",
    };
  }

  const numValue = parseInt(value);

  if (isNaN(numValue)) {
    return {
      isValid: false,
      error: "Nombre invalide",
    };
  }

  if (numValue < min || numValue > max) {
    return {
      isValid: false,
      error: `Entre ${min} et ${max}`,
    };
  }

  return {
    isValid: true,
    error: "",
  };
};
