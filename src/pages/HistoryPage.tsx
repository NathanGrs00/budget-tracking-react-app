import { BarChart } from "@mui/x-charts/BarChart";
import type { AppData } from "../types.ts";
import { averages, formatMoney, formatMonth, history } from "../lib/budget.ts";
import { href } from "../hooks/useHashRoute.ts";

interface Props {
    data: AppData;
    openMonth: (month: string) => void;
}

function HistoryPage({ data, openMonth }: Props) {
    const months = history(data);
    const avg = averages(months);
    const money = (n: number) => formatMoney(n, data.currency);

    return (
        <section className="container card-panel shadow p-4 p-md-5 mt-5 rounded-4">
            <h1 className="h2 mb-4">History</h1>

            {months.length === 0 ? (
                <div className="text-center py-4">
                    <p className="lead">No saved months yet.</p>
                    <a className="btn btn-primary" href={href("income")}>
                        Fill in your first month
                    </a>
                </div>
            ) : (
                <>
                    <h2 className="h5">
                        Average per month <span className="text-body-secondary fw-normal">({avg.months} {avg.months === 1 ? "month" : "months"})</span>
                    </h2>
                    <div className="row g-3 mb-4">
                        <Avg label="Income" value={money(avg.income)} />
                        <Avg label="Expenses" value={money(avg.expenses)} />
                        <Avg label="Left over" value={money(avg.remaining)} negative={avg.remaining < 0} />
                    </div>

                    <BarChart
                        height={300}
                        dataset={months.map((m) => ({ month: formatMonth(m.key, "short"), income: m.income, expenses: m.expenses }))}
                        xAxis={[{ scaleType: "band", dataKey: "month" }]}
                        series={[
                            { dataKey: "income", label: "Income", color: "#2e9d5b", valueFormatter: (v) => money(v ?? 0) },
                            { dataKey: "expenses", label: "Expenses", color: "#d64f6e", valueFormatter: (v) => money(v ?? 0) },
                        ]}
                        margin={{ left: 70 }}
                    />

                    <p className="small text-body-secondary mt-3 mb-1">Tap a month to see its details.</p>
                    <div className="table-responsive">
                        <table className="table table-sm table-hover align-middle history-table">
                            <thead>
                                <tr>
                                    <th scope="col">Month</th>
                                    <th scope="col" className="text-end">Income</th>
                                    <th scope="col" className="text-end">Expenses</th>
                                    <th scope="col" className="text-end">Left over</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...months].reverse().map((m) => (
                                    <tr key={m.key}>
                                        <td>
                                            <button type="button" className="btn btn-link p-0 text-start" onClick={() => openMonth(m.key)}>
                                                {formatMonth(m.key, "short")}
                                            </button>
                                        </td>
                                        <td className="text-end">{money(m.income)}</td>
                                        <td className="text-end">{money(m.expenses)}</td>
                                        <td className={`text-end fw-semibold ${m.remaining < 0 ? "text-danger" : "text-success"}`}>{money(m.remaining)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </section>
    );
}

function Avg({ label, value, negative = false }: { label: string; value: string; negative?: boolean }) {
    return (
        <div className="col-12 col-sm-4">
            <div className="border rounded-3 p-3 h-100 bg-body">
                <div className="small text-body-secondary">{label}</div>
                <div className={`fs-4 fw-bold ${negative ? "text-danger" : ""}`}>{value}</div>
            </div>
        </div>
    );
}

export default HistoryPage;
