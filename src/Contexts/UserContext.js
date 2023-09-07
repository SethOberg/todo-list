import React, { createContext, useState } from "react";

// Create a new context
export const UserContext = createContext();

// Create a provider component
export const UserContextProvider = ({ children }) => {
  const [data, setData] = useState(null);

  const isAuthenticated = data !== null;

  // Define functions to update the data
  const updateData = (newData) => {
    setData(newData);
  };

  return (
    <UserContext.Provider value={{ data, updateData, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};
