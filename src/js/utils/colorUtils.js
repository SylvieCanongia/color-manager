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
export const createHSLString = ({ hue, saturation, lightness }) => 
    `hsl(${hue}, ${saturation}%, ${lightness}%)`;

// Calculate relative luminance for contrast
export const calculateLuminance = ({ hue, saturation, lightness }) => {
    // Simplified luminance calculation based on lightness
    return lightness / 100;
};

// Check if color needs dark text
export const needsDarkText = (hsl) => {
    return calculateLuminance(hsl) > 0.6;
};