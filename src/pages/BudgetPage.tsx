import { PieChart } from "@mui/x-charts/PieChart";
import { getMonth, summarize } from "../lib/budget.ts";
import { formatMoney, parseAmount } from "../lib/money.ts";
import { formatMonth } from "../lib/months.ts";
import { href } from "../hooks/useHashRoute.ts";
import { useBudget } from "../state/BudgetContext.ts";
import { colors } from "../theme.ts";
import MonthPicker from "../components/MonthPicker.tsx";
import StatCard from "../components/StatCard.tsx";

interface Slice {
    id: string;
    label: string;
    value: number;
    color: string;
    recurring: boolean;
}

function BudgetPage() {
    const { data, month } = useBudget();
    const monthData = getMonth(data, month);
    const summary = summarize(month, monthData);
    const money = (value: number) => formatMoney(value, data.currency);
    const overBudget = summary.remaining < 0;
    const isEmpty = summary.income === 0 && summary.expenses === 0;

    const slices: Slice[] = monthData.expenses
        .map((e, i) => ({
            id: e.id,
            label: e.name.trim() || "Unnamed expense",
            value: parseAmount(e.amount),
            color: colors.series[i % colors.series.length],
            recurring: e.recurring,
        }))
        .filter((s) => s.value > 0);
    if (summary.remaining > 0) {
        slices.unshift({
            id: "remaining",
            label: "Remaining",
            value: summary.remaining,
            color: colors.remaining,
            recurring: false,
        });
    }
    const chartTotal = slices.reduce((sum, s) => sum + s.value, 0);

    return (
        <section className="container card-panel shadow p-4 p-md-5 mt-5 rounded-4">
            <h1 className="h2 mb-4">Budget overview</h1>
            <MonthPicker />

            {isEmpty ? (
                <div className="text-center py-4">
                    <p className="lead">Nothing filled in for {formatMonth(month)} yet.</p>
                    <a className="btn btn-primary" href={href("income")}>
                        Add income
                    </a>
                </div>
            ) : (
                <>
                    <div className={`remaining-banner rounded-4 p-4 mb-4 text-center ${overBudget ? "over" : ""}`}>
                        <div className="text-uppercase small fw-semibold">
                            {overBudget ? "Over budget by" : "Left to spend"}
                        </div>
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
                                            data: slices.map(({ id, label, value, color }) => ({
                                                id,
                                                label,
                                                value,
                                                color,
                                            })),
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
                                        <th scope="col" className="text-end">
                                            Amount
                                        </th>
                                        <th scope="col" className="text-end">
                                            Share
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {slices.map((s) => (
                                        <tr key={s.id}>
                                            <td>
                                                <span
                                                    className="swatch"
                                                    style={{ background: s.color }}
                                                    aria-hidden="true"
                                                />
                                                {s.label}
                                                {s.recurring && (
                                                    <span className="badge text-bg-light border ms-2">monthly</span>
                                                )}
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
                        <StatCard label="Income" value={money(summary.income)} />
                        <StatCard label="Recurring expenses" value={money(summary.recurringExpenses)} />
                        <StatCard label="One-off expenses" value={money(summary.oneOffExpenses)} />
                    </div>
                </>
            )}
        </section>
    );
}

export default BudgetPage;
