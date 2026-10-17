export type EntryKind = "income" | "expenses";

export interface Entry {
    id: string;
    name: string;
    /** Kept as a string so the input can hold partial values like "12." */
    amount: string;
    recurring: boolean;
}

export interface MonthData {
    income: Entry[];
    expenses: Entry[];
}

export interface AppData {
    version: 1;
    currency: string;
    /** Keyed by "YYYY-MM". */
    months: Record<string, MonthData>;
}

export type Page = "home" | "income" | "expenses" | "budget" | "history" | "settings";
