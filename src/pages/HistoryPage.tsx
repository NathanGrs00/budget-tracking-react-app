import { BarChart } from "@mui/x-charts/BarChart";
import type { Page } from "../types.ts";
import { averages, history } from "../lib/budget.ts";
import { formatMoney } from "../lib/money.ts";
import { formatMonth } from "../lib/months.ts";
import { href } from "../hooks/useHashRoute.ts";
import { useBudget } from "../state/BudgetContext.ts";
import { colors } from "../theme.ts";
import StatCard from "../components/StatCard.tsx";

interface Props {
    navigate: (page: Page) => void;
}

function HistoryPage({ navigate }: Props) {
    const { data, setMonth } = useBudget();
    const months = history(data);
    const average = averages(months);
    const money = (value: number) => formatMoney(value, data.currency);

    const openMonth = (key: string) => {
        setMonth(key);
        navigate("budget");
    };

    if (months.length === 0) {
        return (
            <section className="container card-panel shadow p-4 p-md-5 mt-5 rounded-4">
                <h1 className="h2 mb-4">History</h1>
                <div className="text-center py-4">
                    <p className="lead">No saved months yet.</p>
                    <a className="btn btn-primary" href={href("income")}>
                        Fill in your first month
                    </a>
                </div>
            </section>
        );
    }

    return (
        <section className="container card-panel shadow p-4 p-md-5 mt-5 rounded-4">
            <h1 className="h2 mb-4">History</h1>

            <h2 className="h5">
                Average per month{" "}
                <span className="text-body-secondary fw-normal">
                    ({average.months} {average.months === 1 ? "month" : "months"})
                </span>
            </h2>
            <div className="row g-3 mb-4">
                <StatCard label="Income" value={money(average.income)} />
                <StatCard label="Expenses" value={money(average.expenses)} />
                <StatCard
                    label="Left over"
                    value={money(average.remaining)}
                    tone={average.remaining < 0 ? "danger" : "default"}
                />
            </div>

            <BarChart
                height={300}
                dataset={months.map((m) => ({
                    month: formatMonth(m.key, "short"),
                    income: m.income,
                    expenses: m.expenses,
                }))}
                xAxis={[{ scaleType: "band", dataKey: "month" }]}
                series={[
                    { dataKey: "income", label: "Income", color: colors.income, valueFormatter: (v) => money(v ?? 0) },
                    {
                        dataKey: "expenses",
                        label: "Expenses",
                        color: colors.expenses,
                        valueFormatter: (v) => money(v ?? 0),
                    },
                ]}
                margin={{ left: 70 }}
            />

            <p className="small text-body-secondary mt-3 mb-1">Tap a month to see its details.</p>
            <div className="table-responsive">
                <table className="table table-sm table-hover align-middle history-table">
                    <thead>
                        <tr>
                            <th scope="col">Month</th>
                            <th scope="col" className="text-end">
                                Income
                            </th>
                            <th scope="col" className="text-end">
                                Expenses
                            </th>
                            <th scope="col" className="text-end">
                                Left over
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...months].reverse().map((m) => (
                            <tr key={m.key}>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-link p-0 text-start"
                                        onClick={() => openMonth(m.key)}
                                    >
                                        {formatMonth(m.key, "short")}
                                    </button>
                                </td>
                                <td className="text-end">{money(m.income)}</td>
                                <td className="text-end">{money(m.expenses)}</td>
                                <td
                                    className={`text-end fw-semibold ${m.remaining < 0 ? "text-danger" : "text-success"}`}
                                >
                                    {money(m.remaining)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default HistoryPage;
