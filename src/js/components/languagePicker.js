/*
 * Web Palette Lab - A web tool for generating color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/components/languagePicker.js
import { translations } from '../config/translations.js';
import { updatePageTranslations, DEFAULT_LANGUAGE } from '../utils/i18n.js';

/**
 * Get supported languages from translations object
 * @returns {string[]} Array of supported language codes
 */
const getSupportedLanguages = () => Object.keys(translations);

/**
 * Get user's preferred language from localStorage or fallback to default
 * Uses the default language defined in i18n.js if no valid language is found
 * @returns {string} Language code ('fr', 'en', etc.)
 */
const getInitialLanguage = () => {
    const storedLang = localStorage.getItem('userLanguage');
    const supportedLanguages = getSupportedLanguages();
    
    return storedLang && supportedLanguages.includes(storedLang) 
    ? storedLang 
    : DEFAULT_LANGUAGE;
};

/**
 * Update the language picker UI to reflect the current language
 * @param {string} lang - Selected language code
 * @param {HTMLButtonElement} button - Selected language button
 */
const updateLanguagePickerUI = (lang, button) => {
    const flagIcon = button.querySelector('use');
    const langText = button.querySelector('span');
    
    if (flagIcon) {
        flagIcon.setAttribute('href', `#flag-${lang}`);
    }
    if (langText) {
        langText.textContent = lang;
    }
};

/**
 * Handle language selection
 * Updates the document language, localStorage and translations
 * @param {string} lang - Selected language code
 */
const handleLanguageChange = (lang) => {
    const supportedLanguages = getSupportedLanguages();

    if (!supportedLanguages.includes(lang)) {
        console.error(`Unsupported language: ${lang}`);
        return;
    }

    document.documentElement.lang = lang;
    localStorage.setItem('userLanguage', lang);
    updatePageTranslations(lang);

    // Update selected language button
    const button = document.querySelector('.selected-language');
    if (button) {
        updateLanguagePickerUI(lang, button);
    }

    // Update selected state in list
    document.querySelectorAll('.language-list [role="option"]').forEach(option => {
        option.setAttribute('aria-selected', option.getAttribute('data-value') === lang);
    });
};

/**
 * Toggle language list visibility
 * @param {boolean} show - Whether to show or hide the list
 */
const toggleLanguageList = (show) => {
    const list = document.querySelector('.language-list');

    if (list) {
        list.style.display = show ? 'block' : 'none';
        // Get button directly from picker to ensure consistency
        const button = list.parentElement.querySelector('.selected-language');
        if (button) {
            button.setAttribute('aria-expanded', show);
        }
    }
};

/**
 * Handle keyboard navigation in language list
 * @param {KeyboardEvent} event - Keyboard event
 * @param {HTMLElement} list - Language list element
 * @param {HTMLElement} button - Language picker button
 */
const handleKeyboardNavigation = (event, list, button) => {
    const options = [...list.querySelectorAll('[role="option"]')];
    const currentIndex = options.findIndex(opt => opt === document.activeElement);
    
    switch(event.key) {
        case 'ArrowDown':
            event.preventDefault();
            options[(currentIndex + 1) % options.length]?.focus();
            break;
        case 'ArrowUp':
            event.preventDefault();
            options[currentIndex - 1 >= 0 ? currentIndex - 1 : options.length - 1]?.focus();
            break;
        case 'Home':
            event.preventDefault();
            options[0]?.focus();
            break;
        case 'End':
            event.preventDefault();
            options[options.length - 1]?.focus();
            break;
        case 'Enter':
        case ' ':
            event.preventDefault();
            if (document.activeElement.hasAttribute('role')) {
                document.activeElement.click();
            }
            break;
        case 'Escape':
            event.preventDefault();
            toggleLanguageList(false);
            button?.focus();
            break;
        case 'Tab':
            toggleLanguageList(false);
            break;
    }
};

/**
 * Initialize language picker functionality
 * Sets up initial language and event listeners
 * Uses language from localStorage if available, otherwise uses default language
 */
export const initLanguagePicker = () => {
    const picker = document.querySelector('.language-picker');
    if (!picker) {
        console.error('Language picker element not found');
        return;
    }

    // Set initial language
    const initialLang = getInitialLanguage();
    handleLanguageChange(initialLang);

    // Add click handler to button
    const button = picker.querySelector('.selected-language');
    const list = picker.querySelector('.language-list');

    // Set initial aria-expanded state
    button?.setAttribute('aria-expanded', 'false');

    button?.addEventListener('click', () => {
        const isVisible = list.style.display === 'block';
        toggleLanguageList(!isVisible);
    });

    // Add click handlers to options
    const options = picker.querySelectorAll('[role="option"]');
    options.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-value');
            handleLanguageChange(lang);
            toggleLanguageList(false);
        });
    });

    // Close list when clicking outside
    document.addEventListener('click', (event) => {
        if (!picker.contains(event.target)) {
            toggleLanguageList(false);
        }
    });

    // MANAGE KEYBOARD ACCESSIBILITY

    // Make options focusable
    options.forEach(option => {
        option.setAttribute('tabindex', '0');
    });

    // Add keyboard navigation
    list?.addEventListener('keydown', (event) => {
        handleKeyboardNavigation(event, list, button);
    });

    // Focus management when opening list
    button?.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            toggleLanguageList(true);
            const selectedOption = list.querySelector('[aria-selected="true"]');
            selectedOption?.focus();
        }
    });
};