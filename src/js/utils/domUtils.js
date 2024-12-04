/*
 * Web Palette Lab - A web tool for generating color palettes
 * Copyright (C) 2024 Sylvie Canongia
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/utils/domUtils.js

/**
 * DOM utility functions
 * @module domUtils
 */

/**
 * Creates an HTML element with specified attributes and text content
 * @param {string} tag - HTML tag name
 * @param {Object} [attributes={}] - Element attributes
 * @param {string} [text=''] - Text content
 * @returns {HTMLElement} Created element
 */
export const createElement = (tag, attributes = {}, text = '') => {
  const element = document.createElement(tag);
  
  Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
          element.className = value;
      } else {
          element.setAttribute(key, value);
      }
  });
  
  if (text) {
      element.textContent = text;
  }
  
  return element;
};

/**
 * Removes all child nodes from an element
 * @param {HTMLElement} element - Element to clear
 */
export const clearElement = (element) => {
  while (element.firstChild) {
      element.removeChild(element.firstChild);
  }
};

/**
 * Toggles a class on an element based on a condition
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class to toggle
 * @param {boolean} condition - Condition for toggling
 */
export const toggleClass = (element, className, condition) => {
  element.classList.toggle(className, condition);
};