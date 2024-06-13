import { Component } from "../../components"
import "./Home.scss"

import w1 from "../../assets/wallpaper/w1.jpg"
import w2 from "../../assets/wallpaper/w2.jpg"
import w3 from "../../assets/wallpaper/w3.jpg"
import w4 from "../../assets/wallpaper/w4.jpg"
import w5 from "../../assets/wallpaper/w5.jpg"
import w6 from "../../assets/wallpaper/w6.jpg"


const wallpaperList = [w1, w2, w3, w4, w5, w6, , w2, w3, w4, w5, w6, w2, w3, w4, w5, w6, w2, w3, w4, w5, w6, w2, w3, w4, w5, w6]


const Home = () => {
    return (
        <div className="home d-flex flex-column gap-5">
            <Component.Banner />
            <Component.Category />
            <Component.WallpaperList wallpaperList={wallpaperList} />
        </div>
    )
}

export default Home