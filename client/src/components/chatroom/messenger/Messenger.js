import React from "react";
import { connect } from "react-redux";

import ConversationList from "../conversation-list/ConversationList";
import MessageList from "../messagelist/MessageList";
import Toolbar from "../toolbar/Tollbar";
import ToolbarButton from "../toolbarbutton/ToolbarButton";
import "./Messenger.css";

import { Grid, Paper } from "@material-ui/core";

import { selectCurrentToken } from "../../../redux/selector/authSelector";
import { createStructuredSelector } from "reselect";

const Messenger = ({ validToken }) => {
  return (
    <Paper className="messenger">
      <Toolbar
        title="Messenger"
        leftItems={[<ToolbarButton key="cog" icon="ion-ios-cog" />]}
        rightItems={[
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />,
        ]}
      />

      <Toolbar
        title="Conversation Title"
        rightItems={[
          <ToolbarButton
            key="info"
            icon="ion-ios-information-circle-outline"
          />,
          <ToolbarButton key="video" icon="ion-ios-videocam" />,
          <ToolbarButton key="phone" icon="ion-ios-call" />,
        ]}
      />

      <div className="scrollable sidebar">
        <ConversationList />
      </div>

      <div className="scrollable content">
        <MessageList />
      </div>
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({
  validToken: selectCurrentToken,
});

export default connect(mapStateToProps)(Messenger);
