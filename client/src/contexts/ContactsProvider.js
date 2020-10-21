import React, { createContext, useContext } from "react";

// default state
const ContactsContext = createContext({
  contacts: [],
});

export const useContacts = () => {
  return useContext(ContactsContext);
};

export const ContactsProvider = ({ children }) => {
  const [contactsList, setContactsList] = useState([]);

  return (
    <ContactsContext.Provider value={contactsList}>
      {children}
    </ContactsContext.Provider>
  );
};
