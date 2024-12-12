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
 * @module guideContent
 * @description Bilingual content structure for the application help guide
 */

/**
 * @typedef {Object} Format
 * @property {string} type - Format type (HSL, RGB, HEX)
 * @property {string} example - Example of color in this format
 */

/**
 * @typedef {Object} Variation
 * @property {string} type - Variation type (Normal, Vivid)
 * @property {string} description - Description of the variation
 */

/**
 * @typedef {Object} Feature
 * @property {string} action - Feature name
 * @property {string} description - Feature description with optional HTML
 */

/**
 * @typedef {Object} Guideline
 * @property {string} rule - Guideline rule name
 * @property {string} value - Guideline value or recommendation
 */

/**
 * @typedef {Object} ContentSection
 * @property {string} title - Section title
 * @property {Array<Object|string>} content - Array of content items
 */

/**
 * @typedef {Object} GuideContent
 * @property {Array<ContentSection>} sections - Guide sections
 */

/**
 * Bilingual guide content
 * @type {Object.<string, GuideContent>}
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
              { action: "Custom prefix", description: "Customize CSS variables prefix using the dedicated input field" },
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
  es: {
    sections: [
      {
        title: "Entrada de color",
        content: [
          {
            title: "Entrada rápida",
            description: "Introduzca un color en formato HSL, RGB o HEX",
          },
          {
            title: "Entrada detallada",
            description: "Utilice los campos HSL individuales (disponible solo para formato HSL)",
          },
          {
            title: "Formatos aceptados",
            formats: [
              { type: "HSL", example: "hsl(320, 80%, 58%)" },
              { type: "RGB", example: "rgb(255, 100, 50)" },
              { type: "HEX", example: "#FF6432 o #F64" },
            ],
          },
        ],
      },
      {
        title: "Generación de paletas",
        content: [
          {
            title: "Tipos de variaciones",
            variations: [
              { type: "Normal", description: "Variaciones con pasos del 5%" },
              { type: "Vivid", description: "Variaciones más contrastadas con pasos del 10%" },
            ],
          },
          "Cada paleta genera 11 variaciones del color base",
        ],
      },
      {
        title: "Exportación de colores",
        content: [
          "Elija el formato de exportación (HSL, RGB, HEX) mediante el menú desplegable individual a la derecha de cada paleta o mediante el menú desplegable global encima de las paletas",
          {
            title: "Opciones de exportación",
            features: [
              { action: "Copia individual", description: `Copie una paleta haciendo clic en <svg class="copy-icon" aria-hidden="true" viewBox="0 0 24 24" width="16" height="16"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>` },
              { action: "Copia global", description: "Copie todas las paletas haciendo clic en el botón 'Copiar todas las paletas'" },
              { action: "Prefijo personalizado", description: "Personalice el prefijo de las variables CSS mediante el campo dedicado" },
            ],
          },
          "Los colores se exportan como variables CSS",
        ],
      },
      {
        title: "Recomendaciones",
        content: [
          {
            title: "Para paletas óptimas",
            guidelines: [
              { rule: "Saturación", value: "superior al 0% para evitar grises puros" },
              { rule: "Luminosidad", value: "entre 40% y 60% para el color base" },
              { rule: "Evitar", value: "saturación 0% con luminosidad muy baja" },
            ],
          },
        ],
      },
    ],
  },
  de: {
    sections: [
      {
        title: "Farbeingabe",
        content: [
          {
            title: "Schnelleingabe",
            description: "Geben Sie eine Farbe im HSL-, RGB- oder HEX-Format ein",
          },
          {
            title: "Detaillierte Eingabe",
            description: "Verwenden Sie die einzelnen HSL-Felder (nur für HSL-Format verfügbar)",
          },
          {
            title: "Akzeptierte Formate",
            formats: [
              { type: "HSL", example: "hsl(320, 80%, 58%)" },
              { type: "RGB", example: "rgb(255, 100, 50)" },
              { type: "HEX", example: "#FF6432 oder #F64" },
            ],
          },
        ],
      },
      {
        title: "Palette generieren",
        content: [
          {
            title: "Variationstypen",
            variations: [
              { type: "Normal", description: "Variationen mit 5%-Schritten" },
              { type: "Vivid", description: "Kontrastreichere Variationen mit 10%-Schritten" },
            ],
          },
          "Jede Palette erzeugt 11 Variationen der Grundfarbe",
        ],
      },
      {
        title: "Farben exportieren",
        content: [
          "Wählen Sie das Exportformat (HSL, RGB, HEX) über das individuelle Dropdown-Menü rechts neben jeder Palette oder über das globale Dropdown-Menü über den Paletten",
          {
            title: "Exportoptionen",
            features: [
              { action: "Einzelne Kopie", description: `Kopieren Sie eine Palette durch Klicken auf <svg class="copy-icon" aria-hidden="true" viewBox="0 0 24 24" width="16" height="16"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>` },
              { action: "Globale Kopie", description: "Kopieren Sie alle Paletten durch Klicken auf 'Alle Paletten kopieren'" },
              { action: "Benutzerdefiniertes Präfix", description: "Passen Sie das Präfix der CSS-Variablen über das dedizierte Feld an" },
            ],
          },
          "Die Farben werden als CSS-Variablen exportiert",
        ],
      },
      {
        title: "Empfehlungen",
        content: [
          {
            title: "Für optimale Paletten",
            guidelines: [
              { rule: "Sättigung", value: "über 0%, um reine Grautöne zu vermeiden" },
              { rule: "Helligkeit", value: "zwischen 40% und 60% für die Grundfarbe" },
              { rule: "Vermeiden", value: "0% Sättigung mit sehr niedriger Helligkeit" },
            ],
          },
        ],
      },
    ],
  },
  it: {
    sections: [
      {
        title: "Inserimento del colore",
        content: [
          {
            title: "Inserimento rapido",
            description: "Inserisci un colore in formato HSL, RGB o HEX",
          },
          {
            title: "Inserimento dettagliato",
            description: "Utilizza i campi HSL individuali (disponibile solo per il formato HSL)",
          },
          {
            title: "Formati accettati",
            formats: [
              { type: "HSL", example: "hsl(320, 80%, 58%)" },
              { type: "RGB", example: "rgb(255, 100, 50)" },
              { type: "HEX", example: "#FF6432 o #F64" },
            ],
          },
        ],
      },
      {
        title: "Generazione della palette",
        content: [
          {
            title: "Tipi di variazioni",
            variations: [
              { type: "Normal", description: "Variazioni con passi del 5%" },
              { type: "Vivid", description: "Variazioni più contrastate con passi del 10%" },
            ],
          },
          "Ogni palette genera 11 variazioni del colore di base",
        ],
      },
      {
        title: "Esportazione dei colori",
        content: [
          "Scegli il formato di esportazione (HSL, RGB, HEX) tramite il menu a discesa individuale a destra di ogni palette o tramite il menu a discesa globale sopra le palette",
          {
            title: "Opzioni di esportazione",
            features: [
              { action: "Copia individuale", description: `Copia una palette cliccando su <svg class="copy-icon" aria-hidden="true" viewBox="0 0 24 24" width="16" height="16"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>` },
              { action: "Copia globale", description: "Copia tutte le palette cliccando sul pulsante 'Copia tutte le palette'" },
              { action: "Prefisso personalizzato", description: "Personalizza il prefisso delle variabili CSS tramite il campo dedicato" },
            ],
          },
          "I colori vengono esportati come variabili CSS",
        ],
      },
      {
        title: "Raccomandazioni",
        content: [
          {
            title: "Per palette ottimali",
            guidelines: [
              { rule: "Saturazione", value: "superiore allo 0% per evitare grigi puri" },
              { rule: "Luminosità", value: "tra il 40% e il 60% per il colore di base" },
              { rule: "Da evitare", value: "saturazione 0% con luminosità molto bassa" },
            ],
          },
        ],
      },
    ],
  },
  eu: {
    sections: [
      {
        title: "Koloreen sarrera",
        content: [
          {
            title: "Sarrera azkarra",
            description: "Sartu kolore bat HSL, RGB edo HEX formatuan",
          },
          {
            title: "Sarrera zehatza",
            description: "Erabili HSL eremu indibidualak (HSL formatuan soilik erabilgarri)",
          },
          {
            title: "Onartutako formatuak",
            formats: [
              { type: "HSL", example: "hsl(320, 80%, 58%)" },
              { type: "RGB", example: "rgb(255, 100, 50)" },
              { type: "HEX", example: "#FF6432 edo #F64" },
            ],
          },
        ],
      },
      {
        title: "Paleten sorkuntza",
        content: [
          {
            title: "Aldaketa motak",
            variations: [
              { type: "Normal", description: "%5eko urratseko aldaketak" },
              { type: "Vivid", description: "Kontraste handiagoko aldaketak %10eko urratsekin" },
            ],
          },
          "Paleta bakoitzak oinarrizko kolorearen 11 aldaketa sortzen ditu",
        ],
      },
      {
        title: "Koloreak esportatu",
        content: [
          "Aukeratu esportazio formatua (HSL, RGB, HEX) paleta bakoitzaren eskuineko goitibeherako menuan edo paleten gaineko goitibeherako menu orokorrean",
          {
            title: "Esportazio aukerak",
            features: [
              { action: "Banakako kopia", description: `Kopiatu paleta bat klik eginez <svg class="copy-icon" aria-hidden="true" viewBox="0 0 24 24" width="16" height="16"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>` },
              { action: "Kopia orokorra", description: "Kopiatu paleta guztiak 'Kopiatu paleta guztiak' botoian klik eginez" },
              { action: "Aurrizki pertsonalizatua", description: "Pertsonalizatu CSS aldagaien aurrizkia eremu dedikatu baten bidez" },
            ],
          },
          "Koloreak CSS aldagai gisa esportatzen dira",
        ],
      },
      {
        title: "Gomendioak",
        content: [
          {
            title: "Paleta optimoetarako",
            guidelines: [
              { rule: "Saturazioa", value: "%0 baino handiagoa gris puruak saihesteko" },
              { rule: "Argitasuna", value: "%40 eta %60 artean oinarrizko kolorerako" },
              { rule: "Saihestu", value: "%0ko saturazioa argitasun oso baxuarekin" },
            ],
          },
        ],
      },
    ],
  },
  pt: {
    sections: [
      {
        title: "Entrada de cor",
        content: [
          {
            title: "Entrada rápida",
            description: "Insira uma cor no formato HSL, RGB ou HEX",
          },
          {
            title: "Entrada detalhada",
            description: "Use os campos HSL individuais (disponível apenas para o formato HSL)",
          },
          {
            title: "Formatos aceitos",
            formats: [
              { type: "HSL", example: "hsl(320, 80%, 58%)" },
              { type: "RGB", example: "rgb(255, 100, 50)" },
              { type: "HEX", example: "#FF6432 ou #F64" },
            ],
          },
        ],
      },
      {
        title: "Geração de paletas",
        content: [
          {
            title: "Tipos de variações",
            variations: [
              { type: "Normal", description: "Variações com passos de 5%" },
              { type: "Vivid", description: "Variações mais contrastadas com passos de 10%" },
            ],
          },
          "Cada paleta gera 11 variações da cor base",
        ],
      },
      {
        title: "Exportação de cores",
        content: [
          "Escolha o formato de exportação (HSL, RGB, HEX) através do menu suspenso individual à direita de cada paleta ou através do menu suspenso global acima das paletas",
          {
            title: "Opções de exportação",
            features: [
              { action: "Cópia individual", description: `Copie uma paleta clicando em <svg class="copy-icon" aria-hidden="true" viewBox="0 0 24 24" width="16" height="16"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>` },
              { action: "Cópia global", description: "Copie todas as paletas clicando no botão 'Copiar todas as paletas'" },
              { action: "Prefixo personalizado", description: "Personalize o prefixo das variáveis CSS através do campo dedicado" },
            ],
          },
          "As cores são exportadas como variáveis CSS",
        ],
      },
      {
        title: "Recomendações",
        content: [
          {
            title: "Para paletas ótimas",
            guidelines: [
              { rule: "Saturação", value: "acima de 0% para evitar cinzas puros" },
              { rule: "Luminosidade", value: "entre 40% e 60% para a cor base" },
              { rule: "Evitar", value: "saturação 0% com luminosidade muito baixa" },
            ],
          },
        ],
      },
    ],
  },
  nl: {
    sections: [
      {
        title: "Kleurinvoer",
        content: [
          {
            title: "Snelle invoer",
            description: "Voer een kleur in HSL-, RGB- of HEX-formaat in",
          },
          {
            title: "Gedetailleerde invoer",
            description: "Gebruik individuele HSL-velden (alleen beschikbaar voor HSL-formaat)",
          },
          {
            title: "Geaccepteerde formaten",
            formats: [
              { type: "HSL", example: "hsl(320, 80%, 58%)" },
              { type: "RGB", example: "rgb(255, 100, 50)" },
              { type: "HEX", example: "#FF6432 of #F64" },
            ],
          },
        ],
      },
      {
        title: "Paletgeneratie",
        content: [
          {
            title: "Variatietypes",
            variations: [
              { type: "Normal", description: "Variaties met stappen van 5%" },
              { type: "Vivid", description: "Meer gecontrasteerde variaties met stappen van 10%" },
            ],
          },
          "Elk palet genereert 11 variaties van de basiskleur",
        ],
      },
      {
        title: "Kleuren exporteren",
        content: [
          "Kies het exportformaat (HSL, RGB, HEX) via het individuele dropdown-menu rechts van elk palet of via het globale dropdown-menu boven de paletten",
          {
            title: "Exportopties",
            features: [
              { action: "Individuele kopie", description: `Kopieer een palet door te klikken op <svg class="copy-icon" aria-hidden="true" viewBox="0 0 24 24" width="16" height="16"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>` },
              { action: "Globale kopie", description: "Kopieer alle paletten door te klikken op 'Kopieer alle paletten'" },
              { action: "Aangepast voorvoegsel", description: "Pas het voorvoegsel van CSS-variabelen aan via het toegewezen veld" },
            ],
          },
          "Kleuren worden geëxporteerd als CSS-variabelen",
        ],
      },
      {
        title: "Aanbevelingen",
        content: [
          {
            title: "Voor optimale paletten",
            guidelines: [
              { rule: "Verzadiging", value: "boven 0% om pure grijstinten te vermijden" },
              { rule: "Helderheid", value: "tussen 40% en 60% voor de basiskleur" },
              { rule: "Vermijd", value: "0% verzadiging met zeer lage helderheid" },
            ],
          },
        ],
      },
    ],
  },
  pl: {
    sections: [
      {
        title: "Wprowadzanie koloru",
        content: [
          {
            title: "Szybkie wprowadzanie",
            description: "Wprowadź kolor w formacie HSL, RGB lub HEX",
          },
          {
            title: "Szczegółowe wprowadzanie",
            description: "Użyj pojedynczych pól HSL (dostępne tylko dla formatu HSL)",
          },
          {
            title: "Akceptowane formaty",
            formats: [
              { type: "HSL", example: "hsl(320, 80%, 58%)" },
              { type: "RGB", example: "rgb(255, 100, 50)" },
              { type: "HEX", example: "#FF6432 lub #F64" },
            ],
          },
        ],
      },
      {
        title: "Generowanie palety",
        content: [
          {
            title: "Typy wariacji",
            variations: [
              { type: "Normal", description: "Wariacje z krokiem 5%" },
              { type: "Vivid", description: "Bardziej kontrastowe wariacje z krokiem 10%" },
            ],
          },
          "Każda paleta generuje 11 wariacji koloru bazowego",
        ],
      },
      {
        title: "Eksport kolorów",
        content: [
          "Wybierz format eksportu (HSL, RGB, HEX) przez indywidualne menu rozwijane po prawej stronie każdej palety lub przez globalne menu rozwijane nad paletami",
          {
            title: "Opcje eksportu",
            features: [
              { action: "Kopiowanie indywidualne", description: `Skopiuj paletę klikając <svg class="copy-icon" aria-hidden="true" viewBox="0 0 24 24" width="16" height="16"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>` },
              { action: "Kopiowanie globalne", description: "Skopiuj wszystkie palety klikając przycisk 'Kopiuj wszystkie palety'" },
              { action: "Niestandardowy prefiks", description: "Dostosuj prefiks zmiennych CSS przez dedykowane pole" },
            ],
          },
          "Kolory są eksportowane jako zmienne CSS",
        ],
      },
      {
        title: "Zalecenia",
        content: [
          {
            title: "Dla optymalnych palet",
            guidelines: [
              { rule: "Nasycenie", value: "powyżej 0% aby uniknąć czystych szarości" },
              { rule: "Jasność", value: "między 40% a 60% dla koloru bazowego" },
              { rule: "Unikaj", value: "0% nasycenia z bardzo niską jasnością" },
            ],
          },
        ],
      },
    ],
  },
  ca: {
    sections: [
      {
        title: "Entrada de color",
        content: [
          {
            title: "Entrada ràpida",
            description: "Introduïu un color en format HSL, RGB o HEX",
          },
          {
            title: "Entrada detallada",
            description: "Utilitzeu els camps HSL individuals (disponible només per al format HSL)",
          },
          {
            title: "Formats acceptats",
            formats: [
              { type: "HSL", example: "hsl(320, 80%, 58%)" },
              { type: "RGB", example: "rgb(255, 100, 50)" },
              { type: "HEX", example: "#FF6432 o #F64" },
            ],
          },
        ],
      },
      {
        title: "Generació de paletes",
        content: [
          {
            title: "Tipus de variacions",
            variations: [
              { type: "Normal", description: "Variacions amb passos del 5%" },
              { type: "Vivid", description: "Variacions més contrastades amb passos del 10%" },
            ],
          },
          "Cada paleta genera 11 variacions del color base",
        ],
      },
      {
        title: "Exportació de colors",
        content: [
          "Trieu el format d'exportació (HSL, RGB, HEX) mitjançant el menú desplegable individual a la dreta de cada paleta o mitjançant el menú desplegable global sobre les paletes",
          {
            title: "Opcions d'exportació",
            features: [
              { action: "Còpia individual", description: `Copieu una paleta fent clic a <svg class="copy-icon" aria-hidden="true" viewBox="0 0 24 24" width="16" height="16"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>` },
              { action: "Còpia global", description: "Copieu totes les paletes fent clic al botó 'Copiar totes les paletes'" },
              { action: "Prefix personalitzat", description: "Personalitzeu el prefix de les variables CSS mitjançant el camp dedicat" },
            ],
          },
          "Els colors s'exporten com a variables CSS",
        ],
      },
      {
        title: "Recomanacions",
        content: [
          {
            title: "Per a paletes òptimes",
            guidelines: [
              { rule: "Saturació", value: "superior al 0% per evitar grisos purs" },
              { rule: "Lluminositat", value: "entre 40% i 60% per al color base" },
              { rule: "Evitar", value: "saturació 0% amb lluminositat molt baixa" },
            ],
          },
        ],
      },
    ],
  },
  gl: {
    sections: [
      {
        title: "Entrada de cor",
        content: [
          {
            title: "Entrada rápida",
            description: "Introduza unha cor en formato HSL, RGB ou HEX",
          },
          {
            title: "Entrada detallada",
            description: "Use os campos HSL individuais (dispoñible só para o formato HSL)",
          },
          {
            title: "Formatos aceptados",
            formats: [
              { type: "HSL", example: "hsl(320, 80%, 58%)" },
              { type: "RGB", example: "rgb(255, 100, 50)" },
              { type: "HEX", example: "#FF6432 ou #F64" },
            ],
          },
        ],
      },
      {
        title: "Xeración de paletas",
        content: [
          {
            title: "Tipos de variacións",
            variations: [
              { type: "Normal", description: "Variacións con pasos do 5%" },
              { type: "Vivid", description: "Variacións máis contrastadas con pasos do 10%" },
            ],
          },
          "Cada paleta xera 11 variacións da cor base",
        ],
      },
      {
        title: "Exportación de cores",
        content: [
          "Escolla o formato de exportación (HSL, RGB, HEX) mediante o menú despregable individual á dereita de cada paleta ou mediante o menú despregable global sobre as paletas",
          {
            title: "Opcións de exportación",
            features: [
              { action: "Copia individual", description: `Copie unha paleta facendo clic en <svg class="copy-icon" aria-hidden="true" viewBox="0 0 24 24" width="16" height="16"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>` },
              { action: "Copia global", description: "Copie todas as paletas facendo clic no botón 'Copiar todas as paletas'" },
              { action: "Prefixo personalizado", description: "Personalice o prefixo das variables CSS mediante o campo dedicado" },
            ],
          },
          "As cores expórtanse como variables CSS",
        ],
      },
      {
        title: "Recomendacións",
        content: [
          {
            title: "Para paletas óptimas",
            guidelines: [
              { rule: "Saturación", value: "superior ao 0% para evitar grises puros" },
              { rule: "Luminosidade", value: "entre 40% e 60% para a cor base" },
              { rule: "Evitar", value: "saturación 0% con luminosidade moi baixa" },
            ],
          },
        ],
      },
    ],
  },
};
