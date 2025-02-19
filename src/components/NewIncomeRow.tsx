import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Stack} from "react-bootstrap";
import { useState } from "react";

interface Props {
    incomeAmount: string;
    index: number;
    handleIncomeChange: (index: number, amount: string) => void;
}

function NewIncome({incomeAmount, index, handleIncomeChange}: Props) {
    const [incomeName, setIncomeName] = useState("");

    return (
        <Stack direction="horizontal" gap={3} className={"mb-2"}>
            <Form.Control className="me-auto"
                          placeholder="Name of income e.g. 'Salary'"
                          value={incomeName}
                          onChange={(e) =>setIncomeName(e.target.value)}
            />
            <Form.Control className="me-auto"
                          placeholder="Amount"
                          value={incomeAmount}
                          onChange={(e) => handleIncomeChange(index, e.target.value)}
            />
            <div className="vr" />
            <Button variant="outline-danger" onClick={function(){setIncomeName(""); handleIncomeChange(index, "")}}>Reset</Button>
        </Stack>
    );
}

export default NewIncome;