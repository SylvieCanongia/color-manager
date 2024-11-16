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

// Create element with attributes
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

// Remove all children from an element
export const clearElement = (element) => {
  while (element.firstChild) {
      element.removeChild(element.firstChild);
  }
};

// Add or remove class based on condition
export const toggleClass = (element, className, condition) => {
  element.classList.toggle(className, condition);
};