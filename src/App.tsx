import { useState } from "react";
import NavBar from "./components/NavBar.tsx";
import Homepage from "./pages/Homepage.tsx";
import EntriesPage from "./pages/EntriesPage.tsx";
import BudgetPage from "./pages/BudgetPage.tsx";
import HistoryPage from "./pages/HistoryPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import { useBudgetStore } from "./hooks/useBudgetStore.ts";
import { useHashRoute } from "./hooks/useHashRoute.ts";
import { currentMonthKey } from "./lib/budget.ts";

function App() {
    const [page, navigate] = useHashRoute();
    const [data, dispatch] = useBudgetStore();
    const [month, setMonth] = useState(currentMonthKey);

    const monthProps = { data, month, setMonth };

    return (
        <>
            <NavBar currentPage={page} />
            <main className="pb-5 px-2">
                {page === "home" && <Homepage />}
                {page === "income" && <EntriesPage kind="income" dispatch={dispatch} {...monthProps} />}
                {page === "expenses" && <EntriesPage kind="expenses" dispatch={dispatch} {...monthProps} />}
                {page === "budget" && <BudgetPage {...monthProps} />}
                {page === "history" && (
                    <HistoryPage
                        data={data}
                        openMonth={(m) => {
                            setMonth(m);
                            navigate("budget");
                        }}
                    />
                )}
                {page === "settings" && <SettingsPage data={data} dispatch={dispatch} />}
            </main>
        </>
    );
}

export default App;
