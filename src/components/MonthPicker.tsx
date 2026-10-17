import { currentMonthKey, formatMonth, shiftMonth } from "../lib/budget.ts";

interface Props {
    month: string;
    setMonth: (month: string) => void;
}

function MonthPicker({ month, setMonth }: Props) {
    const isCurrent = month === currentMonthKey();
    return (
        <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
            <div className="btn-group" role="group" aria-label="Choose month">
                <button type="button" className="btn btn-outline-secondary" onClick={() => setMonth(shiftMonth(month, -1))} aria-label="Previous month">
                    ‹
                </button>
                <span className="btn btn-outline-secondary disabled text-body fw-semibold month-label" aria-live="polite">
                    {formatMonth(month)}
                </span>
                <button type="button" className="btn btn-outline-secondary" onClick={() => setMonth(shiftMonth(month, 1))} aria-label="Next month">
                    ›
                </button>
            </div>
            {!isCurrent && (
                <button type="button" className="btn btn-link" onClick={() => setMonth(currentMonthKey())}>
                    Back to this month
                </button>
            )}
        </div>
    );
}

export default MonthPicker;
