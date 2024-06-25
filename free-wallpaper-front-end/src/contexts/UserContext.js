import React, { useEffect, useState } from "react"
const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {

    const [user, setUser] = useState({})

    const loginContext = (data) => {
        setUser(data)
    }

    const logoutContext = () => {
        setUser({})
    }

    return (
        <UserContext.Provider value={{ user, setUser, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };