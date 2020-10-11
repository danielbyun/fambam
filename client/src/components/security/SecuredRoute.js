import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const SecuredRoute = ({ component: Component, validToken, ...otherProps }) => {
  console.log(validToken);
  return (
    <Route
      {...otherProps}
      render={(props) =>
        validToken ? (
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

const mapStateToProps = (state) => ({
  validToken: state.auth.validToken,
});

export default connect(mapStateToProps)(SecuredRoute);
