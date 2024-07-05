import { useEffect, useState } from "react"
import "./CommentInput.scss"
import { WallpaperService } from "../../services/WallpaperService"
import { socket } from "../../App"
import { toast } from "react-toastify"

const CommentInput = ({ className, placeholder, wallpaperID, commentID = "", userID, wallpaperDetail, setWallpaperDetail, changeReplyDisplay = () => { console.log("Loi roi") } }) => {

    const [body, setBody] = useState("")
    useEffect(() => {
        socket.on("newComment", (data) => {
            if (!data.cID || data.cID === "") {
                // New top-level comment
                setWallpaperDetail((prevWallpaperDetail) => ({
                    ...prevWallpaperDetail,
                    comments: [
                        { _id: data._id, body: data.body, user: data.user, date: data.date, replies: data.replies },
                        ...prevWallpaperDetail.comments
                    ]
                }));
            } else {
                // Reply to an existing comment
                setWallpaperDetail((prevWallpaperDetail) => {
                    const updatedComments = [...prevWallpaperDetail.comments];
                    const commentIndex = updatedComments.findIndex((comment) => comment._id === data.cID);
                    if (commentIndex !== -1) {
                        // Check if the reply already exists
                        const existingReply = updatedComments[commentIndex].replies.find((reply) => reply._id === data._id);
                        if (!existingReply) {
                            updatedComments[commentIndex].replies.push(data);
                        }
                    }
                    return { ...prevWallpaperDetail, comments: updatedComments };
                });
                changeReplyDisplay(data.cID, true);
            }
        });

        return () => {
            socket.off("newComment");
        };
    }, [socket]);

    useEffect(() => {
        console.log("Added comment !");
    }, [wallpaperDetail]);

    const handleSendComment = async () => {
        const response = await WallpaperService.addWallpaperCommentService({
            wallpaperID: wallpaperID,
            userID: userID,
            commentID: commentID,
            body: body
        })
        if (response.status === 201) {
            setBody("")
        } else {
            toast.error("Server error, please try again")
        }
    }

    return (
        <input
            onKeyDown={(event) => {
                if (event.key === "Enter") {
                    handleSendComment();
                }
            }}
            onChange={(event) => setBody(event.target.value)}
            className={className} type="text" placeholder={placeholder} value={body}
        />
    )
}

export default CommentInput