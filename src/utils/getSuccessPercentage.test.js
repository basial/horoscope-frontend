import { getSuccessPercentage } from "./getSuccessPercentage";

describe("getSuccessPercentage", () => {
  it("returns a number between 0–25 for rude", () => {
    for (let i = 0; i < 100; i++) {
      const val = getSuccessPercentage("rude");
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThanOrEqual(25);
    }
  });

  it("returns a number between 25–75 for dramatic", () => {
    for (let i = 0; i < 100; i++) {
      const val = getSuccessPercentage("dramatic");
      expect(val).toBeGreaterThanOrEqual(25);
      expect(val).toBeLessThanOrEqual(75);
    }
  });

  it("returns a number between 76–100 for motivational", () => {
    for (let i = 0; i < 100; i++) {
      const val = getSuccessPercentage("motivational");
      expect(val).toBeGreaterThanOrEqual(76);
      expect(val).toBeLessThanOrEqual(100);
    }
  });

  it("returns a number between 0–100 for unknown tones", () => {
    for (let i = 0; i < 100; i++) {
      const val = getSuccessPercentage("alien");
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThanOrEqual(100);
    }
  });
});
