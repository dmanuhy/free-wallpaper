import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { WallpaperService } from "../../services/WallpaperService"
import { UserContext } from "../../contexts/UserContext"
import "./WallpaperDetail.scss"
import moment from "moment"


const WallpaperDetail = () => {

    const { user } = useContext(UserContext)
    const { id } = useParams()
    const [wallpaperDetail, setWallpaperDetail] = useState({})
    const [newComment, setNewComment] = useState("")

    const fetchWallaperDetail = async () => {
        try {
            const response = await WallpaperService.getWallpaperDetail(id)
            if (response.status === 200) {
                setWallpaperDetail(response.data);
            } else {
                alert("An error is occupied, please reload page")
            }
        } catch (error) {
            alert("500 Internal Error")
        }
    }

    useEffect(() => {
        fetchWallaperDetail()
    }, [id])

    return (
        <> {wallpaperDetail &&
            <div className="wallpaper-detail content-width-padding content-height-padding">
                {console.log(wallpaperDetail)}
                <div className="wallpaper-detail-main">
                    <img className="wallpaper-detail-img" src={wallpaperDetail.imageUrl} alt={wallpaperDetail._id} />
                    <div className="wallpaper-detail-content d-flex flex-column justify-content-between p-2">
                        <div className="wallpaper-detail-top d-flex flex-column">
                            <div className="d-flex align-items-center justify-content-between gap-2 border-bottom border-b-1 pb-3">
                                <div className="wallpaper-detail-top-content text-nowrap d-flex gap-1">
                                    <span>
                                        <i className="wallpaper-detail-top-icon fa-regular fa-heart"></i> {wallpaperDetail.likes}
                                    </span>
                                    <i className="wallpaper-detail-top-icon text-primary fa-solid fa-share-from-square"></i>
                                    <i class="wallpaper-detail-top-icon text-danger fa-solid fa-triangle-exclamation"></i>
                                </div>
                                {wallpaperDetail.createdBy &&
                                    <div className="wallpaper-detail-top-content d-flex align-items-center gap-2">
                                        <span className="fs-6 text-end">{wallpaperDetail.createdBy.name}</span>
                                        <img className="wallpaper-detail-owner-avatar" src={wallpaperDetail.createdBy.avatar} alt="userAvatar" />
                                    </div>
                                }
                            </div>
                            <div className="wallpaper-detail-description py-3" dangerouslySetInnerHTML={{ __html: wallpaperDetail.description }}></div>
                            <div className="wallpaper-detail-comment">
                                {wallpaperDetail.comments && wallpaperDetail.comments.length > 0 ?
                                    <>
                                        <div className="fs-5 py-3">{wallpaperDetail.comments.length} comments</div>
                                        <div className="d-flex flex-column gap-2">
                                            {wallpaperDetail.comments.map((item, index) => {
                                                return (
                                                    <div key={"comment-" + index} className="d-flex align-items-center justify-content-between py-1 gap-3">
                                                        <div className="d-flex gap-2">
                                                            <div>
                                                                <img src={item.user.avatar} className="wallpaper-detail-commenter-avatar" alt="commenter" />

                                                            </div>
                                                            <div className="d-flex flex-column">
                                                                {console.log(Date.parse(item.date))}
                                                                <span className="wallpaper-detail-comment-body pt-1 text-wrap">{item.body}</span>
                                                                <span className="wallpaper-detail-comment-time">{moment(item.date).fromNow()}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </>
                                    :
                                    <div className="py-3">
                                        <span className="">No comment. Be the first commenter <i class="fa-solid fa-arrow-down"></i></span>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="wallpaper-detail-bottom-content">
                            {user && user._id ?
                                <div className="">
                                    <input className="wallpaper-detail-comment-input w-100" placeholder="Add a comment" />
                                </div>
                                :
                                <Link to={"/login"} className="btn btn-success">Login to comment</Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        }</>
    )
}

export default WallpaperDetail