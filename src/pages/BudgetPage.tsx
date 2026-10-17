import { PieChart } from "@mui/x-charts/PieChart";
import type { AppData } from "../types.ts";
import { formatMoney, formatMonth, getMonth, parseAmount, summarize } from "../lib/budget.ts";
import { href } from "../hooks/useHashRoute.ts";
import MonthPicker from "../components/MonthPicker.tsx";

interface Props {
    data: AppData;
    month: string;
    setMonth: (month: string) => void;
}

const REMAINING_COLOR = "#2e9d5b";
const PALETTE = ["#3b6fd8", "#e07b39", "#9b59b6", "#d64f6e", "#e0b22e", "#2bb3c0", "#7f8c8d", "#5c4bd1", "#b5651d", "#4caf50"];

function BudgetPage({ data, month, setMonth }: Props) {
    const monthData = getMonth(data, month);
    const summary = summarize(month, monthData);
    const money = (n: number) => formatMoney(n, data.currency);
    const overBudget = summary.remaining < 0;

    const slices = monthData.expenses
        .map((e, i) => ({ id: e.id, label: e.name.trim() || "Unnamed expense", value: parseAmount(e.amount), color: PALETTE[i % PALETTE.length], recurring: e.recurring }))
        .filter((s) => s.value > 0);
    if (summary.remaining > 0) {
        slices.unshift({ id: "remaining", label: "Remaining", value: summary.remaining, color: REMAINING_COLOR, recurring: false });
    }
    const chartTotal = slices.reduce((sum, s) => sum + s.value, 0);

    return (
        <section className="container card-panel shadow p-4 p-md-5 mt-5 rounded-4">
            <h1 className="h2 mb-4">Budget overview</h1>
            <MonthPicker month={month} setMonth={setMonth} />

            {summary.income === 0 && summary.expenses === 0 ? (
                <div className="text-center py-4">
                    <p className="lead">Nothing filled in for {formatMonth(month)} yet.</p>
                    <a className="btn btn-primary" href={href("income")}>
                        Add income
                    </a>
                </div>
            ) : (
                <>
                    <div className={`remaining-banner rounded-4 p-4 mb-4 text-center ${overBudget ? "over" : ""}`}>
                        <div className="text-uppercase small fw-semibold">{overBudget ? "Over budget by" : "Left to spend"}</div>
                        <div className="display-4 fw-bold" data-testid="remaining">
                            {money(Math.abs(summary.remaining))}
                        </div>
                        <div className="small">
                            {money(summary.income)} income − {money(summary.expenses)} expenses
                        </div>
                    </div>

                    <div className="row g-4 align-items-center">
                        <div className="col-12 col-lg-6">
                            {chartTotal > 0 && (
                                <PieChart
                                    series={[
                                        {
                                            data: slices.map(({ id, label, value, color }) => ({ id, label, value, color })),
                                            innerRadius: 50,
                                            paddingAngle: 1,
                                            cornerRadius: 4,
                                            valueFormatter: (item) => money(item.value),
                                        },
                                    ]}
                                    height={280}
                                    margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                    slotProps={{ legend: { hidden: true } }}
                                />
                            )}
                        </div>
                        <div className="col-12 col-lg-6">
                            <table className="table table-sm align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">Item</th>
                                        <th scope="col" className="text-end">Amount</th>
                                        <th scope="col" className="text-end">Share</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {slices.map((s) => (
                                        <tr key={s.id}>
                                            <td>
                                                <span className="swatch" style={{ background: s.color }} aria-hidden="true" />
                                                {s.label}
                                                {s.recurring && <span className="badge text-bg-light border ms-2">monthly</span>}
                                            </td>
                                            <td className="text-end">{money(s.value)}</td>
                                            <td className="text-end">{Math.round((s.value / chartTotal) * 100)}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="row g-3 mt-3">
                        <Stat label="Income" value={money(summary.income)} />
                        <Stat label="Recurring expenses" value={money(summary.recurringExpenses)} />
                        <Stat label="One-off expenses" value={money(summary.oneOffExpenses)} />
                    </div>
                </>
            )}
        </section>
    );
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div className="col-12 col-sm-4">
            <div className="border rounded-3 p-3 h-100 bg-body">
                <div className="small text-body-secondary">{label}</div>
                <div className="fs-5 fw-semibold">{value}</div>
            </div>
        </div>
    );
}

export default BudgetPage;
