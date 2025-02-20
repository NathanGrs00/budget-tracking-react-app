import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Stack} from "react-bootstrap";

interface Props {
    expenseAmount: string;
    expenseName: string;
    index: number;
    handleExpenseChange: (index: number, amount: string, name: string) => void;
}

function NewExpenseRow({expenseAmount, expenseName, index, handleExpenseChange}: Props) {

    return (
        <Stack direction="horizontal" gap={3} className={"mb-2"}>
            <Form.Control className="me-auto"
                          placeholder="Name of expense e.g. 'Rent'"
                          value={expenseName}
                          onChange={(e) =>handleExpenseChange(index, expenseAmount, e.target.value)}
            />
            <Form.Control className="me-auto"
                          placeholder="Amount"
                          value={expenseAmount}
                          onChange={(e) => handleExpenseChange(index, e.target.value, expenseName)}
            />
            <div className="vr" />
            <Button variant="outline-danger" onClick={() => handleExpenseChange(index, "", "")}>Reset</Button>
        </Stack>
    );
}

export default NewExpenseRow;