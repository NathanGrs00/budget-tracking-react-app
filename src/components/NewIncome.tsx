import {useEffect, useState} from "react";
import NewIncomeRow from "./NewIncomeRow.tsx";
import * as React from "react";

interface Props {
    income: { incomeName: string; incomeAmount: string }[];
    setIncome: React.Dispatch<React.SetStateAction<{ incomeName: string; incomeAmount: string }[]>>;
    totalIncome: number
    setTotalIncome: React.Dispatch<React.SetStateAction<number>>;
}

function NewIncome({income, setIncome, totalIncome, setTotalIncome}: Props) {

    const [rowAmount, setRowAmount] = useState(1);

    useEffect(() => {
        if (income.length === 0) {
            setRowAmount(1);
        } else {
            setRowAmount(income.length)
        }
    }, [income]);

    const handleIncomeChange = (index: number, amount: string, name: string) => {
        const updatedIncomes = [...income];
        updatedIncomes[index] = {
            incomeName: name,
            incomeAmount: amount
        };
        setIncome(updatedIncomes)
    }

    const calculatedTotalIncome = income.reduce(
        (sum, income) => sum + parseFloat(income.incomeAmount || "0"),
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
                              incomeName={income[index]?.incomeName || ""}
                              incomeAmount={income[index]?.incomeAmount || ""}
                />
            ))}
            <p className="mt-5">Your total income is: {totalIncome} </p>
            <button className="btn btn-primary"
                    onClick={() => setRowAmount(prev => prev + 1)}>New row</button>
        </div>
    )
}

export default NewIncome;