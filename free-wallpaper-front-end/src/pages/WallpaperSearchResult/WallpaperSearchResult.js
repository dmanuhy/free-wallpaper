import { Component } from "../../components"
import "./WallpaperSearchResult.scss"

const WallpaperSearchResult = () => {
    return (
        <div className="wallpaper-search-result content-height-padding d-flex flex-column gap-5">
            <Component.Category />
            <Component.WallpaperList />
        </div>
    )
}

export default WallpaperSearchResult