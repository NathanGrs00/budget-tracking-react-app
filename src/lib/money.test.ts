import { describe, expect, it } from "vitest";
import { formatMoney, parseAmount } from "./money.ts";

describe("parseAmount", () => {
    it("accepts dots and commas", () => {
        expect(parseAmount("12.5")).toBe(12.5);
        expect(parseAmount("12,5")).toBe(12.5);
    });

    it("treats empty, invalid and negative input as 0", () => {
        expect(parseAmount("")).toBe(0);
        expect(parseAmount("abc")).toBe(0);
        expect(parseAmount("-5")).toBe(0);
    });
});

describe("formatMoney", () => {
    it("falls back to a plain number for an unknown currency", () => {
        expect(formatMoney(5, "NOT-A-CURRENCY")).toBe("5.00");
    });
});
