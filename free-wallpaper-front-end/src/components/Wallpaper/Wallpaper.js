import { useNavigate } from "react-router-dom";
import "./Wallpaper.scss"
import { motion } from "framer-motion";
import user_avatar_raw from "../../assets/icon/icon-avatar-placeholder.png"
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { WallpaperService } from "../../services/WallpaperService";
import { useState, useEffect } from "react";
const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
}

const Wallpaper = ({ wallpaper }) => {
    const [open, setOpen] = useState(false);
    const { userLikedWallpaper, handleChangeLikedWallpaper } = useContext(UserContext);
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const validateUrlFormat = (pathname) => {
        const regex = new RegExp(`^/user/${user._id}/album/[a-fA-F0-9]{24}$`);
        return regex.test(pathname);
    };
    const currentUrl = window.location.pathname;
    const isValid = validateUrlFormat(currentUrl);

    const handleEdit = (id) => {

        console.log(`Edit wallpaper with id: ${id}`);
    };

    const handleDelete = async (id) => {

        try {
            setOpen(true);
            await WallpaperService.deleteOneImage(id);
            setOpen(false);
            toast.success("Album delete successful");
        } catch (err) {
        }
    };
    return (
        <>
            {wallpaper &&
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{ ease: "easeInOut", duration: 0.5 }}
                    className="wallpaper"
                >
                    {isValid &&
                        < div className="wallpaper-buttons">
                            <button className="btn btn-primary" onClick={() => handleEdit(wallpaper._id)}><i class="bi bi-pencil"></i></button>
                            <button className="btn btn-danger" onClick={() => handleDelete(wallpaper._id)}><i class="bi bi-trash"></i></button>
                        </div>
                    }
                    <img
                        onClick={() => navigate(`/wallpaper/${wallpaper._id}`)}
                        loading="lazy"
                        className="wallpaper-image"
                        src={wallpaper.imageUrl}
                        alt="image1"
                    />
                    <i
                        onClick={() => handleChangeLikedWallpaper(wallpaper._id)}
                        className={userLikedWallpaper && userLikedWallpaper.includes(wallpaper._id) ? "wallpaper-icon text-danger fas fa-heart" : "wallpaper-icon fa-regular fa-heart"}
                    ></i>
                    <a className="wallpaper-download-btn btn btn-success" href={wallpaper.imageUrl} download={true}>Download</a>
                    {wallpaper.createdBy && (
                        <div onClick={() => navigate(`/user/${wallpaper.createdBy._id}`)} className="wallpaper-creator">
                            <span className="wallpaper-creator-name">{wallpaper.createdBy.name}</span>
                            <div className="wallpaper-creator-avatar" style={{ backgroundImage: `url(${(wallpaper.createdBy && wallpaper.createdBy.avatar) || user_avatar_raw})` }}></div>
                        </div>
                    )}
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={open}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </motion.div >

            }
        </>
    )
}

export default Wallpaper