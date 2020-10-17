import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectCurrentToken } from "../../redux/selector/authSelector";

const SecuredRoute = ({ component: Component, validToken, ...otherProps }) => {
  const [isAuthenticated] = useState(!!validToken);

  return (
    <Route
      {...otherProps}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const mapStateToProps = createStructuredSelector({
  validToken: selectCurrentToken,
});

export default connect(mapStateToProps)(SecuredRoute);
