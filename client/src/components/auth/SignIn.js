import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  fade,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import Copyright from "../copyright/Copyright";
import { signInStartAsync } from "../../redux/actions/authActions";
import { createStructuredSelector } from "reselect";
import { selectCurrentToken } from "../../redux/selector/authSelector";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  text: {
    textDecoration: "none",
    color: grey[500],
    "&:hover": {
      color: fade(grey[100], 0.5),
      textDecoration: "underline",
    },
  },
}));

const SignIn = ({ token: validToken, history, signInStartAsync }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const token = localStorage.getItem("token");

  if (token) {
    return <Redirect to="/welcome" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values) => {
            try {
              await signInStartAsync(values, () => {
                history.push("/welcome");
              });
            } catch (e) {}
          }}
          validationSchema={Yup.object({
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required"),
          })}
        >
          {({
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleSubmit,
            handleBlur,
            handleReset,
          }) => {
            return (
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="none"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.username && touched.username === true}
                  helperText={
                    errors.username && touched.username && errors.username
                  }
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="none"
                  value={values.password}
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={errors.password && touched.password === true}
                  helperText={
                    errors.password && touched.password && errors.password
                  }
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    {/* <Link to="/signin" variant="body2" className={classes.text}>
                      Forgot password?
                    </Link> */}
                  </Grid>
                  <Grid item>
                    <Link to="/signup" variant="body2" className={classes.text}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Button></Button>
              </form>
            );
          }}
        </Formik>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  validToken: selectCurrentToken,
});

export default connect(mapStateToProps, { signInStartAsync })(SignIn);
