import { useNavigate } from "react-router-dom";
import "./Wallpaper.scss"
import { motion } from "framer-motion";
import user_avatar_raw from "../../assets/icon/icon-avatar-placeholder.png"
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
}

const Wallpaper = ({ wallpaper }) => {

    const { userLikedWallpaper, handleChangeLikedWallpaper } = useContext(UserContext);

    const navigate = useNavigate()

    return (
        <>
            {wallpaper &&
                <motion.div variants={variants} initial="hidden" animate="visible" transition={{ ease: "easeInOut", duration: 0.5 }} className="wallpaper">
                    <img onClick={() => navigate(`/wallpaper/${wallpaper._id}`)} loading="lazy" className="wallpaper-image" src={wallpaper.imageUrl} alt="image1" />
                    <i onClick={() => handleChangeLikedWallpaper(wallpaper._id)} className={userLikedWallpaper && userLikedWallpaper.includes(wallpaper._id) ? "wallpaper-icon text-danger fas fa-heart" : "wallpaper-icon fa-regular fa-heart"}></i>
                    <a className="wallpaper-download-btn btn btn-success" href={wallpaper.imageUrl} download={true} >Download</a>
                    {wallpaper.createdBy &&
                        <div onClick={() => navigate(`/user/${wallpaper.createdBy._id}`)} className="wallpaper-creator">
                            <span className="wallpaper-creator-name">
                                {wallpaper.createdBy.name}
                            </span>
                            <div className="wallpaper-creator-avatar" style={{ backgroundImage: `url(${(wallpaper.createdBy && wallpaper.createdBy.avatar) || user_avatar_raw})` }}></div>
                        </div>
                    }
                </motion.div >
            }
        </>
    )
}

export default Wallpaper