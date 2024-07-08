import { useContext, useEffect, useState } from "react"
import { Component } from "../../components"
import "./WallpaperSearchResult.scss"
import { useParams } from "react-router-dom"
import { WallpaperService } from "../../services/WallpaperService"

const WallpaperSearchResult = () => {

    const { key } = useParams()

    const [searchResult, setSearchResult] = useState([]);

    const fetchWallpaperByKey = async () => {
        const response = await WallpaperService.getWallpaperByKeyService(key)
        if (response.status === 200) {
            setSearchResult(response.data)
        } else {
            if (response.status === 404) {
                setSearchResult([])
            }
        }
    }

    useEffect(() => {
        fetchWallpaperByKey()
    }, [key])

    return (
        <div className="wallpaper-search-result content-height-padding d-flex flex-column gap-5">
            <Component.Category />

            <Component.WallpaperList wallpaperList={searchResult} />
        </div>
    )
}

export default WallpaperSearchResult