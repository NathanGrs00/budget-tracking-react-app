import type { EntryKind } from "../types.ts";
import { href } from "../hooks/useHashRoute.ts";
import MonthPicker from "../components/MonthPicker.tsx";
import EntryList from "../components/EntryList.tsx";

interface Props {
    kind: EntryKind;
}

function EntriesPage({ kind }: Props) {
    const isIncome = kind === "income";

    return (
        <section className="container card-panel shadow p-4 p-md-5 mt-5 rounded-4">
            <h1 className="h2 mb-2">{isIncome ? "Your income" : "Your expenses"}</h1>
            <p className="text-body-secondary mb-4">
                Switch on <strong>Monthly</strong> for things that come back every month. They are copied to the next
                month automatically.
            </p>
            <MonthPicker />
            <EntryList kind={kind} />
            <div className="d-flex justify-content-end mt-4">
                <a className="btn btn-outline-primary" href={href(isIncome ? "expenses" : "budget")}>
                    {isIncome ? "Next: expenses →" : "See your budget →"}
                </a>
            </div>
        </section>
    );
}

export default EntriesPage;
