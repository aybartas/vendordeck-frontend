import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function ServerError() {
  const { state } = useLocation();
  return (
    <Grid container>
      {state?.error && (
        <Typography gutterBottom variant="h3" color="secondary">
          {state.error.title}{" "}
        </Typography>
      )}
      <Typography variant="h5">Testing purposes only</Typography>
    </Grid>
  );
}
