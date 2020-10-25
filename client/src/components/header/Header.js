import React, { useState } from "react";
import { connect } from "react-redux";

import {
  AppBar,
  Button,
  Divider,
  fade,
  Grid,
  IconButton,
  makeStyles,
  MenuItem,
  Popover,
  Switch,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";

import { createStructuredSelector } from "reselect";
import { selectCurrentToken } from "../../redux/selector/authSelector";
import DrawerList from "./drawer/DrawerList";
import { compose } from "redux";
import { Link, withRouter } from "react-router-dom";
import { grey } from "@material-ui/core/colors";
import { signOutStartAsync } from "../../redux/actions/authActions";
import clsx from "clsx";

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
  linkText: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      color: fade(grey[50], 0.5),
      textDecoration: "none",
    },
  },
}));

const Header = ({
  darkMode,
  setDarkMode,
  history,
  validToken,
  signOutStartAsync,
}) => {
  const classes = useStyles();
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const [settingAnchorEl, setSettingAnchorEl] = useState(null);

  const handleClose = () => {
    setIsDrawerOpened(false);
  };

  const handleOpenDrawer = () => {
    setIsDrawerOpened(!isDrawerOpened);
  };

  const handleSettingOpen = (e) => {
    setSettingAnchorEl(e.currentTarget);
  };

  const handleSettingClose = () => {
    setSettingAnchorEl(null);
  };

  if (validToken) {
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton onClick={() => handleOpenDrawer()}>
              <MenuIcon />
            </IconButton>
            <Typography
              component={Link}
              to="/"
              variant="h6"
              className={clsx(classes.linkText)}
            >
              FamBam
            </Typography>
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              justify="flex-end"
            >
              <div
                onClick={(e) => {
                  handleSettingOpen(e);
                }}
              >
                <IconButton>
                  <SettingsIcon />
                </IconButton>
              </div>
              <Popover
                anchorEl={settingAnchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(settingAnchorEl)}
                onClose={handleSettingClose}
              >
                <Typography style={{ padding: "10px" }} variant="h5">
                  Settings
                </Typography>
                <Divider />
                <MenuItem>
                  <p style={{ marginBottom: 0 }}>
                    <Switch
                      color="primary"
                      checked={darkMode}
                      onClick={() => {
                        // setCurrentViewMode(!prefersDarkMode);
                        setDarkMode(!darkMode);
                      }}
                    />
                    Dark Theme
                  </p>
                </MenuItem>
              </Popover>
              <Button
                onClick={async () => {
                  await signOutStartAsync(null, () => {
                    history.push("/");
                  });
                }}
              >
                Logout
              </Button>
            </Grid>
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

export default compose(
  withRouter,
  connect(mapStateToProps, { signOutStartAsync })
)(Header);
