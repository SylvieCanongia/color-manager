// src/js/utils/validation.js

/**
 * Validates HSL color string format and values
 * @param {string} hslString - HSL color string to validate
 * @returns {boolean} - True if valid HSL format and values
 */
export function isValidHSL(hslString) {
  const regex = /^hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)$/;
  if (!regex.test(hslString)) return false;
  
  const { hue, saturation, lightness } = parseHSL(hslString);
  return hue >= 0 && hue <= 360 && 
         saturation >= 0 && saturation <= 100 && 
         lightness >= 0 && lightness <= 100;
}

/**
* Parses HSL string into component values
* @param {string} hslString - HSL color string to parse
* @returns {Object|null} - Object with hue, saturation, lightness values or null if invalid
*/
export function parseHSL(hslString) {
  const regex = /^hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)$/;
  const matches = hslString.match(regex);
  
  if (matches) {
      return {
          hue: parseInt(matches[1]),
          saturation: parseInt(matches[2]),
          lightness: parseInt(matches[3])
      };
  }
  return null;
}