import { PieChart } from '@mui/x-charts/PieChart';

interface Props {
    allExpenses: {
        expenseName: string;
        expenseAmount: string;
    }[];
    totalIncome: number
    totalExpenses: number
}

function BasicPie({allExpenses, totalIncome, totalExpenses}: Props) {
    const remainingIncome = totalIncome - totalExpenses
    return (
        <PieChart
            series={[
                {
                    data: [
                        { id: 0, value: remainingIncome, label: "Remaining Income" },
                        ...allExpenses.map((expense, index) => ({
                            id: index + 1,
                            value: parseFloat(expense.expenseAmount),
                            label: expense.expenseName
                        }))
                    ]
                },
            ]}
            width={1000}
            height={200}
        />
    );
}

export default BasicPie;
