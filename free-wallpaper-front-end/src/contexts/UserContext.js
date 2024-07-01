import React, { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {

    const [user, setUser] = useState({})

    const loginContext = (data) => {
        setUser(data)
    }

    const logoutContext = () => {
        setUser({})
    }

    useEffect(() => {
        const jwtToken = Cookies.get("jwt")
        if (jwtToken) {
            const decoded = jwtDecode(jwtToken)
            setUser({
                _id: decoded._id,
                name: decoded.name,
                email: decoded.email,
                avatar: decoded.avatar,
                roles: decoded.roles,
                isActived: decoded.isActived
            })
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };