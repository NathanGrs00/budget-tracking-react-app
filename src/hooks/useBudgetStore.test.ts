import { describe, expect, it } from "vitest";
import type { AppData } from "../types.ts";
import { getMonth } from "../lib/budget.ts";
import { reducer } from "./useBudgetStore.ts";

const start: AppData = {
    version: 1,
    currency: "EUR",
    months: { "2026-09": { income: [], expenses: [{ id: "rent", name: "Rent", amount: "1200", recurring: true }] } },
};

describe("reducer", () => {
    it("edits a copied monthly entry in a month that was not saved yet", () => {
        const copied = getMonth(start, "2026-10").expenses[0];
        const next = reducer(start, { type: "updateEntry", month: "2026-10", kind: "expenses", id: copied.id, changes: { amount: "1250" } });
        expect(next.months["2026-10"].expenses[0].amount).toBe("1250");
        expect(next.months["2026-09"].expenses[0].amount).toBe("1200");
    });

    it("removes a copied monthly entry and does not bring it back", () => {
        const copied = getMonth(start, "2026-10").expenses[0];
        const next = reducer(start, { type: "removeEntry", month: "2026-10", kind: "expenses", id: copied.id });
        expect(getMonth(next, "2026-10").expenses).toEqual([]);
    });
});
