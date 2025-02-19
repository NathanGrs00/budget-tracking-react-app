import NewIncome from "./components/NewIncome.tsx";
import "./App.css"

function App() {
    return (
        <div className={"container p-5 rounded"}>
            <h2 className="mb-5">Enter your total income per month:</h2>
            <NewIncome/>
            <p className="mt-5">Your total income is: </p>
            <button className="btn btn-primary me-3">Add total income</button>
            <button className="btn btn-outline-primary">New row</button>
        </div>
    )
}

export default App