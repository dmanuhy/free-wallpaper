import { useState } from "react";
import Dropzone from "../../Dropzone/Dropzone";
import { WallpaperService } from "../../../services/WallpaperService";
import "./AddWallpaperModal.scss";

const AddWallpaperModal = ({ albumId, userId, onUpdate }) => {
    const [newImages, setNewImages] = useState([]);

    const handleCreateNewWallpaper = async () => {
        if (!newImages || newImages.length === 0) {
            alert("Please upload at least one image.");
            return;
        }
        try {
            const formData = new FormData();
            newImages.forEach((image) => {
                formData.append("imageUrl", image);
            });
            formData.append("fromAlbum", albumId);
            formData.append("createdBy", userId);
            const response = await WallpaperService.CreateWallpaper(formData);
            alert("Created new wallpaper successfully");
            clearState();
            onUpdate();
        } catch (error) {
            console.error("Error creating new wallpaper:", error);
            alert("Error creating new wallpaper. Please try again.");
        }
    };

    const clearState = () => {
        setNewImages([]);
    };


    return (
        <div className="add-wallpaper-modal">
            <div className="modal fade" id="modalAddWallpaper" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-success">
                            <h1 className="modal-title fs-5 text-white" id="staticBackdropLabel">
                                Share your wallpapers, photos, and let the world love them
                            </h1>
                            <button type="button" className="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Dropzone newImages={newImages} setNewImages={setNewImages} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button onClick={handleCreateNewWallpaper} type="button" data-bs-dismiss="modal" className="btn btn-primary">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddWallpaperModal;
