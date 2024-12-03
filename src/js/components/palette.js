/*
 * Web Palette Lab - A web tool for generating color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/components/palette.js
import { eventBus } from "../utils/eventBus.js";
import { createHSLString, createColorString, generatePaletteWithConfig, generatePaletteVariations } from "../utils/colorUtils.js";
import { generateVariableName, getCurrentPrefix } from "../utils/cssVarPrefix.js";

// Constants for palette generation
const TYPES = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  ACCENT: "accent",
};

/**
 * Creates empty palette boxes with checkerboard pattern
 * @returns {Array<HTMLElement>} Array of empty box elements
 */
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

/**
 * Creates a color box element with HSL background
 * @param {Object} hsl - HSL color values
 * @param {boolean} isBase - Whether this is the base color
 * @returns {HTMLElement} Color box element
 */
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

/**
 * Updates palette display with new colors or empty state
 * @param {string} type - Color type
 * @param {Array} variations - Array of HSL color variations
 * @param {string} paletteType - Palette type (Normal or Vivid)
 * @returns {void}
 */
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
      const format = formatSelect ? formatSelect.value : "hsl";
      const customPrefix = getCurrentPrefix();

      const cssVariables = variations.map((hsl, index) => `${generateVariableName(customPrefix, type, paletteType, index)}: ${createColorString(hsl, format)};`).join("\n");

      navigator.clipboard.writeText(cssVariables);
      copyButton.classList.add("copied");
      setTimeout(() => {
        copyButton.classList.remove("copied");
      }, 2200);
    };
  }
};

/**
 * Resets all palettes for a specific color type
 * @param {string} type - Color type (primary, secondary, accent)
 * @returns {void}
 */
export const resetPalettes = (type) => {
  updatePalette(type, null, "Normal");
  updatePalette(type, null, "Vivid");
};

/**
 * Initializes all color palettes (Normal and Vivid variants)
 * @param {Object} colorStore - Color store instance
 * @returns {void}
 */
export const initPalettes = (colorStore) => {
  const form = document.getElementById("paletteForm");
  if (!form) {
    console.warn("Palette form not found in the DOM");
    return;
  }

  // Initialize empty palettes immediately
  Object.values(TYPES).forEach(resetPalettes);

  // Subscribe to color updates
  eventBus.subscribe("colorUpdate", ({ type, color }) => {
    if (!color) {
      resetPalettes(type);
      return;
    }

    try {
      // Generate normal variations
      const normalVariations = generatePaletteVariations(color, "NORMAL");
      updatePalette(type, normalVariations, "Normal");

      // Generate vivid variations
      const vividVariations = generatePaletteVariations(color, "VIVID");
      updatePalette(type, vividVariations, "Vivid");
    } catch (error) {
      console.error(`Error generating palettes for ${type}:`, error);
      resetPalettes(type);
    }
  });

  // Subscribe to format updates
  eventBus.subscribe("formatUpdate", (format) => {
    Object.values(TYPES).forEach((type) => {
      const color = colorStore.getColor(type);
      if (color) {
        const normalVariations = generatePaletteVariations(color, "NORMAL");
        const vividVariations = generatePaletteVariations(color, "VIVID");
        updatePalette(type, normalVariations, "Normal");
        updatePalette(type, vividVariations, "Vivid");
      }
    });
  });
};

/**
 * Initializes export functionality for all palettes
 * @param {Object} colorStore - Color store instance
 */
export const initExportAllPalettes = (colorStore) => {
  const exportButton = document.getElementById("exportAllPalettes");
  const formatSelect = document.querySelector(".export-all-select");

  if (!exportButton || !formatSelect) return;

  exportButton.onclick = () => {
    const format = formatSelect.value;
    const customPrefix = getCurrentPrefix();
    const allPalettes = [];

    // Generate CSS content
    Object.values(TYPES).forEach((type) => {
      const color = colorStore.getColor(type);
      if (!color) return;

      ["Normal", "Vivid"].forEach((paletteType) => {
        const variations = generatePaletteWithConfig(color, {
          type: paletteType.toUpperCase(),
        });

        if (variations.length) {
          allPalettes.push(`/* ${type} ${paletteType} */`);
          variations.forEach((hsl, index) => {
            allPalettes.push(`${generateVariableName(customPrefix, type, paletteType.toLowerCase(), index)}: ${createColorString(hsl, format)};`);
          });
          allPalettes.push("");
        }
      });
    });

    if (allPalettes.length) {
      // Create and download file
      const content = `:root {\n  ${allPalettes.join("\n  ")}\n}`;
      const blob = new Blob([content], { type: "text/css" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "palette.css";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Save original text
      const buttonText = exportButton.querySelector('.button-text');
      const originalText = exportButton.textContent;
      // Visual feedback
      exportButton.classList.add("exported");
      buttonText.textContent = "Exporté !";
      
      setTimeout(() => {
        exportButton.classList.remove("exported");
        buttonText.textContent = originalText;
      }, 2200);
    }
  };
};

/**
 * Copies all generated palettes in selected format (HSL, RGB, HEX)
 * @param {Object} colorStore - Color store instance
 * @returns {void}
 */
export const initCopyAllPalettes = () => {
  const copyAllButton = document.getElementById("copyAllPalettes");
  const formatSelect = document.querySelector(".copy-all-select");

  if (!copyAllButton || !formatSelect) return;

  copyAllButton.onclick = () => {
    const format = formatSelect.value;
    const customPrefix = getCurrentPrefix();
    const allPalettes = [];

    // Colors types
    Object.values(TYPES).forEach((type) => {
      // Palettes types
      ["Normal", "Vivid"].forEach((paletteType) => {
        const paletteElement = document.getElementById(`${type}${paletteType}Palette`);
        if (!paletteElement) return;

        // Get palette colors
        const colors = Array.from(paletteElement.children)
          .filter((box) => box.classList.contains("color-box") && !box.classList.contains("empty-box"))
          .map((box, index) => {
            const ariaLabel = box.getAttribute("aria-label");
            const hslMatch = ariaLabel.match(/HSL\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
            if (!hslMatch) return "";

            const hsl = {
              hue: parseInt(hslMatch[1]),
              saturation: parseInt(hslMatch[2]),
              lightness: parseInt(hslMatch[3]),
            };

            return `${generateVariableName(customPrefix, type, paletteType.toLowerCase(), index)}: ${createColorString(hsl, format)};`;
          })
          .filter((color) => color !== "");

        if (colors.length) {
          allPalettes.push(`/* ${type} ${paletteType} */`);
          allPalettes.push(...colors);
          allPalettes.push("");
        }
      });
    });

    if (allPalettes.length) {
      navigator.clipboard.writeText(allPalettes.join("\n"));

      // Save original text
      const buttonText = copyAllButton.querySelector('.button-text');
      const originalText = buttonText.textContent;
      // Visual feedback
      copyAllButton.classList.add("copied");
      buttonText.textContent = "Copié !";

      setTimeout(() => {
        copyAllButton.classList.remove("copied");
        buttonText.textContent = originalText;
      }, 2200);
    }
  };
};
