/*
 * Color Manager - A web tool for generating HSL color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/components/palette.js

// Constants for palette generation
const STEPS = {
  NORMAL: 5,
  VIVID: 10,
};

const TYPES = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  ACCENT: "accent",
};

// Create HSL string from component values
const createHSLString = ({ hue, saturation, lightness }) => `hsl(${hue}, ${saturation}%, ${lightness}%)`;

// Generate palette variations with fixed number of steps
const generatePalette = (baseHsl, step) => {
  const variations = [];
  const maxSteps = 5; // 5 steps in each direction + base color = 11 total colors
  let currentLightness = baseHsl.lightness;

  // Generate lighter variations (5 steps up)
  currentLightness = baseHsl.lightness;
  for (let i = 0; i < maxSteps && currentLightness < 100; i++) {
    currentLightness += step;
    if (currentLightness > 100) break;

    variations.unshift({
      hue: baseHsl.hue,
      saturation: baseHsl.saturation,
      lightness: Math.round(currentLightness),
    });
  }

  // Add base color
  variations.push({ ...baseHsl });

  // Generate darker variations (5 steps down)
  currentLightness = baseHsl.lightness;
  for (let i = 0; i < maxSteps && currentLightness > 0; i++) {
    currentLightness -= step;
    if (currentLightness < 0) break;

    variations.push({
      hue: baseHsl.hue,
      saturation: baseHsl.saturation,
      lightness: Math.round(currentLightness),
    });
  }

  return variations;
};

// Create empty palette boxes
const createEmptyPalette = () => {
  const boxes = [];
  for (let i = 0; i < 11; i++) {
    // 11 boxes (5 lighter + base + 5 darker)
    const box = document.createElement("div");
    box.className = "color-box empty-box";
    boxes.push(box);
  }
  return boxes;
};

// Create color box element
const createColorBox = (hsl, isBase = false) => {
  const box = document.createElement("div");
  box.className = `color-box${isBase ? " base-color" : ""}`;
  box.style.backgroundColor = createHSLString(hsl);

  const text = document.createElement("p");
  text.textContent = `${hsl.lightness}%`;
  box.appendChild(text);

  return box;
};

// Update palette display
const updatePalette = (type, variations, paletteType) => {
  const paletteElement = document.getElementById(`${type}${paletteType}Palette`);
  if (!paletteElement) return;

  // Clear existing palette
  paletteElement.innerHTML = "";

  // Construct ID with first letter cap
  const buttonId = `copy${type.charAt(0).toUpperCase() + type.slice(1)}${paletteType}`;

  // Handle copy button
  const copyButton = document.getElementById(buttonId);

  if (!variations) {
    // Add empty state with checkerboard pattern
    const emptyBoxes = createEmptyPalette();
    emptyBoxes.forEach((box) => paletteElement.appendChild(box));

    // Disable copy button if it exists
    if (copyButton) {
      copyButton.disabled = true;
      copyButton.onclick = null; // Remove old event listener
    }
    return;
  }

  // Setup copy functionality only when we have variations
  // Add new color boxes
  variations.forEach((hsl, index) => {
    const isBase = index === Math.floor(variations.length / 2);
    const colorBox = createColorBox(hsl, isBase);
    paletteElement.appendChild(colorBox);
  });

  // Setup copy functionality
  if (copyButton) {
    copyButton.disabled = false;

    copyButton.onclick = () => {
      const cssVariables = variations.map((hsl, index) => `--color-${type.toLowerCase()}-${index * 100}: ${createHSLString(hsl)};`).join("\n");

      navigator.clipboard.writeText(cssVariables);
      const originalText = copyButton.textContent;
      copyButton.textContent = "Copié !";
      setTimeout(() => {
        copyButton.textContent = originalText;
      }, 2000);
    };
  }
};

// Check if color has been set
const hasColorValues = (type) => {
  const hue = document.getElementById(`${type}-hue`).value;
  const saturation = document.getElementById(`${type}-saturation`).value;
  const lightness = document.getElementById(`${type}-lightness`).value;

  return hue !== "" && saturation !== "" && lightness !== "";
};

// Export function to reset palettes
export const resetPalettes = (type) => {
  updatePalette(type, null, "Normal");
  updatePalette(type, null, "Vivid");
};

// Initialize palette generation
export const initPalettes = () => {
  const form = document.getElementById("paletteForm");
  if (!form) return;

  // Initialize empty palettes immediately
  Object.values(TYPES).forEach((type) => {
    resetPalettes(type);
  });

  const generatePalettes = (type) => {
    if (!hasColorValues(type)) {
      resetPalettes(type);
      return;
    }

    const hue = parseInt(document.getElementById(`${type}-hue`).value);
    const saturation = parseInt(document.getElementById(`${type}-saturation`).value);
    const lightness = parseInt(document.getElementById(`${type}-lightness`).value);

    const baseHsl = { hue, saturation, lightness };

    // Generate normal variations
    const normalVariations = generatePalette(baseHsl, STEPS.NORMAL);
    updatePalette(type, normalVariations, "Normal");

    // Generate vivid variations
    const vividVariations = generatePalette(baseHsl, STEPS.VIVID);
    updatePalette(type, vividVariations, "Vivid");
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    Object.values(TYPES).forEach(generatePalettes);
  });
};
