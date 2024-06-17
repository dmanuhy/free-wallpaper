import React, { useEffect, useState } from "react"
import w1 from "../assets/wallpaper/w1.jpg"
import w2 from "../assets/wallpaper/w2.jpg"
import w3 from "../assets/wallpaper/w3.jpg"
import w4 from "../assets/wallpaper/w4.jpg"
import w5 from "../assets/wallpaper/w5.jpg"
import w6 from "../assets/wallpaper/w6.jpg"
import w7 from "../assets/wallpaper/w7.jpg"
import w8 from "../assets/wallpaper/w8.jpg"
import w9 from "../assets/wallpaper/w9.jpg"
import w10 from "../assets/wallpaper/w10.jpg"
import w11 from "../assets/wallpaper/w11.jpg"
import w12 from "../assets/wallpaper/w12.jpg"

const WallpaperContext = React.createContext(null);

const WallpaperProvider = ({ children }) => {

    const fakeData = [w1, w2, w3, w4, w5, w6, w7, w8, w9, w10, w11, w12]

    const [wallpaperList, setWallpaperList] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        setWallpaperList((wallpaperList) => [...wallpaperList, ...fakeData.sort((a, b) => 0.5 - Math.random())]);
    }, [page])

    return (
        <WallpaperContext.Provider value={{ wallpaperList, page, setPage, setWallpaperList }}>
            {children}
        </WallpaperContext.Provider>
    )
}

export { WallpaperContext, WallpaperProvider };