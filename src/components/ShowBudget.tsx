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
        <div className={"container p-5 mt-5 rounded-4"}>
            <h2 className={"mb-5"}>Monthly expenses:</h2>
            <BasicPie allExpenses={allExpenses} totalIncome={totalIncome} totalExpenses={totalExpenses}/>
        </div>
    )
}

export default ShowBudget;