import { Component } from '..'
import './WallpaperList.scss'
import w1 from "../../assets/wallpaper/w1.jpg"
import w2 from "../../assets/wallpaper/w2.jpg"
import w3 from "../../assets/wallpaper/w3.jpg"
import w4 from "../../assets/wallpaper/w4.jpg"
import w5 from "../../assets/wallpaper/w5.jpg"
import w6 from "../../assets/wallpaper/w6.jpg"
import { useMemo, useState } from 'react'
import Pagination from '../Pagination/Pagination'


const wallpaperList = [w1, w2, w3, w4, w5, w6]

const PAGE_SIZE = 2;

const WallpaperList = () => {

    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
        const lastPageIndex = firstPageIndex + PAGE_SIZE;
        return wallpaperList.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, wallpaperList]);

    return (
        <>
            <div className="wallpaper-list content-width-padding">
                {currentTableData.map((item, index) => {
                    return (
                        <Component.Wallpaper image={item} creatorName={"John - " + index} creatorAvatar={item} />
                    )
                })}

            </div>
            <div className="d-flex justify-content-center mt-2">
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={wallpaperList.length}
                    pageSize={PAGE_SIZE}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>
        </>

    )
}

export default WallpaperList