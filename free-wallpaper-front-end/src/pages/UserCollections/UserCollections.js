
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserContext } from '../../contexts/UserContext';
import empty from "../../assets/wallpaper/empty.png";
import './UserCollections.css';
import { AlbumService } from "../../services/AlbumService";
import { useContext } from 'react';
import user_avatar_raw from "../../assets/icon/icon-avatar-placeholder.png"
import { UserService } from "../../services/UserService";
export default function UserCollections() {
    const { userId } = useParams();
    const [User, setUser] = useState();
    const [NewAlbumName, setNewAlbumName] = useState('');
    const { user } = useContext(UserContext)


    const [albums, setAlbums] = useState([]);
    const [wallpaperList, setWallpaperList] = useState([]);


    const [noMoreData, setNoMoreData] = useState(false)
    const handleSubmit = async () => {
        try {
            const newAlbum = {
                name: NewAlbumName,
                author: userId,
                wallpapers: []
            };
            const response = await AlbumService.createAlbum(newAlbum);
            
            setNewAlbumName('');
        } catch (error) {
            console.error("Error creating album:", error);
        }
    };

    const fetchAlbums = async () => {
        try {
            const response = await AlbumService.getAllAlbumByAuthorService(userId);
            setAlbums(response);
            console.log(response);
        } catch (error) {
            console.error("Error fetching albums:", error);
        }
    };
    const fetchUser = async () => {
        try {
            const response = await UserService.findUser(userId);
            setUser(response);
            console.log(response);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        fetchAlbums();
        fetchUser();
    }, [NewAlbumName]);
    

    const handleDelete = (albumId, e) => {


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
                                <button className="delete-button" onClick={(e) => handleDelete(album.id, e)}>X</button>
                            </>
                        }
                    </Link>

                ))}
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
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleSubmit}>Add</button>
                        </div>
                    </div>
                </div>
            </div>

        </div >

    )
}