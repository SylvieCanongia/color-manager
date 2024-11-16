/**
 * Generates a color palette with lighter and darker variants
 * @param {number} hue - HSL hue value (0-360)
 * @param {number} saturation - HSL saturation value (0-100)
 * @param {number} lightness - HSL lightness value (0-100)
 * @param {string} mode - "normal" for 5% steps or "vivid" for 10% steps
 * @returns {Array} Array of color objects with color values and metadata
 */
export function generatePalette(hue, saturation, lightness, mode) {
  const colors = [];
  const step = mode === "normal" ? 5 : 10;

  // Generate lighter colors (in descending order)
  for (let i = 5; i >= 1; i--) {
      const newLightness = Math.min(lightness + i * step, 100);
      colors.push({
          color: formatHSL(hue, saturation, newLightness),
          lightness: newLightness
      });
  }

  // Base color
  colors.push({
      color: formatHSL(hue, saturation, lightness),
      lightness: lightness,
      isBase: true
  });

  // Darker colors
  for (let i = 1; i <= 5; i++) {
      const newLightness = Math.max(lightness - i * step, 0);
      colors.push({
          color: formatHSL(hue, saturation, newLightness),
          lightness: newLightness
      });
  }

  // Sort colors by lightness (lightest to darkest)
  return colors.sort((a, b) => b.lightness - a.lightness);
}

/**
* Formats HSL values into a valid CSS color string
* @param {number} hue - HSL hue value
* @param {number} saturation - HSL saturation value
* @param {number} lightness - HSL lightness value
* @returns {string} Formatted HSL string
*/
export function formatHSL(hue, saturation, lightness) {
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}