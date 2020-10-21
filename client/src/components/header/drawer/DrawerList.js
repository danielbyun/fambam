import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

import { signOutStartAsync } from "../../../redux/actions/authActions";
import { Button, Divider, Drawer, List, ListItem } from "@material-ui/core";

const DrawerList = ({ open, handleClose, history, signOutStartAsync }) => {
  return (
    <Drawer open={open} onClose={handleClose}>
      <List>
        <ListItem>Chat</ListItem>
        <ListItem>Covid Tracker</ListItem>
        <Divider />
        <ListItem>
          <Button
            onClick={async () =>
              await signOutStartAsync(null, () => {
                history.push("/");
                handleClose();
              })
            }
          >
            Logout
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default compose(
  withRouter,
  connect(null, { signOutStartAsync })
)(DrawerList);
