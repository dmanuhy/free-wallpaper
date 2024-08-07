import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { UserService } from "../services/UserService";

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const [userLikedWallpaper, setUserLikedWallpaper] = useState([]);

    const loginContext = (data) => {
        setUser(data);
    };

    const logoutContext = () => {
        setUser({});
    };

    const getUserLikedWallpaper = async () => {
        const response = await UserService.getUserLikedWallpaperService(user._id);
        if (response.status === 200 && response.data) {
            setUserLikedWallpaper(response.data.liked)
        } else {
            if (response.status === 404) {
                setUserLikedWallpaper([])
            }
        }
    }

    const handleChangeLikedWallpaper = async (wallpaperId, createdBy) => {
        const response = await UserService.updateUserLikedWallpaperService({ userId: user._id, wallpaperId: wallpaperId, userName: user.name, ownerId: createdBy });
        if (response.status === 200) {
            setUserLikedWallpaper(response.data.liked)
        } else {
            console.log(response)
        }
    }

    useEffect(() => {
        const jwtToken = Cookies.get("jwt");
        if (jwtToken && jwtToken !== "undefined") {
            const decoded = jwtDecode(jwtToken);
            setUser({
                _id: decoded._id,
                name: decoded.name,
                email: decoded.email,
                avatar: decoded.avatar,
                roles: decoded.roles,
                isActived: decoded.isActived,
            });
        } else {
            setUser({})
        }
    }, []);

    useEffect(() => {
        if (user && user._id) {
            getUserLikedWallpaper()
        }
    }, [user])

    return <UserContext.Provider value={{ user, setUser, loginContext, logoutContext, userLikedWallpaper, handleChangeLikedWallpaper }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
