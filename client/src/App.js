import React, { useEffect, useMemo, useState } from "react";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import {
  CircularProgress,
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core";

import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Welcome from "./components/Welcome";
import Messenger from "./components/messenger/Messenger";
import SecuredRoute from "./components/security/SecuredRoute";
import Header from "./components/header/Header";

import { persistor } from "./redux/Store";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const authenticationToken = localStorage.getItem("token");
  const [, setToken] = useState();

  useEffect(() => {
    if (authenticationToken) {
      setToken(authenticationToken);
    }
  }, [authenticationToken]);

  useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches &&
      darkMode
    ) {
      setDarkMode(true);
    }
  }, [darkMode]);

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <PersistGate loading={<CircularProgress />} persistor={persistor}>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Switch>
            <Redirect exact from="/" to="/welcome" component={Welcome} />
            <SecuredRoute path="/welcome" component={Welcome} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <SecuredRoute path="/messenger" component={Messenger} />
          </Switch>
        </PersistGate>
      </Router>
    </ThemeProvider>
  );
};

export default App;
