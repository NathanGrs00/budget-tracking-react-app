import NavBar from "./components/NavBar.tsx";
import HomePage from "./pages/HomePage.tsx";
import EntriesPage from "./pages/EntriesPage.tsx";
import BudgetPage from "./pages/BudgetPage.tsx";
import HistoryPage from "./pages/HistoryPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import { useHashRoute } from "./hooks/useHashRoute.ts";
import { BudgetProvider } from "./state/BudgetProvider.tsx";

function App() {
    const [page, navigate] = useHashRoute();

    return (
        <BudgetProvider>
            <NavBar currentPage={page} />
            <main className="pb-5 px-2">
                {page === "home" && <HomePage />}
                {page === "income" && <EntriesPage kind="income" />}
                {page === "expenses" && <EntriesPage kind="expenses" />}
                {page === "budget" && <BudgetPage />}
                {page === "history" && <HistoryPage navigate={navigate} />}
                {page === "settings" && <SettingsPage />}
            </main>
        </BudgetProvider>
    );
}

export default App;
