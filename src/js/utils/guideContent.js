/*
 * Web Palette Lab - A web tool for generating color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/utils/guideContent.js

/**
 * Help guide content in French and English
 * Content structure optimized for accessibility and maintainability
 * @type {Object}
 */
export const guideContent = {
  fr: {
    sections: [
      {
        title: "Saisie des couleurs",
        content: [
          {
            title: "Saisie rapide ",
            description: "Entrez une couleur au format HSL, RGB ou HEX",
          },
          {
            title: "Saisie détaillée ",
            description: "Utilisez les champs individuels HSL (disponible uniquement pour le format HSL)",
          },
          {
            title: "Formats acceptés",
            formats: [
              { type: "HSL", example: "hsl(320, 80%, 58%)" },
              { type: "RGB", example: "rgb(255, 100, 50)" },
              { type: "HEX", example: "#FF6432 ou #F64" },
            ],
          },
        ],
      },
      {
        title: "Génération de palettes",
        content: [
          {
            title: "Types de variations",
            variations: [
              { type: "Normal", description: "Variations avec pas de 5%" },
              { type: "Vivid", description: "Variations plus contrastées avec pas de 10%" },
            ],
          },
          "Chaque palette génère 11 variations de la couleur de base",
        ],
      },
      {
        title: "Export des couleurs",
        content: [
          "Choisir le format d'export (HSL, RGB, HEX) via la liste déroulante individuelle à droite de chaque palette ou via la liste déroulante globale au dessus des palettes",
          {
            title: "Options d'export",
            features: [
              { action: "Copie individuelle", description: `Copier une palette en cliquant sur <svg class="copy-icon" aria-hidden="true" viewBox="0 0 24 24" width="16" height="16"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>` },
              { action: "Copie globale", description: "Copier toutes les palettes en cliquant sur le bouton 'Copier toutes les palettes'" },
              { action: "Préfixe personnalisé", description: "Personnaliser le préfixe des variables CSS via le champ dédié" },
            ],
          },
          "Les couleurs sont exportées en variables CSS",
        ],
      },
      {
        title: "Recommandations",
        content: [
          {
            title: "Pour des palettes optimales",
            guidelines: [
              { rule: "Saturation", value: "supérieure à 0% pour éviter les gris purs" },
              { rule: "Luminosité", value: "entre 40% et 60% pour la couleur de base" },
              { rule: "À éviter", value: "saturation 0% avec luminosité très faible" },
            ],
          },
        ],
      },
    ],
  },
  en: {
    sections: [
      {
        title: "Color Input",
        content: [
          {
            title: "Quick input ",
            description: "Enter a color in HSL, RGB, or HEX format",
          },
          {
            title: "Detailed input ",
            description: "Use individual HSL fields (available only for HSL format)",
          },
          {
            title: "Accepted formats",
            formats: [
              { type: "HSL", example: "hsl(320, 80%, 58%)" },
              { type: "RGB", example: "rgb(255, 100, 50)" },
              { type: "HEX", example: "#FF6432 or #F64" },
            ],
          },
        ],
      },
      {
        title: "Palette Generation",
        content: [
          {
            title: "Variation types",
            variations: [
              { type: "Normal", description: "Variations with 5% steps" },
              { type: "Vivid", description: "More contrasted variations with 10% steps" },
            ],
          },
          "Each palette generates 11 variations of the base color",
        ],
      },
      {
        title: "Color Export",
        content: [
          "Choose the export format (HSL, RGB, HEX) via the individual dropdown on the right of each palette or via the global dropdown above the palettes",
          {
            title: "Export options",
            features: [
              { action: "Individual copy", description: `Copy a palette by clicking on <svg class="copy-icon" aria-hidden="true" viewBox="0 0 24 24" width="16" height="16"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>` },
              { action: "Global copy", description: "Copy all palettes by clicking on the 'Copy all palettes' button" },
              { action: "Custom prefix", description: "Customize CSS variables prefix using the dedicated input field" }
            ],
          },
          "Colors are exported as CSS variables",
        ],
      },
      {
        title: "Recommendations",
        content: [
          {
            title: "For optimal palettes",
            guidelines: [
              { rule: "Saturation", value: "above 0% to avoid pure grays" },
              { rule: "Lightness", value: "between 40% and 60% for base color" },
              { rule: "Avoid", value: "0% saturation with very low lightness" },
            ],
          },
        ],
      },
    ],
  },
};
