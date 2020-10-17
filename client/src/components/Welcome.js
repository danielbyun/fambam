import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { Grid, makeStyles } from "@material-ui/core";

import AuthenticatedApp from "./auth/authenticated/AuthenticatedApp";
import UnAuthenticatedApp from "./auth/unauthenticated/UnAuthenticatedApp";
import { selectCurrentToken } from "../redux/selector/authSelector";

const useStyles = makeStyles((theme) => ({
  container: { width: "100vw", height: "500px" },
  boxContainer: { margin: "1rem 0 1rem 0" },
  titleText: { width: "100%", textAlign: "center" },
}));

const Welcome = ({ validToken }) => {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (token) {
      setAuthenticated(true);
    }
  }, [token]);

  return (
    <Grid
      item
      container
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid
        item
        container
        justify="center"
        alignItems="center"
        spacing={3}
        xs={6}
        sm={6}
        md={6}
        lg={6}
        className={classes.boxContainer}
      >
        {authenticated ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  validToken: selectCurrentToken,
});

export default connect(mapStateToProps)(Welcome);
