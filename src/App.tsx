import NewIncome from "./components/NewIncome.tsx";
import "./App.css"
import NavBar from "./components/NavBar.tsx";
import Homepage from "./components/Homepage.tsx";
import {useState} from "react";
import NewExpense from "./components/NewExpense.tsx";

function App() {
    const [currentPage, setCurrentPage] = useState("home");

    const handleNavigating = (link: string) => {
        setCurrentPage(link)
    }

    return (
        <>
            <NavBar handleNavigating={handleNavigating} />
            {currentPage === "home" && <Homepage />}
            {currentPage === "new-income" && <NewIncome />}
            {currentPage === "new-expenses" && <NewExpense />}
        </>
    )
}

export default App;