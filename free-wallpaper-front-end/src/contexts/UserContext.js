import React, { useEffect, useState } from "react"
import w10 from "../assets/wallpaper/w10.jpg"
const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {

    const [user, setUser] = useState({ email: "", displayName: "", avatar: "", role: "", isActived: false })

    const login = (email, password) => {
        setUser({
            email: email,
            displayName: "Hello World",
            role: email.includes("admin") ? "admin" : "contributor",
            avatar: w10,
            isActived: true
        })
    }

    const logout = () => {
        setUser({
            email: "",
            displayName: "",
            role: "",
            avatar: "",
            isActived: false
        })
    }

    return (
        <UserContext.Provider value={{ login, logout, user }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };