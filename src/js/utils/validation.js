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
import { eventBus } from "./eventBus.js";

// Regular expression for HSL format validation
const HSL_REGEX = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
const RGB_REGEX = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
const HEX_REGEX = /^#?([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;

// Validation messages
const MESSAGES = {
  INVALID_FORMAT: "Format HSL invalide. Utilisez : hsl(360, 100%, 100%)",
  INVALID_HUE: "La teinte doit être entre 0 et 360",
  INVALID_SATURATION: "La saturation doit être entre 0 et 100",
  INVALID_LIGHTNESS: "La luminosité doit être entre 0 et 100",
  INVALID_RGB: "Format RGB invalide. Utilisez : rgb(255, 100, 50)",
  INVALID_RGB_VALUES: "Valeurs RGB entre 0-255",
  INVALID_HEX: "Format HEX invalide. Utilisez : #FF6432",
  INVALID_NUMBER: "Nombre invalide",
};

/**
 * Validates HSL string format and values
 * @param {string} hslString - HSL color string to validate
 * @returns {Object} Validation result with isValid and error/values properties
 */
export const isValidHSL = (hslString) => {
  const match = HSL_REGEX.exec(hslString);

  if (!match) {
    eventBus.emit("validationError", { type: "hsl", message: MESSAGES.INVALID_FORMAT });
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
    eventBus.emit("validationError", { type: "hsl", message: MESSAGES.INVALID_HUE });
    return {
      isValid: false,
      error: MESSAGES.INVALID_HUE,
    };
  }

  // Validate saturation (0-100)
  if (saturation < 0 || saturation > 100) {
    eventBus.emit("validationError", { type: "hsl", message: MESSAGES.INVALID_SATURATION });
    return {
      isValid: false,
      error: MESSAGES.INVALID_SATURATION,
    };
  }

  // Validate lightness (0-100)
  if (lightness < 0 || lightness > 100) {
    eventBus.emit("validationError", { type: "hsl", message: MESSAGES.INVALID_LIGHTNESS });
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
  const match = value.match(RGB_REGEX);

  if (!match) {
    eventBus.emit("validationError", { type: "rgb", message: MESSAGES.INVALID_RGB });
    return {
      isValid: false,
      error: MESSAGES.INVALID_RGB,
    };
  }

  const [, r, g, b] = match.map(Number);

  if ([r, g, b].some((v) => v < 0 || v > 255)) {
    eventBus.emit("validationError", { type: "rgb", message: MESSAGES.INVALID_RGB_VALUES });
    return {
      isValid: false,
      error: MESSAGES.INVALID_RGB_VALUES,
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
  if (!HEX_REGEX.test(value)) {
    eventBus.emit("validationError", { type: "hex", message: MESSAGES.INVALID_HEX });
    return {
      isValid: false,
      error: MESSAGES.INVALID_HEX,
    };
  }

  return {
    isValid: true,
    values: value.startsWith("#") ? value : `#${value}`,
  };
};

// =========================================================

/**
 * Validates detailed input value within specified range
 * @param {string} value - Input value to validate
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @returns {Object} Validation result with isValid and error properties
 */
export const validateDetailedInput = (value, min, max) => {
  if (value.trim() === "") {
    return {
      isValid: true,
      error: "",
    };
  }

  const numValue = parseInt(value);

  if (isNaN(numValue)) {
    eventBus.emit("validationError", { type: "detailed", message: MESSAGES.INVALID_NUMBER });
    return {
      isValid: false,
      error: MESSAGES.INVALID_NUMBER,
    };
  }

  if (numValue < min || numValue > max) {
    const message = `Entre ${min} et ${max}`;
    eventBus.emit("validationError", { type: "detailed", message });
    return {
      isValid: false,
      error: message,
    };
  }

  return {
    isValid: true,
    error: "",
  };
};
