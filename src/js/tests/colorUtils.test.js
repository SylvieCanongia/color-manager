/*
 * Web Palette Lab - A web tool for generating color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/tests/colorUtils.test.js
import { createHSLString, calculateLuminance, needsDarkText, getColorCategory, generatePaletteWithConfig } from "../utils/colorUtils.js";

describe("Color Utilities", () => {
  test("should create valid HSL string", () => {
    const color = { hue: 180, saturation: 50, lightness: 50 };
    expect(createHSLString(color)).toBe("hsl(180, 50%, 50%)");
  });

  test("should calculate luminance correctly", () => {
    const color = { hue: 0, saturation: 0, lightness: 50 };
    expect(calculateLuminance(color)).toBe(0.5);
  });

  test("should determine text contrast needs", () => {
    const darkBg = { hue: 0, saturation: 0, lightness: 20 };
    const lightBg = { hue: 0, saturation: 0, lightness: 80 };

    expect(needsDarkText(darkBg)).toBe(false);
    expect(needsDarkText(lightBg)).toBe(true);
  });
});

describe("Color Category Tests", () => {
  test("should identify purple colors", () => {
    expect(getColorCategory(270)).toBe("PURPLE");
    expect(getColorCategory(300)).toBe("PURPLE");
  });

  test("should identify green colors", () => {
    expect(getColorCategory(140)).toBe("GREEN");
    expect(getColorCategory(160)).toBe("GREEN");
  });

  test("should identify warm colors", () => {
    expect(getColorCategory(30)).toBe("WARM");
    expect(getColorCategory(350)).toBe("WARM");
  });

  test("should return DEFAULT for other colors", () => {
    expect(getColorCategory(200)).toBe("DEFAULT");
  });
});

describe("Palette Generation Tests", () => {
  const baseColor = { hue: 200, saturation: 60, lightness: 50 };

  test("should generate normal palette", () => {
    const config = {
      type: "NORMAL",
      steps: 5,
      stepSize: 5,
    };
    const palette = generatePaletteWithConfig(baseColor, config);

    expect(palette.length).toBeGreaterThan(0);
    expect(palette).toContainEqual(
      expect.objectContaining({
        hue: baseColor.hue,
        saturation: expect.any(Number),
        lightness: expect.any(Number),
      })
    );
  });

  test("should throw error for invalid config", () => {
    const invalidConfig = { steps: -1 };
    expect(() => {
      generatePaletteWithConfig(baseColor, invalidConfig);
    }).toThrow("Invalid palette configuration");
  });
});
