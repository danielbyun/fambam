import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  createContext,
} from "react";

const ConversationsContext = createContext();

export const useConversations = () => {
  return useContext(ConversationsContext);
};

// everything related to conversations (chat)
export const ConversationsProvider = ({ id, children }) => {
  const [conversations, setConversations] = useState();
};
