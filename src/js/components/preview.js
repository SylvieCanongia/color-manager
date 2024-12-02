/*
 * Web Palette Lab - A web tool for generating color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/components/preview.js
import { eventBus } from "../utils/eventBus.js";
import { createColorString } from "../utils/colorUtils.js";

/**
 * Initialize preview component
 */
export const initPreview = () => {
  // Subscribe to color updates
  eventBus.subscribe("colorUpdate", ({ type, color }) => {
    const preview = document.getElementById(`${type}ColorPreview`);
    const value = document.getElementById(`${type}ColorValue`);

    // Check if all values are empty or null
    const isEmpty = !color || (color.hue === 0 && color.saturation === 0 && color.lightness === 0);

    if (isEmpty) {
      // Reset to empty state
      preview.style.backgroundColor = "";
      preview.classList.add("empty-preview");
      value.textContent = "";
      return;
    }

    // Update with color values
    const colorString = createColorString(color, "hsl");
    preview.style.backgroundColor = colorString;
    preview.classList.remove("empty-preview");
    value.textContent = colorString;
  });

  // Subscribe to format updates
  eventBus.subscribe("formatUpdate", (format) => {
    ["primary", "secondary", "accent"].forEach((type) => {
      const value = document.getElementById(`${type}ColorValue`);
      const preview = document.getElementById(`${type}ColorPreview`);

      if (!preview.classList.contains("empty-preview")) {
        const backgroundColor = preview.style.backgroundColor;
        if (backgroundColor) {
          value.textContent = backgroundColor;
        }
      }
    });
  });
};
