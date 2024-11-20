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

import { createHSLString, createColorString, generatePaletteVariations } from "../utils/colorUtils.js";

// Constants for palette generation
const TYPES = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  ACCENT: "accent",
};

// Create empty palette boxes
const createEmptyPalette = () => {
  const boxes = [];
  for (let i = 0; i < 11; i++) {
    const box = document.createElement("div");
    box.className = "color-box empty-box";
    box.setAttribute("role", "listitem");
    box.setAttribute("aria-label", "Empty color slot");
    boxes.push(box);
  }
  return boxes;
};

// Create color box element
const createColorBox = (hsl, isBase = false) => {
  const box = document.createElement("div");
  box.className = `color-box${isBase ? " base-color" : ""}`;
  box.style.backgroundColor = createHSLString(hsl);

  // Add ARIA labels for accessibility
  box.setAttribute("role", "listitem");
  box.setAttribute("aria-label", `Color: HSL(${hsl.hue}, ${hsl.saturation}%, ${hsl.lightness}%)`);

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
  const copyButton = document.getElementById(buttonId);

  if (!variations) {
    // Add empty state with checkerboard pattern
    const emptyBoxes = createEmptyPalette();
    emptyBoxes.forEach((box) => paletteElement.appendChild(box));

    if (copyButton) {
      copyButton.disabled = true;
      copyButton.onclick = null;
    }
    return;
  }

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
      const formatSelect = copyButton.parentElement.querySelector(".format-select");
      console.log("format-select", formatSelect);
      const format = formatSelect ? formatSelect.value : "hsl";
      console.log("format", format);
      const cssVariables = variations.map((hsl, index) => `--color-${type.toLowerCase()}-${index * 100}: ${createColorString(hsl, format)};`).join("\n");
      console.log("variables", cssVariables);

      navigator.clipboard.writeText(cssVariables);
      copyButton.classList.add("copied");
      setTimeout(() => {
        copyButton.classList.remove("copied");
      }, 2200);
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
  if (!form) {
    console.warn("Palette form not found in the DOM");
    return;
  }

  // Initialize empty palettes immediately
  Object.values(TYPES).forEach(resetPalettes);

  const generatePalettes = (type) => {
    try {
      if (!hasColorValues(type)) {
        resetPalettes(type);
        return;
      }

      const hue = parseInt(document.getElementById(`${type}-hue`).value);
      const saturation = parseInt(document.getElementById(`${type}-saturation`).value);
      const lightness = parseInt(document.getElementById(`${type}-lightness`).value);

      if (isNaN(hue) || isNaN(saturation) || isNaN(lightness)) {
        throw new Error("Invalid color values");
      }

      const baseHsl = { hue, saturation, lightness };

      // Generate normal variations
      const normalVariations = generatePaletteVariations(baseHsl, "NORMAL");
      updatePalette(type, normalVariations, "Normal");

      // Generate vivid variations
      const vividVariations = generatePaletteVariations(baseHsl, "VIVID");
      updatePalette(type, vividVariations, "Vivid");
    } catch (error) {
      console.error(`Error generating palettes for ${type}:`, error);
      resetPalettes(type);
    }
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    Object.values(TYPES).forEach(generatePalettes);
  });
};
