import banner from "../../../assets/banner/banner.png"
import Search from "../../Search/Search"
import "./Banner.scss"
const Banner = () => {
    return (
        <div style={{ backgroundImage: `url(${banner})` }} className="banner">
            <h2 className="text-center">The best free stock photos, royalty free images <br /> shared by creators.</h2>
            <Search />
        </div>
    )
}

export default Banner