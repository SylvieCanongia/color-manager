/*
 * Color Manager - A web tool for generating HSL color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/components/colorInput.js

import { isValidHSL, validateDetailedInput } from "../utils/validation.js";
import { updatePreview } from "./preview.js";
import { resetPalettes } from "./palette.js";

// Color types constants
const TYPES = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  ACCENT: "accent",
};

export const initColorInputs = () => {
  // Initialize input handling for a specific color type
  const setupHSLInput = (type) => {
    const hslInput = document.getElementById(`${type}HslInput`);
    const errorElement = document.getElementById(`${type}HslError`);
    const hueInput = document.getElementById(`${type}-hue`);
    const saturationInput = document.getElementById(`${type}-saturation`);
    const lightnessInput = document.getElementById(`${type}-lightness`);

    // Update detailed inputs with HSL values
    const updateDetailedInputs = (hsl) => {
      hueInput.value = hsl.hue;
      saturationInput.value = hsl.saturation;
      lightnessInput.value = hsl.lightness;
    };

    // Clear all inputs and reset palettes
    const clearInputs = () => {
      hslInput.value = "";
      hueInput.value = "";
      saturationInput.value = "";
      lightnessInput.value = "";
      errorElement.textContent = "";
      updatePreview(type, null);
      resetPalettes(type); // Reset palettes when inputs are cleared
    };

    // Handle HSL input changes
    const handleHSLInput = () => {
      const value = hslInput.value.trim();
      console.log("value", value);
      // Clear all if empty
      if (!value) {
        clearInputs();
        return;
      }

      const validationResult = isValidHSL(value);
      console.log("validationResult", validationResult);
      if (!validationResult.isValid) {
        errorElement.textContent = validationResult.error;
        errorElement.classList.add("visible");
        console.log("validationResult.error", validationResult.error);
        hslInput.setAttribute("aria-invalid", "true");
        return;
      }

      errorElement.textContent = "";
      errorElement.classList.remove("visible");
      hslInput.setAttribute("aria-invalid", "false");
      updateDetailedInputs(validationResult.values);
      updatePreview(type, validationResult.values);
    };

    // Handle detailed inputs changes
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

      updatePreview(type, hsl);
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
