// src/js/components/preview.js

import { formatHSL } from '../utils/colorUtils.js';
import { announceToScreenReader } from '../utils/domUtils.js';

/**
 * Updates preview from input values
 * @param {string} colorType - Type of color (primary, secondary, accent)
 * @param {number} hue - HSL hue value
 * @param {number} saturation - HSL saturation value
 * @param {number} lightness - HSL lightness value
 */
function updatePreviewFromInputs(colorType, hue, saturation, lightness) {
    const preview = document.getElementById(`${colorType}ColorPreview`);
    const value = document.getElementById(`${colorType}ColorValue`);
    const hslValue = formatHSL(hue, saturation, lightness);

    preview.classList.remove("empty-preview");
    preview.style.backgroundColor = hslValue;
    value.textContent = hslValue;

    // Add update animation
    preview.classList.remove("preview-update");
    void preview.offsetWidth; // Force browser to recalculate style
    preview.classList.add("preview-update");

    preview.addEventListener(
        "animationend",
        function () {
            preview.classList.remove("preview-update");
        },
        { once: true }
    );
}

/**
 * Initializes color previews
 */
export function initializePreviews() {
    ["primary", "secondary", "accent"].forEach(colorType => {
        const preview = document.getElementById(`${colorType}ColorPreview`);
        const value = document.getElementById(`${colorType}ColorValue`);
        
        if (preview && value) {
            // Set initial empty state
            preview.classList.add("empty-preview");
            value.textContent = "Aucune couleur";
            
            // Add click to copy functionality
            preview.addEventListener("click", () => {
                const currentColor = value.textContent;
                if (currentColor && currentColor !== "Aucune couleur") {
                    navigator.clipboard.writeText(currentColor)
                        .then(() => {
                            announceToScreenReader("Couleur copiée dans le presse-papier");
                        })
                        .catch(() => {
                            announceToScreenReader("Erreur lors de la copie de la couleur");
                        });
                }
            });
        }
    });
}

export { updatePreviewFromInputs };