# Web Palette Lab

[English](#overview) | [Français](#aperçu)

## Overview

A web tool for generating color palettes with light and dark variants, supporting HSL, RGB, and HEX formats. Features real-time preview, accessibility support, and CSS variables export.

### Links

- 🔗 [Live Demo](https://sylviecanongia.github.io/web-palette-lab/)
- 💻 [GitHub Repository](https://github.com/SylvieCanongia/web-palette-lab)

### Features

- HSL color palette generator with Normal (5% steps) and Vivid (10% steps) variants
- Dual input system :
  - Quick color input (HSL, RGB, or HEX)
  - Detailed HSL component inputs
- Real-time color preview
- Accessibility-first design with screen reader support
- Flexible palette copying :
  - Copy individual palettes
  - Copy all palettes at once
- Multi-format color export (HSL, RGB, HEX)
- Empty state management
- Modern, responsive interface
- Light/Dark theme support with system preference detection
- Integrated bilingual user guide (FR/EN)
- Event-driven state management
- Comprehensive test coverage with Jest

### Usage

1. Enter your color using either:
   - Quick input (e.g., hsl(320, 80%, 58%), rgb(255, 100, 50), or #FF6432)
   - Separate HSL inputs for Hue (0-360), Saturation (0-100%), and Lightness (0-100%)
2. Get instant preview
3. Customize your CSS variables prefix (optional)
4. Generate and copy color palettes in desired format (HSL, RGB or HEX)

### Recommendations for optimal palettes

For best color palette results:

- Saturation: prefer values > 0% to avoid pure grays
- Lightness: use values between 40% and 60% for base color
- Avoid combinations of 0% saturation with very low lightness

### Coming Soon

- CSS file export
- WCAG contrast checking
- Harmonious color presets
- Social sharing

---

## Aperçu

Un outil web pour générer des palettes de couleurs avec variantes claires et foncées, supportant les formats HSL, RGB et HEX. Propose une prévisualisation en temps réel, un support d'accessibilité et l'export de variables CSS.

### Liens

- 🔗 [Démo en ligne](https://sylviecanongia.github.io/web-palette-lab/)
- 💻 [Dépôt GitHub](https://github.com/SylvieCanongia/web-palette-lab)

### Fonctionnalités

- Générateur de palettes HSL avec variantes Normal (pas de 5%) et Vivid (pas de 10%)
- Double système de saisie :
  - Entrée rapide (HSL, RGB ou HEX)
  - Entrées détaillées des composantes HSL
- Prévisualisation en temps réel
- Conception axée sur l'accessibilité avec support des lecteurs d'écran
- Copie flexible des palettes :
  - Copie individuelle des palettes
  - Copie simultanée de toutes les palettes
- Export multi-format des couleurs (HSL, RGB, HEX)
- Gestion des états vides
- Interface moderne et responsive
- Support des thèmes clair/sombre avec détection des préférences système
- Guide utilisateur intégré bilingue (FR/EN)
- Gestion d'état pilotée par événements
- Couverture de tests complète avec Jest

### Utilisation

1. Saisissez votre couleur via :
   - L'entrée rapide (ex : hsl(320, 80%, 58%), rgb(255, 100, 50) ou #FF6432)
   - Les entrées HSL séparées pour Teinte (0-360), Saturation (0-100%) et Luminosité (0-100%)
2. Obtenez une prévisualisation instantanée
3. Personnalisez le préfixe de vos variables CSS (optionnel)
4. Générez et copiez les palettes de couleurs au format souhaité (HSL, RGB ou HEX)

### Recommandations pour les palettes optimales

Pour obtenir les meilleures palettes de couleurs :

- Saturation : préférez une valeur > 0% pour éviter les gris purs
- Luminosité : utilisez des valeurs entre 40% et 60% pour la couleur de base
- Évitez les combinaisons de saturation 0% avec une luminosité très faible

### À venir

- Export de fichiers CSS
- Contrôle de contraste WCAG
- Préréglages de couleurs harmonieuses
- Partage social
