import { describe, expect, it } from "vitest";
import type { AppData } from "../types.ts";
import { averages, getMonth, history, parseAmount, shiftMonth, summarize } from "./budget.ts";

const entry = (name: string, amount: string, recurring = false) => ({ id: name, name, amount, recurring });

describe("parseAmount", () => {
    it("accepts dots and commas and ignores bad input", () => {
        expect(parseAmount("12.5")).toBe(12.5);
        expect(parseAmount("12,5")).toBe(12.5);
        expect(parseAmount("")).toBe(0);
        expect(parseAmount("abc")).toBe(0);
        expect(parseAmount("-5")).toBe(0);
    });
});

describe("shiftMonth", () => {
    it("crosses year boundaries", () => {
        expect(shiftMonth("2026-12", 1)).toBe("2027-01");
        expect(shiftMonth("2026-01", -1)).toBe("2025-12");
    });
});

describe("getMonth", () => {
    const data: AppData = {
        version: 1,
        currency: "EUR",
        months: {
            "2026-08": { income: [entry("Old", "1", true)], expenses: [] },
            "2026-09": {
                income: [entry("Salary", "3000", true), entry("Bonus", "500")],
                expenses: [entry("Rent", "1200", true), entry("Holiday", "800")],
            },
        },
    };

    it("returns stored months as they are", () => {
        expect(getMonth(data, "2026-09")).toBe(data.months["2026-09"]);
    });

    it("starts a new month with recurring entries from the latest earlier month", () => {
        const month = getMonth(data, "2026-11");
        expect(month.income.map((e) => e.name)).toEqual(["Salary"]);
        expect(month.expenses.map((e) => e.name)).toEqual(["Rent"]);
        expect(month.expenses[0].id).toBe("Rent@2026-11");
        expect(getMonth(data, "2026-11")).toEqual(month);
    });

    it("is empty before the first saved month", () => {
        expect(getMonth(data, "2026-01")).toEqual({ income: [], expenses: [] });
    });
});

describe("summaries", () => {
    it("splits recurring and one-off expenses", () => {
        const s = summarize("2026-09", {
            income: [entry("Salary", "3000")],
            expenses: [entry("Rent", "1200", true), entry("Holiday", "800")],
        });
        expect(s).toMatchObject({ income: 3000, expenses: 2000, recurringExpenses: 1200, oneOffExpenses: 800, remaining: 1000 });
    });

    it("averages only months with data", () => {
        const data: AppData = {
            version: 1,
            currency: "EUR",
            months: {
                "2026-01": { income: [entry("a", "1000")], expenses: [entry("b", "400")] },
                "2026-02": { income: [entry("a", "2000")], expenses: [entry("b", "600")] },
                "2026-03": { income: [entry("a", "")], expenses: [] },
            },
        };
        const h = history(data);
        expect(h.map((m) => m.key)).toEqual(["2026-01", "2026-02"]);
        expect(averages(h)).toEqual({ months: 2, income: 1500, expenses: 500, remaining: 1000 });
    });
});
