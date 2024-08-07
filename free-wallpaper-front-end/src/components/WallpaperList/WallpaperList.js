import { Component } from '..'
import './WallpaperList.scss'

import { LoadMoreOnScroll } from '../LoadMoreOnScroll/LoadMoreOnScroll';
import { useMemo } from 'react';


const WallpaperList = ({ wallpaperList = [], page = 0, setPage = null, noMoreData = false }) => {

    const wallpaperCounter = useMemo(() => {
        let isLoadMore = true
        if (wallpaperList.length % 60 === 0) {
            isLoadMore = false
        }
        return { isLoadMore }
    }, [wallpaperList])

    return (
        <>
            <div className="wallpaper-list content-width-padding">
                {wallpaperList && wallpaperList.length > 0 ?
                    <>
                        <div className='wallpaper-list-container'>
                            {wallpaperList.map((item, index) => {
                                return (
                                    <Component.Wallpaper key={"wallpaper-" + item._id} wallpaper={item} />
                                )
                            })}
                        </div>
                        {setPage && noMoreData === false &&
                            <>
                                {!wallpaperCounter.isLoadMore ?
                                    <button onClick={() => setPage((page) => page + 1)} className='btn btn-info text-white mt-5'>Discover More</button>
                                    :
                                    <LoadMoreOnScroll page={page} setPage={setPage} />
                                }
                            </>
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