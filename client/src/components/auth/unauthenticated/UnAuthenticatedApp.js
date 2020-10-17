import React, { Fragment } from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: { width: "100vw", height: "500px" },
  boxContainer: { margin: "1rem 0 1rem 0" },
  titleText: { width: "100%", textAlign: "center" },
}));

const UnAuthenticatedApp = () => {
  const classes = useStyles();

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
        <Grid item className={classes.titleText}>
          <Typography component="span" variant="subtitle2">
            Logo
          </Typography>
          <Typography component="h1" variant="h5">
            FamBam
          </Typography>
        </Grid>

        <Fragment>
          <Grid
            xs={6}
            sm={6}
            md={6}
            lg={6}
            container
            item
            justify="space-around"
          >
            <Button
              component={Link}
              to="/signin"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
            <Button component={Link} to="/signup" variant="contained">
              Register
            </Button>
          </Grid>
        </Fragment>
      </Grid>
    </Grid>
  );
};

export default UnAuthenticatedApp;
