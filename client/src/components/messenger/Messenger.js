import React, { useEffect } from "react";
import { connect } from "react-redux";

const Messenger = ({ token }) => {
  console.log(token);

  return <div>Messenger</div>;
};

const mapStateToProps = (state) => ({
  token: state.auth.validToken,
});

export default connect(mapStateToProps)(Messenger);
