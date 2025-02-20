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
    const [totalIncome, setTotalIncome] = useState<number>(0)
    const [totalExpenses, setTotalExpenses] = useState<number>(0)

    const handleNavigating = (link: string) => {
        setCurrentPage(link)
    }

    return (
        <>
            <NavBar handleNavigating={handleNavigating} />
            {currentPage === "home" && <Homepage />}
            {currentPage === "new-income" && <NewIncome totalIncome={totalIncome} setTotalIncome={setTotalIncome}/>}
            {currentPage === "new-expenses" && <NewExpense expenses={expenses} setExpenses={setExpenses} setTotalExpenses={setTotalExpenses}/>}
            {currentPage === "show-budget" && <ShowBudget allExpenses={expenses} totalIncome={totalIncome} totalExpenses={totalExpenses}/>}
        </>
    )
}

export default App;