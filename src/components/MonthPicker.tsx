import { currentMonthKey, formatMonth, shiftMonth } from "../lib/months.ts";
import { useBudget } from "../state/BudgetContext.ts";

function MonthPicker() {
    const { month, setMonth } = useBudget();

    return (
        <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
            <div className="btn-group" role="group" aria-label="Choose month">
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setMonth(shiftMonth(month, -1))}
                    aria-label="Previous month"
                >
                    ‹
                </button>
                <span
                    className="btn btn-outline-secondary disabled text-body fw-semibold month-label"
                    aria-live="polite"
                >
                    {formatMonth(month)}
                </span>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setMonth(shiftMonth(month, 1))}
                    aria-label="Next month"
                >
                    ›
                </button>
            </div>
            {month !== currentMonthKey() && (
                <button type="button" className="btn btn-link" onClick={() => setMonth(currentMonthKey())}>
                    Back to this month
                </button>
            )}
        </div>
    );
}

export default MonthPicker;
