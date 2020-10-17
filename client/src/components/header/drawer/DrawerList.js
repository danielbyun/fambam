import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

import { signOutStartAsync } from "../../../redux/actions/authActions";

const DrawerList = ({ history, signOutStartAsync }) => {
  return (
    <div
      onClick={async () =>
        await signOutStartAsync(null, () => {
          history.push("/");
        })
      }
    >
      Logout
    </div>
  );
};

export default compose(
  withRouter,
  connect(null, { signOutStartAsync })
)(DrawerList);
