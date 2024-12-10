/*
 * Web Palette Lab - A web tool for generating color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/utils/loadSvgSprite.js

/**
 * Load SVG sprite file and inject it into the DOM
 * @param {string} url - Path to the SVG sprite file
 * @returns {Promise<void>} - Resolves when sprite is loaded and injected
 * @throws {Error} When loading or injection fails
 */
export const loadSvgSprite = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const svgContent = await response.text();
    const div = document.createElement("div");
    div.classList.add("flags-sprite-container");
    div.style.display = "none";
    div.innerHTML = svgContent;
    document.body.insertBefore(div, document.body.childNodes[0]);
  } catch (error) {
    throw new Error(`Failed to load SVG sprite: ${error.message}`);
  }
};
