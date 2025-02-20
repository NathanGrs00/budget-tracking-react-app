import {useState} from "react";
import NewExpenseRow from "./NewExpenseRow.tsx";

function NewExpense() {

    const [rowAmount, setRowAmount] = useState(1);
    const [expenseAmount, setExpenseAmount] = useState<string[]>([]);

    const handleExpenseChange = (index: number, amount: string) => {
        const updatedExpenses = [...expenseAmount];
        updatedExpenses[index] = amount;
        setExpenseAmount(updatedExpenses)
    }

    const totalExpenses = expenseAmount.reduce(
        (sum, amount) => sum + parseFloat(amount || "0"),
        0
    )

    return (
        <div className={"container p-5 mt-5 rounded-4"}>
            <h2 className="mb-5">Enter your total expenses per month:</h2>
            {[...Array(rowAmount)].map((_, index) => (
                <NewExpenseRow handleExpenseChange={handleExpenseChange}
                              key={index}
                              index={index}
                              expenseAmount={expenseAmount[index] || ""}
                />
            ))}
            <p className="mt-5">Your total expenses are: {totalExpenses} </p>
            <button className="btn btn-primary me-3">Add total expenses</button>
            <button className="btn btn-outline-primary"
                    onClick={() => setRowAmount(prev => prev + 1)}>New row</button>
        </div>
    )
}

export default NewExpense;