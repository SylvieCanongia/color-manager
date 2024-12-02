/*
 * Web Palette Lab - A web tool for generating color palettes
 * Copyright (C) 2024 Sylvie Canongia
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// src/js/tests/eventBus.test.js
import { eventBus } from "../utils/eventBus.js";

describe("EventBus", () => {
  test("subscribers receive emitted events", () => {
    const callback = jest.fn();
    eventBus.subscribe("testEvent", callback);

    const testData = { color: "red" };
    eventBus.emit("testEvent", testData);

    expect(callback).toHaveBeenCalledWith(testData);
  });

  test("unsubscribed callbacks are not called", () => {
    const callback = jest.fn();
    eventBus.subscribe("testEvent", callback);
    eventBus.unsubscribe("testEvent", callback);

    eventBus.emit("testEvent", {});
    expect(callback).not.toHaveBeenCalled();
  });

  test("multiple subscribers receive events", () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    eventBus.subscribe("multiTest", callback1);
    eventBus.subscribe("multiTest", callback2);

    eventBus.emit("multiTest", { data: "test" });

    expect(callback1).toHaveBeenCalled();
    expect(callback2).toHaveBeenCalled();
  });
});
