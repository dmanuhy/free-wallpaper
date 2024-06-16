import './UserCollectionsDetails.css';
import { Component } from "../../components"
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import w1 from "../../assets/wallpaper/w1.jpg"
import w2 from "../../assets/wallpaper/w2.jpg"
import w3 from "../../assets/wallpaper/w3.jpg"
import w4 from "../../assets/wallpaper/w4.jpg"
import w5 from "../../assets/wallpaper/w5.jpg"
import w6 from "../../assets/wallpaper/w6.jpg"

export default function UserCollectionsDetails() {
    const album = {
        name: 'Flexing',
        username: 'hihhi',
        profilePic: w1,
        wallpaperList: [w1, w2, w3, w4, w5, w6, w1, w2, w3, w4, w5, w6, w2, w3, w4, w5, w6, w2, w3, w4, w5, w6, w2, w3, w4, w5, w6]
    };
    const wallpaperList = [w1, w2, w3, w4, w5, w6, w1, w2, w3, w4, w5, w6, w2, w3, w4, w5, w6, w2, w3, w4, w5, w6, w2, w3, w4, w5, w6]
    const handleDownloadAll = () => {
        const zip = new JSZip();
        const imgFolder = zip.folder("wallpapers");
        wallpaperList.forEach((url, index) => {
            const fileName = `wallpaper${index + 1}.jpg`;
            fetch(url)
                .then(response => response.blob())
                .then(blob => {
                    imgFolder.file(fileName, blob);
                    if (index === wallpaperList.length - 1) {
                        zip.generateAsync({ type: 'blob' }).then(content => {
                            saveAs(content, `${album.name}.zip`);
                        });
                    }
                })
                .catch(error => console.error('Error fetching image:', error));
        });
    };
    return (
        <div>
            <div className="container mt-5">
                <row>
                    <div className="text-center">
                        <h2 className="font-weight-bold">{album.name}</h2>
                        <p className="text-muted">Free Wallpaper</p>
                    </div>
                </row>
                <row>
                    <div className="d-flex justify-content-between align-items-center mt-4" style={{ marginBottom: "30px" }}>
                        <div className="d-flex align-items-center">
                            <img src={w1} alt="User Avatar" className="rounded-circle" width="50" height="50" />
                            <div className="ml-3">
                                <h6 className="m-0">{album.username}</h6>
                            </div>
                        </div>
                        
                        <div className="d-flex justify-content-center mt-2">
                            <button className="btn btn-primary" onClick={handleDownloadAll}>
                                Download Album ({wallpaperList.length} pics)
                            </button>
                        </div>
                    </div>
                </row>

            </div>
            <Component.WallpaperList wallpaperList={wallpaperList} />
        </div>
    )
}