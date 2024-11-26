/*
 * Color Manager - A web tool for generating HSL color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/utils/colorUtils.js

// Create HSL string from component values
export const createHSLString = ({ hue, saturation, lightness }) => `hsl(${hue}, ${saturation}%, ${lightness}%)`;

// Calculate relative luminance for contrast
export const calculateLuminance = ({ hue, saturation, lightness }) => {
  // Simplified luminance calculation based on lightness
  return lightness / 100;
};

// Check if color needs dark text
export const needsDarkText = (hsl) => {
  return calculateLuminance(hsl) > 0.6;
};

// Functions for palette enhancement
const COLOR_CATEGORIES = {
  PURPLE: { min: 260, max: 320, saturationAdjust: -15, lightnessAdjust: 10 },
  GREEN: { min: 120, max: 180, saturationAdjust: -20, lightnessAdjust: 12 },
  WARM: { min: 0, max: 60, saturationAdjust: -25, lightnessAdjust: 15 },
  WARM_RED: { min: 330, max: 360, saturationAdjust: -25, lightnessAdjust: 15 },
  DEFAULT: { saturationAdjust: -20, lightnessAdjust: 12 },
};

export const getColorCategory = (hue) => {
  if (hue >= COLOR_CATEGORIES.PURPLE.min && hue <= COLOR_CATEGORIES.PURPLE.max) return "PURPLE";
  if (hue >= COLOR_CATEGORIES.GREEN.min && hue <= COLOR_CATEGORIES.GREEN.max) return "GREEN";
  if ((hue >= COLOR_CATEGORIES.WARM.min && hue <= COLOR_CATEGORIES.WARM.max) || (hue >= COLOR_CATEGORIES.WARM_RED.min && hue <= COLOR_CATEGORIES.WARM_RED.max)) return "WARM";
  return "DEFAULT";
};

export const adjustColorForPalette = (hsl, paletteType) => {
  const category = getColorCategory(hsl.hue);
  const config = COLOR_CATEGORIES[category];

  if (paletteType === "VIVID") {
    return {
      hue: hsl.hue,
      saturation: Math.min(100, hsl.saturation + 15),
      lightness: Math.max(0, hsl.lightness - 10),
    };
  }

  // For NORMAL palette
  return {
    hue: hsl.hue,
    saturation: Math.max(0, hsl.saturation + config.saturationAdjust),
    lightness: Math.min(100, hsl.lightness + config.lightnessAdjust),
  };
};

export const generatePaletteVariations = (baseHsl, paletteType) => {
  const variations = [];
  const maxSteps = 5;
  const stepSize = paletteType === "VIVID" ? 10 : 5;

  // Adjust the base color according to the palette type
  const adjustedBase = adjustColorForPalette(baseHsl, paletteType);

  // Generate lighter variations
  let currentLightness = adjustedBase.lightness;
  for (let i = 0; i < maxSteps && currentLightness < 100; i++) {
    currentLightness += stepSize;
    if (currentLightness > 100) break;

    variations.unshift({
      hue: adjustedBase.hue,
      saturation: Math.max(0, adjustedBase.saturation - i * 3),
      lightness: Math.round(currentLightness),
    });
  }

  // Add base color
  variations.push({ ...adjustedBase });

  // Generate darker variations
  currentLightness = adjustedBase.lightness;
  for (let i = 0; i < maxSteps && currentLightness > 0; i++) {
    currentLightness -= stepSize;
    if (currentLightness < 0) break;

    variations.push({
      hue: adjustedBase.hue,
      saturation: Math.min(100, adjustedBase.saturation + i * 2),
      lightness: Math.round(currentLightness),
    });
  }

  return variations;
};

export const hslToRgb = ({ hue, saturation, lightness }) => {
  const s = saturation / 100;
  const l = lightness / 100;
  const k = (n) => (n + hue / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  return {
    r: Math.round(255 * f(0)),
    g: Math.round(255 * f(8)),
    b: Math.round(255 * f(4)),
  };
};

export const rgbToHex = ({ r, g, b }) => {
  const toHex = (x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const createColorString = (hsl, format) => {
  switch (format) {
    case "hsl":
      return createHSLString(hsl);
    case "rgb": {
      const rgb = hslToRgb(hsl);
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    }
    case "hex": {
      const rgb = hslToRgb(hsl);
      return rgbToHex(rgb);
    }
    default:
      return createHSLString(hsl);
  }
};

// ===================================================================
//  Multi formats entries - add the conversion of hex to hsl
// ===================================================================

/**
 * Converts RGB color values to HSL format
 * @param {Object} rgb - RGB color object
 * @param {number} rgb.r - Red value (0-255)
 * @param {number} rgb.g - Green value (0-255)
 * @param {number} rgb.b - Blue value (0-255)
 * @returns {Object} HSL color object with hue (0-360), saturation (0-100), lightness (0-100)
 */
export const rgbToHsl = ({ r, g, b }) => {
  // Convert RGB values to 0-1 range
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    hue: Math.round(h * 360),
    saturation: Math.round(s * 100),
    lightness: Math.round(l * 100)
  };
};

/**
 * Converts hexadecimal color to RGB format
 * @param {string} hex - Hexadecimal color string (with or without #)
 * @returns {Object} RGB color object with r, g, b values (0-255)
 */
export const hexToRgb = (hex) => {
  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Parse hex values
  let r, g, b;
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  }

  return { r, g, b };
};

/**
 * Converts hexadecimal color to HSL format
 * @param {string} hex - Hexadecimal color string (with or without #)
 * @returns {Object} HSL color object with hue, saturation, lightness
 */
export const hexToHsl = (hex) => {
  const rgb = hexToRgb(hex);
  return rgbToHsl(rgb);
};
