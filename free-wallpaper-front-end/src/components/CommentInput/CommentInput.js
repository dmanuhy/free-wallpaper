import { useState } from "react"
import "./CommentInput.scss"
import { WallpaperService } from "../../services/WallpaperService"

const CommentInput = ({ className, placeholder, wallpaperID, commentID = "", userID, wallpaperDetail, setWallpaperDetail }) => {

    const [body, setBody] = useState("")

    const handleSendComment = async () => {
        const response = await WallpaperService.addWallpaperCommentService({
            wallpaperID: wallpaperID,
            userID: userID,
            commentID: commentID,
            body: body
        })
        if (response.status === 201) {
            if (!commentID || commentID === '') {
                setWallpaperDetail({ ...wallpaperDetail, comments: [response.data, ...wallpaperDetail.comments] })
            } else {
                let comments = [...wallpaperDetail.comments]
                const commentIndex = comments.indexOf(comments.find(comment => comment._id === commentID))
                comments[commentIndex].replies.push(response.data)
                setWallpaperDetail({ ...wallpaperDetail, comments })
            }
            setBody("")
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