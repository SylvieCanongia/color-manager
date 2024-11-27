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

// Create HSL string from component values
const createHSLString = ({ hue, saturation, lightness }) => 
    `hsl(${hue}, ${saturation}%, ${lightness}%)`;

// Update color preview and display value
export const updatePreview = (type, hsl) => {
    const preview = document.getElementById(`${type}ColorPreview`);
    const value = document.getElementById(`${type}ColorValue`);

    // Check if all values are empty or zero
    const isEmpty = !hsl || (hsl.hue === 0 && hsl.saturation === 0 && hsl.lightness === 0);

    if (isEmpty) {
        // Reset to empty state
        preview.style.backgroundColor = '';
        preview.classList.add('empty-preview');
        value.textContent = '';
        return;
    }

    // Update with color values
    const hslString = createHSLString(hsl);
    preview.style.backgroundColor = hslString;
    preview.classList.remove('empty-preview');
    value.textContent = hslString;
};