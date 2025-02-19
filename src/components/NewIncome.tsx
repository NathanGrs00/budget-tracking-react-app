import {useState} from "react";
import NewIncomeRow from "./NewIncomeRow.tsx";

function NewIncome() {

    const [rowAmount, setRowAmount] = useState(1);
    const [incomeAmount, setIncomeAmount] = useState<string[]>([]);

    const handleIncomeChange = (index: number, amount: string) => {
        const updatedIncomes = [...incomeAmount];
        updatedIncomes[index] = amount;
        setIncomeAmount(updatedIncomes)
    }

    const totalIncome = incomeAmount.reduce(
        (sum, amount) => sum + parseFloat(amount || "0"),
        0
    )

    return (
        <div className={"container p-5 mt-5 rounded-4"}>
            <h2 className="mb-5">Enter your total income per month:</h2>
            {[...Array(rowAmount)].map((_, index) => (
                <NewIncomeRow handleIncomeChange={handleIncomeChange}
                           key={index}
                           index={index}
                           incomeAmount={incomeAmount[index] || ""}
                />
            ))}
            <p className="mt-5">Your total income is: {totalIncome} </p>
            <button className="btn btn-primary me-3">Add total income</button>
            <button className="btn btn-outline-primary"
                    onClick={() => setRowAmount(prev => prev + 1)}>New row</button>
        </div>
    )
}

export default NewIncome;