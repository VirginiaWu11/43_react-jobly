import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";

// import * as yup from "yup";
// import { useFormik } from "formik";

const theme = createTheme();
// const validationSchema = yup.object({
//   username: yup.string().required("Username is required"),
//   password: yup.string().required("Password is required").min(5),
// });

export default function SigninForm({ signin }) {
  const [formErrors, setFormErrors] = useState([]);
  const navigate = useNavigate();

  // const formik = useFormik({
  //   initialValues: {
  //     username: "",
  //     password: "",
  //   },
  //   onSubmit: (values) => {
  //     console.log(JSON.stringify(values));
  //   },
  //   validationSchema: validationSchema,
  // });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let result = await signin({
      username: data.get("username"),
      password: data.get("password"),
    });
    if (result.success) {
      navigate("/companies");
    } else {
      setFormErrors(result.errors);
    }
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Container maxWidth="xs">
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value="123abc"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value="111111"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                {formErrors.length
                  ? formErrors.map((error) => (
                      <Alert severity="error">{error}</Alert>
                    ))
                  : null}
                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item>
                    <Link to="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
