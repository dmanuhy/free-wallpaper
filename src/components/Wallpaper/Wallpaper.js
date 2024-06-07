import "./Wallpaper.scss"

const Wallpaper = ({ img }) => {
    return (
        <div className="wallpaper">
            <img loading="lazy" className="wallpaper-image" src={img} alt="image1" />
        </div>
    )
}

export default Wallpaper