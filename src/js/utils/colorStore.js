/*
 * Web Palette Lab - A web tool for generating color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * Color store module for managing application color state
 * @module colorStore
 */
import { eventBus } from "./eventBus.js";

export const createColorStore = () => {
  const state = {
    primary: null,
    secondary: null,
    accent: null,
    format: "hex",
    prefix: "--",
  };

  /**
   * Update color in store
   * @param {string} type - Color type (primary/secondary/accent)
   * @param {string} color - Color value
   */
  const updateColor = (type, color) => {
    state[type] = color;
    eventBus.emit("colorUpdate", { type, color });
  };

  /**
   * Get current color state
   * @param {string} type - Color type
   * @returns {string|null} Color value
   */
  const getColor = (type) => state[type];

  /**
   * Update format preference
   * @param {string} format - Color format (hex/rgb/hsl)
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
