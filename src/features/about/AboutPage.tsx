import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import { apiAgent } from "../../app/api/ApiService";

export default function AboutPage (){
    console.log("about");

    return (
        <Container>
            <Typography> Testing purposes only</Typography>
            <ButtonGroup>
                <Button onClick={apiAgent.TestErrors.getBadRequest}> badrequest</Button>
                <Button onClick={apiAgent.TestErrors.getNotFound}> notfound</Button>
                <Button onClick={apiAgent.TestErrors.getServerError} >server</Button>
                <Button onClick={apiAgent.TestErrors.getUnauthorized}>unauthorized </Button>
                <Button onClick={apiAgent.TestErrors.getValidationError}> Validation</Button>
            </ButtonGroup>
        </Container>
    );
}