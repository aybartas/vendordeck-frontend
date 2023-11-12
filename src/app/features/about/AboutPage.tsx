import { Alert } from "@mui/material";
import { AlertTitle } from "@mui/material";
import { ListItemText } from "@mui/material";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import { useState } from "react";
import { apiAgent } from "../../api/ApiService";
import { AxiosResponse } from "axios";

export default function AboutPage() {

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  function getValidationError() {
    apiAgent.TestErrors.getValidationError()
      .then(() => console.log("validation error"))
      .catch((error: string[]) => setValidationErrors(error));
  }
  return (
    <Container>
      <Typography> Testing purposes only</Typography>
      <ButtonGroup>
        <Button
          onClick={() =>
            apiAgent.TestErrors.getBadRequest().catch((error: AxiosResponse) =>
              console.log(error)
            )
          }
        >
          badrequest
        </Button>
        <Button
          onClick={() =>
            apiAgent.TestErrors.getNotFound().catch((error: AxiosResponse) =>
              console.log(error)
            )
          }
        >
          notfound
        </Button>
        <Button
          onClick={() =>
            apiAgent.TestErrors.getServerError().catch((error: AxiosResponse) =>
              console.log(error)
            )
          }
        >
          server
        </Button>
        <Button
          onClick={() =>
            apiAgent.TestErrors.getUnauthorized().catch(
              (error: AxiosResponse) => console.log(error)
            )
          }
        >
          unauthorized
        </Button>
        <Button onClick={getValidationError}>Validation</Button>
      </ButtonGroup>

      {validationErrors.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((error) => (
              <ListItem key={error}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
}
