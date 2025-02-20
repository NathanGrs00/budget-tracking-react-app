import {useEffect, useState} from "react";
import NewIncomeRow from "./NewIncomeRow.tsx";
import * as React from "react";

interface Props {
    totalIncome: number
    setTotalIncome: React.Dispatch<React.SetStateAction<number>>;
}

function NewIncome({totalIncome, setTotalIncome}: Props) {

    const [rowAmount, setRowAmount] = useState(1);
    const [incomeAmount, setIncomeAmount] = useState<string[]>([]);

    const handleIncomeChange = (index: number, amount: string) => {
        const updatedIncomes = [...incomeAmount];
        updatedIncomes[index] = amount;
        setIncomeAmount(updatedIncomes)
    }

    const calculatedTotalIncome = incomeAmount.reduce(
        (sum, amount) => sum + parseFloat(amount || "0"),
        0
    )

    useEffect(() => {
        setTotalIncome(calculatedTotalIncome);
    }, [calculatedTotalIncome, setTotalIncome]);

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
            <button className="btn btn-primary"
                    onClick={() => setRowAmount(prev => prev + 1)}>New row</button>
        </div>
    )
}

export default NewIncome;