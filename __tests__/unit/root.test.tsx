import { describe, expect, it } from "vitest";

import { links } from "../../app/root";

describe("root links", () => {
  it("uses a function for the stylesheet onLoad handler", () => {
    const stylesheetLink = links().find((link) => link.rel === "stylesheet");

    expect(stylesheetLink).toBeDefined();
    expect(stylesheetLink?.onLoad).toBeTypeOf("function");
  });
});
