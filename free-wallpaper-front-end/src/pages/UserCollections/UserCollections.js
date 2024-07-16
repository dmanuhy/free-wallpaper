import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserContext } from '../../contexts/UserContext';
import empty from "../../assets/wallpaper/empty.png";
import './UserCollections.css';
import { AlbumService } from "../../services/AlbumService";
import { useContext } from 'react';
import user_avatar_raw from "../../assets/icon/icon-avatar-placeholder.png"
import { UserService } from "../../services/UserService";
import { WallpaperService } from "../../services/WallpaperService";
import { toast } from "react-toastify";
export default function UserCollections() {
    const [open, setOpen] = useState(false);
    const { userId } = useParams();
    const [User, setUser] = useState();
    const [NewAlbumName, setNewAlbumName] = useState('');
    const { user } = useContext(UserContext)


    const [albums, setAlbums] = useState([]);
    const [wallpaperList, setWallpaperList] = useState([]);


    const [noMoreData, setNoMoreData] = useState(false)
    const handleSubmit = async () => {
        try {
            setOpen(true);
            const newAlbum = {
                name: NewAlbumName,
                author: userId,
                wallpapers: []
            };
            const response = await AlbumService.createAlbum(newAlbum);
            setNewAlbumName('');
            setOpen(false);
            toast.success("New Wallpapper create successfully");
        } catch (error) {
            console.error("Error creating album:", error);
        }
    };
    const handleEditButtonClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const button = e.currentTarget;
        const albumName = button.getAttribute('album-name');
        const albumId = button.getAttribute('album-id');
        const modalElement = document.getElementById('editalbum');
        const modalTitle = modalElement.querySelector('.modal-title');
        const modalBodyInput = modalElement.querySelector('.modal-body input');
        modalTitle.textContent = `Change Name album: ${albumName}`;
        modalBodyInput.value = albumName;
        modalBodyInput.setAttribute('data-album-id', albumId);
    }
    const handleSaveChanges = () => {
        const modalElement = document.getElementById('editalbum');
        const modalBodyInput = modalElement.querySelector('.modal-body input');
        const albumId = modalBodyInput.getAttribute('data-album-id');
        const updatedAlbumName = modalBodyInput.value;

        updateAlbum(albumId, updatedAlbumName);
    }
    const updateAlbum = async (albumId, name) => {
        try {
            const response = await AlbumService.ChangeNameAlbumbyId(albumId, name);

            fetchAlbums();
            toast.success("Album rename successful");
        } catch (error) {
            console.error('Error updating album:', error);
        }
    }


    const fetchAlbums = async () => {
        try {
            const response = await AlbumService.getAllAlbumByAuthorService(userId);
            setAlbums(response);

        } catch (error) {
            console.error("Error fetching albums:", error);
        }
    };
    const fetchUser = async () => {
        try {
            const response = await UserService.findUser(userId);
            setUser(response);

        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        fetchAlbums();
        fetchUser();
    }, [NewAlbumName]);


    const handleDelete = async (albumId, e) => {
        e.preventDefault();
        try {
            setOpen(true);
            await WallpaperService.deleteImageAlbum(albumId);
            const res = await AlbumService.deleteAlbumbyId(albumId);
            fetchAlbums();
            setOpen(false);
            toast.success("Album delete successful");
        } catch (err) {
        }
    };

    return (
        <div className="app">
            <div className="user-profile ">
                <img style={{ marginTop: "300px" }} src={User?.avatar || user_avatar_raw} alt="Profile" className="profile-pic" />
                <h1>{User?.name}</h1>
                {/* <p>{user.description}</p> */}
                <p>{User?.bio}</p>
                <div className="icons">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href={User?.email}>
                        <i className="fas fa-envelope"></i>
                    </a>
                </div>

            </div>
            <div className="navigation-buttons container" style={{ marginBottom: "30px", display: "flex", alignItems: "center" }}>

                <Link to={`/user/${userId}`} className="nav-button10 active">Gallery</Link>
                <Link to="" className="nav-button20">Collections</Link>
                {user && user.isActived && user._id == userId &&
                    <>
                        <div style={{ paddingLeft: "930px" }}>
                            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                <i className="bi bi-plus-circle-fill">  </i>
                                New Album
                            </button>
                        </div>
                    </>
                }
            </div>


            <div className="my-gallery container">
                {albums?.map(album => (
                    <Link className="my-gallery-item " to={`/user/${userId}/album/${album._id}`} key={album.id}>
                        {album && album.wallpapers.length > 0 ? (
                            <>
                                <img src={album.wallpapers[0].imageUrl} />
                                <div className="my-description">
                                    <span>{album.name}</span>
                                    <span className="my-photo-count"><i className="bi bi-image"> {album.wallpapers.length} </i> </span>
                                </div>
                            </>
                        ) : (
                            <>
                                <img src={empty} />
                                <div className="my-description">
                                    <span>{album.name}</span>
                                    <span className="my-photo-count"><i className="bi bi-image"> </i> 0</span>
                                </div>
                            </>
                        )}
                        {user && user.isActived && user._id == userId &&
                            <>
                                <button className="delete-button" onClick={(e) => handleDelete(album._id, e)}><i class="bi bi-trash"></i></button>
                                <button className="edit-button" data-bs-toggle="modal" data-bs-target="#editalbum" album-name={album.name} album-id={album._id} onClick={(e) => handleEditButtonClick(e)} ><i class="bi bi-pencil"></i></button>
                            </>
                        }
                    </Link>


                ))}
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">New Album</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label for="recipient-name" className="col-form-label">Enter Name of Album</label>
                                <input type="text" className="form-control" id="recipient-name" value={NewAlbumName} onChange={(e) => setNewAlbumName(e.target.value)} />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onKeyDown={(event)=>{
                                if (event.target.key === "Enter") {
                                    handleSubmit()
                                }
                            }} onClick={handleSubmit}>Add</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="editalbum" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Album</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="album-name" className="col-form-label">Album Name:</label>
                                    <input type="text" className="form-control" id="album-name" />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSaveChanges}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}