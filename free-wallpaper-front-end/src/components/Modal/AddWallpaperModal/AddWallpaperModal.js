import "./AddWallpaperModal.scss"
import { useContext, useState } from "react"
import Dropzone from "../../Dropzone/Dropzone";
import TextEditor from "../../TextEditor/TextEditor"
import { CONSTRANT } from "../../../constrant";
import { WallpaperContext } from "../../../contexts/WallpaperContext";

const AddWallpaperModal = () => {

    const { wallpaperList, setWallpaperList } = useContext(WallpaperContext);

    const [newImage, setNewImage] = useState(null);
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState(["Car", "Girl", "Computer", "Animal", "Euro"]);

    const quillModules = {
        toolbar: CONSTRANT.TOOL_BAR_OPTIONS
    }

    const handleChangeCategoryList = (index, action) => {
        const currentCategories = [...categories]
        switch (action) {
            case "ADD":
                currentCategories.push(""); break;
            case "DELETE":
                currentCategories.splice(index, 1); break;
            default: return;
        }
        setCategories(currentCategories);
    }

    const handleCreateNewWallpaper = () => {
        let currentWallpaperList = [...wallpaperList];
        currentWallpaperList = [newImage, ...wallpaperList];
        setWallpaperList(currentWallpaperList);
    }

    return (
        <div className="add-wallpaper-modal">
            <div class="modal fade" id="modalAddWallpaper" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog  modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header bg-success">
                            <h1 class="modal-title fs-5 text-white" id="staticBackdropLabel">Shared your wallpapers, photos, and let the world love them</h1>
                            <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <Dropzone newImage={newImage} setNewImage={setNewImage} />
                            <TextEditor value={description} setValue={setDescription} label={"Description for your Wallpaper"} id={"newWallpaperDesc"} quillModules={quillModules} />
                            <div>
                                <label>Your wallpapersallpaper categories</label>
                                <div className="select-categories">
                                    <i onClick={() => handleChangeCategoryList(null, "ADD")} className="select-categories-item-icon-add text-white bg-success fa-solid fa-plus"></i>
                                    {categories && categories.map((item, index) => {
                                        return (
                                            <div className="select-categories-item">
                                                <input value={item} placeholder="image category.." className="select-categories-item-input" />
                                                <i onClick={() => handleChangeCategoryList(index, "DELETE")} className="select-categories-item-icon-delete fa-solid fa-minus"></i>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button onClick={() => handleCreateNewWallpaper()} type="button" class="btn btn-primary" data-bs-dismiss="modal">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddWallpaperModal