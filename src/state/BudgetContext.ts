import { createContext, useContext, type Dispatch } from "react";
import type { AppData } from "../types.ts";
import type { BudgetAction } from "./budgetReducer.ts";

export interface BudgetContextValue {
    data: AppData;
    dispatch: Dispatch<BudgetAction>;
    /** The month being viewed, as "YYYY-MM". */
    month: string;
    setMonth: (month: string) => void;
}

export const BudgetContext = createContext<BudgetContextValue | null>(null);

export function useBudget(): BudgetContextValue {
    const value = useContext(BudgetContext);
    if (!value) throw new Error("useBudget must be used inside <BudgetProvider>.");
    return value;
}
