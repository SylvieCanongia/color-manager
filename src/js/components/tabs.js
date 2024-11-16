/*
 * Color Manager - A web tool for generating HSL color palettes
 * Copyright (C) 2024 Sylvie Canongia
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/components/tabs.js

const KEYS = {
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight'
};

export const initTabs = () => {
  const tabList = document.querySelector('.color-tabs');
  const tabs = Array.from(document.querySelectorAll('.tab-button'));
  const panels = Array.from(document.querySelectorAll('.color-panel'));

  const switchTab = (selectedTab) => {
      // Mise à jour des onglets
      tabs.forEach(tab => {
          const isSelected = tab === selectedTab;
          tab.setAttribute('aria-selected', isSelected);
          tab.classList.toggle('active', isSelected);
      });

      // Mise à jour des panneaux
      panels.forEach(panel => {
          panel.hidden = panel.id !== selectedTab.getAttribute('aria-controls');
      });
  };

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
  tabs.forEach(tab => {
      tab.addEventListener('click', () => switchTab(tab));
  });

  tabList.addEventListener('keydown', handleKeyboard);

  // Initialisation
  switchTab(tabs[0]);
};