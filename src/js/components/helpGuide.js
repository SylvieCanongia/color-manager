/*
 * Web Palette Lab - A web tool for generating color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/components/helpGuide.js

/**
 * Help guide dialog component
 * @module components/helpGuide
 * @description Manages bilingual help guide modal with theme support
 */

import { eventBus } from "../utils/eventBus.js";
import { guideContent } from "../utils/guideContent.js";
import { getText } from "../utils/i18n.js";

/**
 * Helper functions for rendering different types of content sections
 * @namespace renderHelpers
 */
const renderHelpers = {
  /**
   * Renders a list of color formats with examples
   * @param {Object} formats - Format information
   * @param {string} formats.title - Section title
   * @param {Array<Object>} formats.formats - List of formats
   * @param {string} formats.formats[].type - Format type
   * @param {string} formats.formats[].example - Format example
   * @returns {string} HTML string for formats section
   */
  renderFormats: (formats) => `
    <div class="format-list">
      <h4>${formats.title}</h4>
      <ul class="color-formats" role="list">
        ${formats.formats
          .map(
            (format) => `
          <li>
            <span class="format-type">${format.type} :</span>
            <code>${format.example}</code>
          </li>
        `
          )
          .join("")}
      </ul>
    </div>
  `,

  /**
   * Renders a list of color variations
   * @param {Object} variations - Variation information
   * @param {string} variations.title - Section title
   * @param {Array<Object>} variations.variations - List of variations
   * @param {string} variations.variations[].type - Variation type
   * @param {string} variations.variations[].description - Variation description
   * @returns {string} HTML string for variations section
   */
  renderVariations: (variations) => `
    <div class="variations-list">
      <h4>${variations.title}</h4>
      <ul role="list">
        ${variations.variations
          .map(
            (v) => `
          <li>
            <strong>${v.type} :</strong> ${v.description}
          </li>
        `
          )
          .join("")}
      </ul>
    </div>
  `,

  /**
   * Renders a list of features
   * @param {Object} features - Feature information
   * @param {string} features.title - Section title
   * @param {Array<Object>} features.features - List of features
   * @param {string} features.features[].action - Feature action
   * @param {string} features.features[].description - Feature description
   * @returns {string} HTML string for features section
   */
  renderFeatures: (features) => `
    <div class="features-list">
      <h4>${features.title}</h4>
      <ul role="list">
        ${features.features
          .map(
            (f) => `
          <li>
            <strong>${f.action} :</strong> ${f.description}
          </li>
        `
          )
          .join("")}
      </ul>
    </div>
  `,

  /**
   * Renders a list of guidelines
   * @param {Object} guidelines - Guideline information
   * @param {string} guidelines.title - Section title
   * @param {Array<Object>} guidelines.guidelines - List of guidelines
   * @param {string} guidelines.guidelines[].rule - Guideline rule
   * @param {string} guidelines.guidelines[].value - Guideline value
   * @returns {string} HTML string for guidelines section
   */
  renderGuidelines: (guidelines) => `
    <div class="guidelines-list">
      <h4>${guidelines.title}</h4>
      <ul role="list">
        ${guidelines.guidelines
          .map(
            (g) => `
          <li>
            <strong>${g.rule} :</strong> ${g.value}
          </li>
        `
          )
          .join("")}
      </ul>
    </div>
  `,
};

/**
 * Renders a single section of the help guide
 * @param {Object} section - Section data object
 * @returns {string} HTML string
 */
const renderSection = (section) => {
  const renderContentItem = (item) => {
    if (typeof item === "string") return `<p>${item}</p>`;
    if (item.title && item.description) {
      return `
        <div class="content-item">
          <h4>${item.title}</h4>
          <p>${item.description}</p>
        </div>
      `;
    }
    if (item.formats) return renderHelpers.renderFormats(item);
    if (typeof item === "string") return `<p>${item}</p>`;
    if (item.formats) return renderHelpers.renderFormats(item);
    if (item.variations) return renderHelpers.renderVariations(item);
    if (item.features) return renderHelpers.renderFeatures(item);
    if (item.guidelines) return renderHelpers.renderGuidelines(item);
    return "";
  };
  return `
    <section class="help-section" aria-labelledby="section-${section.title.toLowerCase().replace(/\s+/g, "-")}">
      <h3 id="section-${section.title.toLowerCase().replace(/\s+/g, "-")}">${section.title}</h3>
      <div class="help-content">
        ${section.content.map(renderContentItem).join("")}
      </div>
    </section>
  `;
};

/**
 * Generates HTML content for the help guide
 * @param {Object} languageContent - Guide content for the selected language
 * @param {Array<{title: string, content: Array<Object|string>}>} languageContent.sections - Guide sections
 * @returns {string} Complete HTML for the guide content
 */
const generateGuideHTML = (languageContent) => {
  if (!languageContent || !languageContent.sections) {
    console.warn("Invalid guide content structure");
    return "";
  }

  return `
      <div class="guide-content" role="document">
          ${languageContent.sections.map(renderSection).join("")}
      </div>
  `;
};

/**
 * Initializes help guide functionality
 * Sets up dialog controls, language switching, and theme support
 * @description Manages help guide modal with dynamic language support and theme handling
 * @listens {languageUpdate} Updates guide content when language changes
 * @listens {themeChanged} Updates dialog theme
 * @emits {guideOpened} When guide dialog opens
 * @emits {guideClosed} When guide dialog closes
 * @emits {guideContentUpdated} When guide content is updated with new language
 */
export const initHelpGuide = () => {
  const dialog = document.getElementById("helpDialog");
  const closeButton = dialog?.querySelector(".close-dialog");
  const helpButton = document.getElementById("helpButton");
  const tabList = dialog?.querySelector('[role="tablist"]');
  const currentLang = document.documentElement.lang;

  if (!dialog || !closeButton || !helpButton || !tabList) {
    console.warn("Help guide elements not found");
    return;
  }

  /**
   * Creates a single language tab element
   * @param {string} lang - Language code
   * @returns {HTMLButtonElement} Tab button element
   */
  const createLanguageTab = (lang) => {
    const tab = document.createElement("button");
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", "true");
    tab.textContent = lang.toUpperCase();
    return tab;
  };

  /**
   * Updates tab list with current language
   * @param {string} lang - Language code
   */
  const updateTabList = (lang) => {
    tabList.innerHTML = "";
    const tab = createLanguageTab(lang);
    tabList.appendChild(tab);
  };

  /**
   * Updates guide content for selected language
   * @param {string} lang - Language code
   * @emits {guideContentUpdated} When content is updated
   */
  const updateGuideContent = (lang) => {
    const content = dialog.querySelector("#guideContent");
    if (!content) return;

    const languageContent = guideContent[lang] || guideContent.en;
    content.innerHTML = generateGuideHTML(languageContent);
    eventBus.emit("guideContentUpdated", { lang });
  };

  // Initialize with current language
  updateTabList(currentLang);
  updateGuideContent(currentLang);

  // Listen for language changes
  eventBus.subscribe("languageUpdate", ({ lang }) => {
    updateTabList(lang);
    updateGuideContent(lang);
  });

  // Subscribe to theme changes
  eventBus.subscribe("themeChanged", ({ theme }) => {
    dialog.setAttribute("data-theme", theme);
  });

  // Dialog management
  helpButton.addEventListener("click", () => {
    dialog.showModal();
    eventBus.emit("guideOpened");
  });

  closeButton.addEventListener("click", () => {
    dialog.close();
    eventBus.emit("guideClosed");
  });

  // Close on click outside
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
};
