import { describe, expect, it } from "vitest";
import { loadData, parseData, saveData, STORAGE_KEY } from "./storage.ts";

describe("storage", () => {
    it("round-trips data", () => {
        const data = {
            version: 1 as const,
            currency: "USD",
            months: { "2026-10": { income: [{ id: "1", name: "Salary", amount: "100", recurring: true }], expenses: [] } },
        };
        saveData(data);
        expect(loadData()).toEqual(data);
    });

    it("falls back to empty data when storage is corrupt", () => {
        localStorage.setItem(STORAGE_KEY, "{not json");
        expect(loadData().months).toEqual({});
    });

    it("cleans up imported data", () => {
        const parsed = parseData({ months: { "2026-10": { income: [{ name: "X", amount: 5 }, null], expenses: "nope" }, bad: {} } });
        expect(parsed.currency).toBe("EUR");
        expect(Object.keys(parsed.months)).toEqual(["2026-10"]);
        expect(parsed.months["2026-10"].income).toMatchObject([{ name: "X", amount: "5", recurring: false }]);
        expect(parsed.months["2026-10"].expenses).toEqual([]);
    });

    it("rejects files that are not budgets", () => {
        expect(() => parseData([1, 2])).toThrow();
        expect(() => parseData("hello")).toThrow();
    });
});
