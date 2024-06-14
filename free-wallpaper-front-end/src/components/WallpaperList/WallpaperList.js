import { Component } from '..'
import './WallpaperList.scss'

import { LoadMoreOnScroll } from '../LoadMoreOnScroll/LoadMoreOnScroll';


const WallpaperList = ({ wallpaperList = [], page = 1, setPage = null }) => {


    return (
        <>
            <div className="wallpaper-list content-width-padding">
                {wallpaperList && wallpaperList.length > 0 ?
                    <>
                        <div className='wallpaper-list-container'>
                            {wallpaperList.map((item, index) => {
                                return (
                                    <Component.Wallpaper key={index + 1} image={item} creatorName={"John - " + index} creatorAvatar={item} index={index} />
                                )
                            })}
                        </div>
                        {wallpaperList.length === 48 ?
                            <div>View More</div>
                            :
                            <LoadMoreOnScroll page={page} setPage={setPage} />
                        }
                    </>
                    :
                    <span className='fs-4 text-danger'>
                        No Content Found!
                    </span>
                }
            </div>
        </>
    )
}

export default WallpaperList