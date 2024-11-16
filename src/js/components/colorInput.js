// src/js/components/colorInput.js

import { isValidHSL, parseHSL } from "../utils/validation.js";
import { formatHSL } from "../utils/colorUtils.js";
import { debounce, announceToScreenReader } from "../utils/domUtils.js";

/**
 * Handles HSL input changes with debouncing
 * @param {HTMLInputElement} input - The HSL input element
 * @param {string} colorType - Type of color (primary, secondary, accent)
 */
const debouncedHandleHSLInput = debounce((input, colorType) => {
  handleHSLInput(input, colorType);
}, 150);

/**
 * Updates all inputs and preview for a color type
 * @param {string} colorType - Type of color
 * @param {number} hue - HSL hue value
 * @param {number} saturation - HSL saturation value
 * @param {number} lightness - HSL lightness value
 */
function updateAllInputs(colorType, hue, saturation, lightness) {
  // Update number inputs
  document.getElementById(`${colorType}-hue`).value = hue;
  document.getElementById(`${colorType}-saturation`).value = saturation;
  document.getElementById(`${colorType}-lightness`).value = lightness;
  
  // Update HSL input
  const hslInput = document.getElementById(`${colorType}HslInput`);
  if (hslInput) {
      hslInput.value = formatHSL(hue, saturation, lightness);
  }

  // Update preview
  updatePreviewFromInputs(colorType, hue, saturation, lightness);
}

function handleHSLInput(input, colorType) {
  const hslValue = input.value.trim();
  const preview = document.getElementById(`${colorType}ColorPreview`);
  const errorSpan = document.getElementById(`${colorType}HslError`);

  if (isValidHSL(hslValue)) {
    const { hue, saturation, lightness } = parseHSL(hslValue);

    // Reset error state
    input.classList.remove("invalid");
    errorSpan.textContent = "";
    errorSpan.classList.remove("visible");

    // Update preview state
    preview.classList.remove("empty-preview");

    // Update all inputs and preview
    updateAllInputs(colorType, hue, saturation, lightness);
    announceToScreenReader(`Couleur mise à jour : ${hslValue}`);
  } else {
    // Show error state
    input.classList.add("invalid");
    errorSpan.textContent = "Format HSL invalide. Exemple : hsl(320, 80%, 58%)";
    errorSpan.classList.add("visible");
    announceToScreenReader("Format HSL invalide. Exemple correct : hsl(320, 80%, 58%)");
  }
}

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
    void preview.offsetWidth;
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
 * Initializes all color inputs and their event listeners
 */
export function initializeColorInputs() {
  ["primary", "secondary", "accent"].forEach((colorType) => {
    // Initialize HSL inputs
    const hslInput = document.getElementById(`${colorType}HslInput`);
    if (hslInput) {
      ["input", "paste"].forEach((eventType) => {
        hslInput.addEventListener(eventType, (e) => {
          if (eventType === "paste") {
            setTimeout(() => handleHSLInput(e.target, colorType), 0);
          } else {
            debouncedHandleHSLInput(e.target, colorType);
          }
        });
      });
    }

    // Initialize number inputs
    const inputs = [
      document.getElementById(`${colorType}-hue`),
      document.getElementById(`${colorType}-saturation`),
      document.getElementById(`${colorType}-lightness`)
    ];

    inputs.forEach((input) => {
      // Add screen reader instructions
      input.addEventListener("focus", function () {
        const inputType = this.id.includes("hue") ? "teinte" : this.id.includes("saturation") ? "saturation" : "luminosité";
        announceToScreenReader(`Saisie de la ${inputType}. Utilisez les flèches ou entrez une valeur.`);
      });

      // Handle input changes
      input.addEventListener("input", () => {
        const [hue, saturation, lightness] = inputs.map((i) => parseInt(i.value));
        if (!isNaN(hue) && !isNaN(saturation) && !isNaN(lightness)) {
          updateAllInputs(colorType, hue, saturation, lightness);
        }
      });
    });

    // Initialize empty state
    const preview = document.getElementById(`${colorType}ColorPreview`);
    const value = document.getElementById(`${colorType}ColorValue`);
    preview.classList.add("empty-preview");
    value.textContent = "Aucune couleur";
  });
}
