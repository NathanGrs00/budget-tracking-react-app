import { useEffect, useMemo, useReducer, useState, type ReactNode } from "react";
import { loadData, saveData } from "../lib/storage.ts";
import { currentMonthKey } from "../lib/months.ts";
import { budgetReducer } from "./budgetReducer.ts";
import { BudgetContext } from "./BudgetContext.ts";

/** Holds the budget data, saves every change to localStorage, and tracks the month being viewed. */
export function BudgetProvider({ children }: { children: ReactNode }) {
    const [data, dispatch] = useReducer(budgetReducer, undefined, loadData);
    const [month, setMonth] = useState(currentMonthKey);

    useEffect(() => saveData(data), [data]);

    const value = useMemo(() => ({ data, dispatch, month, setMonth }), [data, month]);
    return <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>;
}
