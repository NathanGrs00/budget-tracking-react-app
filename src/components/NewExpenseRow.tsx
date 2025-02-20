import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Stack} from "react-bootstrap";
import { useState } from "react";

interface Props {
    expenseAmount: string;
    index: number;
    handleExpenseChange: (index: number, amount: string) => void;
}

function NewExpenseRow({expenseAmount, index, handleExpenseChange}: Props) {
    const [expenseName, setExpenseName] = useState("");

    return (
        <Stack direction="horizontal" gap={3} className={"mb-2"}>
            <Form.Control className="me-auto"
                          placeholder="Name of expense e.g. 'Rent'"
                          value={expenseName}
                          onChange={(e) =>setExpenseName(e.target.value)}
            />
            <Form.Control className="me-auto"
                          placeholder="Amount"
                          value={expenseAmount}
                          onChange={(e) => handleExpenseChange(index, e.target.value)}
            />
            <div className="vr" />
            <Button variant="outline-danger" onClick={function(){setExpenseName(""); handleExpenseChange(index, "")}}>Reset</Button>
        </Stack>
    );
}

export default NewExpenseRow;