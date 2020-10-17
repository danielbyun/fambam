import React, { useState } from "react";
import { connect } from "react-redux";

import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import { createStructuredSelector } from "reselect";
import { selectCurrentToken } from "../../redux/selector/authSelector";
import DrawerList from "./drawer/DrawerList";
import { compose } from "redux";
// import useTheme from "../../hooks/useTheme";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = ({ darkMode, setDarkMode, validToken }) => {
  const classes = useStyles();
  // const [viewMode, setViewMode] = useTheme(darkMode);
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  const handleClose = () => {
    setIsDrawerOpened(false);
  };

  if (validToken) {
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              FamBam
            </Typography>
          </Toolbar>
          <DrawerList open={isDrawerOpened} handleClose={handleClose} />
        </AppBar>
      </div>
    );
  } else {
    return null;
  }
};

const mapStateToProps = createStructuredSelector({
  validToken: selectCurrentToken,
});

export default compose(connect(mapStateToProps))(Header);
