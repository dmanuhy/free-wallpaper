import "./Wallpaper.scss"

const Wallpaper = ({ image }) => {
    return (
        <div className="wallpaper">
            <img loading="lazy" className="wallpaper-image" src={image} alt="image1" />
        </div>
    )
}

export default Wallpaper