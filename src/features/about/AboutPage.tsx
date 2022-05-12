import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import { apiAgent } from "../../app/api/ApiService";

export default function AboutPage (){
    console.log("about");

    return (
        <Container>
            <Typography> Testing purposes only</Typography>
            <ButtonGroup>
                <Button onClick={() => apiAgent.TestErrors.getBadRequest().catch(error => console.log(error))}> badrequest</Button>
                <Button onClick={() =>apiAgent.TestErrors.getNotFound().catch(error => console.log(error))}> notfound</Button>
                <Button onClick={() => apiAgent.TestErrors.getServerError().catch(error => console.log(error))} >server</Button>
                <Button onClick={() =>apiAgent.TestErrors.getUnauthorized().catch(error => console.log(error))}>unauthorized </Button>
                <Button onClick={() => apiAgent.TestErrors.getValidationError().catch(error => console.log(error))}> Validation</Button>
            </ButtonGroup>
        </Container>
    );
}