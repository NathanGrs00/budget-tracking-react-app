import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Stack} from "react-bootstrap";

interface Props {
    incomeAmount: string;
    incomeName: string;
    index: number;
    handleIncomeChange: (index: number, amount: string, name: string) => void;
}

function NewIncome({incomeAmount, incomeName, index, handleIncomeChange}: Props) {

    return (
        <Stack direction="horizontal" gap={3} className={"mb-2"}>
            <Form.Control className="me-auto"
                          placeholder="Name of income e.g. 'Salary'"
                          value={incomeName}
                          onChange={(e) =>handleIncomeChange(index, incomeAmount, e.target.value)}
            />
            <Form.Control className="me-auto"
                          placeholder="Amount"
                          value={incomeAmount}
                          onChange={(e) => handleIncomeChange(index, e.target.value, incomeName)}
            />
            <div className="vr" />
            <Button variant="outline-danger" onClick={() => handleIncomeChange(index, "", "")}>Reset</Button>
        </Stack>
    );
}

export default NewIncome;