import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Stack} from "react-bootstrap";
import { useState } from "react";

function NewIncome() {
    const [incomeName, setIncomeName] = useState("");
    const [incomeAmount, setIncomeAmount] = useState("");
    return (
        <Stack direction="horizontal" gap={3}>
            <Form.Control className="me-auto" placeholder="Name of income e.g. 'Salary'" value={incomeName} onChange={(e) =>setIncomeName(e.target.value)}/>
            <Form.Control className="me-auto" placeholder="Amount" value={incomeAmount} onChange={(e) => setIncomeAmount(e.target.value)} />
            <div className="vr" />
            <Button variant="outline-danger" onClick={function(){setIncomeName(""); setIncomeAmount("")}}>Reset</Button>
        </Stack>
    );
}

export default NewIncome