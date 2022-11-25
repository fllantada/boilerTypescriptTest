import Challenge from "./index";

describe("Challenge", () => {
  it("should return the correct result", () => {
    const result = Challenge(4);
    expect(result).toBe(6);
  });
});
