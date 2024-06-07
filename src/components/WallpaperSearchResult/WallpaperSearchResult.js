import Category from "../Category/Category"
import WallpaperList from "../WallpaperList/WallpaperList"
import "./WallpaperSearchResult.scss"

const WallpaperSearchResult = () => {
    return (
        <div className="wallpaper-search-result content-height-padding d-flex flex-column gap-5">
            <Category />
            <WallpaperList />
        </div>
    )
}

export default WallpaperSearchResult