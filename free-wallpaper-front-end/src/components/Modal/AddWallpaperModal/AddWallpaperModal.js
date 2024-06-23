import "./AddWallpaperModal.scss"
import { useContext, useState } from "react"
import Dropzone from "../../Dropzone/Dropzone";
import TextEditor from "../../TextEditor/TextEditor"
import { CONSTRANT } from "../../../constrant";
import { WallpaperContext } from "../../../contexts/WallpaperContext";

const AddWallpaperModal = () => {

    const { wallpaperList, setWallpaperList } = useContext(WallpaperContext);

    const [newImages, setNewImages] = useState([]);
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([""]);

    // const quillModules = {
    //     toolbar: CONSTRANT.TOOL_BAR_OPTIONS
    // }

    // const handleChangeCategoryList = (index, action) => {
    //     const currentCategories = [...categories]
    //     switch (action) {
    //         case "ADD":
    //             currentCategories.push(""); break;
    //         case "DELETE":
    //             if (currentCategories.length > 1) {
    //                 currentCategories.splice(index, 1); break;
    //             } else {
    //                 return
    //             }
    //         default: return;
    //     }
    //     setCategories(currentCategories);
    // }

    // const handleChangeCategory = (index, value) => {
    //     const currentCategories = [...categories]
    //     currentCategories[index] = value
    //     setCategories(currentCategories)
    // }

    const handleCreateNewWallpaper = () => {
        // if (!newImages || !description || categories.length < 1) {
        //     alert("Missing parameter(s)")
        // } else {
        //     let currentWallpaperList = [...wallpaperList];
        //     currentWallpaperList = [newImages, ...wallpaperList];
        //     setWallpaperList(currentWallpaperList);
        //     alert("Created new Wallpaper");
        //     clearState();
        // }
    }

    // const clearState = () => {
    //     setNewImages("")
    //     setDescription("")
    //     setCategories([""]);
    // }

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
                            <Dropzone newImages={newImages} setNewImages={setNewImages} />
                            {/* <TextEditor value={description} setValue={setDescription} label={"Description for your Wallpaper"} id={"newWallpaperDesc"} quillModules={quillModules} /> */}
                            {/* <div>
                                <label>Your wallpapersallpaper categories</label>
                                <div className="select-categories">
                                    <i onClick={() => handleChangeCategoryList(null, "ADD")} className="select-categories-item-icon-add text-white bg-success fa-solid fa-plus"></i>
                                    {categories && categories.map((item, index) => {
                                        return (
                                            <div className="select-categories-item">
                                                <input onChange={(event) => handleChangeCategory(index, event.target.value)} value={item} placeholder="image category.." className="select-categories-item-input" />
                                                <i onClick={() => handleChangeCategoryList(index, "DELETE")} className="select-categories-item-icon-delete fa-solid fa-minus"></i>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div> */}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button onClick={() => handleCreateNewWallpaper()} type="button" class="btn btn-primary">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddWallpaperModal