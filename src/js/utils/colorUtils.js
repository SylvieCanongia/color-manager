/*
 * Web Palette Lab - A web tool for generating color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/utils/colorUtils.js

/**
 * Color manipulation utilities
 * @module utils/colorUtils
 * @description Provides color conversion, palette generation and color calculations
 */

/**
 * Creates an HSL color string from component values
 * @param {Object} params - HSL color components
 * @param {number} params.hue - Hue value (0-360)
 * @param {number} params.saturation - Saturation value (0-100)
 * @param {number} params.lightness - Lightness value (0-100)
 * @returns {string} HSL color string in format "hsl(h, s%, l%)"
 */
export const createHSLString = ({ hue, saturation, lightness }) => `hsl(${hue}, ${saturation}%, ${lightness}%)`;

/**
 * Calculates the relative luminance of a color
 * @param {Object} params - HSL color components
 * @param {number} params.hue - Hue value (0-360)
 * @param {number} params.saturation - Saturation value (0-100)
 * @param {number} params.lightness - Lightness value (0-100)
 * @returns {number} Relative luminance value between 0 and 1
 */
export const calculateLuminance = ({ hue, saturation, lightness }) => {
  // Simplified luminance calculation based on lightness
  return lightness / 100;
};

/**
 * Determines if a color needs dark text for contrast
 * @param {Object} hsl - HSL color components
 * @param {number} hsl.hue - Hue value (0-360)
 * @param {number} hsl.saturation - Saturation value (0-100)
 * @param {number} hsl.lightness - Lightness value (0-100)
 * @returns {boolean} True if color needs dark text, false otherwise
 */
export const needsDarkText = (hsl) => {
  return calculateLuminance(hsl) > 0.6;
};

// Functions for palette enhancement

/**
 * Color category definitions with adjustment values
 * @constant
 * @type {Object.<string, {min?: number, max?: number, saturationAdjust: number, lightnessAdjust: number}>}
 */
const COLOR_CATEGORIES = {
  PURPLE: { min: 260, max: 320, saturationAdjust: -15, lightnessAdjust: 10 },
  GREEN: { min: 120, max: 180, saturationAdjust: -20, lightnessAdjust: 12 },
  WARM: { min: 0, max: 60, saturationAdjust: -25, lightnessAdjust: 15 },
  WARM_RED: { min: 330, max: 360, saturationAdjust: -25, lightnessAdjust: 15 },
  DEFAULT: { saturationAdjust: -20, lightnessAdjust: 12 },
};

/**
 * Determines the category of a color based on its hue
 * @param {number} hue - Hue value (0-360)
 * @returns {string} Color category ("PURPLE", "GREEN", "WARM", or "DEFAULT")
 */
export const getColorCategory = (hue) => {
  if (hue >= COLOR_CATEGORIES.PURPLE.min && hue <= COLOR_CATEGORIES.PURPLE.max) return "PURPLE";
  if (hue >= COLOR_CATEGORIES.GREEN.min && hue <= COLOR_CATEGORIES.GREEN.max) return "GREEN";
  if ((hue >= COLOR_CATEGORIES.WARM.min && hue <= COLOR_CATEGORIES.WARM.max) || (hue >= COLOR_CATEGORIES.WARM_RED.min && hue <= COLOR_CATEGORIES.WARM_RED.max)) return "WARM";
  return "DEFAULT";
};

/**
 * Adjusts color components based on palette type and color category
 * @param {Object} hsl - HSL color components
 * @param {number} hsl.hue - Hue value (0-360)
 * @param {number} hsl.saturation - Saturation value (0-100)
 * @param {number} hsl.lightness - Lightness value (0-100)
 * @param {string} paletteType - Type of palette ("NORMAL" or "VIVID")
 * @returns {Object} Adjusted HSL color components
 */
export const adjustColorForPalette = (hsl, paletteType) => {
  const category = getColorCategory(hsl.hue);
  const config = COLOR_CATEGORIES[category];

  if (paletteType === "VIVID") {
    // For vivid palettes:
    // - Increase saturation by 15% to make colors more intense
    // - Decrease lightness by 10% to maintain contrast
    return {
      hue: hsl.hue,
      saturation: Math.min(100, hsl.saturation + 15),
      lightness: Math.max(0, hsl.lightness - 10),
    };
  }

  // For NORMAL palette
  // - Adjust saturation based on color category (reduces saturation for specific hues)
  // - Increase lightness to maintain readability
  // - Purple hues: reduce saturation less (-15%) to maintain vibrancy
  // - Green hues: reduce more (-20%) to avoid eye strain
  // - Warm hues: reduce most (-25%) to maintain natural appearance
  return {
    hue: hsl.hue,
    saturation: Math.max(0, hsl.saturation + config.saturationAdjust),
    lightness: Math.min(100, hsl.lightness + config.lightnessAdjust),
  };
};

/**
 * Validates HSL color components
 * @param {Object} hsl - HSL color components
 * @returns {boolean} True if valid, false otherwise
 */
const validateHSLParams = (hsl) => {
  if (!hsl || typeof hsl !== "object") return false;

  const { hue, saturation, lightness } = hsl;

  // Check if all components exist and are numbers
  if ([hue, saturation, lightness].some((v) => typeof v !== "number")) return false;

  // Validate ranges
  return hue >= 0 && hue <= 360 && saturation >= 0 && saturation <= 100 && lightness >= 0 && lightness <= 100;
};

/**
 * Validates palette generation config
 * @param {Object} config - Configuration object
 * @returns {boolean} True if valid, false otherwise
 */
const validatePaletteConfig = (config) => {
  if (!config || typeof config !== "object") return false;

  const { steps, stepSize, saturationStep, type } = config;

  // Check numeric parameters
  if (steps && (typeof steps !== "number" || steps < 0)) return false;
  if (stepSize && (typeof stepSize !== "number" || stepSize <= 0)) return false;
  if (saturationStep && typeof saturationStep !== "number") return false;

  // Check palette type
  if (type && !["NORMAL", "VIVID"].includes(type)) return false;

  return true;
};

// Existing function maintained for backward compatibility
/**
 * Generates color palette variations with default settings
 * @param {Object} baseHsl - Base color in HSL format
 * @param {number} baseHsl.hue - Hue value (0-360)
 * @param {number} baseHsl.saturation - Saturation value (0-100)
 * @param {number} baseHsl.lightness - Lightness value (0-100)
 * @param {string} paletteType - Type of palette ("NORMAL" or "VIVID")
 * @returns {Array<Object>} Array of HSL color variations
 * @deprecated Consider using generatePaletteWithConfig instead
 */
export const generatePaletteVariations = (baseHsl, paletteType) => {
  return generatePaletteWithConfig(baseHsl, {
    type: paletteType,
    steps: 5,
    stepSize: paletteType === "VIVID" ? 10 : 5,
  });
};

// New function with flexible config
/**
 * Generates a customizable color palette with configurable parameters
 * @param {Object} baseHsl - Base color in HSL format
 * @param {number} baseHsl.hue - Hue value (0-360)
 * @param {number} baseHsl.saturation - Saturation value (0-100)
 * @param {number} baseHsl.lightness - Lightness value (0-100)
 * @param {Object} config - Configuration options
 * @param {number} [config.steps=5] - Number of steps in each direction
 * @param {number} [config.stepSize=5] - Size of each step in lightness
 * @param {number} [config.saturationStep=3] - Saturation change per step
 * @param {string} [config.type="NORMAL"] - Palette type ("NORMAL" or "VIVID")
 * @returns {Array<Object>} Array of HSL color variations
 */
export const generatePaletteWithConfig = (baseHsl, config = {}) => {
  // Validate input parameters
  if (!validateHSLParams(baseHsl)) {
    throw new Error("Invalid HSL color parameters");
  }

  if (!validatePaletteConfig(config)) {
    throw new Error("Invalid palette configuration");
  }

  const { steps = 5, stepSize = 5, saturationStep = 3, type = "NORMAL" } = config;

  const variations = [];
  // Adjust the base color according to the palette type
  const adjustedBase = adjustColorForPalette(baseHsl, type);

  // Generate lighter variations
  let currentLightness = adjustedBase.lightness;
  for (let i = 0; i < steps && currentLightness < 100; i++) {
    currentLightness += stepSize;
    if (currentLightness > 100) break;

    variations.unshift({
      hue: adjustedBase.hue,
      saturation: Math.max(0, adjustedBase.saturation - i * saturationStep),
      lightness: Math.round(currentLightness),
    });
  }

  // Add base color
  variations.push({ ...adjustedBase });

  // Generate darker variations
  currentLightness = adjustedBase.lightness;
  for (let i = 0; i < steps && currentLightness > 0; i++) {
    currentLightness -= stepSize;
    if (currentLightness < 0) break;

    variations.push({
      hue: adjustedBase.hue,
      saturation: Math.min(100, adjustedBase.saturation + i * (saturationStep - 1)),
      lightness: Math.round(currentLightness),
    });
  }

  return variations;
};

/**
 * Converts HSL color values to RGB format
 * @param {Object} hsl - HSL color components
 * @param {number} hsl.hue - Hue value (0-360)
 * @param {number} hsl.saturation - Saturation value (0-100)
 * @param {number} hsl.lightness - Lightness value (0-100)
 * @returns {Object} RGB color object with r, g, b values (0-255)
 */
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

/**
 * Converts RGB color values to hexadecimal format
 * @param {Object} rgb - RGB color components
 * @param {number} rgb.r - Red value (0-255)
 * @param {number} rgb.g - Green value (0-255)
 * @param {number} rgb.b - Blue value (0-255)
 * @returns {string} Hexadecimal color string (e.g., "#FF0000")
 */
export const rgbToHex = ({ r, g, b }) => {
  const toHex = (x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Creates a color string in the specified format
 * @param {Object} hsl - HSL color components
 * @param {number} hsl.hue - Hue value (0-360)
 * @param {number} hsl.saturation - Saturation value (0-100)
 * @param {number} hsl.lightness - Lightness value (0-100)
 * @param {string} format - Output format ("hsl", "rgb", or "hex")
 * @returns {string} Color string in the specified format
 */
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
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    hue: Math.round(h * 360),
    saturation: Math.round(s * 100),
    lightness: Math.round(l * 100),
  };
};

/**
 * Converts hexadecimal color to RGB format
 * @param {string} hex - Hexadecimal color string (with or without #)
 * @returns {Object} RGB color object with r, g, b values (0-255)
 */
export const hexToRgb = (hex) => {
  // Remove # if present
  hex = hex.replace(/^#/, "");

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
