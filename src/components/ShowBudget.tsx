import BasicPie from "./BasicPie.tsx";

interface Props {
    allExpenses: {
        expenseName: string;
        expenseAmount: string;
    }[];
}

function ShowBudget({allExpenses}: Props) {
    return (
        <div className={"container p-5 mt-5 rounded-4"}>
            <h2 className={"mb-5"}>Monthly expenses:</h2>
            <BasicPie allExpenses={allExpenses}/>
        </div>
    )
}

export default ShowBudget;