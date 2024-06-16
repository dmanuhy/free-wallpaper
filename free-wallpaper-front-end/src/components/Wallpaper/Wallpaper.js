import "./Wallpaper.scss"
import { motion } from "framer-motion";


const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
}

const Wallpaper = ({ image, creatorName, creatorAvatar, index }) => {
    return (
        <motion.div variants={variants} initial="hidden" animate="visible" transition={{ ease: "easeInOut", duration: 0.5 }} className="wallpaper">
            <img loading="lazy" className="wallpaper-image" src={image} alt="image1" />
            <i class="wallpaper-icon fa-regular fa-heart"></i>
            <a className="wallpaper-download-btn btn btn-success" href={image} download={true} >Download</a>
            <div className="wallpaper-creator">
                <span className="wallpaper-creator-name">
                    {creatorName}
                </span>
                <div className="wallpaper-creator-avatar" style={{ backgroundImage: `url(${creatorAvatar})` }}></div>
            </div>
        </motion.div>
    )
}

export default Wallpaper