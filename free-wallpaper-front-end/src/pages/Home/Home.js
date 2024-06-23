import { Component } from "../../components"

import "./Home.scss"

import { useContext } from "react"
import { WallpaperContext } from "../../contexts/WallpaperContext"


const Home = () => {

    const { page, setPage, wallpaperList, noMoreData } = useContext(WallpaperContext);

    return (
        <div className="home d-flex flex-column gap-5">
            <Component.Banner />
            <Component.Category />
            <Component.WallpaperList wallpaperList={wallpaperList} page={page} setPage={setPage} noMoreData={noMoreData} />
        </div>
    )
}

export default Home