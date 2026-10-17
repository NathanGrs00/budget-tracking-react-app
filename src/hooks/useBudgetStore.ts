import { useEffect, useReducer } from "react";
import type { AppData, Entry, EntryKind, MonthData } from "../types.ts";
import { emptyData, getMonth, newEntry } from "../lib/budget.ts";
import { loadData, saveData } from "../lib/storage.ts";

export type Action =
    | { type: "addEntry"; month: string; kind: EntryKind }
    | { type: "updateEntry"; month: string; kind: EntryKind; id: string; changes: Partial<Omit<Entry, "id">> }
    | { type: "removeEntry"; month: string; kind: EntryKind; id: string }
    | { type: "setCurrency"; currency: string }
    | { type: "replaceAll"; data: AppData }
    | { type: "resetAll" };

function updateMonth(state: AppData, key: string, fn: (m: MonthData) => MonthData): AppData {
    return { ...state, months: { ...state.months, [key]: fn(getMonth(state, key)) } };
}

export function reducer(state: AppData, action: Action): AppData {
    switch (action.type) {
        case "addEntry":
            return updateMonth(state, action.month, (m) => ({
                ...m,
                [action.kind]: [...m[action.kind], newEntry()],
            }));
        case "updateEntry":
            return updateMonth(state, action.month, (m) => ({
                ...m,
                [action.kind]: m[action.kind].map((e) => (e.id === action.id ? { ...e, ...action.changes } : e)),
            }));
        case "removeEntry":
            return updateMonth(state, action.month, (m) => ({
                ...m,
                [action.kind]: m[action.kind].filter((e) => e.id !== action.id),
            }));
        case "setCurrency":
            return { ...state, currency: action.currency };
        case "replaceAll":
            return action.data;
        case "resetAll":
            return emptyData();
    }
}

export function useBudgetStore() {
    const [data, dispatch] = useReducer(reducer, undefined, loadData);

    useEffect(() => {
        saveData(data);
    }, [data]);

    return [data, dispatch] as const;
}
