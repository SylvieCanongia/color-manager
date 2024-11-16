/*
 * Color Manager - A web tool for generating HSL color palettes
 * Copyright (C) 2024 Sylvie Canongia
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

//  Fonctions utilitaires au début

// function debounce(func, wait) {
//   let timeout;
//   return function executedFunction(...args) {
//     const later = () => {
//       clearTimeout(timeout);
//       func(...args);
//     };
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   };
// }

// const debouncedHandleHSLInput = debounce((input, colorType) => {
//   handleHSLInput(input, colorType);
// }, 150);

// function announceToScreenReader(message) {
//   const announcement = document.createElement("div");
//   announcement.setAttribute("aria-live", "polite");
//   announcement.setAttribute("class", "sr-only");
//   announcement.textContent = message;
//   document.body.appendChild(announcement);
//   setTimeout(() => announcement.remove(), 1000);
// }

// Renommée updateColorPreview
// function updatePreviewFromInputs(colorType, hue, saturation, lightness) {
//   const preview = document.getElementById(`${colorType}ColorPreview`);
//   const value = document.getElementById(`${colorType}ColorValue`);
//   const hslValue = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

//   // Retirer la classe empty-preview car nous avons une couleur valide
//   preview.classList.remove("empty-preview");

//   preview.style.backgroundColor = hslValue;
//   value.textContent = hslValue;

//   // Ajouter l'animation de mise à jour
//   preview.classList.remove("preview-update");
//   void preview.offsetWidth;
//   preview.classList.add("preview-update");

//   preview.addEventListener(
//     "animationend",
//     function () {
//       preview.classList.remove("preview-update");
//     },
//     { once: true }
//   );
// }

document.addEventListener("DOMContentLoaded", function () {
  // Configuration des boutons de copie
  const copyButtons = {
    copyPrimaryNormal: "primaryNormalPalette",
    copyPrimaryVivid: "primaryVividPalette",
    copySecondaryNormal: "secondaryNormalPalette",
    copySecondaryVivid: "secondaryVividPalette",
    copyAccentNormal: "accentNormalPalette",
    copyAccentVivid: "accentVividPalette",
  };

  // Ajouter les écouteurs d'événements pour chaque bouton
  Object.entries(copyButtons).forEach(([buttonId, paletteId]) => {
    const button = document.getElementById(buttonId);
    if (button) {
      button.addEventListener("click", () => {
        const colors = Array.from(document.querySelectorAll(`#${paletteId} .color-box p`)).map((p) => p.textContent);
        copyToClipboard(colors);
      });
    }
  });

  // Initialiser les previews avec un état "vide"
  ["primary", "secondary", "accent"].forEach((colorType) => {
    // Réinitialiser les inputs number
    document.getElementById(`${colorType}-hue`).value = "";
    document.getElementById(`${colorType}-saturation`).value = "";
    document.getElementById(`${colorType}-lightness`).value = "";

    // Réinitialiser la preview
    const preview = document.getElementById(`${colorType}ColorPreview`);
    const value = document.getElementById(`${colorType}ColorValue`);

    preview.style.backgroundColor = "transparent";
    // Optionnel : Ajouter une classe pour styliser l'état vide
    preview.classList.add("empty-preview");
    value.textContent = "Aucune couleur";
  });

  // Générer les palettes vides initiales
  generateColorPalettes("primary");
  generateColorPalettes("secondary");
  generateColorPalettes("accent");

  // Ajouter les écouteurs pour les inputs HSL
  // ["primary", "secondary", "accent"].forEach((colorType) => {
  //   const hslInput = document.getElementById(`${colorType}HslInput`);
  //   if (hslInput) {
  //     // Écouter les événements 'input' et 'paste'
  //     ["input", "paste"].forEach((eventType) => {
  //       hslInput.addEventListener(eventType, function (e) {
  //         // Pour l'événement paste, attendre que la valeur soit collée
  //         if (eventType === "paste") {
  //           setTimeout(() => handleHSLInput(e.target, colorType), 0);
  //         } else {
  //           handleHSLInput(e.target, colorType);
  //         }
  //       });
  //     });
  //   }
  // });

  // Nouveaux écouteurs pour les inputs number
  ["primary", "secondary", "accent"].forEach((colorType) => {
    const hueInput = document.getElementById(`${colorType}-hue`);
    const saturationInput = document.getElementById(`${colorType}-saturation`);
    const lightnessInput = document.getElementById(`${colorType}-lightness`);

    [hueInput, saturationInput, lightnessInput].forEach((input) => {
      // Ajouter des instructions pour les lecteurs d'écran
      input.addEventListener("focus", function () {
        const inputType = this.id.includes("hue") ? "teinte" : this.id.includes("saturation") ? "saturation" : "luminosité";
        announceToScreenReader(`Saisie de la ${inputType}. Utilisez les flèches ou entrez une valeur.`);
      });

      input.addEventListener("input", () => {
        const hue = document.getElementById(`${colorType}-hue`).value;
        const saturation = document.getElementById(`${colorType}-saturation`).value;
        const lightness = document.getElementById(`${colorType}-lightness`).value;

        // Ne mettre à jour que si toutes les valeurs sont présentes
        if (hue !== "" && saturation !== "" && lightness !== "") {
          updatePreviewFromInputs(colorType, parseInt(hue), parseInt(saturation), parseInt(lightness));
        }
      });
    });
  });

  // Fonction pour gérer les changements d'input HSL
  // function handleHSLInput(input, colorType) {
  //   const hslValue = input.value.trim();
  //   const preview = document.getElementById(`${colorType}ColorPreview`);
  //   const value = document.getElementById(`${colorType}ColorValue`);
  //   const errorSpan = document.getElementById(`${colorType}HslError`);

  //   if (isValidHSL(hslValue)) {
  //     const { hue, saturation, lightness } = parseHSL(hslValue);

  //     // Réinitialiser l'état d'erreur
  //     input.classList.remove('invalid');
  //     errorSpan.textContent = '';
  //     errorSpan.classList.remove('visible');

  //     // Mise à jour visuelle de la prévisualisation
  //     preview.classList.remove("empty-preview");

  //     // Feedback pour les lecteurs d'écran
  //     announceToScreenReader(`Couleur mise à jour : ${hslValue}`);

  //     // Mettre à jour les inputs et la prévisualisation
  //     updateNumberInputsWithoutGeneration(colorType, hue, saturation, lightness);
  //   } else {
  //     input.classList.add("invalid");
  //     errorSpan.textContent = 'Format HSL invalide. Exemple : hsl(320, 80%, 58%)';
  //     errorSpan.classList.add('visible');
  //     announceToScreenReader("Format HSL invalide. Exemple correct : hsl(320, 80%, 58%)");
  //   }
  // }

  // Fonction pour mettre à jour les inputs sans générer la palette
//   function updateNumberInputsWithoutGeneration(colorType, hue, saturation, lightness) {
//     // Mettre à jour les inputs number
//     document.getElementById(`${colorType}-hue`).value = hue;
//     document.getElementById(`${colorType}-saturation`).value = saturation;
//     document.getElementById(`${colorType}-lightness`).value = lightness;

//     // Mettre à jour la prévisualisation avec animation
//     const preview = document.getElementById(`${colorType}ColorPreview`);
//     const value = document.getElementById(`${colorType}ColorValue`);
//     const hslValue = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

//     preview.style.backgroundColor = hslValue;
//     value.textContent = hslValue;

//     // Ajouter et retirer la classe d'animation
//     preview.classList.remove("preview-update");
//     // Force le navigateur à recalculer le style
//     void preview.offsetWidth;
//     preview.classList.add("preview-update");

//     // Retirer la classe après l'animation
//     preview.addEventListener(
//       "animationend",
//       function () {
//         preview.classList.remove("preview-update");
//       },
//       { once: true }
//     );
//   }
// });

// Écouteur pour le formulaire
document.getElementById("paletteForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Générer les palettes pour chaque couleur
  generateColorPalettes("primary");
  generateColorPalettes("secondary");
  generateColorPalettes("accent");
});

function generateColorPalettes(colorType) {
  // Récupérer les valeurs HSL pour le type de couleur sous forme de strings
  const hueStr = document.getElementById(`${colorType}-hue`).value;
  const saturationStr = document.getElementById(`${colorType}-saturation`).value;
  const lightnessStr = document.getElementById(`${colorType}-lightness`).value;

  // Si l'une des valeurs est vide, ne pas générer de palette
  if (hueStr === "" || saturationStr === "" || lightnessStr === "") {
    // Afficher les palettes vides
    displayPalette([], `${colorType}NormalPalette`);
    displayPalette([], `${colorType}VividPalette`);
    return;
  }

  // Si on a des valeurs, continuer normalement
  // Convertir en nombres
  const hueVal = parseInt(hueStr);
  const saturationVal = parseInt(saturationStr);
  const lightnessVal = parseInt(lightnessStr);

  // Générer les palettes Normal et Vivid
  const normalPalette = generatePalette(hueVal, saturationVal, lightnessVal, "normal");
  const vividPalette = generatePalette(hueVal, saturationVal, lightnessVal, "vivid");

  // Afficher les palettes
  displayPalette(normalPalette, `${colorType}NormalPalette`, lightnessVal);
  displayPalette(vividPalette, `${colorType}VividPalette`, lightnessVal);

  // Afficher la couleur de base
  displayBaseColor(hueVal, saturationVal, lightnessVal, colorType);
}

// function generatePalette(hue, saturation, lightness, mode) {
//   let colors = [];
//   const step = mode === "normal" ? 5 : 10;

//   // Générer les couleurs plus claires (dans l'ordre décroissant)
//   for (let i = 5; i >= 1; i--) {
//     const newLightness = Math.min(lightness + i * step, 100);
//     colors.push({
//       color: `hsl(${hue}, ${saturation}%, ${newLightness}%)`,
//       lightness: newLightness,
//     });
//   }

//   // Couleur de base
//   colors.push({
//     color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
//     lightness: lightness,
//     isBase: true,
//   });

//   // Couleurs plus foncées
//   for (let i = 1; i <= 5; i++) {
//     const newLightness = Math.max(lightness - i * step, 0);
//     colors.push({
//       color: `hsl(${hue}, ${saturation}%, ${newLightness}%)`,
//       lightness: newLightness,
//     });
//   }

//   // Trier les couleurs par luminosité (de la plus claire à la plus foncée)
//   return colors.sort((a, b) => b.lightness - a.lightness);
// }

// function displayPalette(palette, containerId, baseLightness) {
//   const container = document.getElementById(containerId);

//   // Si la palette est vide ou contient des valeurs invalides, afficher des box vides
//   if (!palette.length || palette.some((color) => color.color.includes("NaN"))) {
//     container.innerHTML = "";
//     // Créer 10 box vides (5 par ligne)
//     for (let i = 0; i < 10; i++) {
//       const colorBox = document.createElement("div");
//       colorBox.classList.add("color-box", "empty-box");
//       const colorText = document.createElement("p");
//       colorText.textContent = "En attente";
//       colorBox.appendChild(colorText);
//       container.appendChild(colorBox);
//     }
//     return;
//   }

//   // Sinon, afficher la palette normalement
//   container.innerHTML = "";
//   palette.forEach((colorObj) => {
//     const colorBox = document.createElement("div");
//     colorBox.classList.add("color-box");
//     colorBox.style.backgroundColor = colorObj.color;

//     if (colorObj.isBase) {
//       colorBox.style.border = "3px solid red";
//     }

//     const colorText = document.createElement("p");
//     colorText.textContent = colorObj.color;
//     colorBox.appendChild(colorText);
//     container.appendChild(colorBox);
//   });
// }

function displayBaseColor(hue, saturation, lightness, colorType) {
  const preview = document.getElementById(`${colorType}ColorPreview`);
  const value = document.getElementById(`${colorType}ColorValue`);
  const hslValue = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  preview.style.backgroundColor = hslValue;
  value.textContent = hslValue;
}

// function copyToClipboard(colors) {
//   const textToCopy = colors.join("\n");
//   navigator.clipboard
//     .writeText(textToCopy)
//     .then(() => {
//       alert("Palette copiée !");
//     })
//     .catch((err) => {
//       console.error("Erreur lors de la copie :", err);
//       alert("Erreur lors de la copie de la palette");
//     });
// }

// Nouvelles fonctions pour la gestion des inputs HSL
// function isValidHSL(hslString) {
//   const regex = /^hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)$/;
//   if (!regex.test(hslString)) return false;

//   const { hue, saturation, lightness } = parseHSL(hslString);
//   return hue >= 0 && hue <= 360 && saturation >= 0 && saturation <= 100 && lightness >= 0 && lightness <= 100;
// }

// function parseHSL(hslString) {
//   const regex = /^hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)$/;
//   const matches = hslString.match(regex);

//   if (matches) {
//     return {
//       hue: parseInt(matches[1]),
//       saturation: parseInt(matches[2]),
//       lightness: parseInt(matches[3]),
//     };
//   }

//   return null;
// }
