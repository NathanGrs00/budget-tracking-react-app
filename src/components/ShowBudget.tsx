import BasicPie from "./BasicPie.tsx";

interface Props {
    allExpenses: {
        expenseName: string;
        expenseAmount: string;
    }[];
    totalIncome: number
    totalExpenses: number
}

function ShowBudget({allExpenses, totalIncome, totalExpenses}: Props) {
    return (
        <div className={"container shadow p-5 mt-5 rounded-4"}>
            <h2 className={"mb-5"}>Monthly expenses:</h2>
            {totalIncome === 0 ? (
                <h4>No income selected yet</h4>
            ) : (
                <BasicPie allExpenses={allExpenses} totalIncome={totalIncome} totalExpenses={totalExpenses}/>
            )}
        </div>
    )
}

export default ShowBudget;