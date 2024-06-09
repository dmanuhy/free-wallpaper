import { Component } from "../../components"
import "./Home.scss"

const Home = () => {
    return (
        <div className="home d-flex flex-column gap-5">
            <Component.Banner />
            <Component.Category />
            <Component.WallpaperList />
        </div>
    )
}

export default Home