import { useRef, useState } from "react";
import type { AppData } from "../types.ts";
import type { Action } from "../hooks/useBudgetStore.ts";
import { CURRENCIES, formatMoney } from "../lib/budget.ts";
import { parseData } from "../lib/storage.ts";

interface Props {
    data: AppData;
    dispatch: (action: Action) => void;
}

function SettingsPage({ data, dispatch }: Props) {
    const fileInput = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

    const exportData = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `budget-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const importData = async (file: File) => {
        try {
            const parsed = parseData(JSON.parse(await file.text()));
            if (!window.confirm("Importing replaces all data in this browser. Continue?")) return;
            dispatch({ type: "replaceAll", data: parsed });
            setMessage({ ok: true, text: `Imported ${Object.keys(parsed.months).length} month(s).` });
        } catch {
            setMessage({ ok: false, text: "That file could not be read as a budget backup." });
        } finally {
            if (fileInput.current) fileInput.current.value = "";
        }
    };

    const resetAll = () => {
        if (window.confirm("Delete all income, expenses and history from this browser? This cannot be undone.")) {
            dispatch({ type: "resetAll" });
            setMessage({ ok: true, text: "All data deleted." });
        }
    };

    return (
        <section className="container card-panel shadow p-4 p-md-5 mt-5 rounded-4">
            <h1 className="h2 mb-4">Settings</h1>

            <h2 className="h5">Currency</h2>
            <div className="row g-2 align-items-center mb-5">
                <div className="col-12 col-sm-6 col-md-4">
                    <label htmlFor="currency" className="visually-hidden">Currency</label>
                    <select
                        id="currency"
                        className="form-select"
                        value={data.currency}
                        onChange={(e) => dispatch({ type: "setCurrency", currency: e.target.value })}
                    >
                        {CURRENCIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
                <div className="col-auto text-body-secondary">Example: {formatMoney(1234.5, data.currency)}</div>
            </div>

            <h2 className="h5">Your data</h2>
            <p className="text-body-secondary">
                Data is stored in this browser only. Export a backup to move it to another device or browser.
            </p>
            <div className="d-flex flex-wrap gap-2 mb-3">
                <button type="button" className="btn btn-outline-primary" onClick={exportData}>
                    Export backup
                </button>
                <button type="button" className="btn btn-outline-primary" onClick={() => fileInput.current?.click()}>
                    Import backup
                </button>
                <input
                    ref={fileInput}
                    type="file"
                    accept="application/json,.json"
                    className="d-none"
                    data-testid="import-input"
                    onChange={(e) => e.target.files?.[0] && importData(e.target.files[0])}
                />
                <button type="button" className="btn btn-outline-danger" onClick={resetAll}>
                    Delete all data
                </button>
            </div>
            {message && (
                <div className={`alert ${message.ok ? "alert-success" : "alert-danger"}`} role="status">
                    {message.text}
                </div>
            )}
        </section>
    );
}

export default SettingsPage;
