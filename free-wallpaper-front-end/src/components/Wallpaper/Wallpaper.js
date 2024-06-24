import { useNavigate } from "react-router-dom";
import "./Wallpaper.scss"
import { motion } from "framer-motion";
import user_avatar_raw from "../../assets/icon/icon-avatar-placeholder.png"

const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
}

const Wallpaper = ({ image, creatorName, createdBy }) => {

    const navigate = useNavigate()

    return (
        <motion.div variants={variants} initial="hidden" animate="visible" transition={{ ease: "easeInOut", duration: 0.5 }} className="wallpaper">
            <img loading="lazy" className="wallpaper-image" src={image} alt="image1" />
            <i class="wallpaper-icon fa-regular fa-heart"></i>
            <a className="wallpaper-download-btn btn btn-success" href={image} download={true} >Download</a>
            <div onClick={() => navigate(`/user/${creatorName}`)} className="wallpaper-creator">
                <span className="wallpaper-creator-name">
                    {createdBy.name}
                </span>
                <div className="wallpaper-creator-avatar" style={{ backgroundImage: `url(${createdBy.avatar || user_avatar_raw})` }}></div>
            </div>
        </motion.div >
    )
}

export default Wallpaper