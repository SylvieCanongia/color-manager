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
 * Help guide content in both languages
 * @type {Object}
 */
export const guideContent = {
  fr: {
    sections: [
      {
        title: "Saisie des couleurs",
        content: ["• Saisie rapide : Entrez une couleur au format HSL, RGB ou HEX", "• Saisie détaillée : Utilisez les champs individuels HSL (disponible uniquement pour le format HSL)", "• Formats acceptés :", "  - HSL : hsl(320, 80%, 58%)", "  - RGB : rgb(255, 100, 50)", "  - HEX : #FF6432 ou #F64"],
      },
      {
        title: "Génération de palettes",
        content: ["• Normal : Variations avec pas de 5%", "• Vivid : Variations plus contrastées avec pas de 10%", "• Chaque palette génère 11 variations de la couleur de base"],
      },
      {
        title: "Export des couleurs",
        content: ["• Choisissez le format d'export (HSL, RGB, HEX)", "• Copiez une palette individuelle", "• Utilisez 'Copier toutes les palettes' pour exporter l'ensemble", "• Les couleurs sont exportées en variables CSS"],
      },
      {
        title: "Recommandations",
        content: ["Pour des palettes optimales :", "• Saturation > 0% pour éviter les gris purs", "• Luminosité entre 40% et 60% pour la couleur de base", "• Évitez saturation 0% avec luminosité très faible"],
      },
    ],
  },
  en: {
    sections: [
      {
        title: "Color Input",
        content: ["• Quick input: Enter a color in HSL, RGB, or HEX format", "• Detailed input: Use individual HSL fields (available only for HSL format)", "• Accepted formats:", "  - HSL: hsl(320, 80%, 58%)", "  - RGB: rgb(255, 100, 50)", "  - HEX: #FF6432 or #F64"],
      },
      {
        title: "Palette Generation",
        content: ["• Normal: Variations with 5% steps", "• Vivid: More contrasted variations with 10% steps", "• Each palette generates 11 variations of the base color"],
      },
      {
        title: "Color Export",
        content: ["• Choose export format (HSL, RGB, HEX)", "• Copy individual palettes", "• Use 'Copy all palettes' to export everything", "• Colors are exported as CSS variables"],
      },
      {
        title: "Recommendations",
        content: ["For optimal palettes:", "• Saturation > 0% to avoid pure grays", "• Lightness between 40% and 60% for base color", "• Avoid 0% saturation with very low lightness"],
      },
    ],
  },
};

/**
 * Initializes the help guide functionality
 */
export const initHelpGuide = () => {
  const dialog = document.getElementById("helpDialog");
  const helpButton = document.getElementById("helpButton");
  const closeButton = dialog.querySelector(".close-button");
  const tabButtons = dialog.querySelectorAll('[role="tab"]');
  const dialogBody = dialog.querySelector(".dialog-body");

  // Current language state
  let currentLang = "fr";

  /**
   * Renders content for the selected language
   * @param {string} lang - Language code ('fr' or 'en')
   */
  const renderContent = (lang) => {
    const content = guideContent[lang];
    console.log(content);
    dialogBody.innerHTML = content.sections
      .map(
        (section) => `
        <section class="help-section">
          <h3>${section.title}</h3>
          <div class="help-content">
            ${section.content.map((line) => `<p>${line}</p>`).join("")}
          </div>
        </section>
      `
      )
      .join("");
  };

  /**
   * Handles language tab selection
   * @param {Event} e - Click event
   */
  const handleTabClick = (e) => {
    const lang = e.target.textContent.toLowerCase();
    if (lang === currentLang) return;

    // Update tabs state
    tabButtons.forEach((btn) => {
      btn.setAttribute("aria-selected", btn === e.target);
    });

    currentLang = lang;
    renderContent(lang);
  };

  // Event listeners
  helpButton.addEventListener("click", () => {
    dialog.showModal();
    renderContent(currentLang);
  });

  closeButton.addEventListener("click", () => {
    dialog.close();
  });

  // Close dialog when clicking outside
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });

  // Language switching
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", handleTabClick);
  });

  // Handle escape key
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "Escape") dialog.close();
  });
};
