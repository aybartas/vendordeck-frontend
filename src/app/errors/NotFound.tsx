import { Button, Divider, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container sx={{ height: 400 }} component={Paper}>
      <Typography variant="h3">
        What you are looking for is not found
      </Typography>
      <Divider />
      <Button component={Link} to={"/catalog"}>
        Go back to shop
      </Button>
    </Container>
  );
}
