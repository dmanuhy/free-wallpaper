import { useNavigate } from "react-router-dom";
import "./Wallpaper.scss"
import { motion } from "framer-motion";
import user_avatar_raw from "../../assets/icon/icon-avatar-placeholder.png"

const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
}

const Wallpaper = ({ wallpaper }) => {

    const navigate = useNavigate()

    return (
        <>
            <motion.div variants={variants} initial="hidden" animate="visible" transition={{ ease: "easeInOut", duration: 0.5 }} className="wallpaper">
                {console.log(wallpaper)}
                <img loading="lazy" className="wallpaper-image" src={wallpaper.imageUrl} alt="image1" data-bs-toggle="modal" data-bs-target="#wallpaperDetailModal" />
                <i class="wallpaper-icon fa-regular fa-heart"></i>
                <a className="wallpaper-download-btn btn btn-success" href={wallpaper.imageUrl} download={true} >Download</a>
                <div onClick={() => navigate(`/user/${wallpaper.createdBy._id}`)} className="wallpaper-creator">
                    <span className="wallpaper-creator-name">
                        {wallpaper.createdBy.name}
                    </span>
                    <div className="wallpaper-creator-avatar" style={{ backgroundImage: `url(${(wallpaper.createdBy && wallpaper.createdBy.avatar) || user_avatar_raw})` }}></div>
                </div>
            </motion.div >
        </>
    )
}

export default Wallpaper