import { useDropzone } from "react-dropzone";
import iconUploadImage from "../../assets/icon/icon-upload-image.png";
import "./Dropzone.scss";
import { useState } from 'react';

const Dropzone = ({ newImages, setNewImages }) => {
    const [fileSizeError, setFileSizeError] = useState("");

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/*",
        maxFiles: 10,
        maxSize: 5242880,
        onDrop: (acceptedFiles, rejectedFiles) => {
            const validFiles = acceptedFiles.map((uploadedFile) => {
                return Object.assign(uploadedFile, { imageUrl: URL.createObjectURL(uploadedFile) });
            });
            setNewImages([...newImages, ...validFiles]);

            if (rejectedFiles.length > 0) {
                setFileSizeError("Some files were too large and were not added. Maximum file size is 5MB.");
            } else {
                setFileSizeError("");
            }
        },
    });

    const handleDeleteImage = (index) => {
        let copyImages = [...newImages];
        copyImages.splice(index, 1);
        setNewImages(copyImages);
    };

    return (
        <>
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                {!isDragActive ? (
                    <>
                        <img className="dropzone-icon" src={iconUploadImage} alt="upload" />
                        <h3 className="text-nowrap">Drag and drop to upload</h3>
                        <h5>OR</h5>
                        <button className="btn btn-outline-success fs-4">Open Browse</button>
                    </>
                ) : (
                    <h3>Drop Image Here</h3>
                )}
            </div>
            {fileSizeError && <div className="text-danger error-message">{fileSizeError}</div>}
            <div className="d-flex flex-column gap-4">
                {newImages.map((item, index) => (
                    <div className="dropzone-item d-flex justify-content-between" key={index}>
                        <img className="dropzone-image" src={item.imageUrl} alt="wallpaper" />
                        <i onClick={() => handleDeleteImage(index)} className="dropzone-item-delete fa-solid fa-trash-can"></i>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Dropzone;
