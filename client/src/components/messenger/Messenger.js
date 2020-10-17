import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentToken } from "../../redux/selector/authSelector";

const Messenger = ({ token }) => {
  console.log(token);

  return <div>Messenger</div>;
};

const mapStateToProps = createStructuredSelector({
  validToken: selectCurrentToken,
});

export default connect(mapStateToProps)(Messenger);
