/*
 * Web Palette Lab - A web tool for generating color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/utils/colorStore.js

/**
 * Color store module for managing application color state
 * @module colorStore
 */

/**
 * @typedef {Object} HSLColor
 * @property {number} hue - Hue value (0-360)
 * @property {number} saturation - Saturation value (0-100)
 * @property {number} lightness - Lightness value (0-100)
 */

/**
 * @typedef {Object} ColorStore
 * @property {function(string, Object|null): void} updateColor - Updates color in store
 * @property {function(string): Object|null} getColor - Gets current color from store
 * @property {function(string): void} updateFormat - Updates color format
 * @property {function(): string} getFormat - Gets current color format
 */

import { eventBus } from "./eventBus.js";

/**
 * Creates a color store instance
 * @returns {ColorStore} Color store instance
 */
export const createColorStore = () => {
  const state = {
    primary: null,
    secondary: null,
    accent: null,
    format: "hex",
    prefix: "--",
  };

  /**
   * Update color in store and notify subscribers
 * @param {string} type - Color type (primary/secondary/accent)
 * @param {Object|null} color - HSL color object or null
 * @param {number} color.hue - Hue value (0-360)
 * @param {number} color.saturation - Saturation value (0-100)
 * @param {number} color.lightness - Lightness value (0-100)
 * @emits {colorUpdate} { type, color } - Color update event
   */
  const updateColor = (type, color) => {
    state[type] = color;
    eventBus.emit("colorUpdate", { type, color });
  };

  /**
   * Get current color state
   * @param {string} type - Color type
   * @returns {HSLColor|null} Current color object or null
   */
  const getColor = (type) => state[type];

  /**
   * Update format preference and notify subscribers
   * @param {string} format - Color format (hex/rgb/hsl)
   * @emits {formatUpdate} format - New color format
   */
  const updateFormat = (format) => {
    state.format = format;
    eventBus.emit("formatUpdate", format);
  };

  /**
   * Get current format
   * @returns {string} Current color format
   */
  const getFormat = () => state.format;

  return {
    updateColor,
    getColor,
    updateFormat,
    getFormat,
  };
};
