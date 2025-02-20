import { PieChart } from '@mui/x-charts/PieChart';

interface Props {
    allExpenses: {
        expenseName: string;
        expenseAmount: string;
    }[];
}

function BasicPie({allExpenses}: Props) {
    return (
        <PieChart
            series={[
                {
                    data: allExpenses.map((expense, index) => ({
                            id: index,
                            value: parseFloat(expense.expenseAmount),
                            label: expense.expenseName}
                    ))
                },
            ]}
            width={400}
            height={200}
        />
    );
}

export default BasicPie;
