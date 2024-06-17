import { useDropzone } from "react-dropzone"
import iconUploadImage from "../../assets/icon/icon-upload-image.png"
import "./Dropzone.scss"

const Dropzone = ({ newImage, setNewImage }) => {

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/*",
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            // acceptedFiles.map((uploadedFile) => {
            //     return Object.assign(uploadedFile, { preview: URL.createObjectURL(uploadedFile) })
            // })
            setNewImage(URL.createObjectURL(acceptedFiles[0]))
        }
    })

    return (
        <div {...getRootProps()} className={!newImage && "dropzone"}>
            <input className="d-none" {...getInputProps()} />
            {!newImage ?
                <>
                    <img className="dropzone-icon" src={iconUploadImage} alt="upload" />
                    {!isDragActive ? <h3>Drag and drop to upload</h3> : <h3>Drop Image Here</h3>}

                    <h5>OR</h5>
                    <button className="btn btn-outline-success fs-4">Open Browse</button>
                </>
                :
                <img className="dropzone-image" src={newImage} alt="wallpaper" />
            }
        </div>
    )
}

export default Dropzone;