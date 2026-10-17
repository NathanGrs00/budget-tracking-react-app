import type { AppData, Entry, MonthData } from "../types.ts";

export const CURRENCIES = ["EUR", "USD", "GBP", "CHF", "JPY", "CAD", "AUD", "SEK", "NOK", "DKK", "PLN", "INR"];
export const DEFAULT_CURRENCY = "EUR";

export function newId(): string {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function newEntry(recurring = false): Entry {
    return { id: newId(), name: "", amount: "", recurring };
}

export function emptyData(): AppData {
    return { version: 1, currency: DEFAULT_CURRENCY, months: {} };
}

// ---------- Months ----------

export function monthKey(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function currentMonthKey(): string {
    return monthKey(new Date());
}

export function shiftMonth(key: string, delta: number): string {
    const [y, m] = key.split("-").map(Number);
    return monthKey(new Date(y, m - 1 + delta, 1));
}

export function formatMonth(key: string, style: "long" | "short" = "long"): string {
    const [y, m] = key.split("-").map(Number);
    return new Date(y, m - 1, 1).toLocaleDateString(undefined, { month: style, year: "numeric" });
}

/**
 * Returns the stored data for a month. If the month has not been saved yet,
 * it starts with copies of the recurring entries from the latest earlier month.
 */
export function getMonth(data: AppData, key: string): MonthData {
    const stored = data.months[key];
    if (stored) return stored;

    const previousKey = Object.keys(data.months)
        .filter((k) => k < key)
        .sort()
        .pop();
    if (!previousKey) return { income: [], expenses: [] };

    const previous = data.months[previousKey];
    // IDs must be stable across calls, so an edit to a copied entry finds the same entry again.
    const copyRecurring = (entries: Entry[]) =>
        entries.filter((e) => e.recurring).map((e) => ({ ...e, id: `${e.id.split("@")[0]}@${key}` }));
    return { income: copyRecurring(previous.income), expenses: copyRecurring(previous.expenses) };
}

// ---------- Amounts ----------

/** Parses user input, accepting both "12.50" and "12,50". Invalid or negative input counts as 0. */
export function parseAmount(value: string): number {
    const n = parseFloat(value.replace(",", "."));
    return Number.isFinite(n) && n > 0 ? n : 0;
}

export function sumEntries(entries: Entry[], filter?: (e: Entry) => boolean): number {
    return entries.filter(filter ?? (() => true)).reduce((sum, e) => sum + parseAmount(e.amount), 0);
}

export interface MonthSummary {
    key: string;
    income: number;
    expenses: number;
    recurringExpenses: number;
    oneOffExpenses: number;
    remaining: number;
}

export function summarize(key: string, month: MonthData): MonthSummary {
    const income = sumEntries(month.income);
    const expenses = sumEntries(month.expenses);
    const recurringExpenses = sumEntries(month.expenses, (e) => e.recurring);
    return {
        key,
        income,
        expenses,
        recurringExpenses,
        oneOffExpenses: expenses - recurringExpenses,
        remaining: income - expenses,
    };
}

/** Summaries of all saved months that hold at least one amount, oldest first. */
export function history(data: AppData): MonthSummary[] {
    return Object.keys(data.months)
        .sort()
        .map((key) => summarize(key, data.months[key]))
        .filter((s) => s.income > 0 || s.expenses > 0);
}

export function averages(summaries: MonthSummary[]) {
    const n = summaries.length;
    const avg = (pick: (s: MonthSummary) => number) =>
        n === 0 ? 0 : summaries.reduce((sum, s) => sum + pick(s), 0) / n;
    return {
        months: n,
        income: avg((s) => s.income),
        expenses: avg((s) => s.expenses),
        remaining: avg((s) => s.remaining),
    };
}

export function formatMoney(value: number, currency: string): string {
    try {
        return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(value);
    } catch {
        return value.toFixed(2);
    }
}
