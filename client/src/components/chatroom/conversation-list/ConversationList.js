import React, { useState, useEffect } from "react";
import ConversationSearch from "../conversation-search/ConversationSearch";
import ConversationListItem from "../conversation-list-item/ConversationListItem";

import axios from "axios";

import "./ConversationList.css";
import Toolbar from "../toolbar/Tollbar";
import ToolbarButton from "../toolbarbutton/ToolbarButton";

const ConversationList = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      await axios
        .get("https://randomuser.me/api/?results=20")
        .then((response) => {
          const newConversations = response.data.results.map((result) => {
            return {
              photo: result.picture.large,
              name: `${result.name.first} ${result.name.last}`,
              text:
                "Hello world! This is a long message that needs to be truncated.",
            };
          });
          setConversations((conversations) => [
            ...conversations,
            ...newConversations,
          ]);
        });
    };

    getConversations();
  }, []);

  return (
    <div className="conversation-list" style={{ padding: "1rem" }}>
      <Toolbar
        title="Messenger"
        leftItems={[<ToolbarButton key="cog" icon="ion-ios-cog" />]}
        rightItems={[
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />,
        ]}
      />
      <ConversationSearch />
      {conversations.map((conversation) => (
        <ConversationListItem key={conversation.name} data={conversation} />
      ))}
    </div>
  );
};

export default ConversationList;
