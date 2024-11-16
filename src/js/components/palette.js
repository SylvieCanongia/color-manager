// src/js/components/palette.js

import { generatePalette } from '../utils/colorUtils.js';
import { announceToScreenReader, copyToClipboard } from '../utils/domUtils.js';

/**
 * Displays a color palette in the specified container
 * @param {Array} palette - Array of color objects
 * @param {string} containerId - ID of the container element
 */
function displayPalette(palette, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Handle empty or invalid palette
    if (!palette?.length || palette.some(color => color.color.includes('NaN'))) {
        container.innerHTML = '';
        // Create empty boxes (5 per row)
        for (let i = 0; i < 11; i++) {
            const colorBox = document.createElement('div');
            colorBox.classList.add('color-box', 'empty-box');
            const colorText = document.createElement('p');
            colorText.textContent = 'En attente';
            colorBox.appendChild(colorText);
            container.appendChild(colorBox);
        }
        return;
    }

    // Display normal palette
    container.innerHTML = '';
    palette.forEach(colorObj => {
        const colorBox = document.createElement('div');
        colorBox.classList.add('color-box');
        colorBox.style.backgroundColor = colorObj.color;
        
        if (colorObj.isBase) {
            colorBox.classList.add('base-color');
        }

        const colorText = document.createElement('p');
        colorText.textContent = colorObj.color;
        colorBox.appendChild(colorText);
        container.appendChild(colorBox);
    });
}

/**
 * Generates and displays color palettes for a specific color type
 * @param {string} colorType - Type of color (primary, secondary, accent)
 */
function generateColorPalettes(colorType) {
    const hueInput = document.getElementById(`${colorType}-hue`);
    const saturationInput = document.getElementById(`${colorType}-saturation`);
    const lightnessInput = document.getElementById(`${colorType}-lightness`);

    if (!hueInput || !saturationInput || !lightnessInput) {
        console.error(`Inputs manquants pour ${colorType}`);
        return;
    }

    // Get HSL values
    const hue = parseInt(hueInput.value);
    const saturation = parseInt(saturationInput.value);
    const lightness = parseInt(lightnessInput.value);

    // Handle empty or invalid inputs
    if (isNaN(hue) || isNaN(saturation) || isNaN(lightness)) {
        displayPalette([], `${colorType}NormalPalette`);
        displayPalette([], `${colorType}VividPalette`);
        return;
    }

    // Generate and display palettes
    const normalPalette = generatePalette(hue, saturation, lightness, "normal");
    const vividPalette = generatePalette(hue, saturation, lightness, "vivid");

    displayPalette(normalPalette, `${colorType}NormalPalette`);
    displayPalette(vividPalette, `${colorType}VividPalette`);

    // Announce palette generation to screen reader
    announceToScreenReader(`Palettes de couleurs générées pour la couleur ${colorType}`);
}

/**
 * Initializes palette functionality
 */
export function initializePalettes() {
    // Initialize copy buttons
    const copyButtons = {
        copyPrimaryNormal: "primaryNormalPalette",
        copyPrimaryVivid: "primaryVividPalette",
        copySecondaryNormal: "secondaryNormalPalette",
        copySecondaryVivid: "secondaryVividPalette",
        copyAccentNormal: "accentNormalPalette",
        copyAccentVivid: "accentVividPalette"
    };

    // Set up copy buttons
    Object.entries(copyButtons).forEach(([buttonId, paletteId]) => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener("click", () => {
                const colors = Array.from(
                    document.querySelectorAll(`#${paletteId} .color-box p`)
                ).map(p => p.textContent).filter(Boolean);
                
                if (colors.length) {
                    copyToClipboard(colors);
                    announceToScreenReader("Palette copiée dans le presse-papier");
                } else {
                    announceToScreenReader("Aucune couleur à copier");
                }
            });
        }
    });

    // Initialize form submission
    const form = document.getElementById("paletteForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            generateColorPalettes("primary");
            generateColorPalettes("secondary");
            generateColorPalettes("accent");
        });
    }

    // Generate initial empty palettes
    ["primary", "secondary", "accent"].forEach(colorType => {
        generateColorPalettes(colorType);
    });
}