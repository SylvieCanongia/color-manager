/*
 * Web Palette Lab - A web tool for generating color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/components/tabs.js

/**
 * Tab navigation system
 * @module components/tabs
 * @description Manages color type tabs and panel switching
 */

import { eventBus } from "../utils/eventBus.js";

/**
 * Keyboard navigation constants
 * @constant {Object}
 */
const KEYS = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
};

/**
 * Initializes tab navigation system
 * @returns {void}
 */
export const initTabs = () => {
  const tabList = document.querySelector(".color-tabs");
  const tabs = Array.from(document.querySelectorAll(".tab-button"));
  const panels = Array.from(document.querySelectorAll(".color-panel"));

  /**
   * Switches active tab and panel
   * @param {HTMLElement} selectedTab - The tab to activate
   * @emits {tabChange} { colorType } When active tab changes
   */
  const switchTab = (selectedTab) => {
    const colorType = selectedTab.getAttribute("data-color-type");

    // Update tabs
    tabs.forEach((tab) => {
      const isSelected = tab === selectedTab;
      tab.setAttribute("aria-selected", isSelected);
      tab.classList.toggle("active", isSelected);
    });

    // Update panels
    panels.forEach((panel) => {
      panel.hidden = panel.id !== selectedTab.getAttribute("aria-controls");
    });

    // Emit tab change event
    eventBus.emit('tabChange', { colorType });
  };

  /**
   * Handles keyboard navigation
   * @param {KeyboardEvent} event - Keyboard event
   */
  const handleKeyboard = (event) => {
    const currentTab = document.activeElement;
    if (!tabs.includes(currentTab)) return;

    const index = tabs.indexOf(currentTab);
    let newIndex;

    switch (event.key) {
      case KEYS.LEFT:
        newIndex = index > 0 ? index - 1 : tabs.length - 1;
        break;
      case KEYS.RIGHT:
        newIndex = index < tabs.length - 1 ? index + 1 : 0;
        break;
      default:
        return;
    }

    event.preventDefault();
    tabs[newIndex].focus();
    switchTab(tabs[newIndex]);
  };

  // Event listeners
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab));
  });

  tabList.addEventListener("keydown", handleKeyboard);

  // Initialize with first tab
  switchTab(tabs[0]);
};
