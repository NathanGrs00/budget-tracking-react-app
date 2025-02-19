import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Stack} from "react-bootstrap";

function NewIncome() {
    return (
        <Stack direction="horizontal" gap={3}>
            <Form.Control className="me-auto" placeholder="Name of income e.g. 'Salary'" />
            <Form.Control className="me-auto" placeholder="Amount" />
            <div className="vr" />
            <Button variant="outline-danger">Reset</Button>
        </Stack>
    );
}

export default NewIncome