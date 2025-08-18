import { getSuccessPercentage } from "./getSuccessPercentage";

describe("getSuccessPercentage", () => {
  it("returns a number between 30–60 for rude", () => {
    for (let i = 0; i < 100; i++) {
      const val = getSuccessPercentage("rude");
      expect(val).toBeGreaterThanOrEqual(30);
      expect(val).toBeLessThanOrEqual(60);
    }
  });

  it("returns a number between 61–90 for dramatic", () => {
    for (let i = 0; i < 100; i++) {
      const val = getSuccessPercentage("dramatic");
      expect(val).toBeGreaterThanOrEqual(61);
      expect(val).toBeLessThanOrEqual(90);
    }
  });

  it("returns a number between 91–100 for motivational", () => {
    for (let i = 0; i < 100; i++) {
      const val = getSuccessPercentage("motivational");
      expect(val).toBeGreaterThanOrEqual(91);
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
