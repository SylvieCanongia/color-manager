/*
 * Web Palette Lab - A web tool for generating color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/tests/validation.test.js
import { isValidHSL, isValidRGB, isValidHEX, detectColorFormat } from "../utils/validation.js";

describe("Color Format Validation", () => {
  describe("HSL Validation", () => {
    test("validates correct HSL format", () => {
      const result = isValidHSL("hsl(180, 50%, 50%)");
      expect(result.isValid).toBe(true);
      expect(result.values).toEqual({
        hue: 180,
        saturation: 50,
        lightness: 50,
      });
    });

    test("rejects invalid HSL format", () => {
      const result = isValidHSL("hsl(400, 150%, 200%)");
      expect(result.isValid).toBe(false);
    });
  });

  describe("RGB Validation", () => {
    test("validates correct RGB format", () => {
      const result = isValidRGB("rgb(255, 128, 0)");
      expect(result.isValid).toBe(true);
      expect(result.values).toEqual({ r: 255, g: 128, b: 0 });
    });

    test("rejects invalid RGB values", () => {
      const result = isValidRGB("rgb(300, -1, 500)");
      expect(result.isValid).toBe(false);
    });
  });
});

describe("Format Detection", () => {
  test("detects HSL format", () => {
    expect(detectColorFormat("hsl(180, 50%, 50%)")).toBe("hsl");
  });

  test("detects RGB format", () => {
    expect(detectColorFormat("rgb(255, 128, 0)")).toBe("rgb");
  });

  test("detects HEX format", () => {
    expect(detectColorFormat("#FF8000")).toBe("hex");
  });

  test("returns null for invalid format", () => {
    expect(detectColorFormat("invalid")).toBe(null);
  });
});

describe("HEX Validation", () => {
  test("validates correct HEX format with #", () => {
    const result = isValidHEX("#FF8000");
    expect(result.isValid).toBe(true);
    expect(result.values).toBe("#FF8000");
  });

  test("validates correct HEX format without #", () => {
    const result = isValidHEX("FF8000");
    expect(result.isValid).toBe(true);
    expect(result.values).toBe("#FF8000");
  });

  test("validates short HEX format", () => {
    const result = isValidHEX("#F80");
    expect(result.isValid).toBe(true);
    expect(result.values).toBe("#F80");
  });

  test("rejects invalid HEX format", () => {
    const result = isValidHEX("#XYZ");
    expect(result.isValid).toBe(false);
  });
});
