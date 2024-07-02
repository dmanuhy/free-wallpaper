import './UserCollectionsDetails.css';
import { Component } from "../../components"
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useContext } from 'react';
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import AddWallpaperModal from '../../components/Modal/AddWallpaperModal/AddWallpaperModal';
import { UserContext } from '../../contexts/UserContext';
import { WallpaperService } from '../../services/WallpaperService';
import { AlbumService } from '../../services/AlbumService';
import { UserService } from '../../services/UserService';
import user_avatar_raw from "../../assets/icon/icon-avatar-placeholder.png"
export default function UserCollectionsDetails() {

    const { userId, albumId } = useParams();
    const [album, setAlbum] = useState();
    const [User, setUser] = useState();
    const [NewAlbumName, setNewAlbumName] = useState('');
    const { user } = useContext(UserContext)
    const [wallpaperList, setWallpaperList] = useState([]);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState({
        order: "createdAt",
        priority: "descending"
    })

    const [noMoreData, setNoMoreData] = useState(false)

    const fetchAllWallpaper = async () => {
        const response = await WallpaperService.getAllWallpaperByAlbumService(albumId, page, sort.order, sort.priority)
        if (response && response.status === 200 && response.data.length > 0) {
            if (page === 1) {
                setWallpaperList(response.data);
            } else {
                setWallpaperList((products) => [...products, ...response.data]);
            }
        } else {
            setNoMoreData(true)
        }

    }
    const fetchUser = async () => {
        try {
            const response = await UserService.findUser(userId);
            setUser(response);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };
    const fetchAlbum = async () => {
        try {
            const response = await AlbumService.getAlbumByIdService(albumId);
            setAlbum(response);
            console.log(response)

        } catch (error) {
            console.error("Error fetching album:", error);
        }
    }
    useEffect(() => {
        if (page !== 0) {
            fetchAllWallpaper();
        }
    }, [page, sort])
    useEffect(() => {
        fetchUser();
        fetchAlbum();
    }, [])
    const handleUpdateWallpapers = () => {
        setPage(1);
        fetchAllWallpaper();
    };
    const handleDownloadAll = () => {
        //     const zip = new JSZip();
        //     const imgFolder = zip.folder("wallpapers");
        //     wallpaperList.forEach((url, index) => {
        //         const fileName = `wallpaper${index + 1}.jpg`;
        //         fetch(url)
        //             .then(response => response.blob())
        //             .then(blob => {
        //                 imgFolder.file(fileName, blob);
        //                 if (index === wallpaperList.length - 1) {
        //                     zip.generateAsync({ type: 'blob' }).then(content => {
        //                         saveAs(content, `${index + 1}.zip`);
        //                     });
        //                 }
        //             })
        //             .catch(error => console.error('Error fetching image:', error));
        //     });
    };
    return (
        <div>
            <div className="container mt-5">
                <row>
                    <div className="text-center">
                        <h2 className="font-weight-bold">{album?.name}  </h2>
                        <p className="text-muted">Free Wallpaper</p>
                    </div>
                </row>
                <row>
                    <div className="d-flex justify-content-between align-items-center mt-4" style={{ marginBottom: "30px" }}>
                        <div className="d-flex align-items-center">
                            <img src={User?.avatar || user_avatar_raw} alt="User Avatar" className="rounded-circle" width="50" height="50" />
                            <div className="ml-3">
                                <h6 className="m-0">{User?.name}</h6>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-2 gap-2">
                            {user && user.isActived &&
                                <>
                                    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAddWallpaper">
                                        <i class="fa-solid fa-plus"></i> Wallpaper
                                    </button>
                                    <AddWallpaperModal albumId={albumId} userId={userId} onUpdate={fetchAllWallpaper} />
                                </>
                            }
                            <button className="btn btn-primary" onClick={handleDownloadAll}>
                                Download Album ({wallpaperList.length} pics)
                            </button>
                        </div>
                    </div>
                </row>
            </div>
            <Component.WallpaperList wallpaperList={wallpaperList
            } page={page} setPage={setPage} />
        </div>
    )
}