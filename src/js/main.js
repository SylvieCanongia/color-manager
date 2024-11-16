/*
 * Color Manager - A web tool for generating HSL color palettes
 * Copyright (C) 2024 Sylvie Canongia
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/main.js

import { initTabs } from './components/tabs.js';
import { initColorInputs } from './components/colorInput.js';
import { initPalettes } from './components/palette.js';

// Initialize all application components
const initApp = () => {
    try {
        // Initialize UI components in specific order
        initTabs();
        initColorInputs();
        initPalettes();
        
        // Log successful initialization
        console.info('Application initialized successfully');
    } catch (error) {
        // Log any initialization errors
        console.error('Failed to initialize application:', error);
        
        // Display user-friendly error message
        const container = document.querySelector('.container');
        if (container) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.setAttribute('role', 'alert');
            errorMessage.textContent = 'Une erreur est survenue lors du chargement de l\'application. Veuillez rafraîchir la page.';
            container.prepend(errorMessage);
        }
    }
};

// Initialize app when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}