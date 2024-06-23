import { useDropzone } from "react-dropzone"
import iconUploadImage from "../../assets/icon/icon-upload-image.png"
import "./Dropzone.scss"

const Dropzone = ({ newImages, setNewImages }) => {

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/*",
        maxFiles: 10,
        onDrop: (acceptedFiles) => {
            acceptedFiles.map((uploadedFile) => {
                return Object.assign(uploadedFile, { imageUrl: URL.createObjectURL(uploadedFile) })
            })
            setNewImages([...newImages, ...acceptedFiles])
        }
    })

    const handleDeleteImage = (index) => {
        let copyImages = [...newImages]
        copyImages.splice(index, 1)
        setNewImages(copyImages)
    }

    return (
        <>
            {!newImages || newImages.length < 1 ?
                <div {...getRootProps()} className={(!newImages || newImages.length < 1) && "dropzone"}>
                    <>
                        <img className="dropzone-icon" src={iconUploadImage} alt="upload" />
                        {!isDragActive ? <h3 className="text-nowrap">Drag and drop to upload</h3> : <h3>Drop Image Here</h3>}
                        <h5>OR</h5>
                        <button className="btn btn-outline-success fs-4">Open Browse</button>
                    </>
                </div>
                :
                <div className="d-flex flex-column gap-4">
                    {newImages.map((item, index) => {
                        return (
                            <div className="dropzone-item d-flex justify-content-between">
                                <div {...getRootProps()} className={(!newImages || newImages.length < 1) && "dropzone"}>
                                    <img key={index + 1} className="dropzone-image" src={item.imageUrl} alt="wallpaper" />
                                </div>
                                <i onClick={() => handleDeleteImage(index)} className="dropzone-item-delete fa-solid fa-trash-can"></i>
                            </div>
                        )
                    })}
                </div>
            }
        </>
    )
}

export default Dropzone;