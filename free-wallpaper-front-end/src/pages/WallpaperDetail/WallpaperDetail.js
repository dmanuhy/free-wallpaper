import React, { useContext, useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { WallpaperService } from "../../services/WallpaperService"
import { UserContext } from "../../contexts/UserContext"
import "./WallpaperDetail.scss"
import moment from "moment"
import CommentInput from "../../components/CommentInput/CommentInput"
import ReportModal from "../../components/Modal/ReportModal/ReportModal";
import avatar_raw from "../../assets/icon/icon-avatar-placeholder.png"
import ShareModal from "../../components/Modal/ShareModal/ShareModal"


const WallpaperDetail = () => {
    const { user } = useContext(UserContext);
    const { id } = useParams();
    
    const [openReportModal, setOpenReportModal] = useState(false);
    const [wallpaperDetail, setWallpaperDetail] = useState({});
    const [hideReplyList, setHideReplyList] = useState([]);
    const [commentReplyInput, setCommentReplyInput] = useState([]);
    const [contentMaxHeight, setContentMaxHeight] = useState(null);
    const imageRef = useRef();

    const hideCommentReplies = (id) => {
        let array = [...hideReplyList];
        const index = array.indexOf(id);
        if (index < 0) {
            array.push(id);
        } else {
            array.splice(index, 1);
        }
        setHideReplyList(array);
    };

    const openReplyInput = (id) => {
        let array = [...commentReplyInput];
        const index = array.indexOf(id);
        if (index < 0) {
            array.push(id);
        } else {
            array.splice(array.indexOf(id), 1);
        }
        setCommentReplyInput(array);
    };

    const fetchWallaperDetail = async () => {
        try {
            const response = await WallpaperService.getWallpaperDetail(id);
            if (response.status === 200) {
                setWallpaperDetail(response.data);
            } else {
                alert("An error is occupied, please reload page");
            }
        } catch (error) {
            alert("500 Internal Error");
        }
    };
    useEffect(() => {
        fetchWallaperDetail();
    }, [id]);

    return (
        <>
            {wallpaperDetail && (
                <div className="wallpaper-detail content-width-padding content-height-padding">
                    <div className="wallpaper-detail-main">
                        <img
                            onLoad={(event) => setContentMaxHeight(event.target.clientHeight)}
                            ref={imageRef}
                            className="wallpaper-detail-img"
                            src={wallpaperDetail.imageUrl}
                            alt={wallpaperDetail._id}
                        />
                        <div className="wallpaper-detail-content d-flex flex-column justify-content-between p-2">
                            <div className="wallpaper-detail-top d-flex flex-column">
                                <div className="d-flex align-items-center justify-content-between gap-2 border-bottom border-b-1 pb-3">
                                    <div className="wallpaper-detail-top-content text-nowrap d-flex gap-1">
                                        <span>
                                            <i className="wallpaper-detail-top-icon fa-regular fa-heart"></i> {wallpaperDetail.likes}
                                        </span>
                                        <div>
                                            <button  type="button" class="btn " data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="wallpaper-detail-top-icon text-primary fa-solid fa-share-from-square" ></i></button>
                                            {/* <i className="wallpaper-detail-top-icon text-primary fa-solid fa-share-from-square" ></i> */}
                                            <ShareModal id={id}/>
                                        </div>
                                        <div>
                                            <i
                                                className="wallpaper-detail-top-icon text-danger fa-solid fa-triangle-exclamation"
                                                onClick={() => setOpenReportModal(true)}
                                            ></i>
                                            <ReportModal isOpen={openReportModal} onClose={() => setOpenReportModal(false)} id={id} />
                                        </div>
                                    </div>
                                    {wallpaperDetail.createdBy && (
                                        <div className="wallpaper-detail-top-content d-flex align-items-center gap-2">
                                            <span className="fs-6 text-end">{wallpaperDetail.createdBy.name}</span>
                                            <img
                                                className="wallpaper-detail-owner-avatar"
                                                src={wallpaperDetail.createdBy.avatar || avatar_raw}
                                                alt="userAvatar"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div
                                    className="wallpaper-detail-description py-3"
                                    dangerouslySetInnerHTML={{ __html: wallpaperDetail.description }}
                                ></div>
                                <div className="wallpaper-detail-comment">
                                    {wallpaperDetail.comments && wallpaperDetail.comments.length > 0 ? (
                                        <>
                                            <div className="fs-5 py-3">{wallpaperDetail.comments.length} comments</div>
                                            <div
                                                style={{ maxHeight: contentMaxHeight - 256 }}
                                                className="wallpaper-detail-comment-list d-flex flex-column gap-1"
                                            >
                                                {wallpaperDetail.comments
                                                    .sort((a, b) => a.date - b.date)
                                                    .map((item, index) => {
                                                        return (
                                                            <div
                                                                key={"comment-" + index}
                                                                className="d-flex align-items-center justify-content-between py-1 gap-3"
                                                            >
                                                                <div className="d-flex gap-2">
                                                                    <div>
                                                                        <img
                                                                            src={item.user.avatar}
                                                                            className="wallpaper-detail-commenter-avatar"
                                                                            alt="commenter"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex flex-column">
                                                                        <span className="wallpaper-detail-comment-body pt-1 text-wrap">{item.body}</span>
                                                                        <div className="d-flex gap-3">
                                                                            <span className="wallpaper-detail-comment-time">
                                                                                {moment(item.date).fromNow()}
                                                                            </span>

                                                                            <div className="text-secondary d-flex align-items-center gap-2">
                                                                                {item.replies.length > 0 && (
                                                                                    <i
                                                                                        onClick={() => hideCommentReplies(item._id)}
                                                                                        className={
                                                                                            hideReplyList.indexOf(item._id) > -1
                                                                                                ? "fa-solid fa-eye-slash"
                                                                                                : "fa-solid fa-eye"
                                                                                        }
                                                                                    ></i>
                                                                                )}
                                                                                <span onClick={() => openReplyInput(item._id)}>Reply</span>
                                                                            </div>
                                                                        </div>
                                                                        {hideReplyList.indexOf(item._id) === -1 &&
                                                                            item.replies.length > 0 &&
                                                                            item.replies
                                                                                .sort((a, b) => a.date - b.date)
                                                                                .map((item, index) => {
                                                                                    return (
                                                                                        <div className="d-flex gap-2 py-1">
                                                                                            <div>
                                                                                                <img
                                                                                                    src={item.user.avatar}
                                                                                                    className="wallpaper-detail-reply-avatar"
                                                                                                    alt="commenter"
                                                                                                />
                                                                                            </div>
                                                                                            <div className="d-flex flex-column">
                                                                                                <span className="wallpaper-detail-reply-body pt-1 text-wrap">
                                                                                                    {item.body}
                                                                                                </span>
                                                                                                <span className="wallpaper-detail-reply-time">
                                                                                                    {moment(item.date).fromNow()}
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
                                                                                    );
                                                                                })}
                                                                        {user && user._id !== null && commentReplyInput.indexOf(item._id) > -1 && (
                                                                            <CommentInput
                                                                                className={"comment-input"}
                                                                                placeholder={"send a reply ..."}
                                                                                userID={user._id}
                                                                                wallpaperID={wallpaperDetail._id}
                                                                                commentID={item._id}
                                                                                wallpaperDetail={wallpaperDetail}
                                                                                setWallpaperDetail={setWallpaperDetail}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="py-3">
                                            <span className="">
                                                No comment. Be the first commenter <i className="fa-solid fa-arrow-down"></i>
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="wallpaper-detail-bottom-content">
                                {user && user._id ? (
                                    <CommentInput
                                        className="wallpaper-detail-comment-input w-100"
                                        placeholder="Add a comment ..."
                                        userID={user._id}
                                        wallpaperID={wallpaperDetail._id}
                                        wallpaperDetail={wallpaperDetail}
                                        setWallpaperDetail={setWallpaperDetail}
                                    />
                                ) : (
                                    <Link to={"/login"} className="btn btn-success">
                                        Login to comment
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default WallpaperDetail;
