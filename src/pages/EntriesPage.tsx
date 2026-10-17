import type { AppData, EntryKind } from "../types.ts";
import type { Action } from "../hooks/useBudgetStore.ts";
import { getMonth } from "../lib/budget.ts";
import { href } from "../hooks/useHashRoute.ts";
import MonthPicker from "../components/MonthPicker.tsx";
import EntryList from "../components/EntryList.tsx";

interface Props {
    kind: EntryKind;
    data: AppData;
    dispatch: (action: Action) => void;
    month: string;
    setMonth: (month: string) => void;
}

function EntriesPage({ kind, data, dispatch, month, setMonth }: Props) {
    const monthData = getMonth(data, month);
    const isIncome = kind === "income";

    return (
        <section className="container card-panel shadow p-4 p-md-5 mt-5 rounded-4">
            <h1 className="h2 mb-2">{isIncome ? "Your income" : "Your expenses"}</h1>
            <p className="text-body-secondary mb-4">
                Switch on <strong>Monthly</strong> for things that come back every month. They are copied to
                the next month automatically.
            </p>
            <MonthPicker month={month} setMonth={setMonth} />
            <EntryList
                kind={kind}
                month={month}
                entries={monthData[kind]}
                currency={data.currency}
                dispatch={dispatch}
            />
            <div className="d-flex justify-content-end mt-4">
                <a className="btn btn-outline-primary" href={href(isIncome ? "expenses" : "budget")}>
                    {isIncome ? "Next: expenses →" : "See your budget →"}
                </a>
            </div>
        </section>
    );
}

export default EntriesPage;
