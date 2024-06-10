import { Component } from '..'
import './WallpaperList.scss'
import w1 from "../../assets/wallpaper/w1.jpg"
import w2 from "../../assets/wallpaper/w2.jpg"
import w3 from "../../assets/wallpaper/w3.jpg"
import w4 from "../../assets/wallpaper/w4.jpg"
import w5 from "../../assets/wallpaper/w5.jpg"
import w6 from "../../assets/wallpaper/w6.jpg"

const wallpaperList = [w1, w2, w3, w4, w5, w6]

const WallpaperList = () => {
    return (
        <div className="wallpaper-list content-width-padding">
            {wallpaperList.map((item, index) => {
                return (
                    <Component.Wallpaper image={item} />
                )
            })}
        </div>
    )
}

export default WallpaperList