import "./Wallpaper.scss"

const Wallpaper = ({ image, creatorName, creatorAvatar }) => {
    return (
        <div className="wallpaper">
            <img loading="lazy" className="wallpaper-image" src={image} alt="image1" />
            <i class="wallpaper-icon fa-regular fa-heart"></i>
            <a className="wallpaper-download-btn btn btn-success" href={image} download={true} >Download</a>
            <div className="wallpaper-creator">
                <span className="wallpaper-creator-name">
                    {creatorName}
                </span>
                <div className="wallpaper-creator-avatar" style={{ backgroundImage: `url(${creatorAvatar})` }}></div>
            </div>
        </div>
    )
}

export default Wallpaper