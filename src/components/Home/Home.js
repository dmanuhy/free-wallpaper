import Category from "../Category/Category"
import WallpaperList from "../WallpaperList/WallpaperList"
import Banner from "./Banner/Banner"
import "./Home.scss"

const Home = () => {
    return (
        <div className="home d-flex flex-column gap-5">
            <Banner />
            <Category />
            <WallpaperList />
        </div>
    )
}

export default Home