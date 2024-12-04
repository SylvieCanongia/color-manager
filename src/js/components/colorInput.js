/*
 * Web Palette Lab - A web tool for generating color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/components/colorInput.js

/**
 * Color input handling and validation
 * @module components/colorInput
 * @description Manages color input fields, format detection, and validation
 */

/** @typedef {import('../utils/colorStore.js').ColorStore} ColorStore */

import { isValidHSL, isValidRGB, isValidHEX, detectColorFormat, validateDetailedInput } from "../utils/validation.js";
import { rgbToHsl, hexToHsl } from "../utils/colorUtils.js";
import { resetPalettes } from "./palette.js";

// Color types constants
const TYPES = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  ACCENT: "accent",
};

/**
 * Initializes color input handling for all color types (primary, secondary, accent)
 * @param {ColorStore} colorStore - Color store instance for state
 */
export const initColorInputs = (colorStore) => {
  /**
   * Sets up HSL input handling for a specific color type
   * @param {string} type - Color type (primary/secondary/accent)
   */
  const setupHSLInput = (type) => {
    const hslInput = document.getElementById(`${type}HslInput`);
    const errorElement = document.getElementById(`${type}HslError`);
    const hueInput = document.getElementById(`${type}-hue`);
    const saturationInput = document.getElementById(`${type}-saturation`);
    const lightnessInput = document.getElementById(`${type}-lightness`);

    /**
     * Updates detailed input fields with HSL values
     * @param {Object} hsl - HSL color object
     * @param {number} hsl.hue - Hue value (0-360)
     * @param {number} hsl.saturation - Saturation value (0-100)
     * @param {number} hsl.lightness - Lightness value (0-100)
     */
    const updateDetailedInputs = (hsl) => {
      hueInput.value = hsl.hue;
      saturationInput.value = hsl.saturation;
      lightnessInput.value = hsl.lightness;
    };

    /**
     * Clears all input fields and resets palettes
     */
    const clearInputs = () => {
      hslInput.value = "";
      hueInput.value = "";
      saturationInput.value = "";
      lightnessInput.value = "";
      errorElement.textContent = "";
      colorStore.updateColor(type, null);
      resetPalettes(type); // Reset palettes when inputs are cleared
    };

    /**
     * Handles changes in the HSL input field
     * Validates input format and updates color state
     */
    const handleHSLInput = () => {
      const value = hslInput.value.trim();
      const detailedInputs = [hueInput, saturationInput, lightnessInput];
      const helpMessage = detailedInputs[0].closest(".detailed-input").querySelector(".help-message");

      // Clear all if empty
      if (!value) {
        clearInputs();
        errorElement.textContent = "";
        errorElement.classList.remove("visible");
        hslInput.setAttribute("aria-invalid", "false");
        // Enable detailed inputs and clear help message
        detailedInputs.forEach((input) => {
          input.disabled = false;
          input.value = "";
          input.title = "";
        });
        helpMessage.textContent = "";
        helpMessage.classList.remove("visible");
        return;
      }

      // Detect input format
      const format = detectColorFormat(value);
      let hslValues;
      let validationResult;

      // Handle detailed inputs state based on format
      if (format !== "hsl" && format !== null) {
        const message = "Saisie détaillée disponible uniquement pour le format HSL";
        detailedInputs.forEach((input) => {
          input.disabled = true;
          input.value = "";
          input.title = message; // Add native tooltip on hover
        });
        helpMessage.textContent = message;
        helpMessage.classList.add("visible");
      } else {
        detailedInputs.forEach((input) => {
          input.disabled = false;
          input.title = ""; // Remove tooltip
        });
        helpMessage.textContent = "";
        helpMessage.classList.remove("visible");
      }

      switch (format) {
        case "hsl":
          validationResult = isValidHSL(value);
          if (validationResult.isValid) {
            hslValues = validationResult.values;
          }
          break;

        case "rgb":
          validationResult = isValidRGB(value);
          if (validationResult.isValid) {
            hslValues = rgbToHsl(validationResult.values);
          }
          break;

        case "hex":
          validationResult = isValidHEX(value);
          if (validationResult.isValid) {
            hslValues = hexToHsl(validationResult.values);
          }
          break;

        default:
          validationResult = {
            isValid: false,
            error: "Format invalide. Utilisez HSL, RGB ou HEX",
          };
      }

      if (!validationResult.isValid) {
        errorElement.textContent = validationResult.error;
        errorElement.classList.add("visible");
        hslInput.setAttribute("aria-invalid", "true");
        return;
      }

      errorElement.textContent = "";
      errorElement.classList.remove("visible");
      hslInput.setAttribute("aria-invalid", "false");
      updateDetailedInputs(hslValues);
      colorStore.updateColor(type, hslValues);
    };

    /**
     * Handles changes in detailed HSL input fields
     * Validates input values and updates color state
     * @param {Event} event - Input event object
     */
    const handleDetailedInput = (event) => {
      const input = event.target;
      const min = parseInt(input.min);
      const max = parseInt(input.max);

      const validationResult = validateDetailedInput(input.value, min, max);
      const errorSpan = input.parentNode.querySelector(".error-message");

      errorSpan.textContent = validationResult.error;
      errorSpan.classList.toggle("visible", !validationResult.isValid);
      input.setAttribute("aria-invalid", !validationResult.isValid);

      if (!validationResult.isValid) return;

      const hue = parseInt(hueInput.value);
      const saturation = parseInt(saturationInput.value);
      const lightness = parseInt(lightnessInput.value);

      // Clear HSL input and preview if all detailed inputs are empty
      if (isNaN(hue) && isNaN(saturation) && isNaN(lightness)) {
        clearInputs();
        return;
      }

      const hsl = {
        hue: hue || 0,
        saturation: saturation || 0,
        lightness: lightness || 0,
      };

      colorStore.updateColor(type, hsl);
      hslInput.value = `hsl(${hsl.hue}, ${hsl.saturation}%, ${hsl.lightness}%)`;
    };

    // Event listeners
    hslInput.addEventListener("input", handleHSLInput);
    [hueInput, saturationInput, lightnessInput].forEach((input) => {
      input.addEventListener("input", handleDetailedInput);
    });
  };

  // Initialize all color inputs
  Object.values(TYPES).forEach(setupHSLInput);
};
