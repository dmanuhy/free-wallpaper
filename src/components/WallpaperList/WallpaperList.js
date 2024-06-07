import Wallpaper from '../Wallpaper/Wallpaper'
import './WallpaperList.scss'
import w1 from "../../assets/wallpaper/w1.jpg"
import w2 from "../../assets/wallpaper/w2.jpg"
import w3 from "../../assets/wallpaper/w3.jpg"
import w4 from "../../assets/wallpaper/w4.jpg"
import w5 from "../../assets/wallpaper/w5.jpg"
import w6 from "../../assets/wallpaper/w6.jpg"

const WallpaperList = () => {
    return (
        <div className="wallpaper-list content-width-padding">
            <div className='row'>
                <div className='col-4 d-flex flex-column gap-4'>
                    <Wallpaper img={w1} />
                    <Wallpaper img={w2} />
                </div>
                <div className='col-4 d-flex flex-column gap-4'>
                    <Wallpaper img={w3} />
                    <Wallpaper img={w4} />
                </div>
                <div className='col-4 d-flex flex-column gap-4'>
                    <Wallpaper img={w5} />
                    <Wallpaper img={w6} />
                </div>
            </div>
        </div>
    )
}

export default WallpaperList