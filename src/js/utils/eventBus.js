/*
 * Web Palette Lab - A web tool for generating color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/utils/eventBus.js

/**
 * Simple event bus for handling application-wide events
 * @module eventBus
 * @description Centralized event system for managing color updates, theme changes, validation errors and UI interactions
 */
export const eventBus = {
  events: {},

   /**
   * Subscribe to an event
   * @param {string} event - Event name from EVENTS constant
   * @param {Function} callback - Callback function to handle the event
   * @returns {Function} Unsubscribe function
   * @example
   * eventBus.subscribe('colorUpdate', ({ type, color }) => {
   *   // Handle color update
   * });
   */
  subscribe(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
    return () => this.unsubscribe(event, callback);
  },

  /**
   * Emit an event
   * @param {string} event - Event name from EVENTS constant
   * @param {*} data - Event payload (see EVENTS documentation for payload types)
   * @example
   * eventBus.emit('colorUpdate', { type: 'primary', color: hslColor });
   */
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(data));
    }
  },

  /**
   * Unsubscribe from an event
   * @param {string} event - Event name from EVENTS constant
   * @param {Function} callback - Callback function to remove
   * @example
   * const unsubscribe = eventBus.subscribe('themeChanged', handleTheme);
   * unsubscribe(); // Later when needed
   */
  unsubscribe(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    }
  },
};
