import { describe, expect, it } from "vitest";
import { isMonthKey, shiftMonth } from "./months.ts";

describe("shiftMonth", () => {
    it("crosses year boundaries", () => {
        expect(shiftMonth("2026-12", 1)).toBe("2027-01");
        expect(shiftMonth("2026-01", -1)).toBe("2025-12");
    });
});

describe("isMonthKey", () => {
    it("accepts only YYYY-MM", () => {
        expect(isMonthKey("2026-10")).toBe(true);
        expect(isMonthKey("2026-13")).toBe(false);
        expect(isMonthKey("bad")).toBe(false);
    });
});
