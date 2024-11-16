// src/js/main.js

import { initializeColorInputs } from './components/colorInput.js';
import { initializePalettes } from './components/palette.js';
import { initializePreviews } from './components/preview.js';

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize all components
        initializeColorInputs();
        initializePalettes();
        initializePreviews();

        // Add form submission handler
        const form = document.getElementById("paletteForm");
        if (form) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                // Trigger palette generation for all colors
                ["primary", "secondary", "accent"].forEach(colorType => {
                    const hue = document.getElementById(`${colorType}-hue`).value;
                    const saturation = document.getElementById(`${colorType}-saturation`).value;
                    const lightness = document.getElementById(`${colorType}-lightness`).value;
                    if (hue && saturation && lightness) {
                        generateColorPalettes(colorType);
                    }
                });
            });
        }

    } catch (error) {
        console.error('Error initializing application:', error);
    }
});