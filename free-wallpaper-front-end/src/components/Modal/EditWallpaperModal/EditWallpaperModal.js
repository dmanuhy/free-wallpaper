import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { CONSTRANT } from "../../../constrant";
import { toast } from "react-toastify";
import { WallpaperService } from "../../../services/WallpaperService";
const EditWallpaperModal = ({ wallpaperId, imageUrl, tags = [] }) => {

    const [wallpaperTags, setWallpaperTags] = useState([""])
    const [description, setDescription] = useState("")

    useEffect(() => {
        setWallpaperTags(tags)
    }, [])

    const handleChangeTags = (index, action, value) => {
        let tagList = [...wallpaperTags]
        switch (action) {
            case "ADD": tagList.push("")
                break;
            case "DELETE":
                if (tagList.length > 1) {
                    tagList.splice(index, 1)
                }
                break;
            case "UPDATE": tagList[index] = value
                break;
            default: break;
        }
        setWallpaperTags(tagList)
    }

    const updateWallpaperTags = async () => {
        await WallpaperService.EditImage(wallpaperId, wallpaperTags, description)
            .then(response => {
                toast.success("Edit successful")
            })
            .catch(error => {
               
                console.error('Error updating wallpaper:', error);
            });
    };

    return (
        <div className="edit-wallpaper-modal">
            <div className="modal fade" id="editWallpaperModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" style={{ width: "fit-content", maxWidth: "80vw" }}>
                    <div className="modal-content">
                        <div className="modal-header bg-info">
                            <h1 className="modal-title fs-5 text-white" id="staticBackdropLabel">
                                Add tags and description for your Photos
                            </h1>
                            <button type="button" className="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex gap-5">
                                <img src={imageUrl} alt="photos-to-edit" />
                                <div className="edit-wallpaper-modal-content">
                                    <div className="text-start mb-5">
                                        <label className="form-label mb-3" htmlFor="edit-wallpaper-desc">Description</label>
                                        <input id="edit-wallpaper-desc" style={{ width: "24rem" }} className="form-control" value={description} onChange={(event) => setDescription(event.target.value)} />
                                    </div>
                                    <div className="text-start">
                                        <div className="d-flex justify-content-between align-items-center py-2">
                                            <label className="form-label mb-3" >Tags</label>
                                            <i onClick={() => handleChangeTags(null, "ADD")} style={{ padding: "0.65rem", cursor: "pointer" }} className="bg-success text-white fa-solid fa-plus"></i>
                                        </div>
                                        <div className="edit-wallpaper-tag-list row">
                                            {wallpaperTags.map((item, index) => {
                                                return (
                                                    <div className="col-6 d-flex justify-content-center align-items-center mb-3" >
                                                        <input value={item} onChange={(event) => handleChangeTags(index, "UPDATE", event.target.value)} className="form-control" />
                                                        <i onClick={() => handleChangeTags(index, "DELETE")} style={{ padding: "0.65rem", cursor: "pointer" }} className="bg-danger text-white fa-solid fa-minus"></i>
                                                    </div>
                                                )
                                            })}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" onClick={() => updateWallpaperTags()} className="btn btn-success" data-bs-dismiss="modal">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditWallpaperModal;
