import { describe, expect, it } from "vitest";
import { missingRequired } from "../scripts/env.mjs";

const example = [
  "A_KEY=changeme  # required - thing",
  "B_KEY=changeme  # optional - other",
  "C_KEY=changeme  # required - third",
].join("\n");

describe("missingRequired", () => {
  it("flags required vars that are empty or still the placeholder", () => {
    const env = "A_KEY=\nB_KEY=\nC_KEY=changeme  # required - third\n";
    expect(missingRequired(example, env)).toEqual(["A_KEY", "C_KEY"]);
  });

  it("accepts real values from .env or the process environment", () => {
    expect(missingRequired(example, "A_KEY=x", { C_KEY: "y" })).toEqual([]);
  });
});
