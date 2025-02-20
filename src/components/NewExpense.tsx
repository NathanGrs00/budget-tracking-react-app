import {useState} from "react";
import NewExpenseRow from "./NewExpenseRow.tsx";
import * as React from "react";

interface Props {
    expenses: { expenseName: string; expenseAmount: string }[];
    setExpenses: React.Dispatch<React.SetStateAction<{ expenseName: string; expenseAmount: string }[]>>;
    setTotalExpenses: React.Dispatch<React.SetStateAction<number>>
}


function NewExpense({expenses, setExpenses, setTotalExpenses}: Props) {

    const [rowAmount, setRowAmount] = useState(1);

    const handleExpenseChange = (index: number, amount: string, name: string) => {
        const updatedExpenses = [...expenses];
        updatedExpenses[index] = {
            expenseName: name,
            expenseAmount: amount
        };
        setExpenses(updatedExpenses)
    }

    const totalExpenses = expenses.reduce(
        (sum, expense) => sum + parseFloat(expense.expenseAmount || "0"),
        0
    )

    React.useEffect(() => {
        setTotalExpenses(totalExpenses);
    }, [expenses, setTotalExpenses]);

    return (
        <div className={"container p-5 mt-5 rounded-4"}>
            <h2 className="mb-5">Enter your total expenses per month:</h2>
            {[...Array(rowAmount)].map((_, index) => (
                <NewExpenseRow handleExpenseChange={handleExpenseChange}
                              key={index}
                              index={index}
                               expenseName={expenses[index]?.expenseName || ""}
                              expenseAmount={expenses[index]?.expenseAmount || ""}
                />
            ))}
            <p className="mt-5">Your total expenses are: {totalExpenses} </p>
            <button className="btn btn-primary"
                    onClick={() => setRowAmount(prev => prev + 1)}>New row</button>
        </div>
    )
}

export default NewExpense;