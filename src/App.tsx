import NewIncome from "./components/NewIncome.tsx";
import "./App.css"
import NavBar from "./components/NavBar.tsx";
import Homepage from "./components/Homepage.tsx";
import {useState} from "react";
import NewExpense from "./components/NewExpense.tsx";
import ShowBudget from "./components/ShowBudget.tsx";

function App() {
    const [currentPage, setCurrentPage] = useState("home");
    const [expenses, setExpenses] = useState<{expenseName: string; expenseAmount: string}[]>([]);

    const handleNavigating = (link: string) => {
        setCurrentPage(link)
    }

    return (
        <>
            <NavBar handleNavigating={handleNavigating} />
            {currentPage === "home" && <Homepage />}
            {currentPage === "new-income" && <NewIncome />}
            {currentPage === "new-expenses" && <NewExpense expenses={expenses} setExpenses={setExpenses}/>}
            {currentPage === "show-budget" && <ShowBudget allExpenses={expenses}/>}
        </>
    )
}

export default App;