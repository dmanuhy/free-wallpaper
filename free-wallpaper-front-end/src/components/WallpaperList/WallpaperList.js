import { Component } from '..'
import './WallpaperList.scss'

import { useMemo, useState } from 'react'
import Pagination from '../Pagination/Pagination'

const PAGE_SIZE = 12;

const WallpaperList = ({ wallpaperList = [] }) => {

    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
        const lastPageIndex = firstPageIndex + PAGE_SIZE;
        return wallpaperList.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, wallpaperList]);

    return (
        <>
            <div className="wallpaper-list content-width-padding">
                {wallpaperList && wallpaperList.length > 0 ?
                    currentTableData.map((item, index) => {
                        return (
                            <Component.Wallpaper image={item} creatorName={"John - " + index} creatorAvatar={item} />
                        )
                    })
                    :
                    <span className='fs-4 text-danger'>
                        No Content Found!
                    </span>
                }
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