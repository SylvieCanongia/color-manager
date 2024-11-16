/*
 * Color Manager - A web tool for generating HSL color palettes
 * Copyright (C) 2024 Sylvie Canongia
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/utils/domUtils.js

/**
 * Creates a debounced version of a function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
      const later = () => {
          clearTimeout(timeout);
          func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
  };
}

/**
* Announces a message to screen readers
* @param {string} message - Message to announce
*/
export function announceToScreenReader(message) {
  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", "polite");
  announcement.setAttribute("class", "sr-only");
  announcement.textContent = message;
  document.body.appendChild(announcement);
  // Remove the announcement after 1 second
  setTimeout(() => announcement.remove(), 1000);
}

/**
* Copies text to clipboard and shows feedback
* @param {string[]} colors - Array of color values to copy
* @returns {Promise<void>}
*/
export function copyToClipboard(colors) {
  const textToCopy = colors.join("\n");
  return navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
          announceToScreenReader("Palette copiée dans le presse-papier");
          alert("Palette copiée !");
      })
      .catch((err) => {
          console.error("Erreur lors de la copie :", err);
          announceToScreenReader("Erreur lors de la copie de la palette");
          alert("Erreur lors de la copie de la palette");
          
      });
}