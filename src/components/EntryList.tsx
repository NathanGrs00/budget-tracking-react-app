import type { Entry, EntryKind } from "../types.ts";
import type { Action } from "../hooks/useBudgetStore.ts";
import { formatMoney, sumEntries } from "../lib/budget.ts";

interface Props {
    kind: EntryKind;
    month: string;
    entries: Entry[];
    currency: string;
    dispatch: (action: Action) => void;
}

const COPY: Record<EntryKind, { singular: string; plural: string; placeholder: string }> = {
    income: { singular: "income", plural: "income", placeholder: "e.g. Salary" },
    expenses: { singular: "expense", plural: "expenses", placeholder: "e.g. Rent" },
};

function EntryList({ kind, month, entries, currency, dispatch }: Props) {
    const { singular, plural, placeholder } = COPY[kind];
    const update = (id: string, changes: Partial<Omit<Entry, "id">>) =>
        dispatch({ type: "updateEntry", month, kind, id, changes });

    const recurringTotal = sumEntries(entries, (e) => e.recurring);
    const total = sumEntries(entries);

    return (
        <>
            {entries.length === 0 && <p className="text-body-secondary">No {plural} added for this month yet.</p>}

            {entries.map((entry, index) => (
                <div className="row g-2 align-items-center mb-2 entry-row" key={entry.id}>
                    <div className="col-12 col-md-5">
                        <input
                            className="form-control"
                            aria-label={`Name of ${singular} ${index + 1}`}
                            placeholder={placeholder}
                            value={entry.name}
                            onChange={(e) => update(entry.id, { name: e.target.value })}
                        />
                    </div>
                    <div className="col col-md-3">
                        <input
                            className="form-control"
                            type="number"
                            inputMode="decimal"
                            min="0"
                            step="0.01"
                            aria-label={`Amount of ${singular} ${index + 1}`}
                            placeholder={`Amount (${currency})`}
                            value={entry.amount}
                            onChange={(e) => update(entry.id, { amount: e.target.value })}
                        />
                    </div>
                    <div className="col-auto col-md-2">
                        <div className="form-check form-switch mb-0">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id={`recurring-${entry.id}`}
                                checked={entry.recurring}
                                onChange={(e) => update(entry.id, { recurring: e.target.checked })}
                            />
                            <label className="form-check-label" htmlFor={`recurring-${entry.id}`}>
                                Monthly
                            </label>
                        </div>
                    </div>
                    <div className="col-auto col-md-2 text-end">
                        <button
                            type="button"
                            className="btn btn-outline-danger"
                            aria-label={`Remove ${singular} ${index + 1}`}
                            onClick={() => dispatch({ type: "removeEntry", month, kind, id: entry.id })}
                        >
                            <span aria-hidden="true">✕</span>
                            <span className="d-none d-md-inline ms-1">Remove</span>
                        </button>
                    </div>
                </div>
            ))}

            <button type="button" className="btn btn-primary mt-3" onClick={() => dispatch({ type: "addEntry", month, kind })}>
                + Add {singular}
            </button>

            <dl className="row mt-4 mb-0 totals">
                <dt className="col-7 col-sm-4 fw-normal">Monthly (recurring)</dt>
                <dd className="col-5 col-sm-8">{formatMoney(recurringTotal, currency)}</dd>
                <dt className="col-7 col-sm-4 fw-normal">One-off</dt>
                <dd className="col-5 col-sm-8">{formatMoney(total - recurringTotal, currency)}</dd>
                <dt className="col-7 col-sm-4">Total {plural}</dt>
                <dd className="col-5 col-sm-8 fw-bold" data-testid={`total-${kind}`}>
                    {formatMoney(total, currency)}
                </dd>
            </dl>
        </>
    );
}

export default EntryList;
