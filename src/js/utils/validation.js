/*
 * Color Manager - A web tool for generating HSL color palettes
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
    INVALID_FORMAT: 'Format invalide. Utilisez : hsl(360, 100%, 100%)',
    INVALID_HUE: 'La teinte doit être entre 0 et 360',
    INVALID_SATURATION: 'La saturation doit être entre 0 et 100',
    INVALID_LIGHTNESS: 'La luminosité doit être entre 0 et 100'
};

// Validate HSL string format and values
export const isValidHSL = (hslString) => {
    const match = HSL_REGEX.exec(hslString);
    
    if (!match) {
        return {
            isValid: false,
            error: MESSAGES.INVALID_FORMAT
        };
    }

    const hue = parseInt(match[1]);
    const saturation = parseInt(match[2]);
    const lightness = parseInt(match[3]);

    // Validate hue (0-360)
    if (hue < 0 || hue > 360) {
        return {
            isValid: false,
            error: MESSAGES.INVALID_HUE
        };
    }

    // Validate saturation (0-100)
    if (saturation < 0 || saturation > 100) {
        return {
            isValid: false,
            error: MESSAGES.INVALID_SATURATION
        };
    }

    // Validate lightness (0-100)
    if (lightness < 0 || lightness > 100) {
        return {
            isValid: false,
            error: MESSAGES.INVALID_LIGHTNESS
        };
    }

    return {
        isValid: true,
        values: { hue, saturation, lightness }
    };
};

// Validate detailed inputs format and values
export const validateDetailedInput = (value, min, max) => {
    if (value.trim() === '') {
        return {
          isValid: true,
          error: ''
        };
      }
      
    const numValue = parseInt(value);
    
    if (isNaN(numValue)) {
      return {
        isValid: false,
        error: "Nombre invalide"
      };
    }
    
    if (numValue < min || numValue > max) {
      return {
        isValid: false,
        error: `Entre ${min} et ${max}`
      };
    }
    
    return {
      isValid: true,
      error: ""
    };
  };
  