import { useContext } from "react"
import { Component } from "../../components"
import "./WallpaperSearchResult.scss"
import { WallpaperContext } from "../../contexts/WallpaperContext"


const WallpaperSearchResult = () => {

    const { page, setPage, wallpaperList } = useContext(WallpaperContext);

    return (
        <div className="wallpaper-search-result content-height-padding d-flex flex-column gap-5">
            <Component.Category />
            <Component.WallpaperList wallpaperList={wallpaperList} page={page} setPage={setPage} />
        </div>
    )
}

export default WallpaperSearchResult