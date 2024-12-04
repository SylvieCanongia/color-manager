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
 * Initializes the help guide functionality
 * @listens {themeChanged} Updates guide theme
 * @emits {guideOpened} When guide opens
 * @emits {guideClosed} When guide closes
 * @emits {languageChanged} { lang } When language changes
 * @emits {guideContentUpdated} { lang } When guide content is updated
 */
export const initHelpGuide = () => {
  // Cache DOM elements
  const elements = {
    dialog: document.getElementById("helpDialog"),
    helpButton: document.getElementById("helpButton"),
    closeButton: document.querySelector("#helpDialog .close-button"),
    tabButtons: document.querySelectorAll('#helpDialog [role="tab"]'),
    dialogBody: document.querySelector("#helpDialog .dialog-body"),
  };

  // Current language state
  let currentLang = "fr";

  /**
   * Renders content for the selected language
   * @param {string} lang - Language code ('fr' or 'en')
   */
  const renderContent = (lang) => {
    const content = guideContent[lang];
    elements.dialogBody.innerHTML = content.sections.map(renderSection).join("");
    eventBus.emit("guideContentUpdated", { lang });
  };

  // Event handlers
  const handlers = {
    openDialog: () => {
      elements.dialog.showModal();
      renderContent(currentLang);
      eventBus.emit("guideOpened");
    },

    closeDialog: () => {
      elements.dialog.close();
      eventBus.emit("guideClosed");
    },

    handleOutsideClick: (e) => {
      if (e.target === elements.dialog) {
        elements.dialog.close();
        eventBus.emit("guideClosed");
      }
    },

    switchLanguage: (e) => {
      const lang = e.target.textContent.toLowerCase();
      if (lang === currentLang) return;

      elements.tabButtons.forEach((btn) => {
        btn.setAttribute("aria-selected", btn === e.target);
      });

      currentLang = lang;
      renderContent(lang);
      eventBus.emit("languageChanged", { lang });
    },
  };

  // Event Listeners
  elements.helpButton.addEventListener("click", handlers.openDialog);
  elements.closeButton.addEventListener("click", handlers.closeDialog);
  elements.dialog.addEventListener("click", handlers.handleOutsideClick);
  elements.tabButtons.forEach((btn) => btn.addEventListener("click", handlers.switchLanguage));
  elements.dialog.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      handlers.closeDialog();
    }
  });

  // Subscribe to theme changes if needed
  eventBus.subscribe("themeChanged", ({ theme }) => {
    elements.dialog.setAttribute("data-theme", theme);
  });
};
