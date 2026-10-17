import type { AppData, Entry, MonthData } from "../types.ts";
import { DEFAULT_CURRENCY, parseAmount } from "./money.ts";

export interface MonthSummary {
    key: string;
    income: number;
    expenses: number;
    recurringExpenses: number;
    oneOffExpenses: number;
    remaining: number;
}

export function newId(): string {
    return typeof crypto?.randomUUID === "function"
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function newEntry(): Entry {
    return { id: newId(), name: "", amount: "", recurring: false };
}

export function emptyData(): AppData {
    return { version: 1, currency: DEFAULT_CURRENCY, months: {} };
}

/**
 * Returns the stored data for a month. A month that has not been saved yet
 * starts with copies of the recurring entries from the latest earlier month.
 */
export function getMonth(data: AppData, key: string): MonthData {
    const stored = data.months[key];
    if (stored) return stored;

    const previousKey = Object.keys(data.months)
        .filter((k) => k < key)
        .sort()
        .pop();
    if (!previousKey) return { income: [], expenses: [] };

    // IDs must be stable across calls, so an edit to a copied entry finds the same entry again.
    const copyRecurring = (entries: Entry[]) =>
        entries.filter((e) => e.recurring).map((e) => ({ ...e, id: `${e.id.split("@")[0]}@${key}` }));
    const previous = data.months[previousKey];
    return { income: copyRecurring(previous.income), expenses: copyRecurring(previous.expenses) };
}

export function sumEntries(entries: Entry[], filter: (e: Entry) => boolean = () => true): number {
    return entries.filter(filter).reduce((sum, e) => sum + parseAmount(e.amount), 0);
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
    const count = summaries.length;
    const average = (pick: (s: MonthSummary) => number) =>
        count === 0 ? 0 : summaries.reduce((sum, s) => sum + pick(s), 0) / count;
    return {
        months: count,
        income: average((s) => s.income),
        expenses: average((s) => s.expenses),
        remaining: average((s) => s.remaining),
    };
}
