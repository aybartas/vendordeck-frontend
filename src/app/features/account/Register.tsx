import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { apiAgent } from "../../api/ApiService";
import { useState } from "react";

const theme = createTheme();

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const [validationErrors, setValidationErrors] = useState([]);

  function handleApiErrors() {}
  return (
    <ThemeProvider theme={theme}>
      <Container
        component={Paper}
        maxWidth="sm"
        sx={{ paddingTop: 1, paddingBottom: 3 }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit((data) =>
              apiAgent.User.register(data).catch((err) =>
                setValidationErrors(err)
              )
            )}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              label="Username"
              {...register("username", {
                required: "Username is required",
              })}
              error={!!errors.username}
              helperText={errors?.username?.message as string}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Email"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
              })}
              error={!!errors.email}
              helperText={errors?.email?.message as string}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register("password", {
                required: "Password is required",
              })}
              error={!!errors.password}
              helperText={errors?.password?.message as string}
            />

            <Grid spacing={1} container>
              <Grid item xs={6} sm={6} md={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  error={!!errors.name}
                  helperText={errors?.name?.message as string}
                />
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Surname"
                  {...register("surname", {
                    required: "Surname is required",
                  })}
                  error={!!errors.name}
                  helperText={errors?.name?.message as string}
                />
              </Grid>
            </Grid>
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
            <LoadingButton
              disabled={!isValid}
              loading={isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </LoadingButton>
            <Grid container>
              <Grid item>
                <Link to="/login">Already have an account? Sign In</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
