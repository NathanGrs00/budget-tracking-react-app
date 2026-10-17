import type { AppData, Entry, MonthData } from "../types.ts";
import { emptyData, newId } from "./budget.ts";
import { DEFAULT_CURRENCY } from "./money.ts";
import { isMonthKey } from "./months.ts";

export const STORAGE_KEY = "budget-tracker:v1";

function toEntry(value: unknown): Entry | null {
    if (typeof value !== "object" || value === null) return null;
    const v = value as Record<string, unknown>;
    return {
        id: typeof v.id === "string" && v.id ? v.id : newId(),
        name: typeof v.name === "string" ? v.name : "",
        amount: typeof v.amount === "string" ? v.amount : typeof v.amount === "number" ? String(v.amount) : "",
        recurring: v.recurring === true,
    };
}

function toEntries(value: unknown): Entry[] {
    return Array.isArray(value) ? value.map(toEntry).filter((e): e is Entry => e !== null) : [];
}

/** Turns unknown JSON (from storage or an imported file) into valid app data. Throws if it is unusable. */
export function parseData(raw: unknown): AppData {
    if (typeof raw !== "object" || raw === null) throw new Error("Not a budget file.");
    const r = raw as Record<string, unknown>;
    if (typeof r.months !== "object" || r.months === null) throw new Error("Not a budget file.");

    const months: Record<string, MonthData> = {};
    for (const [key, month] of Object.entries(r.months as Record<string, unknown>)) {
        if (!isMonthKey(key) || typeof month !== "object" || month === null) continue;
        const m = month as Record<string, unknown>;
        months[key] = { income: toEntries(m.income), expenses: toEntries(m.expenses) };
    }
    return {
        version: 1,
        currency: typeof r.currency === "string" && r.currency ? r.currency : DEFAULT_CURRENCY,
        months,
    };
}

export function loadData(): AppData {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? parseData(JSON.parse(raw)) : emptyData();
    } catch {
        return emptyData();
    }
}

export function saveData(data: AppData): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
        // Storage can be full or blocked (private mode). The app keeps working in memory.
    }
}
