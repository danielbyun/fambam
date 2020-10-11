import React, { useEffect, useMemo, useState } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";

import { Provider } from "react-redux";

import {
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Welcome from "./components/Welcome";
import Messenger from "./components/messenger/Messenger";
import { store } from "./redux/Store";
import SecuredRoute from "./components/security/SecuredRoute";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  // const [id, setId] = useLocalStorage("token");
  const authenticationToken = localStorage.getItem("token");
  const [token, setToken] = useState();

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
      <Provider store={store}>
        <Router>
          <CssBaseline />
          <Switch>
            <Route exact path="/welcome" component={Welcome} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <SecuredRoute exact path="/messenger" component={Messenger} />
          </Switch>
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
