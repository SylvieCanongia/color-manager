/*
 * Web Palette Lab - A web tool for generating color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/utils/i18n.js

import { translations } from '../config/translations.js';

/**
 * Default language code
 * @constant {string}
 */
export const DEFAULT_LANGUAGE = 'fr';

/**
 * Check if language is supported
 * @param {string} lang - Language code to check
 * @returns {boolean} True if language is supported
 */
const isLanguageSupported = (lang) => {
    return lang in translations;
};

/**
 * Get translated text for a given key and language
 * @param {string} key - Translation key to lookup
 * @param {string} [lang=document.documentElement.lang] - Language code (e.g., 'fr', 'en')
 * @returns {string} Translated text or key if translation not found
 * @throws {Error} If key is missing
 * 
 * @example
 * // Returns "Color Palette Generator" if lang is 'en'
 * getText('title', 'en');
 * 
 * // Uses document language and falls back to default if translation missing
 * getText('copyAll');
 */
export const getText = (key, lang = document.documentElement.lang) => {
    if (!key) {
        console.warn('Translation key is missing');
        return '';
    }

    if (!isLanguageSupported(lang)) {
        console.warn(`Unsupported language: ${lang}, falling back to ${DEFAULT_LANGUAGE}`);
        lang = DEFAULT_LANGUAGE;
    }


    const translation = translations[lang]?.[key] || translations[DEFAULT_LANGUAGE][key];
    if (!translation) {
        console.warn(`Translation missing for key: ${key}`);
        return key;
    }

    return translation;
};

/**
 * Update all translatable elements in the DOM
 * Updates text content, aria labels, and placeholders based on the selected language
 * 
 * @param {string} lang - Language code (e.g., 'fr', 'en')
 * @throws {Error} If language code is invalid or missing
 * 
 * Elements are selected based on data attributes:
 * - data-i18n: For text content
 * - data-i18n-aria: For aria-label attributes
 * - data-i18n-placeholder: For input placeholders
 * 
 * @example
 * // HTML: <button data-i18n-aria="helpButton">...</button>
 * updatePageTranslations('en');
 */
export const updatePageTranslations = (lang) => {
    if (!lang) {
        throw new Error('Language code is required');
    }

    // Update aria-labels
    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
        const key = element.getAttribute('data-i18n-aria');
        element.setAttribute('aria-label', getText(key, lang));
    });

    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = getText(key, lang);
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = getText(key, lang);
    });
};