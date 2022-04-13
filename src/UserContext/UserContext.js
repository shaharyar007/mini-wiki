import React, { createContext, useState } from "react";

export const userContext = createContext();
export const UserProvider = ({ children }) => {

const [username, setUsername] = useState();
const [password, setPassword] = useState();

return(
    <userContext.Provider value={{username, setUsername,password, setPassword}}
    >
    {children}
    </userContext.Provider>
);
};