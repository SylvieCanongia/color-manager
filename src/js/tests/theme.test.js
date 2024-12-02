/*
 * Web Palette Lab - A web tool for generating color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/tests/theme.test.js
import { initTheme } from "../utils/theme.js";
import { eventBus } from "../utils/eventBus.js";

const originalWarn = console.warn;
beforeAll(() => {
  console.warn = jest.fn();
});

afterAll(() => {
  console.warn = originalWarn;
});

// Au début du fichier theme.test.js
const mockMatchMedia = {
  matches: false,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

window.matchMedia = jest.fn().mockImplementation(() => mockMatchMedia);

jest.mock("../utils/eventBus.js", () => ({
  eventBus: {
    emit: jest.fn(),
    subscribe: jest.fn((event, callback) => {
      callback({ theme: "dark" });
    }),
    unsubscribe: jest.fn(),
  },
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock getElementById
document.getElementById = jest.fn(() => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  setAttribute: jest.fn(),
  getAttribute: jest.fn(),
  click: jest.fn(),
}));

describe("Theme Management", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.clear();
  });

  test("should initialize with system preference", () => {
    // Mock matchMedia error
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: true,
      addEventListener: jest.fn(() => {
        throw new Error("Not supported");
      }),
    }));

    initTheme();
    const theme = document.documentElement.getAttribute("data-theme");
    expect(theme).toBe("dark");
  });

  test("should toggle theme on button click", () => {
    // Setup
    const root = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");

    // Mock root.getAttribute and setAttribute
    root.getAttribute = jest.fn().mockReturnValue("light");
    root.setAttribute = jest.fn();

    // Initialize theme
    initTheme();

    // Test single toggle: light -> dark
    themeToggle.click();
    expect(root.setAttribute).toHaveBeenCalledWith("data-theme", "dark");
  });

  test("should emit themeChanged event", (done) => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: jest.fn(),
    }));

    initTheme();

    eventBus.subscribe("themeChanged", ({ theme }) => {
      expect(theme).toBe("dark");
      done();
    });

    const themeToggle = document.getElementById("themeToggle");
    themeToggle.click();
  });
});
